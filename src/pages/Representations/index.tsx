import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';

export function Representations(): JSX.Element {
  const [filter, setfilter] = useState('');
  const [register, setRegister] = useState(new Date().toISOString().substring(0, 10));
  const [orderBy, setOrderBy] = useState('1');

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegister(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
  };

  const handleFilterClick = (e: MouseEvent) => {
    alert(`${filter}, ${register}, ${orderBy}`);
  };

  return (
    <>
      <CardTitle text="Gerenciar Representações" />
      <FieldsetCard legend="Filtragem de Representações">
        <Row>
          <FormInputText
            colSm={8}
            id="filtro"
            label="Filtro"
            obrigatory={false}
            value={filter}
            placeholder="Filtrar por nome e email..."
            onChange={(e) => handleFilterChange(e)}
          />
          <FormInputDate
            colSm={2}
            id="cad"
            label="Cadastro"
            obrigatory={false}
            value={register}
            onChange={(e) => handleRegisterChange(e)}
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
      <FieldsetCard legend="Representações Cadastradas">
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
            <option value="3">NOME FANTASIA (CRESCENTE)</option>
            <option value="4">NOME FANTASIA (DECRESCENTE)</option>
            <option value="5">CNPJ (CRESCENTE)</option>
            <option value="6">CNPJ (DECRESCENTE)</option>
            <option value="7">CADASTRO (CRESCENTE)</option>
            <option value="8">CADASTRO (DECRESCENTE)</option>
            <option value="9">UNIDADE (CRESCENTE)</option>
            <option value="10">UNIDADE (DECRESCENTE)</option>
            <option value="11">EMAIL (CRESCENTE)</option>
            <option value="12">EMAIL (DECRESCENTE)</option>
          </FormInputSelect>
          <FormButtonLink
            colSm={2}
            color="success"
            id="novo"
            text="NOVO"
            to="/representacao/novo"
          />
        </Row>
        <Table id="tableRepresentations" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th style={{ width: '30%' }}>NOME FANTASIA</th>
              <th style={{ width: '16%' }}>CNPJ</th>
              <th style={{ width: '10%' }}>CADASTRO</th>
              <th style={{ width: '20%' }}>UNIDADE</th>
              <th>EMAIL</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyRepresentations"></tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}