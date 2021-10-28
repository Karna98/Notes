/**
 * SampleComponent.tsx
 *
 * Description:
 *    Sample Component file.
 *
 */

import React, { useState } from 'react';
import IMAGE from '../../assets/images/logo/Notes_Logo_250.png';

const getTime = () => {
  const currentTime = new Date();
  return `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
};

const logger = () => {
  return `[${getTime()}] RENDERER PROCESS : `;
};

const SampleDiv = () => {
  const [ENVIRONMENT_VAR, setENVIRONMENT_VAR] = useState('???');

  // Sends data to Main Process on button Click
  const sendToMain = () => {
    console.log(
      `${logger()} - Button Clicked. Requesting Environment from MAIN Process`
    );
    try {
      window.NotesAPI.send(`toMain`, `From Renderer Process`);
    } catch (error) {
      console.log(error);
    }
  };

  try {
    // Update ENV state on receiving data from Main Process
    window.NotesAPI.receive(`fromMain`, (responseData: string) => {
      console.log(`${logger()} Response from MAIN Process - ${responseData}`);

      const parsedData = JSON.parse(responseData);

      console.log(`${logger()} - ${parsedData['getEnvironment']}`);

      setENVIRONMENT_VAR(
        `${getTime()} - ${parsedData['getEnvironment']
          .toString()
          .toUpperCase()} MODE`
      );
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>Notes</h1>
      <h3>Logs</h3>
      <p>{ENVIRONMENT_VAR}</p>
      <img src={IMAGE} alt="Notes Logo"></img>
      <div>
        <button type="button" onClick={sendToMain}>
          Request ENV From Main
        </button>
      </div>
    </div>
  );
};

export default function Sample() {
  return <SampleDiv />;
}
