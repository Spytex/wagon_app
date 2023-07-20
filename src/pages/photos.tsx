import Photos from "@/components/screens/photos/Photos";
import { GetServerSideProps, NextPage } from "next";
import fs from "fs/promises";
import path from "path";
import { IPhoto } from "@/interfaces/photo.interface";

const PhotosPage: NextPage<IPhoto> = ({ photoPaths }) => {
  return <Photos photoPaths={photoPaths} />
}


export const getServerSideProps: GetServerSideProps = async () => {
  const props = { photoPaths: [] };
  try {
    const photoPaths = await fs.readdir(path.join(process.cwd(), "/public/photos"));
    props.photoPaths = photoPaths as any;
    return { props };
  } catch (error) {
    return { props };
  }
};

export default PhotosPage;
