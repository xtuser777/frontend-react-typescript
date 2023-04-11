import React from 'react';
import { Button } from 'reactstrap';
import { Header } from './components/header';

function App() {
  return (
    <>
      <Header></Header>
      <div className="container">
        <h1>Teste</h1>
        <Button text="Teste" color="primary">
          Teste
        </Button>
      </div>
    </>
  );
}

export default App;
