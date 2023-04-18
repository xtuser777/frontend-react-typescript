import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputGroupEmail } from '../../components/form-input-group-email';
import { BsPhoneFill, BsTelephoneFill } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';

export function SalesBudget(): JSX.Element {
  const [client, setClient] = useState('0');
  const [name, setName] = useState('');
  const [type, setType] = useState('1');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');

  const [description, setDescription] = useState('');

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

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
      </FieldsetCard>
      <FormButtonsSave
        backLink="/orcamentos/venda"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
