/**
 * SampleComponent.tsx
 *
 * Description:
 *    Sample Component file.
 *
 */

import React from 'react';
import IMAGE from '../../assets/images/logo/Notes_Logo_250.png';

const getTime = () => {
  const currentTime = new Date();
  return `[${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}] RENDERER PROCESS : `;
};

const sendToMain = () => {
  console.log(
    `${getTime()} - Button Clicked. Requesting Environment from MAIN Process`
  );
  try {
    window.NotesAPI.send(`toMain`, `From Renderer Process`);
  } catch (error) {
    console.log(error);
  }
};

try {
  window.NotesAPI.receive(`fromMain`, (responseData: string) => {
    console.log(`${getTime()} Response from MAIN Process - ${responseData}`);
    const parsedData = JSON.parse(responseData);
    console.log(`${getTime()} - ${parsedData['getEnvironment']}`);
  });
} catch (error) {
  console.log(error);
}

const SampleDiv = () => {
  return (
    <div>
      <h1>Notes</h1>
      <h1>Open Console</h1>
      <img src={IMAGE} alt="Notes Logo"></img>
      <div>
        <button type="button" onClick={sendToMain}>
          Request From Main
        </button>
      </div>
    </div>
  );
};

export default function Sample() {
  return <SampleDiv />;
}
