import Fastify from "fastify";
import cors from "@fastify/cors";
import { join } from "path";
import { readdirSync } from "fs";
import { PORT, WEB_URL } from "./config";

const routesDir = join(__dirname, "routes");

const getFileList = (directoryName) => {
  let files = [];
  const items = readdirSync(directoryName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...getFileList(`${directoryName}/${item.name}`)];
    } else {
      if (item.name.endsWith(".js")) {
        files.push(`${directoryName}/${item.name}`);
      }
    }
  }

  return files;
};

const fastify = Fastify({ logger: true });
fastify.register(cors, {
  origin: WEB_URL,
});

const files = getFileList(routesDir);
for (const item of files) {
  const prop = require(item);
  fastify.register(prop);
}

fastify.listen({ port: PORT }, (err, address) => {
  if (err) throw err;
  console.log(`API online at ${address}`);
});
