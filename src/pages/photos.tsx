import Photos from "@/components/screens/photos/Photos";
import {GetServerSideProps, NextPage} from "next";
import fs from "fs/promises";
import path from "path";
import {IPhoto} from "@/interfaces/photo.interface";

const PhotosPage: NextPage<IPhoto> = ({ dirs}) => {
  return <Photos dirs={dirs}/>
}


export const getServerSideProps: GetServerSideProps = async () => {
  const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), "/public/photos"));
    props.dirs = dirs as any;
    return { props };
  } catch (error) {
    return { props };
  }
};

export default PhotosPage;
