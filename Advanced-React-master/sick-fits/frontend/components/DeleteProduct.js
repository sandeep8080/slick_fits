import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { ALL_PRODUCTS_QUERY } from './Product';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// Function to Remove the deleted record from the cache
function update(cache, payload) {
  console.log(payload);
  /**
   * First we have to identify the item in cache using cache.identify()
   * Second the evict the item from the cache
   */
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  /**
   * Here the Problem is that Once we delete the Item it is deleted from the DataBase but not from the UI,So 2 ways to accomplish that
   * 1. Refetching the data by using Query
   * 2. Using Evict API (from Apollo Client) -- Basicaically the Idea is to remove the deleted object from the cache
   * and when you changed the cache the React will notice and re-render the page
   */
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      // refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        if (confirm('Are you sure you want to Delete this product')) {
          const res = await deleteProduct().catch(console.log(error));
          // console.log(res);
          console.log('Product Deleted!!');
        }
      }}
    >
      {children}
    </button>
  );
}
