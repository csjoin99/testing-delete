import { NextApiRequest, NextApiResponse } from "next";
import { connectDb, disconnectDb } from "@/server/db";
import Country from "@/model/country";
import VariableData from "@/model/variableData";
import Variable from "@/model/variable";
import Theme from "@/model/theme";
import Criterion from "@/model/criterion";

type InputType = {
  code?: string;
  index: number;
  text: string;
  options?: any[];
};

async function getFilteredOptions(
  lang: string,
  variableCode: string,
  filters: { index: number; value: any }[]
) {
  const inputSelects: InputType[] = [
    { index: 3, text: "Género" },
    { index: 2, text: "Rango de edad" },
    { index: 1, text: "Otros" },
    { index: 0, text: "Área geográfica" },
  ];

  const lastFilter = filters[filters.length - 1];
  const variable = await Variable.findOne({ lang, code: variableCode });

  const queryFilters = filters.reduce((acc: any, filter: any) => {
    acc[`char.${filter.index}`] = filter.value;
    return acc;
  }, {});

  const variableData = await VariableData.find({
    lang,
    _id: { $in: variable.variableData },
    ...queryFilters,
  });

  const hasValueAtIndex = (arrayOfObjects: any[], index: number) =>
    arrayOfObjects.some(
      (obj) => obj?.char?.[index] !== null && obj?.char?.[index] !== "NA"
    );

  const inputs: InputType[] = inputSelects.reduce((acc: any, input: any) => {
    const idx = input.index;
    if (idx < lastFilter.index && hasValueAtIndex(variableData, idx)) {
      const options: any[] = [
        ...new Set(variableData.map((vd: any) => vd.char[idx])),
      ];
      const value = filters.find((f) => f.index === idx);
      acc.push({
        ...input,
        options,
        code: variableCode,
      });
    }
    return acc;
  }, []);

  return inputs;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();

  const lang = (req.query.lang || "es") as string;
  const data = req.body;

  try {
    const response = await getFilteredOptions(
      lang,
      data.variable,
      data.filters
    );
    return res.status(200).json({ lang, response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await disconnectDb();
  }
}
