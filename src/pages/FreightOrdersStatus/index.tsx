import React, { ChangeEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Col, Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';

export function FreightOrdersStatus(): JSX.Element {
  const [filter, setfilter] = useState('');
  const [dateInit, setDateInit] = useState(new Date().toISOString().substring(0, 10));
  const [dateEnd, setDateEnd] = useState(new Date().toISOString().substring(0, 10));
  const [status, setStatus] = useState('0');
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
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };
  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
  };

  const handleFilterClick = () => {
    alert(`${filter}, ${dateInit}, ${orderBy}`);
  };

  return (
    <>
      <CardTitle text="Alterar Status de Pedidos de Frete" />
      <FieldsetCard legend="Filtragem de Pedidos">
        <Row>
          <FormInputText
            colSm={12}
            id="filtro"
            label="Filtro"
            obrigatory={false}
            value={filter}
            placeholder="Filtrar por descrição..."
            onChange={(e) => handleFilterChange(e)}
          />
        </Row>
        <Row>
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
            colSm={4}
            id="status"
            label="Status"
            obrigatory={false}
            value={status}
            onChange={(e) => handleStatusChange(e)}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={4}
            id="order"
            label="Ordernar por"
            obrigatory={false}
            value={orderBy}
            onChange={(e) => handleOrderChange(e)}
          >
            <option value="1">DESCRIÇÂO (CRESCENTE)</option>
            <option value="2">DESCRIÇÂO (DECRESCENTE)</option>
            <option value="3">DATA (CRESCENTE)</option>
            <option value="4">DATA (DECRESCENTE)</option>
            <option value="5">AUTOR (CRESCENTE)</option>
            <option value="6">AUTOR (DECRESCENTE)</option>
            <option value="7">FORMA PAGAMENTO (CRESCENTE)</option>
            <option value="8">FORMA PAGAMENTO (DECRESCENTE)</option>
            <option value="9">STATUS (CRESCENTE)</option>
            <option value="10">STATUS (DECRESCENTE)</option>
            <option value="11">VALOR (CRESCENTE)</option>
            <option value="12">VALOR (DECRESCENTE)</option>
          </FormInputSelect>
        </Row>
        <Row>
          <Col sm="4"></Col>
          <FormButton
            colSm={4}
            color="primary"
            id="filtrar"
            text="FILTRAR"
            onClick={handleFilterClick}
          />
          <Col sm="4"></Col>
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
              <th>STATUS</th>
              <th>VALOR (R$)</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyOrders"></tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}
