import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';
import axios from '../../services/axios';
import { formatarData } from '../../utils/format';
import { FaEdit, FaPowerOff, FaTrash } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

interface IData {
  id: number;
  login: string;
  active: boolean;
  employee: {
    admission: string;
    type: number;
    person: {
      cpf: string;
      name: string;
      contact: {
        email: string;
      };
    };
  };
  level: {
    description: string;
  };
}

export function Employees(): JSX.Element {
  const [data, setData] = useState(new Array<IData>());
  const [employees, setEmployees] = useState(new Array<IData>());

  const [filter, setfilter] = useState('');
  const [admission, setAdmission] = useState('');
  const [orderBy, setOrderBy] = useState('1');

  useEffect(() => {
    const getData = async () => {
      const receivedData = await axios.get('/employee');
      setData(receivedData.data);
      setEmployees(receivedData.data);
    };

    getData();
  }, []);

  const filterData = (orderBy: string): IData[] => {
    let filteredData: IData[] = data;
    if (admission.length == 10) {
      filteredData = filteredData.filter(
        (item) => item.employee.admission.substring(0, 10) == admission,
      );
    }

    if (filter.length > 0) {
      filteredData = filteredData.filter(
        (item) =>
          item.login.includes(filter) ||
          item.employee.person.name.includes(filter) ||
          item.employee.person.contact.email.includes(filter),
      );
    }

    switch (orderBy) {
      case '1':
        filteredData = filteredData.sort((x, y) => x.id - y.id);
        break;
      case '2':
        filteredData = filteredData.sort((x, y) => y.id - x.id);
        break;
    }

    return filteredData;
  };

  const isLastAdmin = (currentLevel: string) => {
    const admins = data.filter((item) => item.level.description == 'Administrador');
    if (admins.length == 1 && currentLevel == 'Administrador') return true;
    else return false;
  };

  function excluir(id: number, nivel: string) {
    const nivel_atual = nivel;

    if (isLastAdmin(nivel_atual) === true) {
      alert('Não é possível excluir o último administrador.');
    } else {
      const response = confirm('Confirma o excluir deste funcionário?');
    }
  }

  function desativar(id: number, nivel: string) {
    const nivel_atual = nivel;

    if (isLastAdmin(nivel_atual) === true) {
      alert('Não é possível excluir o último administrador.');
    } else {
      const response = confirm('Confirma o desligamento deste funcionário?');
    }
  }

  function reativar(id: number) {
    const response = confirm('Confirma a Reativação deste funcionário?');
  }

  function alterar(id: number) {
    return <Navigate to={`/funcionario/editar/${id}`} />;
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleAdmissionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmission(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
    setEmployees(filterData(e.target.value));
  };

  const handleFilterClick = () => {
    const data = filterData(orderBy);

    setEmployees(data);
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

          <tbody id="tbodyEmployees">
            {employees.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.employee.person.name}</td>
                <td>{item.login}</td>
                <td>{item.level.description}</td>
                <td>{item.employee.person.cpf}</td>
                <td>{formatarData(item.employee.admission)}</td>
                <td>{item.employee.type == 1 ? 'Interno' : 'Vendedor'}</td>
                <td>{item.active == true ? 'Sim' : 'Não'}</td>
                <td>{item.employee.person.contact.email}</td>
                <td>
                  <FaPowerOff
                    role="button"
                    color="gray"
                    size={14}
                    title={item.active ? 'Desativar' : 'Reativar'}
                    onClick={(e) =>
                      item.active
                        ? desativar(item.id, item.level.description)
                        : reativar(item.id)
                    }
                  />
                </td>
                <td>
                  <FaEdit
                    role="button"
                    color="blue"
                    size={14}
                    title="Editar"
                    onClick={(e) => alterar(item.id)}
                  />
                </td>
                <td>
                  <FaTrash
                    role="button"
                    color="red"
                    size={14}
                    title="Excluir"
                    onClick={(e) => excluir(item.id, item.level.description)}
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
