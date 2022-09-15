import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "../store";
import "../sass/index.scss";
import Layout from "../components/Layout";
import { createTheme, ThemeProvider } from "@mui/material";

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
      },
    },
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
