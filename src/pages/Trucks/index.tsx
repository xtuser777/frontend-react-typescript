import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';
import history from '../../services/history';
import * as actions from '../../store/modules/truck/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Truck } from '../../models/Truck';

export function Trucks(): JSX.Element {
  const truckState = useSelector((state: RootState) => state.truck);

  const dispatch = useDispatch();

  const [data, setData] = useState(new Array<Truck>());
  const [trucks, setTrucks] = useState(new Array<Truck>());

  const [filter, setfilter] = useState('');
  const [orderBy, setOrderBy] = useState('1');

  useEffect(() => {
    const getData = async () => {
      const trucksDB = await new Truck().get();
      setData(trucksDB);
      setTrucks(trucksDB);
    };

    getData();
  }, []);

  const filterData = (orderBy: string) => {
    let filteredData: Truck[] = [...data];
    if (filter.length > 0) {
      filteredData = filteredData.filter(
        (item) => item.brand.includes(filter) || item.model.includes(filter),
      );
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
          if (x.plate.toUpperCase() > y.plate.toUpperCase()) return 1;
          if (x.plate.toUpperCase() < y.plate.toUpperCase()) return -1;
          return 0;
        });
        break;
      case '4':
        filteredData = filteredData.sort((x, y) => {
          if (y.plate.toUpperCase() > x.plate.toUpperCase()) return 1;
          if (y.plate.toUpperCase() < x.plate.toUpperCase()) return -1;
          return 0;
        });
        break;
      case '5':
        filteredData = filteredData.sort((x, y) => {
          if (x.brand.toUpperCase() > y.brand.toUpperCase()) return 1;
          if (x.brand.toUpperCase() < y.brand.toUpperCase()) return -1;
          return 0;
        });
        break;
      case '6':
        filteredData = filteredData.sort((x, y) => {
          if (y.brand.toUpperCase() > x.brand.toUpperCase()) return 1;
          if (y.brand.toUpperCase() < x.brand.toUpperCase()) return -1;
          return 0;
        });
        break;
      case '7':
        filteredData = filteredData.sort((x, y) => {
          if (x.model.toUpperCase() > y.model.toUpperCase()) return 1;
          if (x.model.toUpperCase() < y.model.toUpperCase()) return -1;
          return 0;
        });
        break;
      case '8':
        filteredData = filteredData.sort((x, y) => {
          if (y.model.toUpperCase() > x.model.toUpperCase()) return 1;
          if (y.model.toUpperCase() < x.model.toUpperCase()) return -1;
          return 0;
        });
        break;
      case '9':
        filteredData = filteredData.sort((x, y) => {
          if (x.color.toUpperCase() > y.color.toUpperCase()) return 1;
          if (x.color.toUpperCase() < y.color.toUpperCase()) return -1;
          return 0;
        });
        break;
      case '10':
        filteredData = filteredData.sort((x, y) => {
          if (y.color.toUpperCase() > x.color.toUpperCase()) return 1;
          if (y.color.toUpperCase() < x.color.toUpperCase()) return -1;
          return 0;
        });
        break;
      case '11':
        filteredData = filteredData.sort((x, y) => x.modelYear - y.modelYear);
        break;
      case '12':
        filteredData = filteredData.sort((x, y) => y.modelYear - x.modelYear);
        break;
    }

    return filteredData;
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
    setTrucks(filterData(e.target.value));
  };

  const handleFilterClick = () => {
    setTrucks(filterData(orderBy));
  };

  const remove = (id: number) => {
    const response = confirm('Confirma o exclusão deste caminhão?');
    if (response) {
      dispatch(actions.truckDeleteRequest({ id }));
      if (truckState.success) {
        const newData = [...data];
        delete newData[newData.findIndex((item) => item.id == id)];
        setData(newData);
        const newTrucks = [...trucks];
        delete newTrucks[newTrucks.findIndex((item) => item.id == id)];
        setTrucks(newTrucks);
      }
    }
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
            onClick={handleFilterClick}
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

          <tbody id="tbodyTrucks">
            {trucks.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.plate}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.color}</td>
                <td>{item.modelYear}</td>
                <td>
                  <FaEdit
                    role="button"
                    color="blue"
                    size={14}
                    title="Editar"
                    onClick={() => {
                      history.push(`/caminhao/editar/${item.id}`);
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
