import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputNumber } from '../../components/form-input-number';
import { FormButton } from '../../components/form-button';

export function FreightBudget(): JSX.Element {
  const [description, setDescription] = useState('');
  const [salesBudget, setSalesBudget] = useState('0');
  const [representation, setRepresentation] = useState('0');
  const [client, setClient] = useState('0');

  const [destinyState, setDestinyState] = useState('0');
  const [destinyCity, setDestinyCity] = useState('0');
  const [truckType, setTruckType] = useState('0');
  const [distance, setDistance] = useState(1);

  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [shipping, setShipping] = useState(new Date().toISOString().substring(0, 10));
  const [dueDate, setDueDate] = useState(new Date().toISOString().substring(0, 10));

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  //const handleChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleSalesBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalesBudget(e.target.value);
  };
  const handleRepresentationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepresentation(e.target.value);
  };
  const handleClientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value);
  };

  const handleClearItemsClick = () => {
    alert('Limpar itens!');
  };

  const [addItems, setAddItems] = useState(false);

  const handleDestinyStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinyState(e.target.value);
  };
  const handleDestinyCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinyCity(e.target.value);
  };
  const handleTruckTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTruckType(e.target.value);
  };
  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDistance(Number.parseInt(e.target.value));
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShipping(e.target.value);
  };
  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleButtons = {
    handleClearClick: (e: MouseEvent) => {
      alert('Limpar clicado.');
    },
    handleSaveClick: (e: MouseEvent) => {
      alert('Salvar clicado.');
    },
  };

  // Items
  const [itemRepresentation, setItemRepresentation] = useState('0');
  const [itemRepresentationFilter, setItemRerpesentationFilter] = useState('');
  const [item, setItem] = useState('0');
  const [itemFilter, setItemFilter] = useState('');

  const [itemWeight, setItemWeight] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [totalItemWeight, setTotalItemWeight] = useState('');

  const handleItemRepresentationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemRepresentation(e.target.value);
  };
  const handleItemRepresentationFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemRerpesentationFilter(e.target.value);
  };
  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };
  const handleItemFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemFilter(e.target.value);
  };

  const handleItemWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemWeight(e.target.value);
  };
  const handleItemQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(Number.parseInt(e.target.value));
  };
  const handleTotalItemWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalItemWeight(e.target.value);
  };

  const handleClearItemClick = () => {
    alert('Limpar item!');
  };
  const handleAddItemClick = () => {
    alert('Adicionar item!');
  };

  return (
    <>
      <CardTitle
        text={
          method == 'novo' ? 'Abrir Orçamento de Frete' : 'Detalhes do Orçamento de Frete'
        }
      />
      <FieldsetCard legend="Dados do Orçamento" obrigatoryFields>
        <Row>
          <FormInputText
            colSm={12}
            id="desc"
            label="Descrição"
            obrigatory
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          />
        </Row>
        <Row>
          <FormInputSelect
            colSm={4}
            id="orcamento-venda"
            label="Orçamento Venda"
            obrigatory={false}
            value={salesBudget}
            onChange={handleSalesBudgetChange}
          >
            <option value="0">SELECIONAR</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={4}
            id="representacao"
            label="Representação"
            obrigatory={false}
            value={representation}
            onChange={handleRepresentationChange}
          >
            <option value="0">SELECIONAR</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={4}
            id="cliente"
            label="Cliente"
            obrigatory
            value={client}
            onChange={handleClientChange}
          >
            <option value="0">SELECIONAR</option>
          </FormInputSelect>
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Itens fretados">
        <div className="table-container" style={{ height: '150px' }}>
          <Table id="tableItens" hover striped size="sm">
            <thead>
              <tr>
                <th>DESCRIÇÃO</th>
                <th>REPRESENTAÇÃO</th>
                <th>VALOR (R$)</th>
                <th>QTDE.</th>
                <th>TOTAL (R$)</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody id="tbodyItens"></tbody>
          </Table>
        </div>
        <Row>
          <Col sm="4"></Col>
          <Col sm="4">
            <Button
              id="limpar-itens"
              color="primary"
              size="sm"
              style={{ width: '100%' }}
              onClick={handleClearItemsClick}
            >
              LIMPAR ITENS
            </Button>
          </Col>
          <Col sm="4">
            <Button
              id="adicionar-itens"
              color={addItems ? 'secondary' : 'success'}
              size="sm"
              style={{ width: '100%' }}
              onClick={() => setAddItems(!addItems)}
            >
              {addItems ? 'CONCLUIR ADIÇÂO' : 'ADICIONAR ITENS'}
            </Button>
          </Col>
        </Row>
      </FieldsetCard>
      {addItems ? (
        <FieldsetCard legend="Adicionar Item" obrigatoryFields>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="filtro-representacao-item">
                  Representação <span style={{ color: 'red' }}>*</span> :
                </Label>
                <Input
                  type="text"
                  id="filtro-representacao-item"
                  bsSize="sm"
                  style={{ width: '100%', marginBottom: '5px' }}
                  value={itemRepresentationFilter}
                  onChange={handleItemRepresentationFilterChange}
                />
                <Input
                  type="select"
                  id="representacao-item"
                  bsSize="sm"
                  style={{ width: '100%' }}
                  value={itemRepresentation}
                  onChange={handleItemRepresentationChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label for="filtro-item">
                  Produto <span style={{ color: 'red' }}>*</span> :
                </Label>
                <Input
                  type="text"
                  id="filtro-item"
                  bsSize="sm"
                  style={{ width: '100%', marginBottom: '5px' }}
                  value={itemFilter}
                  onChange={handleItemFilterChange}
                />
                <Input
                  type="select"
                  id="item"
                  bsSize="sm"
                  style={{ width: '100%' }}
                  value={item}
                  onChange={handleItemChange}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <FormInputGroupText
              colSm={3}
              id="peso-produto"
              label="Peso"
              groupText={'KG'}
              obrigatory
              mask="##0,0"
              maskReversal={true}
              maskPlaceholder="0,0"
              value={itemWeight}
              onChange={handleItemWeightChange}
              readonly
            />
            <FormInputNumber
              colSm={2}
              id="quantidade-item"
              label="Qtde desejada"
              obrigatory
              value={itemQuantity}
              onChange={handleItemQuantityChange}
            />
            <FormInputGroupText
              colSm={3}
              id="peso-total-item"
              label="Peso Total"
              groupText={'KG'}
              obrigatory
              mask="##0,0"
              maskReversal={true}
              maskPlaceholder="0,0"
              value={totalItemWeight}
              onChange={handleTotalItemWeightChange}
              readonly
            />
            <FormButton
              colSm={2}
              color="primary"
              id="limpar-item"
              text="LIMPAR"
              onClick={handleClearItemClick}
            />
            <FormButton
              colSm={2}
              color="success"
              id="adicionar-item"
              text="ADICIONAR"
              onClick={handleAddItemClick}
            />
          </Row>
        </FieldsetCard>
      ) : (
        ''
      )}
      <FieldsetCard legend="Dados do transporte" obrigatoryFields>
        <Row>
          <FormInputSelect
            colSm={3}
            id="estado-destino"
            label="Estado de destino"
            obrigatory
            value={destinyState}
            onChange={handleDestinyStateChange}
          >
            <option value="0">SELECIONAR</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={3}
            id="cidade-destino"
            label="Cidade de destino"
            obrigatory
            value={destinyCity}
            onChange={handleDestinyCityChange}
            disable={destinyState == '0' ? true : false}
          >
            <option value="0">SELECIONAR</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={3}
            id="truck-type"
            label="Tipo Caminhão"
            obrigatory
            value={truckType}
            onChange={handleTruckTypeChange}
          >
            <option value="0">SELECIONAR</option>
          </FormInputSelect>
          <FormInputNumber
            colSm={3}
            id="distancia"
            label="Distância"
            obrigatory
            value={distance}
            onChange={handleDistanceChange}
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Valores do Orçamento" obrigatoryFields>
        <Row>
          <FormInputGroupText
            colSm={3}
            id="peso"
            label="Peso"
            groupText={'KG'}
            obrigatory
            mask="##0,0"
            maskReversal={true}
            maskPlaceholder="0,0"
            value={weight}
            onChange={(e) => handleWeightChange(e)}
            readonly
          />
          <FormInputGroupText
            colSm={3}
            id="preco-frete"
            label="Valor Frete"
            groupText={'R$'}
            obrigatory
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={price}
            onChange={(e) => handlePriceChange(e)}
          />
          <FormInputDate
            colSm={3}
            id="entrega"
            label="Data Aprox. de Entrega"
            obrigatory
            value={shipping}
            onChange={handleShippingChange}
          />
          <FormInputDate
            colSm={3}
            id="validade"
            label="Validade"
            obrigatory
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </Row>
      </FieldsetCard>
      <FormButtonsSave
        backLink="/orcamentos/frete"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
