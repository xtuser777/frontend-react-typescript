import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Button, Col, Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButton } from '../../components/form-button';
import { formatarData } from '../../utils/format';
import { Event, IEvent } from '../../models/Event';
import axios from '../../services/axios';

export function Home(): JSX.Element {
  const [data, setData] = useState(new Array<IEvent>());
  const [events, setEvents] = useState(new Array<IEvent>());

  const [filter, setFilter] = useState('');
  const [date, setDate] = useState('');
  const [orderType, setOrderType] = useState('0');

  useEffect(() => {
    const getData = async () => {
      const receivedData = await new Event().get();
      setData(receivedData);
      setEvents(receivedData);
    };

    getData();
  }, []);

  const filterData = (): IEvent[] => {
    let filteredData: IEvent[] = [...data];
    if (date.length == 10) {
      filteredData = filteredData.filter((item) => item.date.substring(0, 10) == date);
    }

    if (orderType != '0') {
      filteredData = filteredData.filter((item) => {
        if (orderType == '1') return item.saleOrder;
        if (orderType == '2') return item.freightOrder;
      });
    }

    if (filter.length > 0) {
      filteredData = filteredData.filter((item) => item.description.includes(filter));
    }

    return filteredData;
  };

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
    const data = filterData();

    setEvents(data);
  };

  const handlePdfClick = async () => {
    const result = await axios.get(
      `/event/report/{"filter": "${filter}", "date": "${date}", "type": "${orderType}"}`,
    );
    if (result.data) {
      const fileDate = new Date().toISOString().substring(0, 10);
      const time = new Date()
        .toLocaleTimeString('en-US', {
          timeZone: 'America/Sao_Paulo',
        })
        .substring(0, 8);
      const guia = window.open(
        `http://localhost:3001/reports/RelatorioEventos${fileDate.replaceAll(
          '-',
          '',
        )}-${time.trim().replaceAll(':', '')}.pdf`,
        '_blank',
      );
    }
  };

  return (
    <>
      <CardTitle text="Eventos do Sistema" />
      <FieldsetCard legend="Filtragem dos Eventos">
        <Row>
          <FormInputText
            colSm={4}
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
            colSm={2}
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
          <FormButton
            colSm={2}
            color={'info'}
            id="emitir"
            text="EMITIR PDF"
            onClick={async () => await handlePdfClick()}
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
            {events.map((item: IEvent) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>{formatarData(item.date)}</td>
                <td>{item.time}</td>
                <td>
                  {item.saleOrder
                    ? item.saleOrder.description
                    : item.freightOrder
                    ? item.freightOrder.description
                    : ''}
                </td>
                <td>{item.author.person.individual?.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}
