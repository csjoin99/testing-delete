import { Schema, model, Document, models } from "mongoose";

interface ObservatoryInfo {
  lang?: string;
  title?: string;
  content?: string;
  img?: string;
  smallImg?: string;
  // Add other fields as needed
}

interface ObservatoryInfoDocument extends ObservatoryInfo, Document {}

const ObservatoryInfoSchema = new Schema<ObservatoryInfo>(
  {
    lang: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
    smallImg: {
      type: String,
      required: false,
    },
    // Add other fields as needed
  },
  { collection: "observatoryInfo" }
);

const ObservatoryInfoModel =
  models.ObservatoryInfo || model<ObservatoryInfoDocument>("ObservatoryInfo", ObservatoryInfoSchema);

export default ObservatoryInfoModel;
