import { redisClient } from "@/services/redis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.id) {
    return res.status(400).json({ error: "Missing id" });
  }
  const result = await redisClient.get(req.query.id?.toString()!);

  res.status(200).json(JSON.parse(result as string));
}
