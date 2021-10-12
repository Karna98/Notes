/*-----     -----     -----     -----     -----     -----     -----     ----- 
SampleComponent.tsx

Description: Sample Component file.

Version  : 0.0.1
Date     : 10-10-2021 
Author   : Vedant Wakalkar 
Email    : developer.karna98@gmail.com 
-----     -----     -----     -----     -----     -----     -----     -----*/

export const Sample = () => {
  return (
    <>
      <h1>Notes</h1>
      <div>ENV: {process.env.NODE_ENV}</div>
      <div>Custom ENV : {process.env.CUSTOM_ENV}</div>
    </>
  );
};
