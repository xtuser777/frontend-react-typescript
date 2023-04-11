import React, { useState } from 'react';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from 'reactstrap';

export function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <header>
      <Navbar className="navbar-scr" fixed="top" light={false} dark expand="sm">
        <NavbarBrand style={{ color: '#fff', fontWeight: 'bold' }} href="/">
          SCR
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink style={{ color: '#fff' }} className="font-navbar" href="/inicio/">
                Início
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle style={{ color: '#fff' }} className="font-navbar" nav caret>
                Gerenciar
              </DropdownToggle>
              <DropdownMenu end>
                {/** if (userLevel == 1) { */}
                <DropdownItem href="/funcionario/">Funcionários</DropdownItem>
                {/** } */}
                <DropdownItem href="/cliente/">Clientes</DropdownItem>
                <DropdownItem href="/motorista/">Motoristas</DropdownItem>
                <DropdownItem href="/proprietario/">
                  Proprietários de Caminhões
                </DropdownItem>
                <DropdownItem href="/caminhao/">Caminhões</DropdownItem>
                <DropdownItem href="/representacao/">Representações</DropdownItem>
                <DropdownItem href="/produto/">Produtos</DropdownItem>
                <DropdownItem href="/tipocaminhao/">Tipos de Caminhões</DropdownItem>
                <DropdownItem href="/categoria/">
                  Categorias de Contas a Pagar
                </DropdownItem>
                <DropdownItem href="/formapagamento/">Formas de Pagamento</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle style={{ color: '#fff' }} className="font-navbar" nav caret>
                Orçamento
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem href="/orcamento/venda/">Venda</DropdownItem>
                <DropdownItem href="/orcamento/frete/">Frete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle style={{ color: '#fff' }} className="font-navbar" nav caret>
                Pedido
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem href="/pedido/venda/">Venda</DropdownItem>
                <DropdownItem href="/pedido/frete/">Frete</DropdownItem>
                <DropdownItem href="/pedido/status/">Alterar Status</DropdownItem>
                {/** if (userLevel == 1) { */}
                <DropdownItem href="/pedido/autorizar/">
                  Autorizar Carregamento
                </DropdownItem>
                {/** } */}
              </DropdownMenu>
            </UncontrolledDropdown>
            {/** if (userLevel == 1 || userLevel == 2) { */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle style={{ color: '#fff' }} className="font-navbar" nav caret>
                Controlar
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem href="/conta/pagar/">Contas a Pagar</DropdownItem>
                <DropdownItem href="/conta/receber/">Contas a Receber</DropdownItem>
                <DropdownItem href="/lancar/despesa/">Lançar Despesas</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/** } */}
            {/** if (userLevel == 1) { */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle style={{ color: '#fff' }} className="font-navbar" nav caret>
                Relatório
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem href="/relatorio/cliente/">
                  Relatório de Clientes
                </DropdownItem>
                <DropdownItem href="/relatorio/pedido/venda/">
                  Relatório de Pedidos de Venda
                </DropdownItem>
                <DropdownItem href="/relatorio/pedido/frete/">
                  Relatório de Pedidos de Frete
                </DropdownItem>
                <DropdownItem href="/relatorio/orcamento/venda/">
                  Relatório de Orçamentos de Venda
                </DropdownItem>
                <DropdownItem href="/relatorio/orcamento/frete/">
                  Relatório de Orçamentos de Frete
                </DropdownItem>
                <DropdownItem href="/relatorio/conta/pagar/">
                  Relatório de Contas a Pagar
                </DropdownItem>
                <DropdownItem href="/relatorio/conta/receber/">
                  relatório de Contas a Receber
                </DropdownItem>
                <DropdownItem href="/relatorio/produto/">
                  Relatório de Produtos
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/** } */}
          </Nav>
          <Nav className="navbar-right" navbar>
            <NavItem>
              <NavLink
                style={{ color: '#fff' }}
                className="font-navbar"
                href="/help/ManualdoUsuárioSCR.html"
              >
                Ajuda
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                style={{ color: '#fff', fontWeight: 'bold' }}
                className="font-navbar"
                nav
                caret
              >
                Usuário Logado
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem header>Configurações</DropdownItem>
                {/** if (userLevel == 1) { */}
                <DropdownItem href="/parametrizacao/">Parametrização</DropdownItem>
                {/** } */}
                <DropdownItem href="/usuario/dados/">Meus Dados</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/logout/">Sair</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
}
