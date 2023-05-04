import UpdateProduct from '../components/UpdateProduct';

export default function updatePage({ query }) {
  return <UpdateProduct id={query.id} />;
}
