import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormContact } from '../../components/form-contact';
import { FormIndividualPerson } from '../../components/form-individual-person';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputText } from '../../components/form-input-text';

export function Driver(): JSX.Element {
  const [name, setName] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState(new Date().toISOString().substring(0, 10));

  const [cnh, setCnh] = useState('');

  const [bank, setBank] = useState('');
  const [agency, setAgency] = useState('');
  const [account, setAccount] = useState('');
  const [type, setType] = useState('');

  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');
  const [state, setState] = useState('0');
  const [city, setCity] = useState('0');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  const handlePerson = {
    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    handleRgChange: (e: ChangeEvent<HTMLInputElement>) => {
      setRg(e.target.value);
    },
    handleCpfChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCpf(e.target.value);
    },
    handleBirthDateChange: (e: ChangeEvent<HTMLInputElement>) => {
      setBirthDate(e.target.value);
    },
  };

  const handleCnhChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCnh(e.target.value);
  };

  const handleBankChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBank(e.target.value);
  };

  const handleAgencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgency(e.target.value);
  };

  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleContact = {
    handleStreetChange: (e: ChangeEvent<HTMLInputElement>) => {
      setStreet(e.target.value);
    },
    handleNumberChange: (e: ChangeEvent<HTMLInputElement>) => {
      setNumber(e.target.value);
    },
    handleNeighborhoodChange: (e: ChangeEvent<HTMLInputElement>) => {
      setNeighborhood(e.target.value);
    },
    handleComplementChange: (e: ChangeEvent<HTMLInputElement>) => {
      setComplement(e.target.value);
    },
    handleStateChange: (e: ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
    },
    handleCityChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
    },
    handleCodeChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);
    },
    handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value);
    },
    handleCellphoneChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCellphone(e.target.value);
    },
    handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
  };

  const handleButtons = {
    handleClearClick: (e: MouseEvent) => {
      alert('Limpar clicado.');
    },
    handleSaveClick: (e: MouseEvent) => {
      alert('Salvar clicado.');
    },
  };

  const personFields = {
    name,
    rg,
    cpf,
    birthDate,
  };

  const contactFields = {
    street,
    number,
    neighborhood,
    complement,
    code,
    state,
    city,
    phone,
    cellphone,
    email,
  };

  return (
    <>
      <CardTitle
        text={method == 'novo' ? 'Cadastrar Novo Motorista' : 'Detalhes do Motorista'}
      />
      <FieldsetCard legend="Dados pessoais do Motorista" obrigatoryFields>
        <FormIndividualPerson fields={personFields} handleChanges={handlePerson} />
      </FieldsetCard>
      <Row>
        <Col sm="4">
          <FieldsetCard legend="Dados do Motorista" obrigatoryFields>
            <Row>
              <FormInputText
                colSm={12}
                id="cnh"
                label="CNH"
                obrigatory
                value={cnh}
                onChange={(e) => handleCnhChange(e)}
              />
            </Row>
          </FieldsetCard>
        </Col>
        <Col sm="8">
          <FieldsetCard legend="Dados bancários do Motorista" obrigatoryFields>
            <Row>
              <FormInputText
                colSm={2}
                id="bank"
                label="Banco"
                obrigatory
                value={bank}
                onChange={(e) => handleBankChange(e)}
              />
              <FormInputText
                colSm={2}
                id="agencia"
                label="Agência"
                obrigatory
                value={agency}
                onChange={(e) => handleAgencyChange(e)}
              />
              <FormInputText
                colSm={4}
                id="conta"
                label="Conta"
                obrigatory
                value={account}
                onChange={(e) => handleAccountChange(e)}
              />
              <FormInputSelect
                colSm={4}
                id="tipo"
                label="Tipo de Conta"
                obrigatory
                value={type}
                onChange={(e) => handleTypeChange(e)}
              >
                <option value="0">SELECIONE</option>
                <option value="1">Corrente</option>
                <option value="2">Poupança</option>
              </FormInputSelect>
            </Row>
          </FieldsetCard>
        </Col>
      </Row>
      <FieldsetCard legend="Dados de contato do Motorista" obrigatoryFields>
        <FormContact fields={contactFields} handleChanges={handleContact} />
      </FieldsetCard>
      <FormButtonsSave
        backLink="/motoristas"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
