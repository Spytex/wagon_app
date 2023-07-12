import { FC } from "react";
import {Box, Button, Flex, Icon, IconButton, Image, Text} from "@chakra-ui/react";
import { IPhotoSingle } from "@/interfaces/photo.interface";
import { PhotoService } from "@/service/photo.service";
import { DeleteIcon } from "@chakra-ui/icons";

export const PhotoItem: FC<IPhotoSingle> = ({ dirs }) => {
  const fileName = dirs.split(".")[0];

  const handleFileDelete = async () => {
    try {
      await PhotoService.deletePhoto(fileName);
      console.log("File deleted:", fileName);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting file:", fileName, error);
    }
  };

  return (
    <Box key={dirs} borderWidth={1} p={4} borderRadius="md">
      <Flex direction="column" align="center">
        <Image src={"/photos/" + dirs} alt={fileName} maxW="200px" maxH="200px" />
        <Text>{fileName}</Text>
        <IconButton
            onClick={handleFileDelete}
            icon={<DeleteIcon />}
            aria-label="Delete">
        </IconButton>
      </Flex>
    </Box>
  );
};
