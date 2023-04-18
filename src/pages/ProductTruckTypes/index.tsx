import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';
import { useParams } from 'react-router-dom';

export function ProductTruckTypes(): JSX.Element {
  const [filter, setfilter] = useState('');
  const [orderBy, setOrderBy] = useState('1');
  const [type, setType] = useState('0');

  const routeParams = useParams();
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
  };

  const handleFilterClick = (e: MouseEvent) => {
    alert(`${filter}, ${orderBy}`);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleAddClick = () => {
    alert('Adicionar clicado.');
  };

  return (
    <>
      <CardTitle text="Produto - Vincular Tipos de Caminhão" />
      <FieldsetCard legend="Filtragem de Vínculos">
        <Row>
          <FormInputText
            colSm={10}
            id="filtro"
            label="Filtro"
            obrigatory={false}
            value={filter}
            placeholder="Filtrar por descrição..."
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
      <FieldsetCard legend="Vínculos Cadastrados">
        <Row style={{ marginBottom: '10px' }}>
          <FormInputSelect
            colSm={12}
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
            <option value="5">EIXOS (CRESCENTE)</option>
            <option value="6">EIXOS (DECRESCENTE)</option>
            <option value="7">CAPACIDADE (CRESCENTE)</option>
            <option value="8">CAPACIDADE (DECRESCENTE)</option>
          </FormInputSelect>
        </Row>
        <Row>
          <FormButtonLink
            colSm={2}
            color="secondary"
            id="voltar"
            text="VOLTAR"
            to="/produtos"
          />
          <FormInputSelect
            colSm={8}
            id="tipo"
            label="Tipos para adição"
            obrigatory={false}
            value={type}
            onChange={handleTypeChange}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
          <FormButton
            colSm={2}
            color="success"
            id="add"
            text="ADICIONAR"
            onClick={handleAddClick}
          />
        </Row>
        <Table id="tableLinks" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th style={{ width: '40%' }}>DESCRIÇÃO</th>
              <th style={{ width: '16%' }}>EIXOS</th>
              <th style={{ width: '10%' }}>CAPACIDADE</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyLinks"></tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}
