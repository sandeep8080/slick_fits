import Link from 'next/link';
import styled from 'styled-components';
import Cart from './Cart';
import NavBar from './Nav';
import Serach from './Search';

const Logo = styled.h1`
  position: relative;
  font-size: 4rem;
  margin-left: 2rem;
  z-index: 2;
  transform: skew(-7deg);
  background: red;
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: strech;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

export default function HeaderBar() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Sick Fits</Link>
        </Logo>
        <NavBar />
      </div>
      <div className="sub-bar">
        <Serach />
        <Cart />
      </div>
    </HeaderStyles>
  );
}
