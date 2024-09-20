import React from 'react';
import type {AppProps} from "next/app";
import {EffectorNext} from "@effector/next";
import {BaseLayout} from "widgets/layouts";

export const App = ({Component, pageProps}: AppProps) => {
  return (
    <BaseLayout>
      <EffectorNext>
        <Component {...pageProps} />
      </EffectorNext>
    </BaseLayout>
  );
};
