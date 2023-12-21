import { Schema, model, Types, Document, models } from 'mongoose';
import ThemeModel from '@/model/theme';

interface Criterion {
    name?: string;
    lang?: string;
    themes?: Types.ObjectId[];
}

interface CriterionDocument extends Criterion, Document { }

const criterionSchema = new Schema<Criterion>(
    {
        name: {
            type: String,
            required: false,
        },
        lang: {
            type: String,
            required: false,
        },
        themes: [
            {
                type: Schema.Types.ObjectId,
                ref: ThemeModel,
            },
        ],
    },
    { collection: 'criterion' }
);

const CriterionModel = models.Criterion || model<CriterionDocument>('Criterion', criterionSchema);

export default CriterionModel;
