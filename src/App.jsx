import { useState, Children } from 'react';
import { Home } from './views/Home.jsx';
import './css/App.css';

import tenk from './assets/10k.jpg';
import dado from './assets/dadoanimated.gif'
import { MyForm } from './components/MyForm.jsx';

export default function RowList({ pointArray }) {
  return (
    <div className="RowList">
      {Children.map(pointArray, child =>
        <div className="Row">
          {child}
        </div>
      )}
    </div>
  );
}

export function App() {
  

  return (
    <Home />
  );
}