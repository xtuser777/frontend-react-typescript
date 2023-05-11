import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';
import { Client } from '../../models/client';
import { IndividualPerson } from '../../models/individual-person';
import { EnterprisePerson } from '../../models/enterprise-person';
import { FaEdit, FaTrash } from 'react-icons/fa';
import history from '../../services/history';
import { formatarData } from '../../utils/format';

export function Clients(): JSX.Element {
  const [data, setData] = useState(new Array<Client>());
  const [clients, setClients] = useState(new Array<Client>());

  const [filter, setfilter] = useState('');
  const [register, setRegister] = useState('');
  const [orderBy, setOrderBy] = useState('1');

  useEffect(() => {
    const getData = async () => {
      const clientsDB = await new Client().get();
      setData(clientsDB);
      setClients(clientsDB);
    };

    getData();
  }, []);

  const filterData = (orderBy: string) => {
    let filteredData: Client[] = [...data];
    if (register.length == 10) {
      filteredData = filteredData.filter(
        (item) => item.register.substring(0, 10) == register,
      );
    }

    if (filter.length > 0) {
      filteredData = filteredData.filter(
        (item) =>
          (item.person as IndividualPerson).name.includes(filter) ||
          (item.person as IndividualPerson).contact.email.includes(filter),
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
            (x.person as IndividualPerson).name.toUpperCase() >
            (y.person as IndividualPerson).name.toUpperCase()
          )
            return 1;
          if (
            (x.person as IndividualPerson).name.toUpperCase() <
            (y.person as IndividualPerson).name.toUpperCase()
          )
            return -1;
          return 0;
        });
        break;
      case '4':
        filteredData = filteredData.sort((x, y) => {
          if (
            (y.person as IndividualPerson).name.toUpperCase() >
            (x.person as IndividualPerson).name.toUpperCase()
          )
            return 1;
          if (
            (y.person as IndividualPerson).name.toUpperCase() <
            (x.person as IndividualPerson).name.toUpperCase()
          )
            return -1;
          return 0;
        });
        break;
      case '5':
        filteredData = filteredData.sort((x, y) => {
          if (x.type == 1) {
            if (
              (x.person as IndividualPerson).cpf.toUpperCase() >
              (y.person as IndividualPerson).cpf.toUpperCase()
            )
              return 1;
            if (
              (x.person as IndividualPerson).cpf.toUpperCase() <
              (y.person as IndividualPerson).cpf.toUpperCase()
            )
              return -1;
            return 0;
          } else {
            if (
              (x.person as EnterprisePerson).cnpj.toUpperCase() >
              (y.person as EnterprisePerson).cnpj.toUpperCase()
            )
              return 1;
            if (
              (x.person as EnterprisePerson).cnpj.toUpperCase() <
              (y.person as EnterprisePerson).cnpj.toUpperCase()
            )
              return -1;
            return 0;
          }
        });
        break;
      case '6':
        filteredData = filteredData.sort((x, y) => {
          if (y.type == 1) {
            if (
              (y.person as IndividualPerson).cpf.toUpperCase() >
              (x.person as IndividualPerson).cpf.toUpperCase()
            )
              return 1;
            if (
              (y.person as IndividualPerson).cpf.toUpperCase() <
              (x.person as IndividualPerson).cpf.toUpperCase()
            )
              return -1;
            return 0;
          } else {
            if (
              (y.person as EnterprisePerson).cnpj.toUpperCase() >
              (x.person as EnterprisePerson).cnpj.toUpperCase()
            )
              return 1;
            if (
              (y.person as EnterprisePerson).cnpj.toUpperCase() <
              (x.person as EnterprisePerson).cnpj.toUpperCase()
            )
              return -1;
            return 0;
          }
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
        filteredData = filteredData.sort((x, y) => x.type - y.type);
        break;
      case '10':
        filteredData = filteredData.sort((x, y) => y.type - x.type);
        break;
      case '11':
        filteredData = filteredData.sort((x, y) => {
          if (
            (x.person as IndividualPerson).contact.email.toUpperCase() >
            (y.person as IndividualPerson).contact.email.toUpperCase()
          )
            return 1;
          if (
            (x.person as IndividualPerson).contact.email.toUpperCase() <
            (y.person as IndividualPerson).contact.email.toUpperCase()
          )
            return -1;
          return 0;
        });
        break;
      case '12':
        filteredData = filteredData.sort((x, y) => {
          if (
            (y.person as IndividualPerson).contact.email.toUpperCase() >
            (x.person as IndividualPerson).contact.email.toUpperCase()
          )
            return 1;
          if (
            (y.person as IndividualPerson).contact.email.toUpperCase() <
            (x.person as IndividualPerson).contact.email.toUpperCase()
          )
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
    setClients(filterData(e.target.value));
  };

  const handleFilterClick = () => {
    setClients(filterData(orderBy));
  };

  function excluir(id: number): void | PromiseLike<void> {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <CardTitle text="Gerenciar Clientes" />
      <FieldsetCard legend="Filtragem de Clientes">
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
      <FieldsetCard legend="Clientes Cadastrados">
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
            <option value="5">CPF/CNPJ (CRESCENTE)</option>
            <option value="6">CPF/CNPJ (DECRESCENTE)</option>
            <option value="7">CADASTRO (CRESCENTE)</option>
            <option value="8">CADASTRO (DECRESCENTE)</option>
            <option value="9">TIPO (CRESCENTE)</option>
            <option value="10">TIPO (DECRESCENTE)</option>
            <option value="11">EMAIL (CRESCENTE)</option>
            <option value="12">EMAIL (DECRESCENTE)</option>
          </FormInputSelect>
          <FormButtonLink
            colSm={2}
            color="success"
            id="novo"
            text="NOVO"
            to="/cliente/novo"
          />
        </Row>
        <Table id="tableClients" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th style={{ width: '40%' }}>NOME/NOME FANTASIA</th>
              <th style={{ width: '14%' }}>CPF/CNPJ</th>
              <th style={{ width: '10%' }}>CADASTRO</th>
              <th style={{ width: '6%' }}>TIPO</th>
              <th>EMAIL</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyClients">
            {clients.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {item.type == 1
                    ? (item.person as IndividualPerson).name
                    : (item.person as EnterprisePerson).fantasyName}
                </td>
                <td>
                  {item.type == 1
                    ? (item.person as IndividualPerson).cpf
                    : (item.person as EnterprisePerson).cnpj}
                </td>
                <td>{formatarData(item.register)}</td>
                <td>{item.type == 1 ? 'Física' : 'Juridica'}</td>
                <td>
                  {item.type == 1
                    ? (item.person as IndividualPerson).contact.email
                    : (item.person as EnterprisePerson).contact.email}
                </td>
                <td>
                  <FaEdit
                    role="button"
                    color="blue"
                    size={14}
                    title="Editar"
                    onClick={() => {
                      history.push(`/cliente/editar/${item.id}`);
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
                    onClick={() => excluir(item.id)}
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
