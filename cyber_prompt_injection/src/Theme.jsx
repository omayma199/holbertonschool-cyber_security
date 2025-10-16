import { extendTheme } from '@mui/joy/styles';

const Theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            50: '#fff8fa',
            100: '#fef0f4',
            200: '#fde0e8',
            300: '#fac0d1',
            400: '#f580a2',
            500: '#EB0045',
            600: '#760023',
            700: '#3b0012',
            800: '#1e0009',
            900: '#0f0005'
          }
        }
      },
      dark: {
        palette: {
          primary: {
            50: '#fff8fa',
            100: '#fef0f4',
            200: '#fde0e8',
            300: '#fac0d1',
            400: '#f580a2',
            500: '#EB0045',
            600: '#760023',
            700: '#3b0012',
            800: '#1e0009',
            900: '#0f0005'
          }
        }
      }
    }
});

export default Theme; 