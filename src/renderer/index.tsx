/**
 * index.tsx
 *
 * Description:
 *    Renderer process file for ELectron. This file on compilation will be
 *    attached to `index.html`.
 */

import React from 'react';
import { render } from 'react-dom';
import Sample from './components/SampleComponent';
import './style.scss';

render(<Sample />, document.getElementById(`root`));
