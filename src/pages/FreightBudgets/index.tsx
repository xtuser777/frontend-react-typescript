import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';
import { FreightBudget, IFreightBudget } from '../../models/FreightBudget';

export function FreightBudgets(): JSX.Element {
  const [data, setData] = useState(new Array<IFreightBudget>());
  const [budgets, setBudgets] = useState(new Array<IFreightBudget>());

  const [filter, setfilter] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [orderBy, setOrderBy] = useState('1');

  useEffect(() => {
    const getData = async () => {
      const data = await new FreightBudget().get();
      setData(data);
      setBudgets(data);
    };

    getData();
  }, []);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
  };

  const handleFilterClick = () => {
    alert(`${filter}, ${date}, ${orderBy}`);
  };

  return (
    <>
      <CardTitle text="Gerenciar Orçamentos de Frete" />
      <FieldsetCard legend="Filtragem de Orçamentos">
        <Row>
          <FormInputText
            colSm={8}
            id="filtro"
            label="Filtro"
            obrigatory={false}
            value={filter}
            placeholder="Filtrar por descrição..."
            onChange={(e) => handleFilterChange(e)}
          />
          <FormInputDate
            colSm={2}
            id="data"
            label="Data"
            obrigatory={false}
            value={date}
            onChange={(e) => handleDateChange(e)}
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
      <FieldsetCard legend="Orçamentos Abertos">
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
            <option value="3">DESCRIÇÂO (CRESCENTE)</option>
            <option value="4">DESCRIÇÂO (DECRESCENTE)</option>
            <option value="5">CLIENTE (CRESCENTE)</option>
            <option value="6">CLIENTE (DECRESCENTE)</option>
            <option value="7">DATA (CRESCENTE)</option>
            <option value="8">DATA (DECRESCENTE)</option>
            <option value="9">AUTOR (CRESCENTE)</option>
            <option value="10">AUTOR (DECRESCENTE)</option>
            <option value="11">VALOR (CRESCENTE)</option>
            <option value="12">VALOR (DECRESCENTE)</option>
          </FormInputSelect>
          <FormButtonLink
            colSm={2}
            color="success"
            id="novo"
            text="NOVO"
            to="/orcamento/frete/novo"
          />
        </Row>
        <Table id="tableBudgets" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th>DESCRIÇÃO</th>
              <th>CLIENTE</th>
              <th>DATA</th>
              <th>AUTOR</th>
              <th>VALOR (R$)</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyBudgets"></tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}
