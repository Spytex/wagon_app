import {NextApiRequest, NextApiResponse} from 'next';
import {v4 as uuidv4} from 'uuid';
import {createClient} from '@node-redis/client';

const client = createClient();

const redisKey = 'apiKeys';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!client.isOpen) {
    await client.connect();
  }

  if (req.method === 'POST') {
    await client.sAdd(redisKey, uuidv4());
    res.status(200).end();

  } else if (req.method === 'GET') {
    const elements = await client.sMembers(redisKey);
    res.status(200).json(elements);
  } else if (req.method === 'DELETE') {
    const {apiKey} = req.query;
    if (typeof apiKey === 'string') {
      await client.sRem(redisKey, apiKey);
      res.status(200).end();

    } else {
      res.status(400).json({message: 'Invalid request'});
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
