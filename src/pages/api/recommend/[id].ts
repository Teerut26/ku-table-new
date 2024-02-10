import { env } from "@/env/server.mjs";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await axios.get(env.RECOMMEND_API + "/" + req.query.id);
  res.status(200).json(data);
}

//https://test1-qu6xz4m4.b4a.run/
