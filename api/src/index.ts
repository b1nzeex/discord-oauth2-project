import Fastify from "fastify";
import cors from "@fastify/cors";
import { join } from "path";
import { readdirSync } from "fs";
import { PORT, WEB_URL } from "./config";

const routesDir = join(__dirname, "routes");

const fastify = Fastify({ logger: true });
fastify.register(cors, {
  origin: WEB_URL,
});

for (const route of readdirSync(routesDir).filter((file) =>
  file.endsWith(".js")
)) {
  const prop = require(`${routesDir}/${route}`);
  fastify.register(prop);
}

fastify.listen({ port: PORT }, (err, address) => {
  if (err) throw err;
  console.log(`API online at ${address}`);
});
