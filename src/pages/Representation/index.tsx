import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormContact } from '../../components/form-contact';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { useParams } from 'react-router-dom';
import { FormEnterprisePerson } from '../../components/form-enterprise-person';
import { Representation as RepresentationModel } from '../../models/Representation';
import { IState, State } from '../../models/State';
import { City, ICity } from '../../models/City';
import { EnterprisePerson } from '../../models/EnterprisePerson';
import isEmail from 'validator/lib/isEmail';
import axios from '../../services/axios';

export const Representation = (): JSX.Element => {
  const [representation, setRepresentation] = useState(new RepresentationModel());

  const [states, setStates] = useState(new Array<IState>());
  const [cities, setCities] = useState(new Array<ICity>());

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

    const getData = async (states: State[]) => {
      const rep = await new RepresentationModel().getOne(id);
      if (rep) {
        setRepresentation(rep);

        setCorporateName((rep.person.enterprise as EnterprisePerson).corporateName);
        setFantasyName((rep.person.enterprise as EnterprisePerson).fantasyName);
        setCnpj((rep.person.enterprise as EnterprisePerson).cnpj);

        setStreet(rep.person.contact.address.street);
        setNumber(rep.person.contact.address.number);
        setNeighborhood(rep.person.contact.address.neighborhood);
        setComplement(rep.person.contact.address.complement);
        setCode(rep.person.contact.address.code);
        setState(rep.person.contact.address.city.state.id.toString());
        setCities(states[rep.person.contact.address.city.state.id - 1].cities);
        setCity(rep.person.contact.address.city.id.toString());

        setPhone(rep.person.contact.phone);
        setCellphone(rep.person.contact.cellphone);
        setEmail(rep.person.contact.email);
      }
    };

    const loadPage = async () => {
      if (method != 'novo') await getData(await getStates());
      else await getStates();
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
      if (value.length == 0)
        setErrorCorporateName('A razão social precisa ser preenchida.');
      else if (value.length < 5) setErrorCorporateName('A razão social inválida.');
      else {
        setErrorCorporateName(undefined);
        if (!representation.person.enterprise)
          representation.person.enterprise = new EnterprisePerson();
        (representation.person.enterprise as EnterprisePerson).corporateName = value;
      }
    },
    fantasyName: (value: string) => {
      if (value.length == 0)
        setErrorFantasyName('O nome fantasia precisa ser preenchido.');
      else {
        setErrorFantasyName(undefined);
        if (!representation.person.enterprise)
          representation.person.enterprise = new EnterprisePerson();
        (representation.person.enterprise as EnterprisePerson).fantasyName = value;
      }
    },
    cnpj: (value: string) => {
      if (value.length == 0) setErrorCnpj('O CNPJ precisa ser preenchido.');
      else if (!validateCnpj(value)) setErrorCnpj('O CNPJ preenchido é inválido.');
      else {
        setErrorCnpj(undefined);
        if (!representation.person.enterprise)
          representation.person.enterprise = new EnterprisePerson();
        (representation.person.enterprise as EnterprisePerson).cnpj = value;
      }
    },
    street: (value: string) => {
      if (value.length == 0) setErrorStreet('A rua precisa ser preenchida');
      else {
        setErrorStreet(undefined);
        representation.person.contact.address.street = value;
      }
    },
    number: (value: string) => {
      if (value.length == 0) setErrorNumber('O número precisa ser preenchido');
      else {
        setErrorNumber(undefined);
        representation.person.contact.address.number = value;
      }
    },
    neighborhood: (value: string) => {
      if (value.length == 0) setErrorNeighborhood('O bairro precisa ser preenchido');
      else {
        setErrorNeighborhood(undefined);
        representation.person.contact.address.neighborhood = value;
      }
    },
    code: (value: string) => {
      if (value.length == 0) setErrorCode('O CEP precisa ser preenchido');
      else if (value.length < 10) setErrorCode('O CEP preenchido é inválido');
      else {
        setErrorCode(undefined);
        representation.person.contact.address.code = value;
      }
    },
    state: (value: string) => {
      if (value == '0') setErrorState('O Estado precisa ser selecionado');
      else {
        setErrorState(undefined);
        setCities(states[Number(value) - 1].cities);
      }
    },
    city: (value: string) => {
      if (value == '0') setErrorCity('A cidade precisa ser selecionada');
      else {
        setErrorCity(undefined);
        representation.person.contact.address.city = cities.find(
          (item) => item.id == Number(value),
        ) as City;
        representation.unity = `${representation.person.contact.address.city.name} - ${
          states[Number(state) - 1].acronym
        }`;
      }
    },
    phone: (value: string) => {
      if (value.length == 0) setErrorPhone('O telefone precisa ser preenchido');
      else if (value.length < 14) setErrorPhone('O telefone preenchido é inválido');
      else {
        setErrorPhone(undefined);
        representation.person.contact.phone = value;
      }
    },
    cellphone: (value: string) => {
      if (value.length == 0) setErrorCellphone('O celular precisa ser preenchido');
      else if (value.length < 15) setErrorCellphone('O celular preenchido é inválido');
      else {
        setErrorCellphone(undefined);
        representation.person.contact.cellphone = value;
      }
    },
    email: (value: string) => {
      if (value.length == 0) setErrorEmail('O e-mail precisa ser preenchido');
      else if (!isEmail(value)) setErrorEmail('O e-mail preenchido é inválido');
      else {
        setErrorEmail(undefined);
        representation.person.contact.email = value;
      }
    },
  };

  const validateFields = () => {
    validate.corporateName(corporateName);
    validate.fantasyName(fantasyName);
    validate.cnpj(cnpj);
    validate.street(street);
    validate.number(number);
    validate.neighborhood(neighborhood);
    validate.code(code);
    validate.state(state);
    validate.city(city);
    validate.phone(phone);
    validate.cellphone(cellphone);
    validate.email(email);

    return (
      !errorCorporateName &&
      !errorFantasyName &&
      !errorCnpj &&
      !errorStreet &&
      !errorNumber &&
      !errorNeighborhood &&
      !errorCode &&
      !errorState &&
      !errorCity &&
      !errorPhone &&
      !errorCellphone &&
      !errorEmail
    );
  };

  const clearFields = () => {
    setCorporateName('');
    setFantasyName('');
    setCnpj('');

    setStreet('');
    setNumber('');
    setNeighborhood('');
    setComplement('');
    setCode('');
    setState('0');
    setCity('0');
    setCities([]);
    setPhone('');
    setCellphone('');
    setEmail('');
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
      representation.person.contact.address.complement = e.target.value;
    },
    handleStateChange: (e: ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
      validate.state(e.target.value);
    },
    handleCityChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
      validate.city(e.target.value);
    },
    handleCodeChange: (e: ChangeEvent<HTMLInputElement>) => {
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

  const persistData = async () => {
    if (validateFields()) {
      if (method == 'novo' || method == 'unidade') {
        console.log(representation);

        if (await representation.save()) clearFields();
      } else {
        await representation.update();
      }
    }
  };

  const handleButtons = {
    handleClearClick: () => {
      clearFields();
    },
    handleSaveClick: () => {
      persistData();
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
      <CardTitle
        text={
          method == 'novo'
            ? 'Cadastrar Nova Representação'
            : method == 'unidade'
            ? 'Adicionar nova unidade'
            : 'Detalhes da Representação'
        }
      />
      <FieldsetCard legend="Dados pessoais da representação" obrigatoryFields>
        <FormEnterprisePerson
          fields={personFields}
          handleChanges={handlePerson}
          readonly={method == 'unidade' ? true : false}
        />
      </FieldsetCard>
      <FieldsetCard legend="Dados de contato da representação" obrigatoryFields>
        <FormContact fields={contactFields} handleChanges={handleContact} />
      </FieldsetCard>
      <FormButtonsSave
        backLink="/representacoes"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
};
