import { NextApiRequest, NextApiResponse } from "next";
import { connectDb, disconnectDb } from "@/server/db";
import ObservatoryInfo from "@/model/observatoryInfo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();
  try {
    const lang = req.query.lang || "es";
    const observatoryInfo = await ObservatoryInfo.find({
      lang
    });
    return res.status(200).json({
      data: observatoryInfo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await disconnectDb();
  }
}
