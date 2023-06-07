import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { api } from "../utils/api";
import "../styles/globals.css";
import AntdTheme from "@/layouts/AntdTheme";
import { useEffect } from "react";
import Router from "next/router";
import SEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} />
      <SessionProvider session={session}>
        <ThemeProvider>
          <AntdTheme>
            <Component {...pageProps} />
            <Toaster />
          </AntdTheme>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
