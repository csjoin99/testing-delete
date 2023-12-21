import { Schema, model, Types, Document, models } from 'mongoose';
import VariableDataModel from '@/model/variableData';

interface Variable {
    lang?: string;
    name?: string;
    code?: string;
    variableData?: Types.ObjectId[];
}

interface VariableDocument extends Variable, Document { }

const variableSchema = new Schema<Variable>(
    {
        lang: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        code: {
            type: String,
            required: false,
        },
        variableData: [
            {
                type: Schema.Types.ObjectId,
                ref: VariableDataModel,
            },
        ],
    },
    { collection: 'variable' }
);

const VariableModel = models.Variable || model<VariableDocument>('Variable', variableSchema);

export default VariableModel;
