import './App.css'
import WebRoutes from './routes'
import { ThemeProvider } from '@material-tailwind/react';
import { ChakraProvider } from '@chakra-ui/react';

function App() {

  return (
    <ThemeProvider>
    <ChakraProvider>
        <WebRoutes/>
        </ChakraProvider>
    </ThemeProvider>

  )
}

export default App
