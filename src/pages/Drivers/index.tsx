import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';
import history from '../../services/history';
import { formatarData } from '../../utils/format';
import { Driver } from '../../models/Driver';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IndividualPerson } from '../../models/individual-person';

export function Drivers(): JSX.Element {
  const [data, setData] = useState(new Array<Driver>());
  const [drivers, setDrivers] = useState(new Array<Driver>());

  const [filter, setfilter] = useState('');
  const [register, setRegister] = useState('');
  const [orderBy, setOrderBy] = useState('1');

  useEffect(() => {
    const getData = async () => {
      const driversDB = await new Driver().get();
      setData(driversDB);
      setDrivers(driversDB);
    };

    getData();
  }, []);

  const filterData = (orderBy: string) => {
    let filteredData: Driver[] = [...data];
    if (register.length == 10) {
      filteredData = filteredData.filter(
        (item) => item.register.substring(0, 10) == register,
      );
    }

    if (filter.length > 0) {
      filteredData = filteredData.filter(
        (item) =>
          (item.person.individual as IndividualPerson).name.includes(filter) ||
          item.person.contact.email.includes(filter),
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
          if (
            (x.person.individual as IndividualPerson).name.toUpperCase() >
            (y.person.individual as IndividualPerson).name.toUpperCase()
          )
            return 1;
          if (
            (x.person.individual as IndividualPerson).name.toUpperCase() <
            (y.person.individual as IndividualPerson).name.toUpperCase()
          )
            return -1;
          return 0;
        });
        break;
      case '4':
        filteredData = filteredData.sort((x, y) => {
          if (
            (y.person.individual as IndividualPerson).name.toUpperCase() >
            (x.person.individual as IndividualPerson).name.toUpperCase()
          )
            return 1;
          if (
            (y.person.individual as IndividualPerson).name.toUpperCase() <
            (x.person.individual as IndividualPerson).name.toUpperCase()
          )
            return -1;
          return 0;
        });
        break;
      case '5':
        filteredData = filteredData.sort((x, y) => {
          if (
            (x.person.individual as IndividualPerson).cpf.toUpperCase() >
            (y.person.individual as IndividualPerson).cpf.toUpperCase()
          )
            return 1;
          if (
            (x.person.individual as IndividualPerson).cpf.toUpperCase() <
            (y.person.individual as IndividualPerson).cpf.toUpperCase()
          )
            return -1;
          return 0;
        });
        break;
      case '6':
        filteredData = filteredData.sort((x, y) => {
          if (
            (y.person.individual as IndividualPerson).cpf.toUpperCase() >
            (x.person.individual as IndividualPerson).cpf.toUpperCase()
          )
            return 1;
          if (
            (y.person.individual as IndividualPerson).cpf.toUpperCase() <
            (x.person.individual as IndividualPerson).cpf.toUpperCase()
          )
            return -1;
          return 0;
        });
        break;
      case '7':
        filteredData = filteredData.sort((x, y) => {
          if (x.register > y.register) return 1;
          if (x.register < y.register) return -1;
          return 0;
        });
        break;
      case '8':
        filteredData = filteredData.sort((x, y) => {
          if (y.register > x.register) return 1;
          if (y.register < x.register) return -1;
          return 0;
        });
        break;
      case '9':
        filteredData = filteredData.sort((x, y) => {
          if (x.person.contact.email.toUpperCase() > y.person.contact.email.toUpperCase())
            return 1;
          if (x.person.contact.email.toUpperCase() < y.person.contact.email.toUpperCase())
            return -1;
          return 0;
        });
        break;
      case '10':
        filteredData = filteredData.sort((x, y) => {
          if (y.person.contact.email.toUpperCase() > x.person.contact.email.toUpperCase())
            return 1;
          if (y.person.contact.email.toUpperCase() < x.person.contact.email.toUpperCase())
            return -1;
          return 0;
        });
        break;
    }

    return filteredData;
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegister(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
    setDrivers(filterData(e.target.value));
  };

  const handleFilterClick = () => {
    setDrivers(filterData(orderBy));
  };

  const remove = async (id: number) => {
    const response = confirm('Confirma o exclusão deste motorista?');
    if (response) {
      const driver = drivers.find((item) => item.id == id) as Driver;
      if (await driver.delete()) {
        const newData = [...data];
        delete newData[newData.findIndex((item) => item.id == id)];
        setData(newData);
        const newDrivers = [...drivers];
        delete newDrivers[newDrivers.findIndex((item) => item.id == id)];
        setDrivers(newDrivers);
      }
    }
  };

  return (
    <>
      <CardTitle text="Gerenciar Motoristas" />
      <FieldsetCard legend="Filtragem de Motoristas">
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
            onClick={handleFilterClick}
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Motoristas Cadastrados">
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
            <option value="5">CPF (CRESCENTE)</option>
            <option value="6">CPF (DECRESCENTE)</option>
            <option value="7">CADASTRO (CRESCENTE)</option>
            <option value="8">CADASTRO (DECRESCENTE)</option>
            <option value="9">EMAIL (CRESCENTE)</option>
            <option value="10">EMAIL (DECRESCENTE)</option>
          </FormInputSelect>
          <FormButtonLink
            colSm={2}
            color="success"
            id="novo"
            text="NOVO"
            to="/motorista/novo"
          />
        </Row>
        <Table id="tableDrivers" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th style={{ width: '40%' }}>NOME</th>
              <th style={{ width: '16%' }}>CPF</th>
              <th style={{ width: '10%' }}>CADASTRO</th>
              <th>EMAIL</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyDrivers">
            {drivers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{(item.person.individual as IndividualPerson).name}</td>
                <td>{(item.person.individual as IndividualPerson).cpf}</td>
                <td>{formatarData(item.register)}</td>
                <td>{item.person.contact.email}</td>
                <td>
                  <FaEdit
                    role="button"
                    color="blue"
                    size={14}
                    title="Editar"
                    onClick={() => {
                      history.push(`/motorista/editar/${item.id}`);
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
                    onClick={async () => await remove(item.id)}
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
