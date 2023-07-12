import { FC } from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Icon,
  Flex
} from '@chakra-ui/react';
import {FaSort} from "react-icons/fa";

interface IWagonSort {
  sortField: string | string[];
  sortOrder: string | string[];
  onSortFieldChange: (value: string | string[]) => void;
  onSortOrderChange: (value: string | string[]) => void;
}

const WagonSort: FC<IWagonSort> = ({
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
}) => {
  const handleSortFieldChange = (value: string | string[]) => {
    onSortFieldChange(value);
  };

  const handleSortOrderChange = (value: string | string[]) => {
    onSortOrderChange(value);
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button}>
        <Flex alignItems="center">
          <Icon as={FaSort} />
        </Flex>
      </MenuButton>
      <MenuList minWidth='240px'>
        <MenuOptionGroup defaultValue={sortField} title='Sort By' type='radio' onChange={handleSortFieldChange}>
          <MenuItemOption value='VagonNumber'>VagonNumber</MenuItemOption>
          <MenuItemOption value='DepartureStationName'>DepartureStationName</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup defaultValue={sortOrder} title='Order' type='radio' onChange={handleSortOrderChange}>
          <MenuItemOption value='asc'>Ascending</MenuItemOption>
          <MenuItemOption value='desc'>Descending</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default WagonSort;
