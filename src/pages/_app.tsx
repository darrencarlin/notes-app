import { persistor, store } from "@/store/state";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
