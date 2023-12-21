import { NextApiRequest, NextApiResponse } from "next";
import { connectDb, disconnectDb } from "@/server/db";
import SubRegion from "@/model/subregion";
import Country from "@/model/country";

type FixedConfig = {
  [key: string]: string[];
};

const fixedConfig: FixedConfig = {
  AS: ["ARG", "BOL", "BRA", "CHL", "COL", "ECU", "GUY", "PRY"],
  AN: ["MEX"],
  AC: ["BLZ", "CRI", "SLV", "GTM", "HND", "NIC", "PAN"],
  CB: ["ATG", "BHS", "BRB", "CUB", "DOM", "KNA", "LCA", "GRD"],
};

async function fetchSubRegion(lang: string, code: string): Promise<void> {
  const subRegion = await SubRegion.findOne({ lang, code });
  subRegion.countries = await Country.find({
    lang,
    iso: {
      $in: fixedConfig[code],
    },
  });
  await subRegion.save();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();

  try {
    const lang = req.query.lang || "es";

    await Promise.all(
      Object.keys(fixedConfig).map((key) => fetchSubRegion(lang, key))
    );

    return res.status(200).json({
      msg: "OK",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await disconnectDb();
  }
}
