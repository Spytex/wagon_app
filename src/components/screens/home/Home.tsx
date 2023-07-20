import { FC, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { IWagonData } from '@/interfaces/wagon.interface';
import { WagonItem } from '@/components/ui/wagon/WagonItem';
import { Box, Flex, SimpleGrid, Button } from '@chakra-ui/react';
import WagonSort from '@/components/ui/wagon/WagonSort';
import WagonSearch from '@/components/ui/wagon/WagonSearch';

const Home: FC<IWagonData> = ({ Vagons }) => {
  const [sortField, setSortField] = useState<string | string[]>('VagonNumber');
  const [sortOrder, setSortOrder] = useState<string | string[]>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);


  const sortedWagons = Vagons.sort((a, b) => {
    let compareResult = 0;
    if (sortField === 'VagonNumber') {
      const wagonNumberA = parseInt(a.VagonNumber);
      const wagonNumberB = parseInt(b.VagonNumber);
      compareResult = wagonNumberA - wagonNumberB;
    } else if (sortField === 'DepartureStationName') {
      compareResult = a.DepartureStationName.localeCompare(b.DepartureStationName);
    }

    return sortOrder === 'asc' ? compareResult : -compareResult;
  });

  const filteredWagons = sortedWagons.filter(wagon =>
    wagon.VagonNumber.toString().includes(searchQuery)
  );

  const visibleWagons = filteredWagons.slice(0, currentPage * itemsPerPage);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Layout>
      <Flex justifyContent="center" alignItems="center" mt={4}>
        <WagonSearch searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
        <Box ml={4} />
        <WagonSort
          sortField={sortField}
          sortOrder={sortOrder}
          onSortFieldChange={setSortField}
          onSortOrderChange={setSortOrder}
        />
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={4} px={4} py={4}>
        {visibleWagons.map(wagon => (
          <WagonItem key={wagon.VagonNumber} Wagon={wagon} />
        ))}
      </SimpleGrid>
      {filteredWagons.length > currentPage * itemsPerPage && (
        <Flex justifyContent="center" mb={4}>
          <Button onClick={handleLoadMore}>Show more</Button>
        </Flex>
      )}
    </Layout>
  );
};

export default Home;
