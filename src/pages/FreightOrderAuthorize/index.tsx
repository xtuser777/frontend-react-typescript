import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Button, Col, Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputDate } from '../../components/form-input-date';
import { redirect, useParams } from 'react-router-dom';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputGroupNumber } from '../../components/form-input-group-number';
import { FormButton } from '../../components/form-button';

export function FreightOrderAuthorize(): JSX.Element {
  const routeParams = useParams();
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  const [orderDescription, setOrderDescription] = useState('');
  const [orderDestiny, setOrderDestiny] = useState('');
  const [orderDriver, setOrderDriver] = useState('');

  const [orderTruckProprietary, setOrderTruckProprietary] = useState('');
  const [orderTruck, setOrderTruck] = useState('');
  const [orderTruckType, setOrderTruckType] = useState('');
  const [orderDistance, setOrderDistance] = useState(0);
  const [orderShipping, setOrderShipping] = useState(
    new Date().toISOString().substring(0, 10),
  );

  const [orderRepresentation, setOrderRepresentation] = useState('');
  const [orderDestinyCity, setOrderDestinyCity] = useState('');
  const [orderLoad, setOrderLoad] = useState('');

  //const handleChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleOrderDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderDescription(e.target.value);
  };
  const handleOrderDestinyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderDestiny(e.target.value);
  };
  const handleOrderDriverChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderDriver(e.target.value);
  };

  const handleOrderTruckProprietaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderTruckProprietary(e.target.value);
  };
  const handleOrderTruckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderTruck(e.target.value);
  };
  const handleOrderTruckTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderTruckType(e.target.value);
  };
  const handleOrderDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderDistance(Number.parseInt(e.target.value));
  };
  const handleOrderShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderShipping(e.target.value);
  };

  const handleOrderRepresentationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderRepresentation(e.target.value);
  };
  const handleOrderDestinyCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderDestinyCity(e.target.value);
  };
  const handleOrderLoadChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderLoad(e.target.value);
  };

  const handleAuthorizeClick = () => {
    alert('Autorizando...');
  };

  const handleBackClick = (e: MouseEvent) => {
    redirect('/pedidos/frete/autorizar');
  };

  return (
    <>
      <CardTitle text={'Autorizar Carregamento de Etapas de Pedidos de Frete'} />
      <FieldsetCard legend="Informações do pedido">
        <Row>
          <FormInputText
            colSm={5}
            id="descricao-pedido"
            label="Descrição"
            obrigatory={false}
            value={orderDescription}
            onChange={handleOrderDescriptionChange}
            readonly
          />
          <FormInputText
            colSm={4}
            id="destino-pedido"
            label="Destino"
            obrigatory={false}
            value={orderDestiny}
            onChange={handleOrderDestinyChange}
            readonly
          />
          <FormInputText
            colSm={3}
            id="motorista-pedido"
            label="Motorista"
            obrigatory={false}
            value={orderDriver}
            onChange={handleOrderDriverChange}
            readonly
          />
        </Row>
        <Row>
          <FormInputText
            colSm={3}
            id="proprietario-caminhao-pedido"
            label="Proprietário Caminhão"
            obrigatory={false}
            value={orderTruckProprietary}
            onChange={handleOrderTruckProprietaryChange}
            readonly
          />
          <FormInputText
            colSm={3}
            id="caminhao-pedido"
            label="Caminhão"
            obrigatory={false}
            value={orderTruck}
            onChange={handleOrderTruckChange}
            readonly
          />
          <FormInputText
            colSm={2}
            id="tipo-caminhao-pedido"
            label="Tipo Caminhão"
            obrigatory={false}
            value={orderTruckType}
            onChange={handleOrderTruckTypeChange}
            readonly
          />
          <FormInputGroupNumber
            colSm={2}
            id="distancia-pedido"
            label="Distância"
            groupText={'KM'}
            value={orderDistance}
            onChange={handleOrderDistanceChange}
            obrigatory={false}
            readonly
          />
          <FormInputDate
            colSm={2}
            id="entrega-pedido"
            label="Data entrega"
            obrigatory={false}
            value={orderShipping}
            onChange={handleOrderShippingChange}
            readonly
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Etapas de Carregamento do Pedido">
        <div className="table-container" style={{ height: '170px' }}>
          <Table id="tableEtapas" striped hover>
            <thead>
              <tr>
                <th>ORDEM</th>
                <th>REPRESENTAÇÃO</th>
                <th>CIDADE</th>
                <th>CARGA (Kg)</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody id="tbodyEtapas"></tbody>
          </Table>
        </div>
      </FieldsetCard>
      <FieldsetCard legend="Etapa a ser autorizada">
        <Row>
          <FormInputText
            colSm={4}
            id="representacao-pedido"
            label="Representação"
            obrigatory={false}
            value={orderRepresentation}
            onChange={handleOrderRepresentationChange}
            readonly
          />
          <FormInputText
            colSm={4}
            id="cidade-destino-pedido"
            label="Cidade"
            obrigatory={false}
            value={orderDestinyCity}
            onChange={handleOrderDestinyCityChange}
            readonly
          />
          <FormInputGroupText
            colSm={2}
            id="carga-pedido"
            label="Carga"
            groupText={'KG'}
            obrigatory={false}
            mask="##0,0"
            maskReversal={true}
            maskPlaceholder="0,0"
            value={orderLoad}
            onChange={handleOrderLoadChange}
            readonly
          />
          <FormButton
            colSm={2}
            color="success"
            id="autorizar"
            text="AUTORIZAR"
            onClick={handleAuthorizeClick}
          />
        </Row>
      </FieldsetCard>
      <Row>
        <Col sm="2">
          <Button
            id="voltar"
            color="secondary"
            style={{ width: '100%' }}
            size="sm"
            onClick={handleBackClick}
          >
            VOLTAR
          </Button>
        </Col>
        <Col sm="10"></Col>
      </Row>
    </>
  );
}
