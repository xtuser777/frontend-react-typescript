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
import * as actions from '../../store/modules/proprietary/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { State } from '../../models/state';
import { City } from '../../models/city';
import { Proprietary as ProprietaryModel } from '../../models/Proprietary';
import axios from '../../services/axios';
import { IndividualPerson } from '../../models/individual-person';
import { EnterprisePerson } from '../../models/enterprise-person';
import { Driver } from '../../models/Driver';

export function Proprietary(): JSX.Element {
  const proprietaryState = useSelector((state: RootState) => state.proprietary);

  const dispatch = useDispatch();

  const [proprietary, setProprietary] = useState(new ProprietaryModel());

  const [drivers, setDrivers] = useState(new Array<Driver>());
  const [states, setStates] = useState(new Array<State>());
  const [cities, setCities] = useState(new Array<City>());

  const [driver, setDriver] = useState('0');
  const [type, setType] = useState('1');
  const [errorType, setErrorType] = useState<string | undefined>(undefined);

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
    const getDrivers = async () => {
      const response = await new Driver().get();
      setDrivers(response);
    };

    const getStates = async () => {
      const response = await axios.get('/state');
      setStates(response.data);
      return response.data;
    };

    const getData = async (states: State[]) => {
      const prop = await new ProprietaryModel().getOne(id);
      if (prop) {
        setProprietary(prop);

        setDriver(prop.driver ? prop.driver.id.toString() : '0');
        setType(prop.person.type.toString());

        if (prop.person.type == 1) {
          setName((prop.person.individual as IndividualPerson).name);
          setCpf((prop.person.individual as IndividualPerson).cpf);
          setBirth(formatarDataIso((prop.person.individual as IndividualPerson).birth));
        } else {
          setCorporateName((prop.person.enterprise as EnterprisePerson).corporateName);
          setFantasyName((prop.person.enterprise as EnterprisePerson).fantasyName);
          setCnpj((prop.person.enterprise as EnterprisePerson).cnpj);
        }

        setStreet(prop.person.contact.address.street);
        setNumber(prop.person.contact.address.number);
        setNeighborhood(prop.person.contact.address.neighborhood);
        setComplement(prop.person.contact.address.complement);
        setCode(prop.person.contact.address.code);
        setState(prop.person.contact.address.city.state.id.toString());
        setCities(states[prop.person.contact.address.city.state.id - 1].cities);
        setCity(prop.person.contact.address.city.id.toString());

        setPhone(prop.person.contact.phone);
        setCellphone(prop.person.contact.cellphone);
        setEmail(prop.person.contact.email);
      }
    };

    const loadPage = async () => {
      await getDrivers();
      if (method == 'editar') await getData(await getStates());
      else await getStates();
    };

    loadPage();
  }, []);

  const verifyCpf = async (cpf: string) => {
    const props = await new ProprietaryModel().get();
    const prop = props.find(
      (item) =>
        item.person.type == 1 && (item.person.individual as IndividualPerson).cpf == cpf,
    );

    return !!prop && (prop.person.individual as IndividualPerson).cpf != cpf;
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
      if (value.length == 0) {
        setErrorName('O nome precisa ser preenchido');
        return false;
      } else if (value.length < 3) {
        setErrorName('O nome preenchido é inválido');
        return false;
      } else {
        setErrorName(undefined);
        if (!proprietary.person.individual)
          proprietary.person.individual = new IndividualPerson();
        (proprietary.person.individual as IndividualPerson).name = value;
        return true;
      }
    },
    cpf: async (value: string) => {
      if (value.length == 0) {
        setErrorCpf('O CPF precisa ser preenchido');
        return false;
      } else if (!validateCpf(value)) {
        setErrorCpf('O CPF preenchido é inválido');
        return false;
      } else if (await verifyCpf(value)) {
        setErrorCpf('O CPF preenchido já existe no cadastro');
        return false;
      } else {
        setErrorCpf(undefined);
        if (!proprietary.person.individual)
          proprietary.person.individual = new IndividualPerson();
        (proprietary.person.individual as IndividualPerson).cpf = value;
        return true;
      }
    },
    birth: (value: string) => {
      const date = new Date(value);
      if (value.length == 0) {
        setErrorbirth('A data precisa ser preenchida');
        return false;
      } else if (new Date(Date.now()).getFullYear() - date.getFullYear() < 18) {
        setErrorbirth('A data preenchida é inválida');
        return false;
      } else {
        setErrorbirth(undefined);
        if (!proprietary.person.individual)
          proprietary.person.individual = new IndividualPerson();
        (proprietary.person.individual as IndividualPerson).birth = value;
        return true;
      }
    },
    corporateName: (value: string) => {
      if (value.length == 0) {
        setErrorCorporateName('A razão social precisa ser preenchida.');
        return false;
      } else if (value.length < 5) {
        setErrorCorporateName('A razão social inválida.');
        return false;
      } else {
        setErrorCorporateName(undefined);
        if (!proprietary.person.enterprise)
          proprietary.person.enterprise = new EnterprisePerson();
        (proprietary.person.enterprise as EnterprisePerson).corporateName = value;
        return true;
      }
    },
    fantasyName: (value: string) => {
      if (value.length == 0) {
        setErrorFantasyName('O nome fantasia precisa ser preenchido.');
        return false;
      } else {
        setErrorFantasyName(undefined);
        if (!proprietary.person.enterprise)
          proprietary.person.enterprise = new EnterprisePerson();
        (proprietary.person.enterprise as EnterprisePerson).fantasyName = value;
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
        if (!proprietary.person.enterprise)
          proprietary.person.enterprise = new EnterprisePerson();
        (proprietary.person.enterprise as EnterprisePerson).cnpj = value;
        return true;
      }
    },
    type: (value: string) => {
      if (value == '0') {
        setErrorType('O tipo do pessoa precisa ser selecionado.');
        return false;
      } else {
        setErrorType(undefined);
        proprietary.person.type = Number(value);
        return true;
      }
    },
    street: (value: string) => {
      if (value.length == 0) {
        setErrorStreet('A rua precisa ser preenchida');
        return false;
      } else {
        setErrorStreet(undefined);
        proprietary.person.contact.address.street = value;
        return true;
      }
    },
    number: (value: string) => {
      if (value.length == 0) {
        setErrorNumber('O número precisa ser preenchido');
        return false;
      } else {
        setErrorNumber(undefined);
        proprietary.person.contact.address.number = value;
        return true;
      }
    },
    neighborhood: (value: string) => {
      if (value.length == 0) {
        setErrorNeighborhood('O bairro precisa ser preenchido');
        return false;
      } else {
        setErrorNeighborhood(undefined);
        proprietary.person.contact.address.neighborhood = value;
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
        proprietary.person.contact.address.code = value;
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
        proprietary.person.contact.address.city = cities.find(
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
        proprietary.person.contact.phone = value;
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
        proprietary.person.contact.cellphone = value;
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
        proprietary.person.contact.email = value;
        return true;
      }
    },
  };

  const validateFields = async () => {
    return (
      (type == '1'
        ? validate.name(name) && (await validate.cpf(cpf)) && validate.birth(birth)
        : validate.corporateName(corporateName) &&
          validate.fantasyName(fantasyName) &&
          validate.cnpj(cnpj)) &&
      validate.type(type) &&
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

  const clearFields = () => {
    setProprietary(new ProprietaryModel());
    setName('');
    setCpf('');
    setBirth('');

    setCorporateName('');
    setFantasyName('');
    setCnpj('');

    setType('1');

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

  const handleDriverChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDriver(e.target.value);
    if (e.target.value != '0') {
      const drv = drivers.find(
        (item) => item.id == Number.parseInt(e.target.value),
      ) as Driver;
      proprietary.driver = drv;
      setType(drv.person.type.toString());
      setName((drv.person.individual as IndividualPerson).name);
      setCpf((drv.person.individual as IndividualPerson).cpf);
      setBirth((drv.person.individual as IndividualPerson).birth);
      setStreet(drv.person.contact.address.street);
      setNumber(drv.person.contact.address.number);
      setNeighborhood(drv.person.contact.address.neighborhood);
      setComplement(drv.person.contact.address.complement);
      setCode(drv.person.contact.address.code);
      setState(drv.person.contact.address.city.state.id.toString());
      setCities(states[drv.person.contact.address.city.state.id - 1].cities);
      setCity(drv.person.contact.address.city.id.toString());
      setPhone(drv.person.contact.phone);
      setCellphone(drv.person.contact.cellphone);
      setEmail(drv.person.contact.email);
    } else {
      clearFields();
    }
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
      proprietary.person.contact.address.complement = e.target.value;
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
        if (await proprietary.save()) clearFields();
      } else await proprietary.update();
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
    readonly: driver != '0' ? true : false,
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
    readonly: driver != '0' ? true : false,
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
            {drivers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.person.individual?.name}
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={6}
            id="tipo"
            label="Tipo do Cliente"
            obrigatory
            value={type}
            onChange={(e) => handleTypeChange(e)}
            disable={method == 'editar' || driver != '0' ? true : false}
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
        backLink="/proprietarios"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
