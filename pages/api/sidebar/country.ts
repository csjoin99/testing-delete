import { NextApiRequest, NextApiResponse } from "next";
import { connectDb, disconnectDb } from "@/server/db";
import Country from "@/model/country";
import VariableData from "@/model/variableData";
import Variable from "@/model/variable";
import Settings from "@/model/settings";
import Criterion from "@/model/criterion";
import Theme from "@/model/theme";

type Filter = {
  variable: string;
  index: number;
  value: string;
};

type GroupedFilters = {
  [variable: string]: Omit<Filter, "variable">[];
};

function groupFiltersByVariable(filters: Filter[]): GroupedFilters {
  return filters.reduce((grouped: GroupedFilters, filter: Filter) => {
    const { variable, ...rest } = filter;

    if (!grouped[variable]) {
      grouped[variable] = [];
    }

    Object.keys(rest).length && grouped[variable].push(rest);

    return grouped;
  }, {});
}

function addUniqueValues(targetArray: any[], sourceArray: any[]): void {
  const existingCountries = new Set(targetArray.map((obj) => obj.country));

  for (const sourceObj of sourceArray) {
    if (!existingCountries.has(sourceObj.country)) {
      targetArray.push(sourceObj);
      existingCountries.add(sourceObj.country);
    }
  }
}

// Helper function to find the intersection of two arrays
function intersectArrays(array1: any[], array2: any[]): any[] {
  const countrySet2 = new Set(array2.map((obj) => obj.country));
  return array1.filter((obj) => countrySet2.has(obj.country));
}

async function processFilters(filters: Filter[], lang: string) {
  const groupedFilters = groupFiltersByVariable(filters);
  let countries: any[] = [];
  /*  */
  let dataList: { [key: string]: any } = {};
  /*  */
  await Promise.all(
    Object.entries(groupedFilters).map(async ([key, group]) => {
      const variable = await Variable.findOne({ lang, code: key });
      const theme = await Theme.findOne({ lang, variables: variable._id });
      const criterion = await Criterion.findOne({
        lang,
        themes: theme._id,
      });
      const query: any = {
        lang,
        _id: { $in: variable.variableData },
      };

      group.forEach((filter) => {
        query[`char.${filter.index}`] = filter.value;
      });

      const variablesData = await VariableData.find(query);

      if (variablesData.length) {
        const variableDataCountriesIds = variablesData.map((vd: any) => {
          /*  */
          function getRandomColor(): string {
            const randomHexValue = () =>
              Math.floor(Math.random() * 256)
                .toString(16)
                .padStart(2, "0");
            const red = randomHexValue();
            const green = randomHexValue();
            const blue = randomHexValue();

            return `#${red}${green}${blue}`;
          }
          if (dataList[vd.data] == undefined) {
            dataList[vd.data] = getRandomColor();
          }
          /*  */
          return {
            country: vd.country.toString(),
            criterion: criterion.name,
            query,
            variable: `${variable.name}${group.length ? ": " : ""}${group
              .map((item) => item.value)
              .join(", ")}`,
          };
        });
        if (countries.length === 0) {
          addUniqueValues(countries, variableDataCountriesIds);
        } else {
          countries = intersectArrays(countries, variableDataCountriesIds);
        }
      }
    })
  );
  return await getCountries(lang, countries, dataList);
}

async function getCountries(lang: string, countries: any[], temp: any) {
  const countryPromises = countries.map(async (countryItem) => {
    const { country, criterion, query, ...rest } = countryItem;
    const countryResp = await Country.findOne({ lang, _id: country })
      .select("id lang name node iso flag range")
      .lean();
    const { clasification: colors } = await Settings.findOne({});
    const variablesData = await VariableData.find({
      ...query,
      country: country,
    });

    const rangeSet = new Set<string>();
    const dataSet = new Set<string>();

    const quantitativeDataNames = ["Datos cuantitativos"];

    variablesData.forEach((vd: any) => {
      const classificationData = `${vd.classification}_${
        vd.type == "Estadística" ? vd.range : vd.data
      }`;
      /* if (quantitativeDataNames.includes(criterion)) {
        if (["Relativo"].includes(vd.measurement_unit)) {
          rangeSet.add(classificationData);
        }
      } else {
        rangeSet.add(classificationData);
      } */
      rangeSet.add(classificationData);
      const notValidMeasurementUnitVariable = ["Booleano"];
      const dataInfo = `${vd.data}${
        notValidMeasurementUnitVariable.includes(vd.measurement_unit)
          ? ""
          : ` (${vd.measurement_unit})`
      }`;
      dataSet.add(dataInfo);
    });
    const range = Array.from(rangeSet).map((r) => {
      const [classification, data] = r.split("_");
      return {
        color:
          (classification == "NA" ? temp[data] : colors[classification]) ||
          "#000000",
        data,
      };
    });
    const data = Array.from(dataSet);

    return {
      ...countryResp,
      ...rest,
      range,
      data,
    };
  });

  return await Promise.all(countryPromises);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await connectDb();

    const { body, query } = req;
    const { filters } = body;
    const lang: string = (query.lang || "es") as string;

    const countries = await processFilters(filters, lang);

    res.status(200).json({ countries });
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await disconnectDb();
  }
}
