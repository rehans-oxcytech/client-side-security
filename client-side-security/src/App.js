import React, { useState } from 'react';
import './App.css';
import WithoutEncrypt from './component/WithoutEncrypt';
import WithEncrypt from './component/WithEncrypt';

function App() {
  return (
    <>
    <WithoutEncrypt></WithoutEncrypt>
    <br></br>
    <WithEncrypt></WithEncrypt>
    </>
  );
}

export default App;
