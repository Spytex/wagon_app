import {FC} from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {IWagonDataSingle} from '@/interfaces/wagon.interface';
import {WagonService} from '@/service/wagon.service';
import WagonSingle from "@/components/screens/wagon/WagonSingle";

const WagonPage: FC<IWagonDataSingle> = ({Wagon}) => {
  return <WagonSingle Wagon={Wagon}/>;
};

export const getServerSideProps: GetServerSideProps<IWagonDataSingle> = async (context) => {
  const {VagonNumber} = context.query;

  try {
    const Wagon = await WagonService.getOne(VagonNumber as string);

    if (Wagon) {
      return {
        props: {
          Wagon,
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
