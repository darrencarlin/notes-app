import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "@/store/state";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}
