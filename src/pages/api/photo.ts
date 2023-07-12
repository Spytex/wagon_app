import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/photos");
    options.filename = () => {
      return `${req.query.VagonNumber as string}.jpg`;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const deleteFile = async (req: NextApiRequest) => {
  const { VagonNumber } = req.query;
  const filePath = path.join(process.cwd(), "public", "photos", `${VagonNumber}.jpg`);
  try {
    await fs.unlink(filePath);
  } catch (error) {
    throw new Error(`Error deleting file: ${error}`);
  }
};

const handler: NextApiHandler = async (req, res) => {
  const {method} = req;

  if (method === "DELETE") {
    try {
      await deleteFile(req);
      res.status(200).json({message: "File deleted successfully"});
    } catch (error) {
      res.status(500).json({message: error});
    }
  } else if (method === "POST") {
    try {
      await fs.readdir(path.join(process.cwd() + "/public", "/photos"));
    } catch (error) {
      await fs.mkdir(path.join(process.cwd() + "/public", "/photos"));
    }
    await readFile(req, true);
    res.json({done: "ok"});
  } else {
    res.status(405).json({ message: "Method not supported" });
  }
};

export default handler;
