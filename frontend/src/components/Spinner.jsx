import React from 'react';
import {Circles} from 'react-loader-spinner';
function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles type="Puff" color="#00BFFF" height={100} width={100} />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;