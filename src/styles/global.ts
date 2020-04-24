import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&display=swap');

* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,body,#root{
    min-height: 100%;
  }

  body {
    background: #312E38;
    color: #fff;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    font-size: 16px;
    font-family: 'Roboto Slab', serif;
  }

  button{
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 500;
  }
`;
