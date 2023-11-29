import { env } from "@/env/server.mjs";
import { createClient } from "redis";

const redisClient = await createClient({
  url: env.REDIS_URL,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export { redisClient };
