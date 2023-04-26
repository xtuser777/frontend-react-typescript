import React, { ChangeEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Col, Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButton } from '../../components/form-button';
import { FormButtonLink } from '../../components/form-button-link';

export function BillsPay(): JSX.Element {
  const [filter, setFilter] = useState('');
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const [dueDateInit, setDueDateInit] = useState(
    new Date().toISOString().substring(0, 10),
  );
  const handleDueDateInitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDateInit(e.target.value);
  };

  const [dueDateEnd, setDueDateEnd] = useState(new Date().toISOString().substring(0, 10));
  const handleDueDateEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDateEnd(e.target.value);
  };

  const [situation, setSituation] = useState('0');
  const handleSituationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSituation(e.target.value);
  };

  const [comission, setComission] = useState('0');
  const handleComissionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComission(e.target.value);
  };

  const [salesman, setSalesman] = useState('0');
  const handleSalesmanChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalesman(e.target.value);
  };

  const [orderBy, setOrderBy] = useState('1');
  const handleOrderByChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
  };

  const handleFilterClick = () => {
    alert('Filtrando...');
  };

  return (
    <>
      <CardTitle text="Contas a Pagar" />
      <FieldsetCard legend="Filtragem de contas">
        <Row>
          <FormInputText
            colSm={6}
            id="filter"
            label="Filtro"
            obrigatory={false}
            placeholder="Filtrar por descrição"
            value={filter}
            onChange={handleFilterChange}
          />
          <FormInputDate
            colSm={3}
            id="vencimento-inicio"
            label="Vencimento início"
            obrigatory={false}
            value={dueDateInit}
            onChange={handleDueDateInitChange}
          />
          <FormInputDate
            colSm={3}
            id="vencimento-fim"
            label="Vencimento fim"
            obrigatory={false}
            value={dueDateEnd}
            onChange={handleDueDateEndChange}
          />
        </Row>
        <Row>
          <FormInputSelect
            colSm={3}
            id="situacao"
            label="Situação"
            obrigatory={false}
            value={situation}
            onChange={handleSituationChange}
          >
            <option value="0">SELECIONE</option>
            <option value="1">PENDENTE</option>
            <option value="2">PAGO PARCIALMENTE</option>
            <option value="3">PAGO</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={3}
            id="comissao"
            label="Comissão"
            obrigatory={false}
            value={comission}
            onChange={handleComissionChange}
          >
            <option value="0">SELECIONE</option>
            <option value="1">SIM</option>
            <option value="2">NÃO</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={3}
            id="vendedor"
            label="Vendedor"
            obrigatory={false}
            value={salesman}
            onChange={handleSalesmanChange}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={3}
            id="ordem"
            label="Ordernar por"
            obrigatory={false}
            value={orderBy}
            onChange={handleOrderByChange}
          >
            <option value="1">CONTA/PARCELA (CRESCENTE)</option>
            <option value="2">CONTA (CRESCENTE)</option>
            <option value="3">CONTA (DECRESCENTE)</option>
            <option value="4">DESCRIÇÂO (CRESCENTE)</option>
            <option value="5">DESCRIÇÂO (DECRESCENTE)</option>
            <option value="6">PARCELA (CRESCENTE)</option>
            <option value="7">PARCELA (DECRESCENTE)</option>
            <option value="8">VALOR (CRESCENTE)</option>
            <option value="9">VALOR (DECRESCENTE)</option>
            <option value="10">VENCIMENTO (CRESCENTE)</option>
            <option value="11">VENCIMENTO (DECRESCENTE)</option>
            <option value="12">SITUAÇÃO (CRESCENTE)</option>
            <option value="13">SITUAÇÃO (DECRESCENTE)</option>
          </FormInputSelect>
        </Row>
        <Row>
          <Col sm="3"></Col>
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
            id="lancar"
            text="LANÇAR"
            to="/lancar/despesas"
          />
          <Col sm="3"></Col>
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Contas lançadas">
        <Table id="table-bills" striped hover responsive size="sm">
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th style={{ width: '5%' }}>CONTA</th>
              <th style={{ width: '28%' }}>DESCRIÇÃO</th>
              <th style={{ width: '6%' }}>PARCELA</th>
              <th>VALOR (R$)</th>
              <th style={{ width: '10%' }}>VENCIMENTO</th>
              <th>VALOR PAGO (R$)</th>
              <th style={{ width: '13%' }}>DATA PAGAMENTO</th>
              <th>SITUAÇÃO</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyContas"></tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}