import type {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  RouteOptions,
} from "fastify";
import { OAuth2TokenBody, OAuth2TokenResponse, Status } from "../../interfaces";
import { CLIENT_ID, CLIENT_SECRET } from "../../config";
import qs from "qs";
import axios from "axios";

const routeOptions = {
  schema: {
    body: {
      type: "object",
      required: ["code", "redirectUri"],
      properties: {
        code: { type: "string" },
        redirectUri: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: {
            type: "object",
            properties: {
              access_token: { type: "string" },
            },
          },
        },
      },
    },
  },
};

export default (
  fastify: FastifyInstance,
  _opts: RouteOptions,
  done: DoneFuncWithErrOrRes
) => {
  // Exchange code for a token
  fastify.post<{ Body: OAuth2TokenBody }>(
    "/oauth2/callback",
    routeOptions,
    async (request, reply) => {
      const { code, redirectUri } = request.body;

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
        "https://discord.com/api/oauth2/token",
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

  done();
};
