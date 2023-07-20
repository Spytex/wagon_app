import { NextApiRequest, NextApiResponse } from 'next';

export interface IMiddlewareOptions {
    req: NextApiRequest;
    res: NextApiResponse;
}
