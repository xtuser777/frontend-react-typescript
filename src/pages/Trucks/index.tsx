import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';

export function Trucks(): JSX.Element {
  const [filter, setfilter] = useState('');
  const [orderBy, setOrderBy] = useState('1');

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
  };

  const handleFilterClick = (e: MouseEvent) => {
    alert(`${filter}, ${orderBy}`);
  };

  return (
    <>
      <CardTitle text="Gerenciar Caminhões" />
      <FieldsetCard legend="Filtragem de Caminhões">
        <Row>
          <FormInputText
            colSm={10}
            id="filtro"
            label="Filtro"
            obrigatory={false}
            value={filter}
            placeholder="Filtrar por marca ou modelo..."
            onChange={(e) => handleFilterChange(e)}
          />
          <FormButton
            colSm={2}
            color="primary"
            id="filtrar"
            text="FILTRAR"
            onClick={(e) => handleFilterClick(e)}
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Caminhões Cadastrados">
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
            <option value="3">PLACA (CRESCENTE)</option>
            <option value="4">PLACA (DECRESCENTE)</option>
            <option value="5">MARCA (CRESCENTE)</option>
            <option value="6">MARCA (DECRESCENTE)</option>
            <option value="7">MODELO (CRESCENTE)</option>
            <option value="8">MODELO (DECRESCENTE)</option>
            <option value="9">ANO (CRESCENTE)</option>
            <option value="10">ANO (DECRESCENTE)</option>
          </FormInputSelect>
          <FormButtonLink
            colSm={2}
            color="success"
            id="novo"
            text="NOVO"
            to="/caminhao/novo"
          />
        </Row>
        <Table id="tableTrucks" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th style={{ width: '10%' }}>PLACA</th>
              <th style={{ width: '20%' }}>MARCA</th>
              <th style={{ width: '40%' }}>MODELO</th>
              <th style={{ width: '20%' }}>COR</th>
              <th style={{ width: '8%' }}>ANO</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyTrucks"></tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}
