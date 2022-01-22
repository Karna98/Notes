/**
 * index.tsx
 *
 * Description:
 *    Renderer process file for ELectron. This file on compilation will be
 *    attached to `index.html`.
 */

import IMAGE from 'assets/logo/png/256x256.png';
import React from 'react';
import { render } from 'react-dom';
import './launch.scss';

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
