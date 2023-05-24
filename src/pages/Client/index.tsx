import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormContact } from '../../components/form-contact';
import { FormIndividualPerson } from '../../components/form-individual-person';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputSelect } from '../../components/form-input-select';
import { FormEnterprisePerson } from '../../components/form-enterprise-person';
import { formatarDataIso } from '../../utils/format';
import isEmail from 'validator/lib/isEmail';
import * as actions from '../../store/modules/client/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { State } from '../../models/state';
import { City } from '../../models/city';
import { Client as ClientModel } from '../../models/client';
import axios from '../../services/axios';
import { IndividualPerson } from '../../models/individual-person';
import { EnterprisePerson } from '../../models/enterprise-person';

export function Client(): JSX.Element {
  const clientState = useSelector((state: RootState) => state.client);

  const dispatch = useDispatch();

  const [client, setClient] = useState(new ClientModel());

  const [states, setStates] = useState(new Array<State>());
  const [cities, setCities] = useState(new Array<City>());

  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState<string | undefined>(undefined);
  const [cpf, setCpf] = useState('');
  const [errorCpf, setErrorCpf] = useState<string | undefined>(undefined);
  const [birth, setBirth] = useState('');
  const [errorbirth, setErrorbirth] = useState<string | undefined>(undefined);

  const [corporateName, setCorporateName] = useState('');
  const [errorCorporateName, setErrorCorporateName] = useState<string | undefined>(
    undefined,
  );
  const [fantasyName, setFantasyName] = useState('');
  const [errorFantasyName, setErrorFantasyName] = useState<string | undefined>(undefined);
  const [cnpj, setCnpj] = useState('');
  const [errorCnpj, setErrorCnpj] = useState<string | undefined>(undefined);
  const [type, setType] = useState('1');
  const [errorType, setErrorType] = useState<string | undefined>(undefined);

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
      const client = await new ClientModel().getOne(id);
      if (client) {
        setClient(client);

        setType(client.person.type.toString());

        if (client.person.type == 1) {
          setName((client.person.individual as IndividualPerson).name);
          setCpf((client.person.individual as IndividualPerson).cpf);
          setBirth(formatarDataIso((client.person.individual as IndividualPerson).birth));

          setStreet(client.person.contact.address.street);
          setNumber(client.person.contact.address.number);
          setNeighborhood(client.person.contact.address.neighborhood);
          setComplement(client.person.contact.address.complement);
          setCode(client.person.contact.address.code);
          setState(client.person.contact.address.city.state.id.toString());
          setCities(states[client.person.contact.address.city.state.id - 1].cities);
          setCity(client.person.contact.address.city.id.toString());

          setPhone(client.person.contact.phone);
          setCellphone(client.person.contact.cellphone);
          setEmail(client.person.contact.email);
        } else {
          setCorporateName((client.person.enterprise as EnterprisePerson).corporateName);
          setFantasyName((client.person.enterprise as EnterprisePerson).fantasyName);
          setCnpj((client.person.enterprise as EnterprisePerson).cnpj);

          setStreet(client.person.contact.address.street);
          setNumber(client.person.contact.address.number);
          setNeighborhood(client.person.contact.address.neighborhood);
          setComplement(client.person.contact.address.complement);
          setCode(client.person.contact.address.code);
          setState(client.person.contact.address.city.state.id.toString());
          setCities(states[client.person.contact.address.city.state.id - 1].cities);
          setCity(client.person.contact.address.city.id.toString());

          setPhone(client.person.contact.phone);
          setCellphone(client.person.contact.cellphone);
          setEmail(client.person.contact.email);
        }
      }
    };

    const loadPage = async () => {
      if (method == 'editar') await getData(await getStates());
      else await getStates();
    };

    loadPage();
  }, []);

  const verifyCpf = async (cpf: string) => {
    const clients = await new ClientModel().get();
    const client = clients.find(
      (item) => (item.person.individual as IndividualPerson).cpf == cpf,
    );

    return !!client && (client.person.individual as IndividualPerson).cpf != cpf;
  };

  const validateCpf = (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') {
      return false;
    }
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false;
    }
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(9))) {
      return false;
    }
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }

    return rev === parseInt(cpf.charAt(10));
  };

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
    name: (value: string) => {
      if (value.length == 0) setErrorName('O nome precisa ser preenchido');
      else if (value.length < 3) setErrorName('O nome preenchido é inválido');
      else {
        setErrorName(undefined);
        (client.person.individual as IndividualPerson).name = value;
      }
    },
    cpf: async (value: string) => {
      if (value.length == 0) setErrorCpf('O CPF precisa ser preenchido');
      else if (!validateCpf(value)) setErrorCpf('O CPF preenchido é inválido');
      else if (await verifyCpf(value))
        setErrorCpf('O CPF preenchido já existe no cadastro');
      else {
        setErrorCpf(undefined);
        (client.person.individual as IndividualPerson).cpf = value;
      }
    },
    birth: (value: string) => {
      const date = new Date(value);
      if (value.length == 0) setErrorbirth('A data precisa ser preenchida');
      else if (new Date(Date.now()).getFullYear() - date.getFullYear() < 18)
        setErrorbirth('A data preenchida é inválida');
      else {
        setErrorbirth(undefined);
        (client.person.individual as IndividualPerson).birth = value;
      }
    },
    corporateName: (value: string) => {
      if (value.length == 0)
        setErrorCorporateName('A razão social precisa ser preenchida.');
      else if (value.length < 5) setErrorCorporateName('A razão social inválida.');
      else {
        setErrorCorporateName(undefined);
        (client.person.enterprise as EnterprisePerson).corporateName = value;
      }
    },
    fantasyName: (value: string) => {
      if (value.length == 0)
        setErrorFantasyName('O nome fantasia precisa ser preenchido.');
      else {
        setErrorFantasyName(undefined);
        (client.person.enterprise as EnterprisePerson).fantasyName = value;
      }
    },
    cnpj: (value: string) => {
      if (value.length == 0) setErrorCnpj('O CNPJ precisa ser preenchido.');
      else if (!validateCnpj(value)) setErrorCnpj('O CNPJ preenchido é inválido.');
      else {
        setErrorCnpj(undefined);
        (client.person.enterprise as EnterprisePerson).cnpj = value;
      }
    },
    type: (value: string) => {
      if (value == '0') setErrorType('O tipo do cliente precisa ser selecionado.');
      else {
        setErrorType(undefined);
        client.person.type = Number(value);
      }
    },
    street: (value: string) => {
      if (value.length == 0) setErrorStreet('A rua precisa ser preenchida');
      else {
        setErrorStreet(undefined);
        if (type == '1') client.person.contact.address.street = value;
        else client.person.contact.address.street = value;
      }
    },
    number: (value: string) => {
      if (value.length == 0) setErrorNumber('O número precisa ser preenchido');
      else {
        setErrorNumber(undefined);
        if (type == '1') client.person.contact.address.number = value;
        else client.person.contact.address.number = value;
      }
    },
    neighborhood: (value: string) => {
      if (value.length == 0) setErrorNeighborhood('O bairro precisa ser preenchido');
      else {
        setErrorNeighborhood(undefined);
        if (type == '1') client.person.contact.address.neighborhood = value;
        else client.person.contact.address.neighborhood = value;
      }
    },
    code: (value: string) => {
      if (value.length == 0) setErrorCode('O CEP precisa ser preenchido');
      else if (value.length < 10) setErrorCode('O CEP preenchido é inválido');
      else {
        setErrorCode(undefined);
        if (type == '1') client.person.contact.address.code = value;
        else client.person.contact.address.code = value;
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
        if (type == '1')
          client.person.contact.address.city = cities.find(
            (item) => item.id == Number(value),
          ) as City;
        else
          client.person.contact.address.city = cities.find(
            (item) => item.id == Number(value),
          ) as City;
      }
    },
    phone: (value: string) => {
      if (value.length == 0) setErrorPhone('O telefone precisa ser preenchido');
      else if (value.length < 14) setErrorPhone('O telefone preenchido é inválido');
      else {
        setErrorPhone(undefined);
        if (type == '1') client.person.contact.phone = value;
        else client.person.contact.phone = value;
      }
    },
    cellphone: (value: string) => {
      if (value.length == 0) setErrorCellphone('O celular precisa ser preenchido');
      else if (value.length < 15) setErrorCellphone('O celular preenchido é inválido');
      else {
        setErrorCellphone(undefined);
        if (type == '1') client.person.contact.cellphone = value;
        else client.person.contact.cellphone = value;
      }
    },
    email: (value: string) => {
      if (value.length == 0) setErrorEmail('O e-mail precisa ser preenchido');
      else if (!isEmail(value)) setErrorEmail('O e-mail preenchido é inválido');
      else {
        setErrorEmail(undefined);
        if (type == '1') client.person.contact.email = value;
        else client.person.contact.email = value;
      }
    },
  };

  const validateFields = async () => {
    if (type == '1') {
      validate.name(name);
      await validate.cpf(cpf);
      validate.birth(birth);
    } else {
      validate.corporateName(corporateName);
      validate.fantasyName(fantasyName);
      validate.cnpj(cnpj);
    }
    validate.type(type);
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
      (type == '1'
        ? !errorName && !errorCpf && !errorbirth
        : !errorCorporateName && !errorFantasyName && !errorCnpj) &&
      !errorType &&
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
    setClient(new ClientModel());
    setName('');
    setCpf('');
    setBirth('');

    setCorporateName('');
    setFantasyName('');
    setCnpj('');

    setType('0');

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

  const handleIndividualPerson = {
    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      validate.name(e.target.value);
    },
    handleCpfChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCpf(e.target.value);
      validate.cpf(e.target.value);
    },
    handleBirthChange: (e: ChangeEvent<HTMLInputElement>) => {
      setBirth(e.target.value);
      validate.birth(e.target.value);
    },
  };

  const handleEnterprisePerson = {
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

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    validate.type(e.target.value);
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
    if (await validateFields()) {
      if (method == 'novo') {
        dispatch(
          actions.clientSaveRequest({
            address: {
              street:
                client.person.type == 1
                  ? client.person.contact.address.street
                  : client.person.contact.address.street,
              number:
                client.person.type == 1
                  ? client.person.contact.address.number
                  : client.person.contact.address.number,
              neighborhood:
                client.person.type == 1
                  ? client.person.contact.address.neighborhood
                  : client.person.contact.address.neighborhood,
              complement:
                client.person.type == 1
                  ? client.person.contact.address.complement
                  : client.person.contact.address.complement,
              code:
                client.person.type == 1
                  ? client.person.contact.address.code
                  : client.person.contact.address.code,
              city:
                client.person.type == 1
                  ? client.person.contact.address.city.id
                  : client.person.contact.address.city.id,
            },
            contact: {
              phone:
                client.person.type == 1
                  ? client.person.contact.phone
                  : client.person.contact.phone,
              cellphone:
                client.person.type == 1
                  ? client.person.contact.cellphone
                  : client.person.contact.cellphone,
              email:
                client.person.type == 1
                  ? client.person.contact.email
                  : client.person.contact.email,
            },
            person: {
              name:
                client.person.type == 1
                  ? (client.person.individual as IndividualPerson).name
                  : '',
              cpf:
                client.person.type == 1
                  ? (client.person.individual as IndividualPerson).cpf
                  : '',
              birth:
                client.person.type == 1
                  ? (client.person.individual as IndividualPerson).birth.substring(0, 10)
                  : '',
              corporateName:
                client.person.type == 2
                  ? (client.person.enterprise as EnterprisePerson).corporateName
                  : '',
              fantasyName:
                client.person.type == 2
                  ? (client.person.enterprise as EnterprisePerson).fantasyName
                  : '',
              cnpj:
                client.person.type == 2
                  ? (client.person.enterprise as EnterprisePerson).cnpj
                  : '',
              type: client.person.type,
            },
            client: {
              register: new Date().toISOString().substring(0, 10),
            },
          }),
        );
        if (clientState.success) clearFields();
      } else {
        dispatch(
          actions.clientUpdateRequest({
            address: {
              street:
                client.person.type == 1
                  ? client.person.contact.address.street
                  : client.person.contact.address.street,
              number:
                client.person.type == 1
                  ? client.person.contact.address.number
                  : client.person.contact.address.number,
              neighborhood:
                client.person.type == 1
                  ? client.person.contact.address.neighborhood
                  : client.person.contact.address.neighborhood,
              complement:
                client.person.type == 1
                  ? client.person.contact.address.complement
                  : client.person.contact.address.complement,
              code:
                client.person.type == 1
                  ? client.person.contact.address.code
                  : client.person.contact.address.code,
              city:
                client.person.type == 1
                  ? client.person.contact.address.city.id
                  : client.person.contact.address.city.id,
            },
            contact: {
              phone:
                client.person.type == 1
                  ? client.person.contact.phone
                  : client.person.contact.phone,
              cellphone:
                client.person.type == 1
                  ? client.person.contact.cellphone
                  : client.person.contact.cellphone,
              email:
                client.person.type == 1
                  ? client.person.contact.email
                  : client.person.contact.email,
            },
            person: {
              name:
                client.person.type == 1
                  ? (client.person.individual as IndividualPerson).name
                  : '',
              cpf:
                client.person.type == 1
                  ? (client.person.individual as IndividualPerson).cpf
                  : '',
              birth:
                client.person.type == 1
                  ? (client.person.individual as IndividualPerson).birth.substring(0, 10)
                  : '',
              corporateName:
                client.person.type == 2
                  ? (client.person.enterprise as EnterprisePerson).corporateName
                  : '',
              fantasyName:
                client.person.type == 2
                  ? (client.person.enterprise as EnterprisePerson).fantasyName
                  : '',
              cnpj:
                client.person.type == 2
                  ? (client.person.enterprise as EnterprisePerson).cnpj
                  : '',
              type: client.person.type,
            },
            client: {
              id: client.id,
            },
          }),
        );
      }
    }
  };

  const handleButtons = {
    handleClearClick: () => {
      clearFields();
    },
    handleSaveClick: async () => {
      await persistData();
    },
  };

  const personIndividualFields = {
    name,
    errorName,
    cpf,
    errorCpf,
    birth,
    errorbirth,
  };

  const personEnterpriseFields = {
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
        text={method == 'novo' ? 'Cadastrar Novo Cliente' : 'Detalhes do Cliente'}
      />
      <FieldsetCard legend="Tipo Cliente" obrigatoryFields>
        <Row>
          <FormInputSelect
            colSm={12}
            id="tipo"
            label="Tipo do Cliente"
            obrigatory
            value={type}
            message={errorType}
            onChange={(e) => handleTypeChange(e)}
            disable={method == 'editar' ? true : false}
          >
            <option value="1">PESSOA FÍSICA</option>
            <option value="2">PESSOA JURÍDICA</option>
          </FormInputSelect>
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Dados pessoais do cliente" obrigatoryFields>
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
      <FieldsetCard legend="Dados de contato do cliente" obrigatoryFields>
        <FormContact fields={contactFields} handleChanges={handleContact} />
      </FieldsetCard>
      <FormButtonsSave
        backLink="/clientes"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
