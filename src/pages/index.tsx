import Home from "@/components/screens/home/Home";
import { GetServerSideProps, NextPage } from "next";
import { IWagonData } from "@/interfaces/wagon.interface";
import { WagonService } from "@/service/wagon.service";

const HomePage: NextPage<IWagonData> = ({ Vagons }) => {
  return <Home Vagons={Vagons} />;
};

export const getServerSideProps: GetServerSideProps<IWagonData> = async () => {
  const { Vagons } = await WagonService.getAll();

  return {
    props: {
      Vagons,
    },
  };
};

export default HomePage;
