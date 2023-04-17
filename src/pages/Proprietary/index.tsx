import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormContact } from '../../components/form-contact';
import { FormIndividualPerson } from '../../components/form-individual-person';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputSelect } from '../../components/form-input-select';
import { FormEnterprisePerson } from '../../components/form-enterprise-person';

export function Proprietary(): JSX.Element {
  const [driver, setDriver] = useState('0');
  const [type, setType] = useState('1');

  const [name, setName] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState(new Date().toISOString().substring(0, 10));

  const [enterpriseName, setEnterpriseName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [cnpj, setCnpj] = useState('');

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

  const handleDriverChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDriver(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleIndividualPerson = {
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

  const handleEnterprisePerson = {
    handleEnterpriseNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setEnterpriseName(e.target.value);
    },
    handleFantasyNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setFantasyName(e.target.value);
    },
    handleCnpjChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCnpj(e.target.value);
    },
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

  const personIndividualFields = {
    name,
    rg,
    cpf,
    birthDate,
  };

  const personEnterpriseFields = {
    enterpriseName,
    fantasyName,
    cnpj,
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
        text={
          method == 'novo'
            ? 'Cadastrar Proprietário de Caminhão'
            : 'Detalhes do Proprietário de Caminhão'
        }
      />
      <FieldsetCard legend="Vínculos" obrigatoryFields>
        <Row>
          <FormInputSelect
            colSm={6}
            id="driver"
            label="Motorista"
            obrigatory
            value={driver}
            onChange={(e) => handleDriverChange(e)}
            disable={method == 'editar' ? true : false}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={6}
            id="tipo"
            label="Tipo do Cliente"
            obrigatory
            value={type}
            onChange={(e) => handleTypeChange(e)}
            disable={method == 'editar' ? true : false}
          >
            <option value="1">PESSOA FÍSICA</option>
            <option value="2">PESSOA JURÍDICA</option>
          </FormInputSelect>
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Dados pessoais do Proprietário de Caminhão" obrigatoryFields>
        {type == '1' ? (
          <FormIndividualPerson
            fields={personIndividualFields}
            handleChanges={handleIndividualPerson}
          />
        ) : (
          <FormEnterprisePerson
            fields={personEnterpriseFields}
            handleChanges={handleEnterprisePerson}
          />
        )}
      </FieldsetCard>
      <FieldsetCard
        legend="Dados de contato do Proprietário de Caminhão"
        obrigatoryFields
      >
        <FormContact fields={contactFields} handleChanges={handleContact} />
      </FieldsetCard>
      <FormButtonsSave
        backLink="/proprietario"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
