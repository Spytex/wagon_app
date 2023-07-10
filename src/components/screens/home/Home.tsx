import { FC } from 'react';
import Layout from "@/components/layout/Layout";
import {IWagonData} from "@/interfaces/wagon.interface";
import {WagonItem} from "@/components/ui/wagon/WagonItem";
import {SimpleGrid} from "@chakra-ui/react";

const Home: FC<IWagonData> = ({Vagons}) => {
  return (
    <Layout>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={4} px={4} py={4}>
        {Vagons.map(wagon => <WagonItem key={wagon.VagonNumber} Vagons={wagon}/>)}
        </SimpleGrid>
    </Layout>
  )
}

export default Home;
