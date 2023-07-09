import Home from "@/components/screens/home/Home";
import { GetServerSideProps, NextPage } from "next";
import { IWagon } from "@/interfaces/wagon.interface";
import { WagonService } from "@/service/wagon.service";

const HomePage: NextPage<{ Vagons: IWagon[] }> = ({ Vagons }) => {
  return <Home Vagons={Vagons} />;
};

export const getServerSideProps: GetServerSideProps<{ Vagons: IWagon[] }> = async () => {
  const { Vagons } = await WagonService.getAll();

  return {
    props: {
      Vagons,
    },
  };
};

export default HomePage;
