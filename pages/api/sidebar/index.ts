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

// API route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect to the database
  await connectDb();

  const lang = req.query.lang || "es";
  const query = { lang };

  try {
    // Fetch criteria with populated themes, variables, and variable data
    let criterionList = await Criterion.find(query)
      .populate({
        path: "themes",
        select: "id name lang",
        model: Theme,
        populate: {
          path: "variables",
          select: "id name code lang",
          model: Variable,
        },
      })
      .select("id name lang")
      .lean();
    const customOrder = [
      "Marco legal",
      "Datos cuantitativos",
      "Índice de riesgo de trabajo infantil",
    ];
    // Sort the criterionList based on the custom order
    criterionList.sort((a: any, b: any) => {
      const nameA = a.name;
      const nameB = b.name;
      return customOrder.indexOf(nameA) - customOrder.indexOf(nameB);
    });

    // Enhance criterion list
    // Send the enhanced criterion list as JSON response
    return res.status(200).json({ data: criterionList });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Disconnect from the database after processing
    await disconnectDb();
  }
}
