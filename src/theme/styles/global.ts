import { createGlobalStyle } from 'styled-components';

import { base, reset } from './index';

const GlobalStyles = createGlobalStyle`
    ${reset};
    ${base};
`;

export { GlobalStyles };
export default GlobalStyles;
