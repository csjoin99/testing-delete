// Importing only what is necessary to reduce unnecessary imports
import { NextApiRequest, NextApiResponse } from "next";
import { connectDb, disconnectDb } from "@/server/db";

// Importing specific models
import Country from "@/model/country";
import VariableData from "@/model/variableData";
import Variable from "@/model/variable";

// Helper function to add unique values to an array
function addUniqueValues(targetArray: any[], sourceArray: any[]): void {
  const existingCountries = new Set(targetArray.map(obj => obj.country));
  for (const sourceObj of sourceArray) {
    if (!existingCountries.has(sourceObj.country)) {
      targetArray.push(sourceObj);
      existingCountries.add(sourceObj.country);
    }
  }

}

// Helper function to find the intersection of two arrays
function intersectArrays(array1: any[], array2: any[]): any[] {
  const countrySet2 = new Set(array2.map(obj => obj.country));
  return array1.filter(obj => countrySet2.has(obj.country));

}
// Function to handle filter processing
async function processFilters(filters: any[], lang: any): Promise<string[]> {
  let countries: any[] = [];

  for (const filter of filters) {
    const variable = await Variable.findOne({ lang, code: filter.variable });
    let query: any = { lang };
    if (filter.key) {
      query[`char.${filter.key}`] = filter.value;
    }
    if (variable) {
      const variablesData = await VariableData.find({
        ...query,
        _id: { $in: variable.variableData },
      });
      if (variablesData.length) {
        const variableDataCountriesIds = variablesData.map((vd: any) => {
          return {
            country: vd.country.toString()
          }
        }
        );
        if (countries.length === 0) {
          addUniqueValues(countries, variableDataCountriesIds);
        } else {
          countries = intersectArrays(
            countries,
            variableDataCountriesIds
          );
        }
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
  const response = await getCountries(lang, countries.map((ct) => ct.country))
  return response;
}

// Function to handle country retrieval
async function getCountries(lang: any, countriesIds: string[]): Promise<any[]> {
  const country = await Country.find({ lang, _id: { $in: countriesIds } }).select("id lang name node iso");
  return country;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Connect to the database
    await connectDb();

    const { body, query } = req;
    const { filters } = body;
    const lang = query.lang || "es";
    const countries = await processFilters(filters, lang);
    return res.status(200).json({ countries });
  } catch (error) {
    // Handle errors
    console.error("Error in handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Disconnect from the database
    await disconnectDb();
  }
}
