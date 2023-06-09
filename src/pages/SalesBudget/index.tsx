import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputGroupEmail } from '../../components/form-input-group-email';
import { BsPhoneFill, BsTelephoneFill } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputNumber } from '../../components/form-input-number';
import { FormButton } from '../../components/form-button';
import { SaleBudget } from '../../models/SaleBudget';
import { Client } from '../../models/Client';
import { State } from '../../models/state';
import { City } from '../../models/city';
import { Employee } from '../../models/Employee';
import axios from '../../services/axios';

export function SalesBudget(): JSX.Element {
  const [budget, setBudget] = useState(new SaleBudget());

  const [clients, setClients] = useState(new Array<Client>());
  const [states, setStates] = useState(new Array<State>());
  const [cities, setCities] = useState(new Array<City>());
  const [salesmans, setSalesmans] = useState(new Array<Employee>());

  const [client, setClient] = useState('0');
  const [name, setName] = useState('');
  const [type, setType] = useState('1');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');

  const [description, setDescription] = useState('');
  const [salesman, setSalesman] = useState('0');
  const [destinyState, setDestinyState] = useState('0');
  const [destinyCity, setDestinyCity] = useState('0');

  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().substring(0, 10));

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  useEffect(() => {
    const getStates = async () => {
      const response = await axios.get('/state');
      setStates(response.data);
      return response.data;
    };

    const getSalesmans = async () => {
      const response = await new Employee().get();
      setSalesmans(response);
    };

    const getClients = async () => {
      const response = await new Client().get();
      setClients(response);
    };

    const getData = async (states: State[]) => {
      const budget = await new SaleBudget().getOne(id);
      if (budget) {
        setBudget(budget);
      }
    };
  }, []);

  const handleClientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value);
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };
  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
  };
  const handleCnpjChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCnpj(e.target.value);
  };
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const handleCellphoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCellphone(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  //const handleChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleSalesmanChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalesman(e.target.value);
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

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleButtons = {
    handleClearClick: () => {
      alert('Limpar clicado.');
    },
    handleSaveClick: () => {
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
      <CardTitle
        text={
          method == 'novo' ? 'Abrir Orçamento de Venda' : 'Detalhes do Orçamento de Venda'
        }
      />
      <FieldsetCard legend="Dados do Cliente" obrigatoryFields>
        <Row>
          <FormInputSelect
            colSm={4}
            id="cliente"
            label="Cliente"
            obrigatory={false}
            value={client}
            onChange={handleClientChange}
          >
            <option value="0">SELECIONAR</option>
          </FormInputSelect>
          <FormInputText
            colSm={4}
            id="nome"
            label="Nome / Nome Fantasia"
            obrigatory
            value={name}
            onChange={handleNameChange}
            readonly={client != '0' ? true : false}
          />
          <FormInputSelect
            colSm={2}
            id="tipo-documento"
            label="Tipo"
            obrigatory
            value={type}
            onChange={handleTypeChange}
            readonly={client != '0' ? true : false}
          >
            <option value="1">CPF</option>
            <option value="2">CNPJ</option>
          </FormInputSelect>
          {type == '1' ? (
            <FormInputText
              colSm={2}
              id="cpf"
              label="CPF"
              obrigatory
              mask="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
              readonly={client != '0' ? true : false}
            />
          ) : (
            <FormInputText
              colSm={2}
              id="cnpj"
              label="CNPJ"
              obrigatory
              mask="00.000.000/0000-00"
              value={cnpj}
              onChange={handleCnpjChange}
              readonly={client != '0' ? true : false}
            />
          )}
        </Row>
        <Row>
          <FormInputGroupText
            colSm={3}
            id="tel"
            label="Telefone"
            groupText={<BsTelephoneFill />}
            obrigatory
            mask="(00) 0000-0000"
            value={phone}
            onChange={(e) => handlePhoneChange(e)}
            readonly={client != '0' ? true : false}
          />
          <FormInputGroupText
            colSm={3}
            id="cel"
            label="Celular"
            groupText={<BsPhoneFill />}
            obrigatory
            mask="(00) 00000-0000"
            value={cellphone}
            onChange={(e) => handleCellphoneChange(e)}
            readonly={client != '0' ? true : false}
          />
          <FormInputGroupEmail
            colSm={6}
            id="email"
            label="E-mail"
            groupText={<MdAlternateEmail />}
            obrigatory
            value={email}
            onChange={(e) => handleEmailChange(e)}
            readonly={client != '0' ? true : false}
          />
        </Row>
      </FieldsetCard>
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
            colSm={5}
            id="vendedor"
            label="Vendedor"
            obrigatory={false}
            value={salesman}
            onChange={handleSalesmanChange}
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
      <FieldsetCard legend="Itens do Orçamento">
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
      <FieldsetCard legend="Valores do Orçamento" obrigatoryFields>
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
            label="Preço"
            groupText={'R$'}
            obrigatory
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={price}
            onChange={(e) => handlePriceChange(e)}
            readonly
          />
          <FormInputDate
            colSm={4}
            id="validade"
            label="Validade"
            obrigatory
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </Row>
      </FieldsetCard>
      <FormButtonsSave
        backLink="/orcamentos/venda"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
