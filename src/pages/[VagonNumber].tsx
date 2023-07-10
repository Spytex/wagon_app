import { FC } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {IWagonDataSingle} from '@/interfaces/wagon.interface';
import { WagonService } from '@/service/wagon.service';
import Wagon from "@/components/screens/wagon/Wagon";

const WagonPage: FC<IWagonDataSingle> = ({ Vagons }) => {
  return <Wagon Vagons={Vagons} />;
};

export const getServerSideProps: GetServerSideProps<IWagonDataSingle> = async (context) => {
  const { VagonNumber } = context.query;

  try {
    const allWagons = await WagonService.getAll();
    const Vagons = allWagons.Vagons.find((Vagons) => Vagons.VagonNumber === VagonNumber);

    if (Vagons) {
      return {
        props: {
          Vagons,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default WagonPage;