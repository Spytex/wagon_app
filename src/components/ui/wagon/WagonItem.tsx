import { FC, useRef, useState } from "react";
import { IWagonDataSingle } from "@/interfaces/wagon.interface";
import {Box, Button, Center, Flex, Link, Text, useToast, VStack} from "@chakra-ui/react";
import { PhotoService } from "@/service/photo.service";
import QRCode from "qrcode.react";
import Barcode from "react-barcode";

export const WagonItem: FC<IWagonDataSingle> = ({ Vagons }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [showQRCode, setShowQRCode] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);

  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("myImage", file);
        const response = await PhotoService.uploadPhoto(Vagons.VagonNumber, formData);
        console.log("File uploaded:", response.data);
        toast({
          position: "bottom-right",
          title: "File uploaded successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error: any) {
        console.error("File upload error:", error.response?.data);
        toast({
          title: "File upload error.",
          description: error.response?.data,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleShowQRCode = () => {
    setShowQRCode(!showQRCode);
    setShowBarcode(false);
  };

  const handleShowBarcode = () => {
    setShowBarcode(!showBarcode);
    setShowQRCode(false);
  };

  return (
    <Box borderWidth={1} p={4} borderRadius="md" w="100%">
      <Flex align="center" justify="space-between" >
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
        <VStack>
          <Button variant="ghost" onClick={handleShowQRCode}>
            {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
          </Button>
          <Button variant="ghost" onClick={handleShowBarcode}>
            {showBarcode ? 'Hide Barcode' : 'Show Barcode'}
          </Button>
          <Button variant="ghost" onClick={handleFileInputChange}>
            Add Picture
          </Button>
        </VStack>

      </Flex>
      {showQRCode && (
        <Center mt={4}>
          <QRCode value={Vagons.VagonNumber} />
        </Center>
      )}
      {showBarcode && (
        <Center mt={4} textAlign="center">
          <Barcode value={Vagons.VagonNumber.toString().padStart(12, "0")} format="EAN13" />
        </Center>
      )}
      <input type="file" accept="image/*" ref={fileInputRef} hidden onChange={handleFileUpload} />
    </Box>
  );
};
