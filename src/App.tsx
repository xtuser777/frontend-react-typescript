import React from 'react';
import { Header } from './components/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Parameterization } from './pages/Parameterization';
import { User } from './pages/User';
import { Employees } from './pages/Employees';
import { Employee } from './pages/Employee';
import { Clients } from './pages/Clients';
import { Client } from './pages/Client';
import { Drivers } from './pages/Drivers';
import { Driver } from './pages/Driver';
import { Representations } from './pages/Representations';
import { Representation } from './pages/Representation';
import { Proprietaries } from './pages/Proprietaries';
import { Proprietary } from './pages/Proprietary';
import { TruckTypes } from './pages/TruckTypes';
import { TruckType } from './pages/TruckType';
import { Categories } from './pages/Categories';
import { Category } from './pages/Category';
import { PaymentForms } from './pages/PaymentForms';
import { PaymentForm } from './pages/PaymentForm';
import { Trucks } from './pages/Trucks';
import { Truck } from './pages/Truck';
import { Products } from './pages/Products';
import { Product } from './pages/Product';
import { ProductTruckTypes } from './pages/ProductTruckTypes';
import { SalesBudgets } from './pages/SalesBudgets';
import { SalesBudget } from './pages/SalesBudget';

function App() {
  return (
    <BrowserRouter>
      <Header isLogged={true} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/parametrizacao" element={<Parameterization />} />
          <Route path="/usuario/dados" element={<User />} />
          <Route path="/funcionarios" element={<Employees />} />
          <Route path="/funcionario/:method/:id?" element={<Employee />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/cliente/:method/:id?" element={<Client />} />
          <Route path="/motoristas" element={<Drivers />} />
          <Route path="/motorista/:method/:id?" element={<Driver />} />
          <Route path="/representacoes" element={<Representations />} />
          <Route path="/representacao/:method/:id?" element={<Representation />} />
          <Route path="/proprietarios" element={<Proprietaries />} />
          <Route path="/proprietario/:method/:id?" element={<Proprietary />} />
          <Route path="/tiposcaminhao" element={<TruckTypes />} />
          <Route path="/tipocaminhao/:method/:id?" element={<TruckType />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/categoria/:method/:id?" element={<Category />} />
          <Route path="/formaspagamento" element={<PaymentForms />} />
          <Route path="/formapagamento/:method/:id?" element={<PaymentForm />} />
          <Route path="/caminhoes" element={<Trucks />} />
          <Route path="/caminhao/:method/:id?" element={<Truck />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produto/:method/:id?" element={<Product />} />
          <Route path="/produto/tiposcaminhao/:id" element={<ProductTruckTypes />} />
          <Route path="/orcamentos/venda" element={<SalesBudgets />} />
          <Route path="/orcamento/venda/:method/:id?" element={<SalesBudget />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
