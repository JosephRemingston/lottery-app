import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import React , { useState , useEffect } from 'react';

function App() {

  var [manager , setManager] = useState('');

  useEffect(() => {
    async function fetchDeployedData(){
      try{
        var managerAddress = await lottery.methods.manager().call();
        setManager(managerAddress);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchDeployedData();
  } , []);


  return (
    <div className='App'>

      <p>lottery deployed by {manager ? manager : "loading"}</p>
    </div>
  );
}

export default App;
