import { FC, useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Box, Button, Center, Container, Divider, Flex, IconButton, Input, InputGroup, InputRightAddon, Text, VStack, useClipboard } from '@chakra-ui/react';
import { DeleteIcon, CopyIcon, CheckIcon } from '@chakra-ui/icons';
import { KeyService } from "@/service/key.service";

const Dashboard: FC = () => {
  const [apiKeys, setApiKeys] = useState<string[]>([]);

  const handleCreateApiKey = async () => {
    await KeyService.postApiKey()
    await fetchData();
  };

  const handleDeleteApiKey = async (key: string) => {
    await KeyService.deleteApiKey(key)
    await fetchData();
  };

  const fetchData = async () => {
    try {
      const data = await KeyService.getApiKeys();
      setApiKeys(data);
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Container maxWidth="4xl">
        <Flex p={4}>
          <Box borderWidth={1} p={4} borderRadius="md" w="100%">
            <Center>
              <Button onClick={handleCreateApiKey}>Create API Key</Button>
            </Center>
            <Divider orientation="horizontal" py={2} ml={-4} px={4} />
            <VStack mt={4}>
              {apiKeys.map((apiKey, index) => (
                <Box key={index} display="flex" alignItems="center" w="100%">
                  <InputWithClipboard apiKey={apiKey} />
                  <IconButton
                    ml={2}
                    icon={<DeleteIcon />}
                    aria-label="Delete"
                    onClick={() => handleDeleteApiKey(apiKey)}
                  ></IconButton>
                </Box>
              ))}
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};


const InputWithClipboard: FC<{ apiKey: string }> = ({ apiKey }) => {
  const { onCopy, hasCopied } = useClipboard(apiKey);

  return (
    <InputGroup>
      <Input value={apiKey} isReadOnly />
      <InputRightAddon >
        <IconButton
          variant="ghost"
          onClick={onCopy}
          icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
          aria-label={hasCopied ? "Copied" : "Copy"}
        />
      </InputRightAddon>
    </InputGroup>
  );
};


export default Dashboard;
