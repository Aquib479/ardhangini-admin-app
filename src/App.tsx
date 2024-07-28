import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './'
import './App.css';
import Index from './component/index';
import { RootContext, rootContext } from './context/root.context';

function App() {
  const rootContextData: RootContext = {
    appName: 'ardhangini-admin-app'
  };
  
  return (
    <rootContext.Provider value={rootContextData}>
    <Index></Index>
    </rootContext.Provider>
  );
}

export default App;
