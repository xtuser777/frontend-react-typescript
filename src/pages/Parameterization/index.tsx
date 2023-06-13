import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Row } from 'reactstrap';
import { FormContact } from '../../components/form-contact';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { FormEnterprisePerson } from '../../components/form-enterprise-person';
import { FormInputFile } from '../../components/form-input-file';
import axios from '../../services/axios';
import isEmail from 'validator/lib/isEmail';
import { State } from '../../models/State';
import { City } from '../../models/City';
import { Parameterization as ParameterizationModel } from '../../models/Parameterization';
import { EnterprisePerson } from '../../models/EnterprisePerson';

export function Parameterization(): JSX.Element {
  const [parameterization, setParameterization] = useState(new ParameterizationModel());

  const [method, setMethod] = useState(1);

  const [states, setStates] = useState(new Array<State>());
  const [cities, setCities] = useState(new Array<City>());

  const [corporateName, setCorporateName] = useState('');
  const [errorCorporateName, setErrorCorporateName] = useState<string | undefined>(
    undefined,
  );
  const [fantasyName, setFantasyName] = useState('');
  const [errorFantasyName, setErrorFantasyName] = useState<string | undefined>(undefined);
  const [cnpj, setCnpj] = useState('');
  const [errorCnpj, setErrorCnpj] = useState<string | undefined>(undefined);

  const [street, setStreet] = useState('');
  const [errorStreet, setErrorStreet] = useState<string | undefined>(undefined);
  const [number, setNumber] = useState('');
  const [errorNumber, setErrorNumber] = useState<string | undefined>(undefined);
  const [neighborhood, setNeighborhood] = useState('');
  const [errorNeighborhood, setErrorNeighborhood] = useState<string | undefined>(
    undefined,
  );
  const [complement, setComplement] = useState('');
  const [state, setState] = useState('0');
  const [errorState, setErrorState] = useState<string | undefined>(undefined);
  const [city, setCity] = useState('0');
  const [errorCity, setErrorCity] = useState<string | undefined>(undefined);
  const [code, setCode] = useState('');
  const [errorCode, setErrorCode] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState<string | undefined>(undefined);
  const [cellphone, setCellphone] = useState('');
  const [errorCellphone, setErrorCellphone] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState<string | undefined>(undefined);

  const [logotype, setLogotype] = useState(new File([], ''));

  useEffect(() => {
    const loadStates = async () => {
      const receivedData = await axios.get('/state');
      setStates(receivedData.data);

      return receivedData.data;
    };

    const loadData = async (states: State[]) => {
      const parameterization = await new ParameterizationModel().get();
      if (parameterization) {
        setParameterization(parameterization);
        setMethod(2);

        setCorporateName(
          (parameterization.person.enterprise as EnterprisePerson).corporateName,
        );
        setFantasyName(
          (parameterization.person.enterprise as EnterprisePerson).fantasyName,
        );
        setCnpj((parameterization.person.enterprise as EnterprisePerson).cnpj);

        setStreet(parameterization.person.contact.address.street);
        setNumber(parameterization.person.contact.address.number);
        setNeighborhood(parameterization.person.contact.address.neighborhood);
        setComplement(parameterization.person.contact.address.complement);
        setCode(parameterization.person.contact.address.code);
        setState(parameterization.person.contact.address.city.state.id.toString());
        setCities(
          states[parameterization.person.contact.address.city.state.id - 1].cities,
        );
        setCity(parameterization.person.contact.address.city.id.toString());
        setPhone(parameterization.person.contact.phone);
        setCellphone(parameterization.person.contact.cellphone);
        setEmail(parameterization.person.contact.email);
      }
    };

    const loadPage = async () => {
      await loadData(await loadStates());
    };

    loadPage();
  }, []);

  const validateCnpj = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') return false;

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number.parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado.toString().charAt(0) !== digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number.parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado.toString().charAt(0) !== digitos.charAt(1)) return false;

    return true;
  };

  const validate = {
    corporateName: (value: string) => {
      if (value.length == 0) {
        setErrorCorporateName('A razão social precisa ser preenchida.');
        return false;
      } else if (value.length < 5) {
        setErrorCorporateName('A razão social inválida.');
        return false;
      } else {
        setErrorCorporateName(undefined);
        if (!parameterization.person.enterprise)
          parameterization.person.enterprise = new EnterprisePerson();
        (parameterization.person.enterprise as EnterprisePerson).corporateName = value;
        return true;
      }
    },
    fantasyName: (value: string) => {
      if (value.length == 0) {
        setErrorFantasyName('O nome fantasia precisa ser preenchido.');
        return false;
      } else {
        setErrorFantasyName(undefined);
        if (!parameterization.person.enterprise)
          parameterization.person.enterprise = new EnterprisePerson();
        (parameterization.person.enterprise as EnterprisePerson).fantasyName = value;
        return true;
      }
    },
    cnpj: (value: string) => {
      if (value.length == 0) {
        setErrorCnpj('O CNPJ precisa ser preenchido.');
        return false;
      } else if (!validateCnpj(value)) {
        setErrorCnpj('O CNPJ preenchido é inválido.');
        return false;
      } else {
        setErrorCnpj(undefined);
        if (!parameterization.person.enterprise)
          parameterization.person.enterprise = new EnterprisePerson();
        (parameterization.person.enterprise as EnterprisePerson).cnpj = value;
        return true;
      }
    },
    street: (value: string) => {
      if (value.length == 0) {
        setErrorStreet('A rua precisa ser preenchida');
        return false;
      } else {
        setErrorStreet(undefined);
        parameterization.person.contact.address.street = value;
        return true;
      }
    },
    number: (value: string) => {
      if (value.length == 0) {
        setErrorNumber('O número precisa ser preenchido');
        return false;
      } else {
        setErrorNumber(undefined);
        parameterization.person.contact.address.number = value;
        return true;
      }
    },
    neighborhood: (value: string) => {
      if (value.length == 0) {
        setErrorNeighborhood('O bairro precisa ser preenchido');
        return false;
      } else {
        setErrorNeighborhood(undefined);
        parameterization.person.contact.address.neighborhood = value;
        return true;
      }
    },
    code: (value: string) => {
      if (value.length == 0) {
        setErrorCode('O CEP precisa ser preenchido');
        return false;
      } else if (value.length < 10) {
        setErrorCode('O CEP preenchido é inválido');
        return false;
      } else {
        setErrorCode(undefined);
        parameterization.person.contact.address.code = value;
        return true;
      }
    },
    state: (value: string) => {
      if (value == '0') {
        setErrorState('O Estado precisa ser selecionado');
        return false;
      } else {
        setErrorState(undefined);
        setCities(states[Number(value) - 1].cities);
        return true;
      }
    },
    city: (value: string) => {
      if (value == '0') {
        setErrorCity('A cidade precisa ser selecionada');
        return false;
      } else {
        setErrorCity(undefined);
        parameterization.person.contact.address.city = cities.find(
          (item) => item.id == Number(value),
        ) as City;
        return true;
      }
    },
    phone: (value: string) => {
      if (value.length == 0) {
        setErrorPhone('O telefone precisa ser preenchido');
        return false;
      } else if (value.length < 14) {
        setErrorPhone('O telefone preenchido é inválido');
        return false;
      } else {
        setErrorPhone(undefined);
        parameterization.person.contact.phone = value;
        return true;
      }
    },
    cellphone: (value: string) => {
      if (value.length == 0) {
        setErrorCellphone('O celular precisa ser preenchido');
        return false;
      } else if (value.length < 15) {
        setErrorCellphone('O celular preenchido é inválido');
        return false;
      } else {
        setErrorCellphone(undefined);
        parameterization.person.contact.cellphone = value;
        return true;
      }
    },
    email: (value: string) => {
      if (value.length == 0) {
        setErrorEmail('O e-mail precisa ser preenchido');
        return false;
      } else if (!isEmail(value)) {
        setErrorEmail('O e-mail preenchido é inválido');
        return false;
      } else {
        setErrorEmail(undefined);
        parameterization.person.contact.email = value;
        return true;
      }
    },
  };

  const validateFields = async () => {
    return (
      validate.corporateName(corporateName) &&
      validate.fantasyName(fantasyName) &&
      validate.cnpj(cnpj) &&
      validate.street(street) &&
      validate.number(number) &&
      validate.neighborhood(neighborhood) &&
      validate.code(code) &&
      validate.state(state) &&
      validate.city(city) &&
      validate.phone(phone) &&
      validate.cellphone(cellphone) &&
      validate.email(email)
    );
  };

  const handlePerson = {
    handleCorporateNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCorporateName(e.target.value);
      validate.corporateName(e.target.value);
    },
    handleFantasyNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setFantasyName(e.target.value);
      validate.fantasyName(e.target.value);
    },
    handleCnpjChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCnpj(e.target.value);
      validate.cnpj(e.target.value);
    },
  };

  const handleContact = {
    handleStreetChange: (e: ChangeEvent<HTMLInputElement>) => {
      setStreet(e.target.value);
      validate.street(e.target.value);
    },
    handleNumberChange: (e: ChangeEvent<HTMLInputElement>) => {
      setNumber(e.target.value);
      validate.number(e.target.value);
    },
    handleNeighborhoodChange: (e: ChangeEvent<HTMLInputElement>) => {
      setNeighborhood(e.target.value);
      validate.neighborhood(e.target.value);
    },
    handleComplementChange: (e: ChangeEvent<HTMLInputElement>) => {
      setComplement(e.target.value);
      parameterization.person.contact.address.complement = e.target.value;
    },
    handleStateChange: (e: ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
      validate.state(e.target.value);
    },
    handleCityChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
      validate.city(e.target.value);
    },
    handleCodeChange: async (e: ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);
      validate.code(e.target.value);
    },
    handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value);
      validate.phone(e.target.value);
    },
    handleCellphoneChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCellphone(e.target.value);
      validate.cellphone(e.target.value);
    },
    handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      validate.email(e.target.value);
    },
  };

  const handleLogotypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const file = files[0];
    setLogotype(file);
  };

  const persistData = async () => {
    if (await validateFields()) {
      if (method == 1) {
        await parameterization.save();
      } else {
        await parameterization.update();
      }
    }
  };

  const handleButtons = {
    handleClearClick: () => {
      alert('Limpar clicado.');
    },
    handleSaveClick: async () => {
      await persistData();
    },
  };

  const personFields = {
    corporateName,
    errorCorporateName,
    fantasyName,
    errorFantasyName,
    cnpj,
    errorCnpj,
  };

  const contactFields = {
    street,
    errorStreet,
    number,
    errorNumber,
    neighborhood,
    errorNeighborhood,
    complement,
    code,
    errorCode,
    state,
    errorState,
    states,
    city,
    errorCity,
    cities,
    phone,
    errorPhone,
    cellphone,
    errorCellphone,
    email,
    errorEmail,
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
