import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import * as ExcelJS from "exceljs";
import { Request, Response } from "express";
import uploadMiddleware from "@/middleware/multer";

import { connectDb, disconnectDb } from "@/server/db";

import Country from "@/model/country";
import Criterion from "@/model/criterion";
import Theme from "@/model/theme";
import Variable from "@/model/variable";
import VariableData from "@/model/variableData";

const storage = multer.memoryStorage();

export const config = {
  api: {
    bodyParser: false, // Disable built-in bodyParser for file uploads
  },
};

interface Data {
  criterion: Record<string, any>;
  theme: Record<string, any>;
  variable: Record<string, any>;
  variableData: Record<string, any>;
  country: Record<string, any>;
}

const DEFAULT_LANG = "es";
const DATA_ROWS_START = 2;
const NOT_VALID_WORKSHEETS = ["METOD"];

function toCamelCase(str: string): string {
  // Ensure lowercase first
  str = str.toLowerCase();

  // Split the string by non-alphanumeric characters
  const words = str.split(/[^a-z0-9]+/);

  // Convert first character of each word to uppercase
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the words back together
  return words.join("");
}

function get_node_name(data: string): string {
  if (!data) return "";
  data = data.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  data = data.replace(/ /gi, "_");
  data = data.replace(/'/gi, "_");
  data = data.replace(/°/gi, "_");
  return data.toLowerCase();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      await handleFileUpload(req, res);
    } catch (error) {
      console.error("Error during file upload or data processing:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function handleFileUpload(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await uploadMiddleware(req, res);
    const lang = req.query.lang || DEFAULT_LANG;
    const data = await getExcelData(req, lang);
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error during file upload or data processing:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getExcelData(req: NextApiRequest, lang: any): Promise<Data> {
  await connectDb();
  await Country.deleteMany({});
  await Theme.deleteMany({});
  await Variable.deleteMany({});
  await VariableData.deleteMany({});
  await Criterion.deleteMany({});

  const data: Data = {
    criterion: {},
    theme: {},
    variable: {},
    variableData: {},
    country: {},
  };

  const workbook = new ExcelJS.Workbook();
  const excelFile = await workbook.xlsx.load(req.file.buffer);

  const validWorksheets = excelFile.worksheets
    .map((worksheet: any) => worksheet.name)
    .filter((sheet: string) => !NOT_VALID_WORKSHEETS.includes(sheet));

  const dataCols = {
    country: { name: 1, iso: 2, code: 3 },
    variableData: {
      code: 4,
      type: 5,
      char: { start: 9, end: 12 },
      data: 13,
      classification: 14,
      range: 15,
      measurement_unit: 16,
      main_source: 17,
      article: 18,
      last_update: 19,
      sources: [
        20, 21, 22
      ]
    },
    variable: {
      name: 7,
    },
    theme: 6,
    criterion: {
      name: 8,
    },
  };

  for (const worksheet of validWorksheets) {
    const dataChars = generateNumberArray(
      dataCols.variableData.char.start,
      dataCols.variableData.char.end
    );

    const worksheetInstance = excelFile.getWorksheet(worksheet);

    if (!worksheetInstance) {
      console.error(`Worksheet '${worksheet}' not found in the Excel file.`);
      continue; // Skip to the next iteration
    }

    await worksheetInstance.eachRow(async (row: any, rowIndex: number) => {
      if (
        rowIndex >= DATA_ROWS_START &&
        row.getCell(dataCols.country.iso).value !== null
      ) {
        const newCountry = {
          lang,
          name: getCellValue(row, dataCols.country.name),
          flag: "",
          description: "",
          node: get_node_name(getCellValue(row, dataCols.country.name)),
          iso: getCellValue(row, dataCols.country.iso),
          code: getCellValue(row, dataCols.country.code),
        };

        if (data.country[newCountry.iso] === undefined) {
          data.country = {
            ...data.country,
            [newCountry.iso]: newCountry,
          };
        }

        const newVarKey = `${worksheet}-${rowIndex}`;
        const newVariableData = {
          lang,
          char: dataChars.map((charCol) => getCellValue(row, charCol)),
          country: newCountry.iso,
          sources: dataCols.variableData.sources
            .map((source) => getCellValue(row, source))
            .filter((value) => value !== null),
          ...getOtherVariableDataFields(row, dataCols.variableData),
        };

        if (data.variableData[newVarKey] === undefined) {
          data.variableData = {
            ...data.variableData,
            [newVarKey]: newVariableData,
          };
        }

        const newVariable = {
          lang,
          name: getCellValue(row, dataCols.variable.name),
          code: toCamelCase(getCellValue(row, dataCols.variable.name)),
          variableData: {
            [newVarKey]: 1,
          },
        };

        if (data.variable[newVariable.name] === undefined) {
          data.variable[newVariable.name] = newVariable;
        } else {
          data.variable[newVariable.name].variableData = {
            ...data.variable[newVariable.name].variableData,
            [newVarKey]: 1,
          };
        }

        const newTheme = {
          lang,
          name: getCellValue(row, dataCols.theme),
          variables: {
            [newVariable.name]: 1,
          },
        };

        if (data.theme[newTheme.name] === undefined) {
          data.theme = {
            ...data.theme,
            [newTheme.name]: newTheme,
          };
        } else {
          data.theme[newTheme.name].variables = {
            ...data.theme[newTheme.name].variables,
            [newVariable.name]: 1,
          };
        }

        const newCriterion = {
          lang,
          name: getCellValue(row, dataCols.criterion.name),
          themes: {
            [newTheme.name]: 1,
          },
        };

        if (data.criterion[newCriterion.name] === undefined) {
          data.criterion = {
            ...data.criterion,
            [newCriterion.name]: newCriterion,
          };
        } else {
          data.criterion[newCriterion.name].themes = {
            ...data.criterion[newCriterion.name].themes,
            [newTheme.name]: 1,
          };
        }
      }
    });
  }

  await saveEntitiesToDb(data);
  await disconnectDb();
  return data;
}

function generateNumberArray(x: number, y: number): number[] {
  return Array.from({ length: y - x + 1 }, (_, index) => x + index);
}

function getCellValue(row: ExcelJS.Row, cell: any): any {
  const cellValue = row.getCell(cell).result || row.getCell(cell).value;

  // Check if the value is a string before applying trim
  if (typeof cellValue === "string") {
    return cellValue.trim();
  }

  return cellValue;
}

function getOtherVariableDataFields(
  row: ExcelJS.Row,
  dataCols: Record<string, any>
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(dataCols).forEach((varKey) => {
    if (!["char", "country", "sources"].includes(varKey)) {
      result[varKey] = getCellValue(row, dataCols[varKey]);
    }
  });
  return result;
}

async function saveEntitiesToDb(data: Data): Promise<void> {
  await Promise.all(
    Object.keys(data.country).map(async (key) => {
      let country = data.country[key];
      const newCountry = await Country.findOneAndUpdate(
        { iso: country.iso, lang: country.lang },
        country,
        { upsert: true, new: true, runValidators: true }
      );
      data.country[key] = newCountry;
    })
  );

  await Promise.all(
    Object.keys(data.variableData).map(async (key) => {
      const variableData = data.variableData[key];
      variableData.country = data.country[variableData.country]._id;
      const newVariableData = new VariableData(variableData);
      await newVariableData.save();
      data.variableData[key] = newVariableData;
    })
  );

  await Promise.all(
    Object.keys(data.variable).map(async (key) => {
      let variable = data.variable[key];

      variable.variableData = Object.keys(variable.variableData).map(
        (varData) => {
          return data.variableData[varData]._id;
        }
      );
      let newVariable = new Variable(variable);
      await newVariable.save();
      data.variable[key] = newVariable;
    })
  );

  await Promise.all(
    Object.keys(data.theme).map(async (key) => {
      let theme = data.theme[key];
      theme.variables = Object.keys(theme.variables).map((variable) => {
        return data.variable[variable]._id;
      });
      let newTheme = new Theme(theme);
      newTheme = await newTheme.save();
      data.theme[key] = newTheme;
    })
  );

  await Promise.all(
    Object.keys(data.criterion).map(async (key) => {
      let criterion = data.criterion[key];
      criterion.themes = Object.keys(criterion.themes).map((theme) => {
        return data.theme[theme]._id;
      });
      let newCriterion = new Criterion(criterion);
      newCriterion = await newCriterion.save();
      data.criterion[key] = newCriterion;
    })
  );
}
