import type {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  RouteOptions,
} from "fastify";
import { OAuth2UserResponse, OAuth2MeBody, Status } from "../../interfaces";
import axios from "axios";

const routeOptions = {
  schema: {
    body: {
      type: "object",
      required: ["token"],
      properties: {
        token: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: {
            type: "object",
            properties: {
              username: { type: "string" },
              discriminator: { type: "string" },
              avatar: { type: "string" },
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
  fastify.post<{ Body: OAuth2MeBody }>(
    "/oauth2/@me",
    routeOptions,
    async (request, reply) => {
      const { token } = request.body;

      const { data, status } = await axios.get<OAuth2UserResponse>(
        "https://discord.com/api/users/@me",
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
    }
  );

  done();
};
