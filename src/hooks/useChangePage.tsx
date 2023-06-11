import React, { useEffect, useState } from "react";
import Router from "next/router";

export default function useChangePage() {
  const [isChanging, setIsChanging] = useState(false);
  useEffect(() => {
    const handleRouteStart = () => setIsChanging(true);
    const handleRouteDone = () => setIsChanging(false);

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return { isChanging };
}
