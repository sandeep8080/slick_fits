import SingleProduct from '../../components/SingleProduct';

export default function singleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
