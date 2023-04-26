import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputNumber } from '../../components/form-input-number';
import { FormButton } from '../../components/form-button';
import { FormInputGroupNumber } from '../../components/form-input-group-number';

export function SalesOrder(): JSX.Element {
  const [budget, setBudget] = useState('0');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('0');
  const [destinyState, setDestinyState] = useState('0');
  const [destinyCity, setDestinyCity] = useState('0');

  const [salesman, setSalesman] = useState('0');
  const [comission, setComission] = useState(0);

  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [form, setForm] = useState('0');

  //const handleChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleClientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value);
  };
  const handleDestinyStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinyState(e.target.value);
  };
  const handleDestinyCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinyCity(e.target.value);
  };

  const handleClearItemsClick = () => {
    alert('Limpar itens!');
  };

  const [addItems, setAddItems] = useState(false);

  const handleSalesmanChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalesman(e.target.value);
  };
  const handleComissionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComission(Number.parseInt(e.target.value));
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
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

  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [totalItemPrice, setTotalItemPrice] = useState('');

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

  const handleItemPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemPrice(e.target.value);
  };
  const handleItemQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(Number.parseInt(e.target.value));
  };
  const handleTotalItemPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalItemPrice(e.target.value);
  };

  const handleClearItemClick = () => {
    alert('Limpar item!');
  };
  const handleAddItemClick = () => {
    alert('Adicionar item!');
  };

  return (
    <>
      <CardTitle text={'Abrir Pedido de Venda'} />
      <FieldsetCard legend="Dados do Pedido" obrigatoryFields>
        <Row>
          <FormInputSelect
            colSm={5}
            id="orcamento"
            label="Orçamento"
            obrigatory={false}
            value={budget}
            onChange={handleBudgetChange}
          >
            <option value="0">SELECIONAR</option>
          </FormInputSelect>
          <FormInputText
            colSm={7}
            id="desc"
            label="Descrição"
            obrigatory
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          />
        </Row>
        <Row>
          <FormInputSelect
            colSm={5}
            id="cliente"
            label="Cliente"
            obrigatory
            value={client}
            onChange={handleClientChange}
          >
            <option value="0">SELECIONAR</option>
          </FormInputSelect>
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
            colSm={4}
            id="cidade-destino"
            label="Cidade de destino"
            obrigatory
            value={destinyCity}
            onChange={handleDestinyCityChange}
            disable={destinyState == '0' ? true : false}
          >
            <option value="0">SELECIONAR</option>
          </FormInputSelect>
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Itens do Pedido">
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
              id="preco-produto"
              label="Valor Unitário"
              groupText={'R$'}
              obrigatory
              mask="#.##0,00"
              maskReversal={true}
              maskPlaceholder="0,00"
              value={itemPrice}
              onChange={handleItemPriceChange}
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
              id="preco-total-item"
              label="Valor Total"
              groupText={'R$'}
              obrigatory
              mask="#.##0,00"
              maskReversal={true}
              maskPlaceholder="0,00"
              value={totalItemPrice}
              onChange={handleTotalItemPriceChange}
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
      <Row>
        <Col sm="4">
          <FieldsetCard legend="Vendedor externo">
            <Row>
              <FormInputSelect
                colSm={12}
                id="vendedor"
                label="Vendedor"
                obrigatory={false}
                value={salesman}
                onChange={handleSalesmanChange}
              >
                <option value="0">SELECIONAR</option>
              </FormInputSelect>
            </Row>
            <Row>
              <FormInputGroupNumber
                colSm={12}
                id="comissao-vendedor"
                label="Procentagem de comissão ao vendedor"
                groupText={'%'}
                obrigatory={false}
                value={comission}
                onChange={handleComissionChange}
              />
            </Row>
            <Row></Row>
          </FieldsetCard>
        </Col>
        <Col sm="8">
          <FieldsetCard legend="Comissões">
            <div className="table-container" style={{ height: '156px' }}>
              <Table id="tableComissions" striped hover size="sm">
                <thead>
                  <tr>
                    <th>REPRESENTAÇÃO</th>
                    <th>VALOR (R$)</th>
                    <th>PORCENTAGEM</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>

                <tbody id="tbodyComissoes"></tbody>
              </Table>
            </div>
          </FieldsetCard>
        </Col>
      </Row>
      <FieldsetCard legend="Valores do Pedido" obrigatoryFields>
        <Row>
          <FormInputGroupText
            colSm={4}
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
            colSm={4}
            id="preco"
            label="Preço Total"
            groupText={'R$'}
            obrigatory
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={price}
            onChange={(e) => handlePriceChange(e)}
            readonly
          />
          <FormInputSelect
            colSm={4}
            id="forma-pagamento"
            label="Forma de Pagamento"
            obrigatory
            value={form}
            onChange={handleFormChange}
          >
            <option value="0">SELECIONAR</option>
          </FormInputSelect>
        </Row>
      </FieldsetCard>
      <FormButtonsSave backLink="/pedidos/venda" clear handle={handleButtons} />
    </>
  );
}
