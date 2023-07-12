import { FC } from 'react';
import Layout from "@/components/layout/Layout";
import {IWagonDataSingle} from "@/interfaces/wagon.interface";
import {WagonItemSingle} from "@/components/ui/wagon/WagonItemSingle";

const Wagon: FC<IWagonDataSingle> = ({Vagons}) => {
  return (
    <Layout>
      <WagonItemSingle Vagons={Vagons} />
    </Layout>
  )
}

export default Wagon;