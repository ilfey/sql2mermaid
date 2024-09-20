import React from 'react';
import {Seo} from './seo';

type Props = {
  children: React.ReactNode
}

export const BaseLayout = ({children}: Props) => {
  return (
    <>
      <Seo/>
      <div className="">
        <main className="p-4 xl:p-0 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </>
  );
};
