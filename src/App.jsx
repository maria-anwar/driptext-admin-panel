import './App.css'
import WebRoutes from './routes'
import { ThemeProvider } from '@material-tailwind/react';

function App() {

  return (
    <ThemeProvider>
        <WebRoutes/>
    </ThemeProvider>

  )
}

export default App
