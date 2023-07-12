import { FC, useState } from "react";
import Layout from "@/components/layout/Layout";
import { IPhoto } from "@/interfaces/photo.interface";
import {SimpleGrid, Button, Flex, Box} from "@chakra-ui/react";
import { PhotoItem } from "@/components/ui/photo/PhotoItem";
import PhotoSort  from "@/components/ui/photo/PhotoSort";
import PhotoSearch  from "@/components/ui/wagon/WagonSearch";

const Photos: FC<IPhoto> = ({ dirs }) => {
  const [sortField, setSortField] = useState<string | string[]>('VagonNumber');
  const [sortOrder, setSortOrder] = useState<string | string[]>('asc');
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  const filteredDirs = dirs.filter((dir) =>
    dir.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedDirs = filteredDirs.sort((a, b) => {
    if (sortField === "VagonNumber") {
      return sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a);
    } else {
      return 0;
    }
  });

  const visibleDirs = sortedDirs.slice(0, currentPage * itemsPerPage);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Layout>
      <Flex justifyContent="center" alignItems="center" mt={4}>
        <PhotoSearch
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
        />
        <Box ml={4} />
        <PhotoSort
          sortField={sortField}
          sortOrder={sortOrder}
          onSortFieldChange={handleSortFieldChange}
          onSortOrderChange={handleSortOrderChange}
        />
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={4} px={4} py={4}>
        {visibleDirs.map((dir) => (
            <PhotoItem key={dir} dirs={dir} />
        ))}
      </SimpleGrid>
      {filteredDirs.length > currentPage * itemsPerPage && (
        <Flex justifyContent="center" mb={4}>
          <Button onClick={handleLoadMore}>Show more</Button>
        </Flex>
      )}
    </Layout>
  );
};

export default Photos;
