import React from 'react';
import {useGate, useUnit} from "effector-react";
import {homeModel} from "pages/home/model";

export const HomePage = () => {
  useGate(homeModel.HomeGate)

  const {$count, increment, decrement} = useUnit({
    $count: homeModel.$count,
    increment: homeModel.increment,
    decrement: homeModel.decrement,
  })

  return (
    <div className="">
      <h1 className="text-2xl my-2">Next Effector Counter</h1>

      <h2 className="text-xl">Count: {$count}</h2>
      <div className="inline-flex gap-2">
        <button className="bg-primary rounded-md text-on-primary px-3 py-2 text-md hover:bg-primary/80"
                onClick={decrement}>
          Decrement
        </button>

        <button className="bg-primary rounded-md text-on-primary px-3 py-2 text-md hover:bg-primary/80"
                onClick={increment}>
          Increment
        </button>
      </div>
    </div>
  );
};
