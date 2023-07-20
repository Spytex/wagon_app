import {FC, useEffect, useState} from 'react';
import Layout from '@/components/layout/Layout';
import {Box, Button, Center, Container, Divider, Flex, IconButton, Text, VStack} from '@chakra-ui/react';
import {DeleteIcon} from '@chakra-ui/icons';
import {KeyService} from "@/service/key.service";

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
            <Divider orientation="horizontal" py={2}/>
            <VStack py={4}>
              {apiKeys.map((apiKey, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <Text>{apiKey}</Text>
                  <IconButton
                    ml={2}
                    icon={<DeleteIcon/>}
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

export default Dashboard;
