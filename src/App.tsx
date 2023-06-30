import React from 'react';
import { Header } from './components/header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import { Provider, useSelector } from 'react-redux';
import store, { RootState, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Protected = (props: { children: JSX.Element }) => {
  const isloggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isloggedIn) {
    return (
      <Navigate to="/login" replace state={{ prevPath: document.location.pathname }} />
    );
  }

  return props.children;
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <Protected>
                    <Home />
                  </Protected>
                }
              />
              <Route
                path="/inicio"
                element={
                  <Protected>
                    <Home />
                  </Protected>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/parametrizacao"
                element={
                  <Protected>
                    <Parameterization />
                  </Protected>
                }
              />
              <Route
                path="/usuario/dados"
                element={
                  <Protected>
                    <User />
                  </Protected>
                }
              />
              <Route
                path="/funcionarios"
                element={
                  <Protected>
                    <Employees />
                  </Protected>
                }
              />
              <Route
                path="/funcionario/:method/:id?"
                element={
                  <Protected>
                    <Employee />
                  </Protected>
                }
              />
              <Route
                path="/clientes"
                element={
                  <Protected>
                    <Clients />
                  </Protected>
                }
              />
              <Route
                path="/cliente/:method/:id?"
                element={
                  <Protected>
                    <Client />
                  </Protected>
                }
              />
              <Route
                path="/motoristas"
                element={
                  <Protected>
                    <Drivers />
                  </Protected>
                }
              />
              <Route
                path="/motorista/:method/:id?"
                element={
                  <Protected>
                    <Driver />
                  </Protected>
                }
              />
              <Route
                path="/representacoes"
                element={
                  <Protected>
                    <Representations />
                  </Protected>
                }
              />
              <Route
                path="/representacao/:method/:id?"
                element={
                  <Protected>
                    <Representation />
                  </Protected>
                }
              />
              <Route
                path="/proprietarios"
                element={
                  <Protected>
                    <Proprietaries />
                  </Protected>
                }
              />
              <Route
                path="/proprietario/:method/:id?"
                element={
                  <Protected>
                    <Proprietary />
                  </Protected>
                }
              />
              <Route
                path="/tiposcaminhao"
                element={
                  <Protected>
                    <TruckTypes />
                  </Protected>
                }
              />
              <Route
                path="/tipocaminhao/:method/:id?"
                element={
                  <Protected>
                    <TruckType />
                  </Protected>
                }
              />
              <Route
                path="/categorias"
                element={
                  <Protected>
                    <Categories />
                  </Protected>
                }
              />
              <Route
                path="/categoria/:method/:id?"
                element={
                  <Protected>
                    <Category />
                  </Protected>
                }
              />
              <Route
                path="/formaspagamento"
                element={
                  <Protected>
                    <PaymentForms />
                  </Protected>
                }
              />
              <Route
                path="/formapagamento/:method/:id?"
                element={
                  <Protected>
                    <PaymentForm />
                  </Protected>
                }
              />
              <Route
                path="/caminhoes"
                element={
                  <Protected>
                    <Trucks />
                  </Protected>
                }
              />
              <Route
                path="/caminhao/:method/:id?"
                element={
                  <Protected>
                    <Truck />
                  </Protected>
                }
              />
              <Route
                path="/produtos"
                element={
                  <Protected>
                    <Products />
                  </Protected>
                }
              />
              <Route
                path="/produto/:method/:id?"
                element={
                  <Protected>
                    <Product />
                  </Protected>
                }
              />
              <Route
                path="/produto/tiposcaminhao/:id"
                element={
                  <Protected>
                    <ProductTruckTypes />
                  </Protected>
                }
              />
              <Route
                path="/orcamentos/venda"
                element={
                  <Protected>
                    <SalesBudgets />
                  </Protected>
                }
              />
              <Route
                path="/orcamento/venda/:method/:id?"
                element={
                  <Protected>
                    <SalesBudget />
                  </Protected>
                }
              />
              <Route
                path="/orcamentos/frete"
                element={
                  <Protected>
                    <FreightBudgets />
                  </Protected>
                }
              />
              <Route
                path="/orcamento/frete/:method/:id?"
                element={
                  <Protected>
                    <FreightBudget />
                  </Protected>
                }
              />
              <Route
                path="/pedidos/venda"
                element={
                  <Protected>
                    <SalesOrders />
                  </Protected>
                }
              />
              <Route
                path="/pedido/venda/:method/:id?"
                element={
                  <Protected>
                    <SalesOrder />
                  </Protected>
                }
              />
              <Route
                path="/pedidos/frete"
                element={
                  <Protected>
                    <FreightOrders />
                  </Protected>
                }
              />
              <Route
                path="/pedido/frete/:method/:id?"
                element={
                  <Protected>
                    <FreightOrder />
                  </Protected>
                }
              />
              <Route
                path="/pedidos/frete/status"
                element={
                  <Protected>
                    <FreightOrdersStatus />
                  </Protected>
                }
              />
              <Route
                path="/pedido/frete/status/:id"
                element={
                  <Protected>
                    <FreightOrderStatus />
                  </Protected>
                }
              />
              <Route
                path="/pedidos/frete/autorizar"
                element={
                  <Protected>
                    <FreightOrdersAuthorize />
                  </Protected>
                }
              />
              <Route
                path="/pedido/frete/autorizar/:id"
                element={
                  <Protected>
                    <FreightOrderAuthorize />
                  </Protected>
                }
              />
              <Route
                path="/contas/pagar"
                element={
                  <Protected>
                    <BillsPay />
                  </Protected>
                }
              />
              <Route
                path="/conta/pagar/:id"
                element={
                  <Protected>
                    <BillPay />
                  </Protected>
                }
              />
              <Route
                path="/contas/receber"
                element={
                  <Protected>
                    <ReceiveBills />
                  </Protected>
                }
              />
              <Route
                path="/conta/receber/:id"
                element={
                  <Protected>
                    <ReceiveBill />
                  </Protected>
                }
              />
              <Route
                path="/lancar/despesas"
                element={
                  <Protected>
                    <ReleaseBills />
                  </Protected>
                }
              />
              <Route
                path="/lancar/despesa"
                element={
                  <Protected>
                    <ReleaseBill />
                  </Protected>
                }
              />
            </Routes>
          </div>
          <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
