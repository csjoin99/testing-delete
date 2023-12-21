import { NextApiRequest, NextApiResponse } from "next";
import { connectDb, disconnectDb } from "@/server/db";
import SubRegion from "@/model/subregion";
import Country from "@/model/country";

interface SubRegionResponse {
  id: string;
  name: string;
  lang: string;
  countries: Country[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();

    const lang = req.query.lang || "es";

    const subRegions: SubRegionResponse[] = await SubRegion.find({ lang })
      .populate({
        path: "countries",
        select: "id name iso node lang flag",
        model: Country,
      })
      .select("id name lang")
      .lean();

    return res.status(200).json({ lang, subRegions });
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await disconnectDb();
  }
}
