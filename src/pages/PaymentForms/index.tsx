import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormButton } from '../../components/form-button';
import { FormInputSelect } from '../../components/form-input-select';
import { FormButtonLink } from '../../components/form-button-link';
import { PaymentForm } from '../../models/PaymentForm';
import { FaEdit, FaTrash } from 'react-icons/fa';
import history from '../../services/history';

export function PaymentForms(): JSX.Element {
  const [data, setData] = useState(new Array<PaymentForm>());
  const [forms, setForms] = useState(new Array<PaymentForm>());

  const [filter, setfilter] = useState('');
  const [orderBy, setOrderBy] = useState('1');

  useEffect(() => {
    const getData = async () => {
      const data = await new PaymentForm().get();
      setData(data);
      setForms(data);
    };

    getData();
  }, []);

  const filterData = (orderBy: string) => {
    let filteredData: PaymentForm[] = [...data];

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
      case '5':
        filteredData = filteredData.sort((x, y) => x.link - y.link);
        break;
      case '6':
        filteredData = filteredData.sort((x, y) => y.link - x.link);
        break;
      case '7':
        filteredData = filteredData.sort((x, y) => x.deadline - y.deadline);
        break;
      case '8':
        filteredData = filteredData.sort((x, y) => y.deadline - x.deadline);
        break;
    }

    return filteredData;
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilter(e.target.value);
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
    setForms(filterData(e.target.value));
  };

  const handleFilterClick = () => {
    setForms(filterData(orderBy));
  };

  const remove = async (id: number) => {
    const response = confirm('Confirma a exclusão desta forma de pagamento?');
    if (response) {
      const form = forms.find((item) => item.id == id) as PaymentForm;
      if (await form.delete()) {
        const newData = [...data];
        delete newData[newData.findIndex((item) => item.id == id)];
        setData(newData);
        const newForms = [...forms];
        delete newForms[newForms.findIndex((item) => item.id == id)];
        setForms(newForms);
      }
    }
  };

  return (
    <>
      <CardTitle text="Gerenciar Formas de Pagamento" />
      <FieldsetCard legend="Filtragem de Formas de Pagamento">
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
      <FieldsetCard legend="Formas de Pagamento Cadastrados">
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
            <option value="5">VÍNCULO (CRESCENTE)</option>
            <option value="6">VÍNCULO (DECRESCENTE)</option>
            <option value="7">PRAZO (CRESCENTE)</option>
            <option value="8">PRAZO (DECRESCENTE)</option>
          </FormInputSelect>
          <FormButtonLink
            colSm={2}
            color="success"
            id="novo"
            text="NOVO"
            to="/formapagamento/novo"
          />
        </Row>
        <Table id="tablePaymentForms" size="sm" striped hover responsive>
          <thead>
            <tr>
              <th hidden></th>
              <th style={{ width: '40%' }}>DESCRIÇÃO</th>
              <th style={{ width: '20%' }}>VÍNCULO</th>
              <th style={{ width: '20%' }}>PRAZO</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
              <th style={{ width: '2%' }}>&nbsp;</th>
            </tr>
          </thead>

          <tbody id="tbodyPaymentForms">
            {forms.map((item) => (
              <tr key={item.id}>
                <td hidden>{item.id}</td>
                <td>{item.description}</td>
                <td>{item.link == 1 ? 'Conta a pagar' : 'Conta a receber'}</td>
                <td>{item.deadline}</td>
                <td>
                  <FaEdit
                    role="button"
                    color="blue"
                    size={14}
                    title="Editar"
                    onClick={() => {
                      history.push(`/formapagamento/editar/${item.id}`);
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
