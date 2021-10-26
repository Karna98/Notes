/**
 * index.tsx
 *
 * Description:
 *    Renderer process file for ELectron. This file on compilation will be
 *    attached to `index.html`.
 */

import React from 'react';
import { render } from 'react-dom';
import './launch.scss';
import IMAGE from '../../assets/images/logo/Notes_Logo_250.png';

render(
  <>
    <div className="img-section d-flex justify-content-center align-items-center">
      <img src={IMAGE} alt="Logo" />
    </div>
    <div className="description-title d-flex flex-column justify-content-center align-items-center">
      <span> Notes </span>
    </div>
    <div className="description-content d-flex flex-column justify-content-center align-items-center">
      <span> Developed by Vedant Wakalkar </span>
    </div>
  </>,
  document.getElementById(`root`)
);
