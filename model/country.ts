import { Schema, model, Document, models } from 'mongoose';

interface Country {
    name?: string;
    description?: string;
    node?: string;
    lang?: string;
    iso?: string;
    code?: string;
    flag?: string;
    // Add other fields as needed
}

interface CountryDocument extends Country, Document { }

const countrySchema = new Schema<Country>(
    {
        name: {
            type: String,
            required: false,
        },
        flag: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        node: {
            type: String,
            required: false,
        },
        lang: {
            type: String,
            required: false,
        },
        iso: {
            type: String,
            required: false,
        },
        code: {
            type: String,
            required: false,
        },
        // Add other fields as needed
    },
    { collection: 'countries' }
);

const CountryModel = models.Country || model<CountryDocument>('Country', countrySchema);

export default CountryModel;
