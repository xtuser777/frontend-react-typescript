import React, { ChangeEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Col, Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButton } from '../../components/form-button';

export function ReceiveBills(): JSX.Element {
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

  const [representation, setRepresentation] = useState('0');
  const handleRepresentationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepresentation(e.target.value);
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
      <CardTitle text="Contas a Receber" />
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
            id="representacao"
            label="Representação"
            obrigatory={false}
            value={representation}
            onChange={handleRepresentationChange}
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
            <option value="1">CONTA (CRESCENTE)</option>
            <option value="2">CONTA (DECRESCENTE)</option>
            <option value="3">DESCRIÇÂO (CRESCENTE)</option>
            <option value="4">DESCRIÇÂO (DECRESCENTE)</option>
            <option value="5">VALOR (CRESCENTE)</option>
            <option value="6">VALOR (DECRESCENTE)</option>
            <option value="7">VENCIMENTO (CRESCENTE)</option>
            <option value="8">VENCIMENTO (DECRESCENTE)</option>
            <option value="9">SITUAÇÃO (CRESCENTE)</option>
            <option value="10">SITUAÇÃO (DECRESCENTE)</option>
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
      <FieldsetCard legend="Contas lançadas">
        <Table id="table-bills" striped hover responsive size="sm">
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th style={{ width: '5%' }}>CONTA</th>
              <th style={{ width: '28%' }}>DESCRIÇÃO</th>
              <th>VALOR (R$)</th>
              <th style={{ width: '10%' }}>VENCIMENTO</th>
              <th>VALOR PAGO (R$)</th>
              <th style={{ width: '13%' }}>DATA RECEBIMENTO</th>
              <th>SITUAÇÃO</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyBills"></tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}
