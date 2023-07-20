import { NextApiRequest, NextApiResponse } from 'next';
import { WagonService } from '@/service/wagon.service';
import { createClient } from "@node-redis/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { query } = req;
        const apiKey = query.apiKey as string;
        const redisKey = 'apiKeys';

        const client = createClient();

        if (!client.isOpen) {
            await client.connect();
        }

        const validation = await client.sIsMember(redisKey, apiKey);

        if (!apiKey || !validation) {
            return res.status(401).json({ error: 'Invalid API key' });
        }

        const wagons = await WagonService.getAll();
        return res.status(200).json(wagons);

    } catch (error) {
        console.error('Error retrieving wagon:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
