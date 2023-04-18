import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';

export function Products(): JSX.Element {
  const [filter, setfilter] = useState('');
  const [representation, setRepresentation] = useState('0');
  const [orderBy, setOrderBy] = useState('1');

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleRepresentationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepresentation(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
  };

  const handleFilterClick = (e: MouseEvent) => {
    alert(`${filter}, ${representation}, ${orderBy}`);
  };

  return (
    <>
      <CardTitle text="Gerenciar Produtos" />
      <FieldsetCard legend="Filtragem de Produtos">
        <Row>
          <FormInputText
            colSm={6}
            id="filtro"
            label="Filtro"
            obrigatory={false}
            value={filter}
            placeholder="Filtrar por marca ou modelo..."
            onChange={(e) => handleFilterChange(e)}
          />
          <FormInputSelect
            colSm={4}
            id="representacao"
            label="Representação"
            obrigatory={false}
            value={representation}
            onChange={(e) => handleRepresentationChange(e)}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
          <FormButton
            colSm={2}
            color="primary"
            id="filtrar"
            text="FILTRAR"
            onClick={(e) => handleFilterClick(e)}
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Produtos Cadastrados">
        <Row style={{ marginBottom: '10px' }}>
          <FormInputSelect
            colSm={10}
            id="order"
            label="Ordernar por"
            obrigatory={false}
            value={orderBy}
            onChange={(e) => handleOrderChange(e)}
          >
            <option value="1">REGISTRO (CRESCENTE)</option>
            <option value="2">REGISTRO (DECRESCENTE)</option>
            <option value="3">DESCRIÇÃO (CRESCENTE)</option>
            <option value="4">DESCRIÇÃO (DECRESCENTE)</option>
            <option value="5">MEDIDA (CRESCENTE)</option>
            <option value="6">MEDIDA (DECRESCENTE)</option>
            <option value="7">PREÇO (CRESCENTE)</option>
            <option value="8">PREÇO (DECRESCENTE)</option>
            <option value="9">REPRESENTAÇÃO (CRESCENTE)</option>
            <option value="10">REPRESENTAÇÃO (DECRESCENTE)</option>
          </FormInputSelect>
          <FormButtonLink
            colSm={2}
            color="success"
            id="novo"
            text="NOVO"
            to="/produto/novo"
          />
        </Row>
        <Table id="tableProducts" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th style={{ width: '30%' }}>DESCRIÇÃO</th>
              <th style={{ width: '16%' }}>MEDIDA</th>
              <th style={{ width: '10%' }}>PREÇO</th>
              <th style={{ width: '20%' }}>REPRESENTAÇÂO</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyProducts"></tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}
