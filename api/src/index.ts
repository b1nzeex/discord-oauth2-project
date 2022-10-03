import Fastify from "fastify";
import cors from "@fastify/cors";
import axios from "axios";
import qs from "qs";
import { CLIENT_ID, CLIENT_SECRET, PORT, WEB_URL } from "./config";

// Interfaces
interface OAuth2TokenResponse {
  access_token: string;
  token_type: "Bot" | "Bearer";
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface OAuth2UserResponse {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

// HTTP Statuses
enum Status {
  "Unauthorized" = 401,
  "NotFound" = 404,
  "OK" = 200,
}

const HOST = "https://discord.com/api";

// Create a new server
const fastify = Fastify({ logger: true });
fastify.register(cors, {
  origin: WEB_URL,
});

fastify.listen({ port: PORT }, (err, address) => {
  if (err) throw err;
  console.log(`API online at ${address}`);
});

interface OAuth2MeBody {
  token: string;
}

// Get user information
fastify.post<{ Body: OAuth2MeBody }>("/oauth2/@me", async (request, reply) => {
  const { token } = request.body;

  // Data validation checks
  if (!token) {
    return reply
      .status(Status.Unauthorized)
      .send({ message: "No OAuth2 access token was provided." });
  }

  const { data, status } = await axios.get<OAuth2UserResponse>(
    `${HOST}/users/@me`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(data);

  // If API request was not successful
  if (status !== Status.OK) {
    return reply
      .status(status)
      .send({ message: "Check console for error information" });
  }

  // Return data to client
  return reply.status(Status.OK).send({ message: data });
});

interface OAuth2TokenBody {
  code: string;
  redirectUri: string;
}

// Exchange code for a token
fastify.post<{ Body: OAuth2TokenBody }>(
  "/oauth2/token",
  async (request, reply) => {
    const { code, redirectUri } = request.body;

    // Data validation checks
    if (!code) {
      return reply
        .status(Status.Unauthorized)
        .send({ message: "No OAuth2 code was provided" });
    }

    if (!redirectUri) {
      return reply
        .status(Status.NotFound)
        .send({ message: "No redirect URL was provided" });
    }

    // Prepare the request body
    const requestBody = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
    };

    // Make a request to discord
    const { data, status } = await axios.post<OAuth2TokenResponse>(
      `${HOST}/oauth2/token`,
      qs.stringify(requestBody),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(data);

    // If API request was not successful
    if (status !== Status.OK) {
      return reply
        .status(status)
        .send({ message: "Check console for error information" });
    }

    // Return data to client
    return reply.status(Status.OK).send({ message: data });
  }
);
