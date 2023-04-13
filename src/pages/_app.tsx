import { persistor, store } from "@/store/state";
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}
