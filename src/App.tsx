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
import { FreightBudgets } from './pages/FreightBudgets';
import { FreightBudget } from './pages/FreightBudget';
import { SalesOrders } from './pages/SalesOrders';
import { SalesOrder } from './pages/SalesOrder';
import { FreightOrders } from './pages/FreightOrders';
import { FreightOrder } from './pages/FreightOrder';
import { FreightOrdersStatus } from './pages/FreightOrdersStatus';
import { FreightOrderStatus } from './pages/FreightOrderStatus';
import { FreightOrdersAuthorize } from './pages/FreightOrdersAuthorize';
import { FreightOrderAuthorize } from './pages/FreightOrderAuthorize';
import { BillsPay } from './pages/BillsPay';
import { BillPay } from './pages/BillPay';
import { ReceiveBills } from './pages/ReceiveBills';
import { ReceiveBill } from './pages/ReceiveBill';
import { ReleaseBills } from './pages/ReleaseBills';
import { ReleaseBill } from './pages/ReleaseBill';

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
          <Route path="/orcamentos/frete" element={<FreightBudgets />} />
          <Route path="/orcamento/frete/:method/:id?" element={<FreightBudget />} />
          <Route path="/pedidos/venda" element={<SalesOrders />} />
          <Route path="/pedido/venda/" element={<SalesOrder />} />
          <Route path="/pedidos/frete" element={<FreightOrders />} />
          <Route path="/pedido/frete/" element={<FreightOrder />} />
          <Route path="/pedidos/frete/status" element={<FreightOrdersStatus />} />
          <Route path="/pedido/frete/status/:id" element={<FreightOrderStatus />} />
          <Route path="/pedidos/frete/autorizar" element={<FreightOrdersAuthorize />} />
          <Route path="/pedido/frete/autorizar/:id" element={<FreightOrderAuthorize />} />
          <Route path="/contas/pagar" element={<BillsPay />} />
          <Route path="/conta/pagar/:id" element={<BillPay />} />
          <Route path="/contas/receber" element={<ReceiveBills />} />
          <Route path="/conta/receber/:id" element={<ReceiveBill />} />
          <Route path="/lancar/despesas" element={<ReleaseBills />} />
          <Route path="/lancar/despesa" element={<ReleaseBill />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
