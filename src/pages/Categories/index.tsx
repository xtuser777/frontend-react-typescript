import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';
import { BillPayCategory } from '../../models/BillPayCategory';
import { FaEdit, FaTrash } from 'react-icons/fa';
import history from '../../services/history';

export function Categories(): JSX.Element {
  const [data, setData] = useState(new Array<BillPayCategory>());
  const [categories, setCategories] = useState(new Array<BillPayCategory>());

  const [filter, setfilter] = useState('');
  const [orderBy, setOrderBy] = useState('1');

  useEffect(() => {
    const getData = async () => {
      const data = await new BillPayCategory().get();
      setData(data);
      setCategories(data);
    };

    getData();
  }, []);

  const filterData = (orderBy: string) => {
    let filteredData: BillPayCategory[] = [...data];

    if (filter.length > 0) {
      filteredData = filteredData.filter((item) =>
        item.description.toUpperCase().includes(filter.toUpperCase()),
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
    }

    return filteredData;
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
    setCategories(filterData(e.target.value));
  };

  const handleFilterClick = () => {
    setCategories(filterData(orderBy));
  };

  const remove = async (id: number) => {
    const response = confirm('Confirma a exclusão desta categoria?');
    if (response) {
      const category = categories.find((item) => item.id == id) as BillPayCategory;
      if (await category.delete()) {
        const newData = [...data];
        delete newData[newData.findIndex((item) => item.id == id)];
        setData(newData);
        const newCategories = [...categories];
        delete newCategories[newCategories.findIndex((item) => item.id == id)];
        setCategories(newCategories);
      }
    }
  };

  return (
    <>
      <CardTitle text="Gerenciar Categorias de Contas" />
      <FieldsetCard legend="Filtragem de Categorias de Contas">
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
      <FieldsetCard legend="Categorias de Contas Cadastrados">
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
          </FormInputSelect>
          <FormButtonLink
            colSm={2}
            color="success"
            id="novo"
            text="NOVO"
            to="/categoria/novo"
          />
        </Row>
        <Table id="tableCategories" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th className="hidden">ID</th>
              <th>DESCRIÇÃO</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyCategories">
            {categories.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>
                  <FaEdit
                    role="button"
                    color="blue"
                    size={14}
                    title="Editar"
                    onClick={() => {
                      history.push(`/categoria/editar/${item.id}`);
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
