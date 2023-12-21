import { NextApiRequest, NextApiResponse } from "next";
import { connectDb, disconnectDb } from "@/server/db";
import ObservatoryInfo from "@/model/observatoryInfo";
import SubRegion from "@/model/subregion";
import Country from "@/model/country";
import VariableData from "@/model/variableData";
import Criterion from "@/model/criterion";
import Theme from "@/model/theme";
import Variable from "@/model/variable";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDb();
    try {
        const lang = req.query.lang || 'es';
        const { country: iso, page = 1, pageSize = 11 } = req.query;

        const query = {
            lang,
            ...(iso ? { iso } : {}),
        };

        const countries = await Country.find(query);

        // Calculate pagination parameters
        const currentPage = parseInt(page as string, 10);
        const limit = parseInt(pageSize as string, 10);
        const skip = (currentPage - 1) * limit;

        const variableData = await VariableData.find({
            country: {
                $in: countries.map((country: any) => country._id),
            },
        })
            .populate('country')
            .limit(limit)
            .skip(skip)
            .sort({ 'country.name': 1 });

        return res.status(200).json({
            data: variableData,
            pagination: {
                currentPage,
                pageSize: limit,
                totalItems: variableData.length, // You might want to fetch the total count from the database
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await disconnectDb();
    }
}
