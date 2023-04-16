import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { FormContact } from '../../components/form-contact';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { FormEnterprisePerson } from '../../components/form-enterprise-person';
import { FormInputFile } from '../../components/form-input-file';

export function Parameterization(): JSX.Element {
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

  const [logotype, setLogotype] = useState(new File([], ''));

  const handlePerson = {
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

  const handleLogotypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const file = files[0];
    setLogotype(file);
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
      <CardTitle text="Parametrização do sistema" />
      <FieldsetCard legend="Dados da empresa" obrigatoryFields>
        <FormEnterprisePerson fields={personFields} handleChanges={handlePerson} />
      </FieldsetCard>
      <FieldsetCard legend="Dados de contato da empresa" obrigatoryFields>
        <FormContact fields={contactFields} handleChanges={handleContact} />
      </FieldsetCard>
      <FieldsetCard legend="Dados adicionais">
        <Row>
          <FormInputFile
            colSm={12}
            id="logotipo"
            label="Logotipo"
            obrigatory={false}
            onChange={(e) => handleLogotypeChange(e)}
          />
        </Row>
      </FieldsetCard>
      <FormButtonsSave backLink="/" clear={false} handle={handleButtons} />
    </>
  );
}
