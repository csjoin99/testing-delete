import { NextApiRequest, NextApiResponse } from "next";
import { connectDb, disconnectDb } from "@/server/db";
import Country from "@/model/country";
import Criterion from "@/model/criterion";
import Theme from "@/model/theme";
import Variable from "@/model/variable";
import VariableData from "@/model/variableData";

interface VariableDataInfo {
  theme: string;
  variable: string;
  type: string;
}

async function getDescription(lang: string, iso: string) {
  const country = await Country.findOne({ lang, iso }, "id name description");

  const variableData = await VariableData.find({ lang, country: country._id });

  const sources = Array.from(
    new Set(variableData.flatMap((data: any) => data.sources))
  );

  return { ...country.toObject(), sources };
}

async function getClassification(lang: string, iso: string) {
  const country = await Country.findOne({ lang, iso }, "id name description");

  const criterions = await Criterion.find({ lang })
    .populate({
      path: "themes",
      populate: {
        path: "variables",
        populate: {
          path: "variableData",
          match: { country: country._id, lang },
        },
      },
    })
    .exec();

  const formattedData = await Promise.all(
    criterions.map(async (criterion: any) => {
      const themeData = await Promise.all(
        criterion.themes.map(async (theme: any) => {
          const variableDataPromises = theme.variables.map(
            async (variable: any) => {
              const variableDataTypes = await Promise.all(
                variable.variableData.map((data: any) => data.type)
              );
              const typeResult = Array.from(new Set(variableDataTypes.flat()));
              const type = typeResult.length ? typeResult[0] : "";

              if (type.length > 0) {
                return {
                  theme: theme.name,
                  variable: variable.name,
                  type,
                } as VariableDataInfo;
              } else {
                return null;
              }
            }
          );
          const variableData = (await Promise.all(variableDataPromises)).filter(
            Boolean
          );
          return variableData;
        })
      );
      return {
        criterion: criterion.name,
        data: themeData.flat(),
      };
    })
  );

  return formattedData;
}

async function getVariables(lang: string, iso: string) {
  const country = await Country.findOne({ lang, iso }, "id name description");

  const variables = await Variable.find({ lang })
    .select("id name")
    .populate({
      path: "variableData",
      match: { country: country._id, lang },
      select: "id main_source sources article last_update",
    });

  const filteredVariables = variables.filter(
    (variable: any) => variable.variableData.length > 0
  );

  variables.forEach((variable: any) => {
    if (variable.variableData) {
      variable.variableData = variable.variableData.map((data: any) => ({
        id: data.id,
        source: data.main_source,
        web: data.sources,
        article: data.article,
        last_update: data.last_update,
      }));
    }
  });

  return filteredVariables;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();

  try {
    const lang = (req.query.lang || "es") as string;
    const { country: iso = "", tab } = req.query;
    let response = null;

    if (tab === "description") {
      response = await getDescription(lang, iso as string);
    } else if (tab === "classification") {
      response = await getClassification(lang, iso as string);
    } else if (tab === "variable") {
      response = await getVariables(lang, iso as string);
    }

    return res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await disconnectDb();
  }
}
