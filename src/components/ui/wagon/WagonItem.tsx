import {FC} from "react";
import {IWagonDataSingle} from "@/interfaces/wagon.interface";
import {Box, Button, Flex, Link, Text} from "@chakra-ui/react";

export const WagonItem: FC<IWagonDataSingle> = ({Vagons}) => {

  return (
      <Box borderWidth={1} p={4} borderRadius="md" w="100%">
        <Flex align="center" justify="space-between">
            <Link href={`/${Vagons.VagonNumber}`}>
              <Box>
                <Text>
                  <strong>Vagon Number:</strong> {Vagons.VagonNumber}
                </Text>
                <Text>
                  <strong>Vagon Type:</strong> {Vagons.VagonType}
                </Text>
                <Text>
                  <strong>Cargo Name:</strong> {Vagons.CargoName}
                </Text>
                <Text>
                  <strong>Owner Name:</strong> {Vagons.OwnerName}
                </Text>
                <Text>
                  <strong>Departure Station:</strong> {Vagons.DepartureStationName}
                </Text>
              </Box>
            </Link>
            <Button variant="ghost">
                Add Picture
            </Button>
        </Flex>
      </Box>
  );
}
