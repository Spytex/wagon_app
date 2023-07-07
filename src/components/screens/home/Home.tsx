import { FC } from 'react';
import {Inter} from "next/font/google";
import Layout from "@/components/layout/Layout";

const inter = Inter({ subsets: ['latin'] })
const Home: FC = () => {
  return (
    <Layout>
      <main>
        123
      </main>
    </Layout>
  )
}

export default Home;