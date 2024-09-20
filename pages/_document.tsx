import React from 'react';
import {Html, Head, Main, NextScript} from "next/document";
import {fontSans} from "app";

export default () => (
  <Html className={fontSans.variable} lang="en">
    <Head/>
    <body className={`bg-surface text-on-surface font-sans`}>
    <Main/>

    <NextScript/>
    </body>
  </Html>
);
