import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
      color: props.colorMode === 'dark' ? 'white' : 'black',
    },
    
    a: {
      color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
