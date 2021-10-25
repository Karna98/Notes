/**
 * SampleComponent.tsx
 *
 * Description:
 *    Sample Component file.
 *
 */

import React from 'react';
import IMAGE from '../../assets/images/logo/Notes_Logo_250.png';

const SampleDiv = () => {
  return (
    <div>
      <h1>Notes</h1>
      <h1>
        {process.env.NODE_ENV !== undefined
          ? process.env.NODE_ENV.toString().toUpperCase()
          : ``}
        -Mode
      </h1>
      <img src={IMAGE} alt="Notes Logo"></img>
    </div>
  );
};

export default function Sample() {
  return <SampleDiv />;
}
