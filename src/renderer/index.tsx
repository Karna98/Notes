/*-----     -----     -----     -----     -----     -----     -----     ----- 
index.tsx

Description: Renderer process file for ELectron. This file on compilation will be attached to index.html.

Version  : 0.0.1
Date     : 10-10-2021 
Author   : Vedant Wakalkar 
Email    : developer.karna98@gmail.com 
-----     -----     -----     -----     -----     -----     -----     -----*/

import ReactDOM from 'react-dom';
import { Sample } from './components/SampleComponent';
import './style.scss';
import IMAGE from '../assets/images/logo/Notes_Logo_250.png';

ReactDOM.render(
  <>
    <Sample />
    <h1>Development Mode</h1>
    <img src={IMAGE} alt="Notes Logo"></img>
  </>,
  document.getElementById(`root`)
);
