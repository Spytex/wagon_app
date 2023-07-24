import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { HttpMethod } from '@/enums/httpMethod.enum';
import { IMiddlewareOptions } from '@/interfaces/middleware.interface';
import { Middlewares } from '@/types/middleware.type';

export const config = {
  api: {
    bodyParser: false,
  },
};


const middlewares: Middlewares = {
  [HttpMethod.POST]: postPhoto,
  [HttpMethod.DELETE]: deletePhoto,
}


const readFile = async (
  req: NextApiRequest,
  saveLocally?: boolean,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const formidableOptions: formidable.Options = {};
  if (saveLocally) {
    formidableOptions.uploadDir = path.join(process.cwd(), "/public/photos");
    formidableOptions.filename = () => {
      return `${req.query.VagonNumber as string}.jpg`;
    };
  }
  formidableOptions.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(formidableOptions);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

const deleteFile = async (req: NextApiRequest) => {
  const { VagonNumber } = req.query;
  const filePath = path.join(process.cwd(), "public", "photos", `${VagonNumber}.jpg`);
  try {
    await fs.unlink(filePath);
  } catch (error) {
    throw new Error(`Error deleting file: ${error}`);
  }
}


async function postPhoto(options: IMiddlewareOptions) {
  const { res, req } = options;
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/photos"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/photos"));
  }
  await readFile(req, true);
  res.json({ done: "ok" });
}

async function deletePhoto(options: IMiddlewareOptions) {
  const { res, req } = options;
  await deleteFile(req);
  res.status(200).json({ message: "File deleted successfully" });
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method as HttpMethod;
  if (!Object.keys(middlewares).includes(method)) {
    res.setHeader('Allow', ['POST', 'DELETE']);
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
