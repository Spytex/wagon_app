import { FC, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { IWagonData } from '@/interfaces/wagon.interface';
import { WagonItem } from '@/components/ui/wagon/WagonItem';
import {Box, Flex, SimpleGrid, Button} from '@chakra-ui/react';
import WagonSort from '@/components/ui/wagon/WagonSort';
import WagonSearch from '@/components/ui/wagon/WagonSearch';

const Home: FC<IWagonData> = ({ Vagons }) => {
  const [sortField, setSortField] = useState<string | string[]>('VagonNumber');
  const [sortOrder, setSortOrder] = useState<string | string[]>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSortFieldChange = (value: string | string[]) => {
    setSortField(value);
  };

  const handleSortOrderChange = (value: string | string[]) => {
    setSortOrder(value);
  };

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);
  };

  const sortedVagons = Vagons.sort((a, b) => {
    let compareResult = 0;
    if (sortField === 'VagonNumber') {
      const vagonNumberA = parseInt(a.VagonNumber);
      const vagonNumberB = parseInt(b.VagonNumber);
      compareResult = vagonNumberA - vagonNumberB;
    } else if (sortField === 'DepartureStationName') {
      compareResult = a.DepartureStationName.localeCompare(b.DepartureStationName);
    }

    return sortOrder === 'asc' ? compareResult : -compareResult;
  });

  const filteredVagons = sortedVagons.filter(wagon =>
    wagon.VagonNumber.toString().includes(searchQuery)
  );

  const visibleVagons = filteredVagons.slice(0, currentPage * itemsPerPage);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Layout>
      <Flex justifyContent="center" alignItems="center" mt={4} >
      <WagonSearch searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} />
        <Box ml={4} />
      <WagonSort
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={handleSortFieldChange}
        onSortOrderChange={handleSortOrderChange}
      />
        </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={4} px={4} py={4}>
        {visibleVagons.map(wagon => (
          <WagonItem key={wagon.VagonNumber} Vagons={wagon} />
        ))}
      </SimpleGrid>
      {filteredVagons.length > currentPage * itemsPerPage && (
        <Flex justifyContent="center" mb={4}>
          <Button onClick={handleLoadMore}>Show more</Button>
        </Flex>
      )}
    </Layout>
  );
};

export default Home;
