import { FC } from 'react';
import {Box, Input} from '@chakra-ui/react';

interface IWagonSearch {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

const WagonSearch: FC<IWagonSearch> = ({ searchQuery, onSearchQueryChange }) => {
  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchQueryChange(event.target.value);
  };

  return (
      <Box>
          <Input placeholder="VagonNumber" id="search-query" value={searchQuery} onChange={handleSearchQueryChange} />
      </Box>
  );
};

export default WagonSearch;
