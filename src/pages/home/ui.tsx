import React from 'react';
import {useGate, useUnit} from "effector-react";
import {homeModel} from "pages/home/model";

export const HomePage = () => {
  useGate(homeModel.HomeGate)

  const {
    onSourceChange,
    onConvert,
    $source,
    $pending,
    $mermaid,
  } = useUnit({
    onSourceChange: homeModel.onSourceChange,
    onConvert: homeModel.onConvert,
    $pending: homeModel.$pending,
    $source: homeModel.$source,
    $mermaid: homeModel.$mermaid,
  })

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl my-4 text-center">SQL to mermaid converter</h1>
      <div className="flex flex-col gap-4 grow">
        {/* Header */}
        <div className="flex">
          <div className="grow">
            <h2 className="text-xl text-center">SQL Schema</h2>
          </div>
          <div className="">
            <button className="py-2 px-3 rounded-md text-md bg-primary hover:bg-primary-700 transition"
                    disabled={$pending}
                    onClick={onConvert}>
              {$pending ? "Converting..." : "Convert"}
            </button>
          </div>
          <div className="grow">
            <h2 className="text-xl text-center">Mermaid</h2>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 gap-4">
          {/* Source */}
          <div className="">
          <textarea
            className="w-full border border-outline rounded-md outline-none p-4 bg-neutral-900"
            value={$source}
            placeholder="Paste your SQL schema here..."
            onChange={e => onSourceChange(e.target.value)}
            cols={30}
            rows={10}/>
          </div>

          {/* Mermaid */}

          <div className="">
            <pre className="p-4 border border-outline rounded-md bg-neutral-900">
              <code>
                {$mermaid}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
