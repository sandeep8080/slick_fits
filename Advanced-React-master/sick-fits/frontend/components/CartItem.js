import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyle = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;
export default function CartItem({ cartItem }) {
  const { product } = cartItem;
  return (
    <CartItemStyle>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
        width="100"
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} -
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.product.price)}
          </em>
        </p>
      </div>
      <RemoveFromCart cartItemId={cartItem.id} />
    </CartItemStyle>
  );
}
