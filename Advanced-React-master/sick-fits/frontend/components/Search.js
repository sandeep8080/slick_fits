import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift'; // # 3rd party library to handle serach inputs & keyboard binding
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCT_QUERY = gql`
  query SEARCH_PRODUCT_QUERY($searchTerm: String!) {
    searchItems: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Serach() {
  const router = useRouter();
  const [findItem, { data, error, loading }] = useLazyQuery(
    SEARCH_PRODUCT_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchItems || [];
  const findItemDebounce = debounce(findItem, 350);
  resetIdCounter();
  const {
    isOpen, // to handle open and closing of combobox when we click outside
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps, // Used for the functionality of downshift
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemDebounce({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push(`/product/${selectedItem.id}`);
    },
    itemToString: (item) => item?.name || '',
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={index}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry! No item found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
