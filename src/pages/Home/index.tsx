import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Button, Col, Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButton } from '../../components/form-button';

export function Home(): JSX.Element {
  const [filter, setFilter] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [orderType, setOrderType] = useState('0');

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleOrderTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderType(e.target.value);
  };

  const handleFilterClick = (e: MouseEvent) => {
    alert(`${filter}, ${date}, ${orderType}`);
  };

  const handlePdfClick = (e: MouseEvent) => {
    alert('Gerar PDF clicado.');
  };

  return (
    <>
      <CardTitle text="Eventos do Sistema" />
      <FieldsetCard legend="Filtragem dos Eventos">
        <Row>
          <FormInputText
            colSm={5}
            id="filtro"
            label="Filtro"
            obrigatory={false}
            value={filter}
            onChange={(e) => handleFilterChange(e)}
          />
          <FormInputDate
            colSm={2}
            id="data"
            label="Data dos Eventos"
            obrigatory={false}
            value={date}
            onChange={(e) => handleDateChange(e)}
          />
          <FormInputSelect
            colSm={3}
            id="tipo"
            label="Tipo de Pedido"
            obrigatory={false}
            value={orderType}
            onChange={(e) => handleOrderTypeChange(e)}
          >
            <option value="0">SELECIONE</option>
            <option value="1">VENDA</option>
            <option value="2">FRETE</option>
          </FormInputSelect>
          <FormButton
            colSm={2}
            color={'primary'}
            id="filtrar"
            text="FILTRAR"
            onClick={(e) => handleFilterClick(e)}
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Eventos do Sistema">
        <Table id="tableEventos" striped hover size="sm" responsive>
          <thead>
            <tr>
              <th>DESCRIÇÃO</th>
              <th>DATA</th>
              <th>HORA</th>
              <th>PEDIDO</th>
              <th>AUTOR</th>
            </tr>
          </thead>

          <tbody id="tbodyEventos">
            <tr>
              <td>Teste</td>
              <td>11/04/2023</td>
              <td>12:00</td>
              <td>001</td>
              <td>Suporte</td>
            </tr>
            <tr>
              <td>Teste</td>
              <td>11/04/2023</td>
              <td>12:00</td>
              <td>001</td>
              <td>Suporte</td>
            </tr>
            <tr>
              <td>Teste</td>
              <td>11/04/2023</td>
              <td>12:00</td>
              <td>001</td>
              <td>Suporte</td>
            </tr>
            <tr>
              <td>Teste</td>
              <td>11/04/2023</td>
              <td>12:00</td>
              <td>001</td>
              <td>Suporte</td>
            </tr>
            <tr>
              <td>Teste</td>
              <td>11/04/2023</td>
              <td>12:00</td>
              <td>001</td>
              <td>Suporte</td>
            </tr>
          </tbody>
        </Table>
      </FieldsetCard>
      <Row>
        <Col sm="4"></Col>
        <Col sm="4">
          <Button
            color="primary"
            id="pdf"
            style={{ width: '100%' }}
            size="sm"
            onClick={(e) => handlePdfClick(e)}
          >
            Gerar PDF
          </Button>
        </Col>
        <Col sm="4"></Col>
      </Row>
    </>
  );
}
