import styled, { createGlobalStyle } from 'styled-components';
import HeaderBar from './Header';

// Createing Global Styles for the application

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'radnika_next';
  src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
html {
  --red: #ff0000;
  --black: #393939;
  --grey: #3A3A3A;
  --gray: var(--grey);
  --lightGrey: #e1e1e1;
  --lightGray: var(--lightGrey);
  --offWhite: #ededed;
  --maxWidth: 1000px;
  --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
  box-sizing: border-box;
  font-size: 10px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

a{
  text-decoration:none;
  color:var(--black);
}
a:hover{
  text-decoration:underline;
}

body {
  font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
               Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  line-height:2;
}
button{
  font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', 
                Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

// Styling for {Children}
const InnerStyles = styled.div`
  margin: 0 auto;
  max-width: var(--max-width);
  padding: 2rem;
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <HeaderBar />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}
