import { NextApiRequest, NextApiResponse } from "next";
import { connectDb, disconnectDb } from "@/server/db";
import Country from "@/model/country";
import VariableData from "@/model/variableData";
import Variable from "@/model/variable";
import Theme from "@/model/theme";
import Criterion from "@/model/criterion";

// Configuration for API route
export const config = {
  api: {
    bodyParser: false,
  },
};

const getInputSelects = (variableData: any[], varCode: string) => {
  const hasValueAtIndex = (arrayOfObjects: any[], index: number) =>
    arrayOfObjects.some(
      (obj) =>
        obj && obj.char && obj.char[index] !== null && obj.char[index] !== "NA"
    );

  type InputType = {
    code?: string;
    index: number;
    text: string;
    options?: any[]; // Added the 'options' property to the InputType type
  };

  const inputSelects: InputType[] = [
    // Explicitly define the type for 'inputSelects'
    { index: 3, text: "Género" },
    { index: 2, text: "Rango de edad" },
    { index: 1, text: "Otros" },
    { index: 0, text: "Área geográfica" },
  ];
  const inputs = inputSelects.reduce((acc: InputType[], input) => {
    const idx = input.index; // Extracted index for clarity

    if (hasValueAtIndex(variableData, idx)) {
      const options: any[] = [];
      variableData.forEach((vd) => {
        if (!options.includes(vd.char[idx])) {
          options.push(vd.char[idx]);
        }
      });

      acc.push({
        ...input,
        options,
        code: varCode,
      });
    }
    return acc;
  }, []);

  return inputs;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();
  const lang = (req.query.lang || "es") as string;
  const varCode: string = req.query.variable as string;
  const query = { lang };
  try {
    const variableResp = await Variable.findOne({ ...query, code: varCode });
    const variableDataResp = await VariableData.find({
      ...query,
      _id: { $in: variableResp.variableData },
    });
    const inputs = getInputSelects(variableDataResp, varCode);
    return res.status(200).json({ data: inputs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await disconnectDb();
  }
}
