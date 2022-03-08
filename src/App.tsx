import React, { Suspense } from 'react';
import { Loader } from "@react-three/drei";
import './App.css';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
