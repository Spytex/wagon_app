import { FC } from 'react';
import Layout from "@/components/layout/Layout";
import { IPhoto } from "@/interfaces/photo.interface";
import { SimpleGrid } from "@chakra-ui/react";
import {PhotoItem} from "@/components/ui/photo/PhotoItem";

const Photos: FC<IPhoto> = ({ dirs }) => {
  return (
    <Layout>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={4} px={4} py={4}>
          {dirs.map(item => (
              <PhotoItem key={item} dirs={item}/>
          ))}
        </SimpleGrid>
    </Layout>
  )
}

export default Photos;
