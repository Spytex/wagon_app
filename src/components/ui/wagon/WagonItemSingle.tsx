import {FC} from "react";
import {IWagonDataSingle} from "@/interfaces/wagon.interface";
import {Box, Text} from "@chakra-ui/react";

export const WagonItemSingle: FC<IWagonDataSingle> = ({Vagons}) => {

  return (
    <Box p={4} w="100%">
      {Object.entries(Vagons).map(([key, value]) => (
        <Text key={key}>
          <strong>{key}:</strong> {value.toString()}
        </Text>
      ))}
    </Box>
  );
}
