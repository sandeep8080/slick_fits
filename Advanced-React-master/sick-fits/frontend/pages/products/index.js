import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Product from '../../components/Product';

const ProductsPage = () => {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      <Pagination page={page || 1} />
      <Product page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
};

export default ProductsPage;
