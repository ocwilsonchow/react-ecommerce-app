import { ColorModeScript } from '@chakra-ui/react';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App';
import Routing from './layouts/Routing';


ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <Routing />
  </StrictMode>,

  document.getElementById('root')
);
