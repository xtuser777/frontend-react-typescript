import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';
import history from '../../services/history';
import * as actions from '../../store/modules/truck-type/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { TruckType } from '../../models/truck-type';

export function TruckTypes(): JSX.Element {
  const typeState = useSelector((state: RootState) => state.truckType);

  const dispatch = useDispatch();

  const [data, setData] = useState(new Array<TruckType>());
  const [types, setTypes] = useState(new Array<TruckType>());

  const [filter, setfilter] = useState('');
  const [orderBy, setOrderBy] = useState('1');

  useEffect(() => {
    const getData = async () => {
      const typesDB = await new TruckType().get();
      setData(typesDB);
      setTypes(typesDB);
    };

    getData();
  }, []);

  const filterData = (orderBy: string) => {
    let filteredData: TruckType[] = [...data];
    if (filter.length > 0) {
      filteredData = filteredData.filter((item) => item.description.includes(filter));
    }

    switch (orderBy) {
      case '1':
        filteredData = filteredData.sort((x, y) => x.id - y.id);
        break;
      case '2':
        filteredData = filteredData.sort((x, y) => y.id - x.id);
        break;
      case '3':
        filteredData = filteredData.sort((x, y) => {
          if (x.description.toUpperCase() > y.description.toUpperCase()) return 1;
          if (x.description.toUpperCase() < y.description.toUpperCase()) return -1;
          return 0;
        });
        break;
      case '4':
        filteredData = filteredData.sort((x, y) => {
          if (y.description.toUpperCase() > x.description.toUpperCase()) return 1;
          if (y.description.toUpperCase() < x.description.toUpperCase()) return -1;
          return 0;
        });
        break;
      case '5':
        filteredData = filteredData.sort((x, y) => x.axes - y.axes);
        break;
      case '6':
        filteredData = filteredData.sort((x, y) => y.axes - x.axes);
        break;
      case '7':
        filteredData = filteredData.sort((x, y) => x.capacity - y.capacity);
        break;
      case '8':
        filteredData = filteredData.sort((x, y) => y.capacity - x.capacity);
        break;
    }

    return filteredData;
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
    setTypes(filterData(e.target.value));
  };

  const handleFilterClick = () => {
    setTypes(filterData(orderBy));
  };

  const remove = (id: number) => {
    const response = confirm('Confirma o exclusão deste tipo de caminhão?');
    if (response) {
      dispatch(actions.truckTypeDeleteRequest({ id }));
      if (typeState.success) {
        const newData = [...data];
        delete newData[newData.findIndex((item) => item.id == id)];
        setData(newData);
        const newTypes = [...types];
        delete newTypes[newTypes.findIndex((item) => item.id == id)];
        setTypes(newTypes);
      }
    }
  };

  return (
    <>
      <CardTitle text="Gerenciar Tipos de Caminhão" />
      <FieldsetCard legend="Filtragem de Tipos de Caminhão">
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
            onClick={handleFilterClick}
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Tipos de Caminhão Cadastrados">
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
            <option value="5">EIXOS (CRESCENTE)</option>
            <option value="6">EIXOS (DECRESCENTE)</option>
            <option value="7">CAPACIDADE (CRESCENTE)</option>
            <option value="8">CAPACIDADE (DECRESCENTE)</option>
          </FormInputSelect>
          <FormButtonLink
            colSm={2}
            color="success"
            id="novo"
            text="NOVO"
            to="/tipocaminhao/novo"
          />
        </Row>
        <Table id="tableTruckType" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th style={{ width: '40%' }}>DESCRIÇÃO</th>
              <th style={{ width: '16%' }}>EIXOS</th>
              <th style={{ width: '10%' }}>CAPACIDADE</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyTruckType">
            {types.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>{item.axes}</td>
                <td>{item.capacity}</td>
                <td>
                  <FaEdit
                    role="button"
                    color="blue"
                    size={14}
                    title="Editar"
                    onClick={() => {
                      history.push(`/tipocaminhao/editar/${item.id}`);
                      window.location.reload();
                    }}
                  />
                </td>
                <td>
                  <FaTrash
                    role="button"
                    color="red"
                    size={14}
                    title="Excluir"
                    onClick={() => remove(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </FieldsetCard>
    </>
  );
}
