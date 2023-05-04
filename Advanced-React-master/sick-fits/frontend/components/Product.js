import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import ProductListItem from './ProductListItem';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int, $first: Int) {
    allProducts(skip: $skip, first: $first) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;
const Product = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  // console.log(data, error, loading);
  if (loading) return <p>Loading.....</p>;
  if (error) return <p>`Error : ${error.message} `</p>;
  return (
    <div>
      <ProductListStyle>
        {data.allProducts.map((item) => (
          <ProductListItem key={item.id} {...item} />
        ))}
      </ProductListStyle>
    </div>
  );
};

export default Product;
