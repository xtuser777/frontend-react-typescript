import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Button, Col, Row } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputDate } from '../../components/form-input-date';
import { useParams } from 'react-router-dom';
import { FormInputTextarea } from '../../components/form-input-textarea';

export function FreightOrderStatus(): JSX.Element {
  const routeParams = useParams();
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  const [orderDescription, setOrderDescription] = useState('');
  const [orderCurrentStatus, setOrderCurrentStatus] = useState('');
  const [orderStatusDate, setOrderStatusDate] = useState(
    new Date().toISOString().substring(0, 10),
  );

  const [status, setStatus] = useState('0');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [observation, setObservation] = useState('');

  //const handleChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleOrderDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderDescription(e.target.value);
  };
  const handleOrderCurrentStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderCurrentStatus(e.target.value);
  };
  const handleOrderStatusDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderStatusDate(e.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const handleObservationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setObservation(e.target.value);
  };

  const handleButtons = {
    handleClearClick: (e: MouseEvent) => {
      alert('Limpar clicado.');
    },
    handleSaveClick: (e: MouseEvent) => {
      alert('Salvar clicado.');
    },
  };

  return (
    <>
      <CardTitle text={'Alterar Status do Pedido'} />
      <FieldsetCard legend="Status Atual do Pedido">
        <Row>
          <FormInputText
            colSm={6}
            id="descricao-pedido"
            label="Descrição do pedido"
            obrigatory={false}
            value={orderDescription}
            onChange={(e) => handleOrderDescriptionChange(e)}
            readonly
          />
          <FormInputText
            colSm={3}
            id="status-atual-pedido"
            label="Status do pedido"
            obrigatory={false}
            value={orderCurrentStatus}
            onChange={(e) => handleOrderCurrentStatusChange(e)}
            readonly
          />
          <FormInputDate
            colSm={3}
            id="data-status-pedido"
            label="Data do status"
            obrigatory={false}
            value={orderStatusDate}
            onChange={(e) => handleOrderStatusDateChange(e)}
            readonly
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Novo Status do Pedido" obrigatoryFields>
        <Row>
          <Col sm="3">
            <Row>
              <FormInputSelect
                colSm={12}
                id="novo-status"
                label="Novo Status"
                obrigatory
                value={status}
                onChange={handleStatusChange}
              >
                <option value="0">SELECIONE</option>
              </FormInputSelect>
            </Row>
            <Row>
              <FormInputDate
                colSm={12}
                id="data-status"
                label="Data"
                obrigatory
                value={date}
                onChange={handleDateChange}
              />
            </Row>
          </Col>
          <Col sm="9">
            <Row>
              <FormInputTextarea
                colSm={12}
                label={'Observações'}
                id={'observations'}
                rows={5}
                obrigatory={false}
                value={observation}
                onChange={handleObservationChange}
              />
            </Row>
          </Col>
        </Row>
      </FieldsetCard>
      <FormButtonsSave
        backLink="/pedidos/frete/status"
        clear={false}
        handle={handleButtons}
      />
    </>
  );
}
