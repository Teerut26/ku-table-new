import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
               <script defer src="https://eu.umami.is/script.js" data-website-id="81607876-b154-4ac9-aaf1-062fb84ff756"></script>
               <script async src="https://umami.teerut.me/script.js" data-website-id="8c1f071c-63e3-4562-8b89-af9ed10e13d5"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
