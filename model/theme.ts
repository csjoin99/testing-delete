import { Schema, model, Types, Document, models } from 'mongoose';
import VariableModel from '@/model/variable';

interface Theme {
    name?: string;
    lang?: string;
    variables?: Types.ObjectId[];
}

interface ThemeDocument extends Theme, Document { }

const themeSchema = new Schema<Theme>(
    {
        name: {
            type: String,
            required: false,
        },
        lang: {
            type: String,
            required: false,
        },
        variables: [
            {
                type: Schema.Types.ObjectId,
                ref: VariableModel,
            },
        ],
    },
    { collection: 'themes' }
);

const ThemeModel = models.Theme || model<ThemeDocument>('Theme', themeSchema);

export default ThemeModel;
