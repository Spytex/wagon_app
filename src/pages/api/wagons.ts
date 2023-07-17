import { NextApiRequest, NextApiResponse } from 'next';
import {WagonService} from "@/service/wagon.service";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = req;
    const VagonNumber = query.VagonNumber as string;

    if (!VagonNumber) {
      const wagons = await WagonService.getAll();
      return res.status(200).json(wagons);
    }

    const wagon = await WagonService.getOne(VagonNumber);

    if (!wagon) {
      return res.status(404).json({ error: 'Wagon not found' });
    }

    return res.status(200).json(wagon);
  } catch (error) {
    console.error('Error retrieving wagon:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

