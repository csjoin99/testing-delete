import multer, { Multer } from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response } from 'express'; // Import Request and Response types from Express

const storage = multer.memoryStorage();
const upload: Multer = multer({ storage });

const uploadMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>((resolve, reject) => {
        const singleUpload = upload.single('file');

        // Use express.Request and express.Response directly
        singleUpload(req as unknown as Request, res as unknown as Response, (err: any) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

export default uploadMiddleware;
