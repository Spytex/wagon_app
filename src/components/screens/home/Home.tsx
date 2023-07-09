import { FC } from 'react';
import Layout from "@/components/layout/Layout";
import {IWagonData} from "@/interfaces/wagon.interface";
import {WagonItem} from "@/components/ui/wagon/WagonItem";

const Home: FC<IWagonData> = ({Vagons}) => {
  return (
    <Layout>
        {Vagons.map(wagon => <WagonItem key={wagon.VagonNumber} Vagons={wagon}/>)}
    </Layout>
  )
}

export default Home;
