import "./App.css";
import WebRoutes from "./routes";
import { ThemeProvider } from "@material-tailwind/react";
import { ChakraProvider } from "@chakra-ui/react";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <ChakraProvider>
            <WebRoutes />
          </ChakraProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
