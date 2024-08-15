import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
// import { MyContextProvider } from './MyContext'; // Ensure you import your context
import { AppContext } from './StoreContext'; // Ensure you import your context
import { BrowserRouter  } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter>

    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AppContext>

          <App />
      </AppContext>
    </ChakraProvider>
    </BrowserRouter>

  </React.StrictMode>
);
