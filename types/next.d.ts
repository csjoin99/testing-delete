import { NextApiRequest } from 'next';
import { ParsedQs } from 'qs';

declare module 'next' {
    interface NextApiRequest {
        file: {
            buffer: Buffer;
            encoding: string;
            fieldname: string;
            mimetype: string;
            originalname: string;
            size: number;
        };
    }
}
