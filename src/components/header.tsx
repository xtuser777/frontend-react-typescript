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

interface IProps {
  isLogged: boolean;
}

export function Header(props: IProps): JSX.Element {
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
          {props.isLogged ? (
            <>
              <Nav className="me-auto" navbar>
                <NavItem>
                  <NavLink
                    style={{ color: '#fff' }}
                    className="font-navbar"
                    href="/inicio/"
                  >
                    Início
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle
                    style={{ color: '#fff' }}
                    className="font-navbar"
                    nav
                    caret
                  >
                    Gerenciar
                  </DropdownToggle>
                  <DropdownMenu end>
                    {/** if (userLevel == 1) { */}
                    <DropdownItem href="/funcionarios/">Funcionários</DropdownItem>
                    {/** } */}
                    <DropdownItem href="/clientes/">Clientes</DropdownItem>
                    <DropdownItem href="/motoristas/">Motoristas</DropdownItem>
                    <DropdownItem href="/proprietarios/">
                      Proprietários de Caminhões
                    </DropdownItem>
                    <DropdownItem href="/caminhoes/">Caminhões</DropdownItem>
                    <DropdownItem href="/representacoes/">Representações</DropdownItem>
                    <DropdownItem href="/produtos/">Produtos</DropdownItem>
                    <DropdownItem href="/tiposcaminhao/">Tipos de Caminhões</DropdownItem>
                    <DropdownItem href="/categorias/">
                      Categorias de Contas a Pagar
                    </DropdownItem>
                    <DropdownItem href="/formaspagamento/">
                      Formas de Pagamento
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle
                    style={{ color: '#fff' }}
                    className="font-navbar"
                    nav
                    caret
                  >
                    Orçamento
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem href="/orcamentos/venda/">Venda</DropdownItem>
                    <DropdownItem href="/orcamentos/frete/">Frete</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle
                    style={{ color: '#fff' }}
                    className="font-navbar"
                    nav
                    caret
                  >
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
                  <DropdownToggle
                    style={{ color: '#fff' }}
                    className="font-navbar"
                    nav
                    caret
                  >
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
                  <DropdownToggle
                    style={{ color: '#fff' }}
                    className="font-navbar"
                    nav
                    caret
                  >
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
            </>
          ) : (
            <>
              <Nav className="me-auto" navbar></Nav>
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
              </Nav>
            </>
          )}
        </Collapse>
      </Navbar>
    </header>
  );
}
