import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormContact } from '../../components/form-contact';
import { FormIndividualPerson } from '../../components/form-individual-person';
import { FormAuthenticationData } from '../../components/form-authentication-data';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputDate } from '../../components/form-input-date';

export function Employee(): JSX.Element {
  const [name, setName] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState(new Date().toISOString().substring(0, 10));

  const [type, setType] = useState('');
  const [admission, setAdmission] = useState(new Date().toISOString().substring(0, 10));

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

  const [level, setLevel] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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

  const handleAdmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmission(e.target.value);
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

  const handleAuth = {
    handleLevelChange: (e: ChangeEvent<HTMLInputElement>) => {
      setLevel(e.target.value);
    },
    handleLoginChange: (e: ChangeEvent<HTMLInputElement>) => {
      setLogin(e.target.value);
    },
    handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    handlePasswordConfirmChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(e.target.value);
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

  const authFields = {
    level,
    login,
    password,
    passwordConfirm,
  };

  return (
    <>
      <CardTitle
        text={method == 'novo' ? 'Cadastrar Novo Funcionário' : 'Detalhes do Funcionário'}
      />
      <FieldsetCard legend="Dados pessoais do Funcionário" obrigatoryFields>
        <FormIndividualPerson fields={personFields} handleChanges={handlePerson} />
      </FieldsetCard>
      <FieldsetCard legend="Dados do Funcionário" obrigatoryFields>
        <Row>
          <FormInputDate
            colSm={6}
            id="adm"
            label="Admissão"
            obrigatory
            value={admission}
            onChange={(e) => handleAdmChange(e)}
          />
          <FormInputSelect
            colSm={6}
            id="tipo"
            label="Tipo"
            obrigatory
            onChange={(e) => handleTypeChange(e)}
          >
            <option value="0">SELECIONE</option>
            <option value="1">INTERNO</option>
            <option value="2">VENDEDOR</option>
          </FormInputSelect>
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Dados de contato do funcionário" obrigatoryFields>
        <FormContact fields={contactFields} handleChanges={handleContact} />
      </FieldsetCard>
      {type == '1' ? (
        <FieldsetCard legend="Dados de autenticação" obrigatoryFields>
          <FormAuthenticationData
            page="employee"
            fields={authFields}
            handleChanges={handleAuth}
          />
        </FieldsetCard>
      ) : (
        ''
      )}
      <FormButtonsSave
        backLink="/funcionarios"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
