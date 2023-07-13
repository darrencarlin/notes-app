"use client";

import store from "./state";
import { Provider } from "react-redux";

function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
