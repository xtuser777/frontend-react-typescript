import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Button, Col, Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButton } from '../../components/form-button';
import axios from '../../services/axios';
import { formatarData } from '../../utils/format';

interface IModel {
  id: number;
  date: string;
  time: string;
  description: string;
  freightOrder: { id: number; description: string } | undefined;
  salesOrder: { id: number; description: string } | undefined;
  author: { id: number; employee: { id: number; person: { id: number; name: string } } };
}

export function Home(): JSX.Element {
  const [events, setEvents] = useState(new Array<IModel>());

  const [filter, setFilter] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [orderType, setOrderType] = useState('0');

  useEffect(() => {
    const getData = async () => {
      const receivedData = await axios.get('/event');
      const data: IModel[] = [];
      for (const item of receivedData.data) {
        data.push({
          id: item.id,
          date: item.date,
          time: item.time,
          description: item.description,
          salesOrder: item.salesOrder
            ? {
                id: item.salesOrder.id,
                description: item.salesOrder.description,
              }
            : undefined,
          freightOrder: item.freightOrder
            ? {
                id: item.freightOrder.id,
                description: item.freightOrder.description,
              }
            : undefined,
          author: {
            id: item.author.id,
            employee: {
              id: item.author.employee.id,
              person: {
                id: item.author.employee.person.id,
                name: item.author.employee.person.name,
              },
            },
          },
        });
      }
      setEvents(data);
    };

    getData();
  }, []);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleOrderTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderType(e.target.value);
  };

  const handleFilterClick = async () => {
    const receivedData = await axios.post('/event', {
      filter,
      date,
      type: orderType == '0' ? undefined : Number.parseInt(orderType),
    });
    console.log(receivedData.data);
    const data: IModel[] = [];
    for (const item of receivedData.data) {
      data.push({
        id: item.id,
        date: item.date,
        time: item.time,
        description: item.description,
        salesOrder: item.salesOrder
          ? {
              id: item.salesOrder.id,
              description: item.salesOrder.description,
            }
          : undefined,
        freightOrder: item.freightOrder
          ? {
              id: item.freightOrder.id,
              description: item.freightOrder.description,
            }
          : undefined,
        author: {
          id: item.author.id,
          employee: {
            id: item.author.employee.id,
            person: {
              id: item.author.employee.person.id,
              name: item.author.employee.person.name,
            },
          },
        },
      });
    }
    setEvents(data);
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
            onClick={async () => await handleFilterClick()}
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
            {events.map((item: IModel) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>{formatarData(item.date)}</td>
                <td>{item.time}</td>
                <td>
                  {item.salesOrder
                    ? item.salesOrder.description
                    : item.freightOrder
                    ? item.freightOrder.description
                    : ''}
                </td>
                <td>{item.author.employee.person.name}</td>
              </tr>
            ))}
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
