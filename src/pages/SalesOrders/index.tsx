import React, { ChangeEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Col, Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';

export function SalesOrders(): JSX.Element {
  const [filter, setfilter] = useState('');
  const [dateInit, setDateInit] = useState(new Date().toISOString().substring(0, 10));
  const [dateEnd, setDateEnd] = useState(new Date().toISOString().substring(0, 10));
  const [orderBy, setOrderBy] = useState('1');

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };
  const handleDateInitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateInit(e.target.value);
  };
  const handleDateEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateEnd(e.target.value);
  };
  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
  };

  const handleFilterClick = () => {
    alert(`${filter}, ${dateInit}, ${orderBy}`);
  };

  return (
    <>
      <CardTitle text="Controlar Pedidos de Venda" />
      <FieldsetCard legend="Filtragem de Pedidos">
        <Row>
          <FormInputText
            colSm={5}
            id="filtro"
            label="Filtro"
            obrigatory={false}
            value={filter}
            placeholder="Filtrar por descrição e cliente..."
            onChange={(e) => handleFilterChange(e)}
          />
          <FormInputDate
            colSm={2}
            id="data-inicio"
            label="Data Início"
            obrigatory={false}
            value={dateInit}
            onChange={(e) => handleDateInitChange(e)}
          />
          <FormInputDate
            colSm={2}
            id="data-fim"
            label="Data Fim"
            obrigatory={false}
            value={dateEnd}
            onChange={(e) => handleDateEndChange(e)}
          />
          <FormInputSelect
            colSm={3}
            id="order"
            label="Ordernar por"
            obrigatory={false}
            value={orderBy}
            onChange={(e) => handleOrderChange(e)}
          >
            <option value="1">DESCRIÇÂO (CRESCENTE)</option>
            <option value="2">DESCRIÇÂO (DECRESCENTE)</option>
            <option value="3">CLIENTE (CRESCENTE)</option>
            <option value="4">CLIENTE (DECRESCENTE)</option>
            <option value="5">DATA (CRESCENTE)</option>
            <option value="6">DATA (DECRESCENTE)</option>
            <option value="7">AUTOR (CRESCENTE)</option>
            <option value="8">AUTOR (DECRESCENTE)</option>
            <option value="9">FORMA PAGAMENTO (CRESCENTE)</option>
            <option value="10">FORMA PAGAMENTO (DECRESCENTE)</option>
            <option value="11">VALOR (CRESCENTE)</option>
            <option value="12">VALOR (DECRESCENTE)</option>
          </FormInputSelect>
        </Row>
        <Row>
          <Col sm="6" />
          <FormButton
            colSm={3}
            color="primary"
            id="filtrar"
            text="FILTRAR"
            onClick={handleFilterClick}
          />
          <FormButtonLink
            colSm={3}
            color="success"
            id="novo"
            text="NOVO"
            to="/pedido/venda/"
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Pedidos Abertos">
        <Table id="tableOrders" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th>DESCRIÇÃO</th>
              <th>CLIENTE</th>
              <th>DATA</th>
              <th>AUTOR</th>
              <th>FORMA PAGAMENTO</th>
              <th>VALOR (R$)</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyOrders"></tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}
