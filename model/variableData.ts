import { Schema, model, models } from "mongoose";
import CountryModel from "@/model/country";

interface VariableDataInterface {
  lang?: string;
  code?: any;
  type?: string;
  data?: any;
  classification?: string;
  measurement_unit?: string;
  range?: string;
  char?: string[];
  country?: Schema.Types.ObjectId | null; // Adjusted type to include null for optional property
  article?: string;
  main_source?: string;
  last_update?: any;
  sources?: [string];
}

interface VariableDataDocument extends VariableDataInterface {}

const variableDataSchema = new Schema<VariableDataInterface>(
  {
    lang: {
      type: String,
      required: false,
    },
    code: {
      type: Schema.Types.Mixed,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    data: {
      type: Schema.Types.Mixed,
      required: false,
    },
    classification: {
      type: String,
      required: false,
    },
    measurement_unit: {
      type: String,
      required: false,
    },
    range: {
      type: String,
      required: false,
    },
    char: {
      type: [String],
      required: false,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: CountryModel,
    },
    article: {
      type: String,
      required: false,
    },
    last_update: {
      type: Schema.Types.Mixed,
      required: false,
    },
    main_source: {
      type: String,
      required: false,
    },
    sources: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { collection: "variableData" }
);

const VariableDataModel =
  models.VariableData ||
  model<VariableDataDocument>("VariableData", variableDataSchema);

export default VariableDataModel;
