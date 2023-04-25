import { Router } from "next/router";
import { useEffect, useState } from "react";

/**
 * This hook is used to determine if the app is loading.
 * It is used to display a loading spinner when the app is loading.
 * @returns {boolean} loading
 */

function useIsAppLoading(): boolean {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = (): void => {
      console.log("start");
      setLoading(true);
    };
    const end = (): void => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return loading;
}

export default useIsAppLoading;
