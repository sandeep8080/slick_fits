import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import TitleStyle from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCartBtn from './AddToCartBtn';

const ProductListItem = ({ name, photo, price, description, id }) => (
  <ItemStyles>
    <img src={photo.image.publicUrlTransformed} alt={name} />
    <TitleStyle>
      <Link href={`/product/${id}`}>{name}</Link>
    </TitleStyle>
    <PriceTag>{formatMoney(price)}</PriceTag>
    <p>{description}</p>
    <div className="buttonList">
      <Link
        href={{
          pathname: '/update/',
          query: {
            id,
          },
        }}
      >
        Edit
      </Link>
      <AddToCartBtn id={id} />
      <DeleteProduct id={id}>Delete</DeleteProduct>
    </div>
  </ItemStyles>
);
export default ProductListItem;
