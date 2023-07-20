import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@node-redis/client';
import { HttpMethod } from '@/enums/httpMethod.enum';
import { IMiddlewareOptions } from '@/interfaces/middleware.interface';
import { Middlewares } from '@/types/middleware.type';

const client = createClient();

const redisKey = 'apiKeys';

const middlewares: Middlewares = {
  [HttpMethod.GET]: getKeys,
  [HttpMethod.POST]: postKey,
  [HttpMethod.DELETE]: deleteKey,
}



async function getKeys(options: IMiddlewareOptions) {
  const { res } = options;
  const elements = await client.sMembers(redisKey);
  res.status(200).json(elements);
}

async function postKey(options: IMiddlewareOptions) {
  const { res } = options;
  await client.sAdd(redisKey, uuidv4());
  res.status(200).end();
}

async function deleteKey(options: IMiddlewareOptions) {
  const { res, req } = options;
  const { apiKey } = req.query;
  if (typeof apiKey === 'string') {
    await client.sRem(redisKey, apiKey);
    res.status(200).end();
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!client.isOpen) {
    await client.connect();
  }

  const method = req.method as HttpMethod;

  if (!Object.keys(middlewares).includes(method)) {
    res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const middleware = middlewares[method];

  if (!middleware) {
    return res.status(500).end()
  }

  try {
    await middleware({ req, res });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res.status(500).end();
  }
}
