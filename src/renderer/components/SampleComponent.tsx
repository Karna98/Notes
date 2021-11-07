/**
 * SampleComponent.tsx
 *
 * Description:
 *    Sample Component file.
 *
 */

import React, { ReactElement, useState } from 'react';
import { sendToIpcMain } from '../util';
import IMAGE from '../../assets/logo/png/256x256.png';

const SampleDiv = () => {
  const [LOGS, setLOGS] = useState([<div key={-1}>No Data available</div>]);

  // Sends data to Main Process on button Click
  const setLogs = () => {
    const IpcRequestObject = {
      requestType: `LOGS:CREATE`,
      data: `[ RENDERER ] : Button Clicked at ${Date.now()}. Requesting ENV ...`,
    };

    sendToIpcMain(IpcRequestObject);
  };

  // Get Logs from Database through main process.
  const getLogs = () => {
    const IpcRequestObject = {
      requestType: `LOGS:READ`,
    };

    sendToIpcMain(IpcRequestObject);
  };

  try {
    // Update Logs on receiving data from Main Process
    window.NotesAPI.receive(`fromMain`, (responseData: string) => {
      const parsedData = JSON.parse(responseData);

      if (parsedData['data'].length > 0) {
        const logs: ReactElement[] = [];

        parsedData['data'].forEach((logData: object) => {
          logs.push(<div>{Object.values(logData).join(` `)}</div>);
        });

        // Set LOGS state with response results.
        setLOGS(logs);
      }
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>
        <img src={IMAGE} alt="Notes Logo"></img>Notes
      </h1>
      <div>
        <button type="button" onClick={setLogs}>
          Request ENV From Main
        </button>
      </div>
      <br />
      <div>
        <button type="button" onClick={getLogs}>
          Refresh Logs
        </button>
      </div>
      <h3>Logs</h3>
      <div>{LOGS}</div>
    </div>
  );
};

export default function Sample() {
  return <SampleDiv />;
}
