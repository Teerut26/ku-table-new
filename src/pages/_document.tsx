import { useTheme } from 'next-themes'
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'

export default function Document() {
    const { theme, setTheme } = useTheme()
    useEffect(() => {
        console.log(theme)
    }, [theme])

    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
