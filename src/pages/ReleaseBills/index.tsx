import React, { ChangeEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';

export function ReleaseBills(): JSX.Element {
  const [filter, setFilter] = useState('');
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const [dueDateInit, setDueDateInit] = useState(
    new Date().toISOString().substring(0, 10),
  );
  const handleDueDateInit = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDateInit(e.target.value);
  };

  const [dueDateEnd, setDueDateEnd] = useState(new Date().toISOString().substring(0, 10));
  const handleDueDateEnd = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDateEnd(e.target.value);
  };

  const handleFilterClick = () => {
    alert('Filtrando...');
  };

  const [orderBy, setOrderBy] = useState('1');
  const handleOrderByChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
  };

  return (
    <>
      <CardTitle text="Lançar Despesas" />
      <FieldsetCard legend="Filtragem de Despesas">
        <Row>
          <FormInputText
            colSm={6}
            id="filtro"
            label="Filtro"
            obrigatory={false}
            placeholder="Filtrar por descrição"
            value={filter}
            onChange={handleFilterChange}
          />
          <FormInputDate
            colSm={2}
            id="vencimento-inicio"
            label="Vencimento Início"
            obrigatory={false}
            value={dueDateInit}
            onChange={handleDueDateInit}
          />
          <FormInputDate
            colSm={2}
            id="vencimento-fim"
            label="Vencimento Fim"
            obrigatory={false}
            value={dueDateEnd}
            onChange={handleDueDateEnd}
          />
          <FormButton
            colSm={2}
            color="primary"
            id="filtrar"
            text="FILTRAR"
            onClick={handleFilterClick}
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Despesas lançadas">
        <Row>
          <FormInputSelect
            colSm={10}
            id="ordenar"
            label="Ordenar por"
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
            <option value="8">CATEGORIA (CRESCENTE)</option>
            <option value="9">CATEGORIA (DECRESCENTE)</option>
            <option value="12">VENCIMENTO (CRESCENTE)</option>
            <option value="13">VENCIMENTO (DECRESCENTE)</option>
            <option value="14">AUTOR (CRESCENTE)</option>
            <option value="15">AUTOR (DECRESCENTE)</option>
            <option value="16">VALOR (CRESCENTE)</option>
            <option value="17">VALOR (DECRESCENTE)</option>
          </FormInputSelect>
          <FormButtonLink
            colSm={2}
            color="success"
            id="lancar"
            text="LANÇAR"
            to="/lancar/despesa"
          />
        </Row>
        <Table id="table-bills" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th style={{ width: '6%' }}>CONTA</th>
              <th style={{ width: '20%' }}>DESCRIÇÃO</th>
              <th style={{ width: '6%' }}>PARCELA</th>
              <th style={{ width: '14%' }}>CATEGORIA</th>
              <th style={{ width: '8%' }}>VENC.</th>
              <th style={{ width: '12%' }}>AUTOR</th>
              <th>VALOR (R$)</th>
              <th>SITUAÇÃO</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbody-bills"></tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}
