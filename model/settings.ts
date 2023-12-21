import { Schema, model, Document, models } from "mongoose";

interface Settings {
    clasification?: any;
}

interface SettingsDocument extends Settings, Document { }

const SettingsSchema = new Schema<Settings>(
    {
        clasification: {
            type: Schema.Types.Mixed,
            required: false,
        },
        // Add other fields as needed
    },
    { collection: "settings" }
);

const SettingsModel =
    models.Settings || model<SettingsDocument>("Settings", SettingsSchema);

export default SettingsModel;
