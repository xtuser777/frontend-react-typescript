import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';

export function Employees(): JSX.Element {
  const [filter, setfilter] = useState('');
  const [admission, setAdmission] = useState(new Date().toISOString().substring(0, 10));
  const [orderBy, setOrderBy] = useState('1');

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleAdmissionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmission(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
  };

  const handleFilterClick = () => {
    alert(`${filter}, ${admission}, ${orderBy}`);
  };

  return (
    <>
      <CardTitle text="Gerenciar Funcionários" />
      <FieldsetCard legend="Filtragem de Funcionários">
        <Row>
          <FormInputText
            colSm={8}
            id="filtro"
            label="Filtro"
            obrigatory={false}
            value={filter}
            placeholder="Filtrar por nome, login e email..."
            onChange={(e) => handleFilterChange(e)}
          />
          <FormInputDate
            colSm={2}
            id="adm"
            label="Admissão"
            obrigatory={false}
            value={admission}
            onChange={(e) => handleAdmissionChange(e)}
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
      <FieldsetCard legend="Funcionários Cadastrados">
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
            <option value="3">NOME (CRESCENTE)</option>
            <option value="4">NOME (DECRESCENTE)</option>
            <option value="5">USUÁRIO (CRESCENTE)</option>
            <option value="6">USUÁRIO (DECRESCENTE)</option>
            <option value="7">NÍVEL (CRESCENTE)</option>
            <option value="8">NÍVEL (DECRESCENTE)</option>
            <option value="9">CPF (CRESCENTE)</option>
            <option value="10">CPF (DECRESCENTE)</option>
            <option value="11">ADMISSÃO (CRESCENTE)</option>
            <option value="12">ADMISSÃO (DECRESCENTE)</option>
            <option value="13">TIPO (CRESCENTE)</option>
            <option value="14">TIPO (DECRESCENTE)</option>
            <option value="15">ATIVO (CRESCENTE)</option>
            <option value="16">ATIVO (DECRESCENTE)</option>
            <option value="17">EMAIL (CRESCENTE)</option>
            <option value="18">EMAIL (DECRESCENTE)</option>
          </FormInputSelect>
          <FormButtonLink
            colSm={2}
            color="success"
            id="novo"
            text="NOVO"
            to="/funcionario/novo"
          />
        </Row>
        <Table id="tableEmployees" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th style={{ width: '20%' }}>NOME</th>
              <th style={{ width: '10%' }}>USUÁRIO</th>
              <th style={{ width: '12%' }}>NÍVEL</th>
              <th style={{ width: '12%' }}>CPF</th>
              <th style={{ width: '8%' }}>ADMISSÃO</th>
              <th style={{ width: '10%' }}>TIPO</th>
              <th style={{ width: '8%' }}>ATIVO</th>
              <th>EMAIL</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyEmployees"></tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}
