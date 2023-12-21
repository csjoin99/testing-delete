import { Schema, model, Types, Document, models } from 'mongoose';
import CountryModel from '@/model/country';

interface SubRegion {
    name?: string;
    code?: string;
    lang?: string;
    countries?: Types.ObjectId[];
    // Add other fields as needed
}

interface SubRegionDocument extends SubRegion, Document { }

const subRegionSchema = new Schema<SubRegion>(
    {
        name: {
            type: String,
            required: false,
        },
        code: {
            type: String,
            required: false,
        },
        lang: {
            type: String,
            required: false,
        },
        countries: [
            {
                type: Schema.Types.ObjectId,
                ref: CountryModel,
            },
        ],
        // Add other fields as needed
    },
    { collection: 'subregion' }
);

const SubRegionModel = models.SubRegion || model<SubRegionDocument>('SubRegion', subRegionSchema);

export default SubRegionModel;
