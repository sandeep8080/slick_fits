import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_CARTITEM_MUTATION = gql`
  mutation REMOVE_CARTITEM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
      quantity
    }
  }
`;

const RemoveCartItemBtn = styled.button`
  font-size: 3rem;
  border: 0;
  background: none;
  &:hover {
    cursor: pointer;
    color: var(--red);
  }
`;

// Removing from the cache [faster approach]
function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}
export default function RemoveFromCart({ cartItemId }) {
  const [deleteCartItem, { loading }] = useMutation(REMOVE_CARTITEM_MUTATION, {
    variables: { id: cartItemId },
    update,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }], // Either do this to refetch the user's cart or we can directly remove it from the cache
  });
  return (
    <RemoveCartItemBtn
      type="button"
      title="Remove this item from the Cart"
      onClick={deleteCartItem}
      disabled={loading}
    >
      &times;
    </RemoveCartItemBtn>
  );
}
