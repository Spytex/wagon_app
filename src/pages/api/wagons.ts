import { NextApiRequest, NextApiResponse } from 'next';
import { WagonService } from '@/service/wagon.service';
import getUuidByString  from 'uuid-by-string';

const wordID = 'WagonInfo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = req;
    const apiKey = query.apiKey as string;

    // Validate the apiKey (UUID v5)
    if (!apiKey || !validateUuid(apiKey)) {
      return res.status(400).json({ error: 'Invalid API key' });
    }

    const wagonNumber = query.VagonNumber as string;

    if (!wagonNumber) {
      const wagons = await WagonService.getAll();
      return res.status(200).json(wagons);
    }

    const wagon = await WagonService.getOne(wagonNumber);

    if (!wagon) {
      return res.status(404).json({ error: 'Wagon not found' });
    }

    return res.status(200).json(wagon);
  } catch (error) {
    console.error('Error retrieving wagon:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function validateUuid(uuid: string): boolean {
  return getUuidByString(wordID) === uuid;
}
