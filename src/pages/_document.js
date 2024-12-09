import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="theme-color" content="#ffffff"/>

                <link rel="icon" type="image/svg+xml" href="/public/logov1.svg"/>


                {/* Шрифты */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />

                {/* Open Graph и Social Media */}
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="Garant Premium"/>
                <meta property="og:locale" content="ru"/>
                <meta property="og:image" content="/path-to-default-social-image.jpg"/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
