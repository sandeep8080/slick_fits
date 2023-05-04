import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import DisplayError from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

export const ALL_PRODUCT_COUNT_QUERY = gql`
  query ALL_PRODUCT_COUNT_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(ALL_PRODUCT_COUNT_QUERY);
  if (loading) return <p>Loading ... </p>;
  if (error) return <DisplayError error={error} />;
  // console.log(data);

  const { count } = data._allProductsMeta;
  const totalPages = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits | Page {page} of {totalPages}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>- Prev</a>
      </Link>
      <p>
        Page {page} of {totalPages}
      </p>
      <p> {count} Total Items</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= totalPages}>Next -</a>
      </Link>
    </PaginationStyles>
  );
}
