import { FC } from 'react';
import Layout from "@/components/layout/Layout";
import { IWagonDataSingle } from "@/interfaces/wagon.interface";
import { Box, Text } from "@chakra-ui/react";

const WagonSingle: FC<IWagonDataSingle> = ({ Wagon }) => {
  return (
    <Layout>
      <Box p={4} w="100%">
        {Object.entries(Wagon).map(([key, value]) => (
          <Text key={key}>
            <strong>{key}:</strong> {value.toString()}
          </Text>
        ))}
      </Box>
    </Layout>
  )
}

export default WagonSingle;