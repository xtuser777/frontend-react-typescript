import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormContact } from '../../components/form-contact';
import { FormIndividualPerson } from '../../components/form-individual-person';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputText } from '../../components/form-input-text';
import { formatarDataIso } from '../../utils/format';
import isEmail from 'validator/lib/isEmail';
import * as actions from '../../store/modules/driver/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { State } from '../../models/State';
import { City } from '../../models/City';
import { Driver as DriverModel } from '../../models/Driver';
import axios from '../../services/axios';
import { IndividualPerson } from '../../models/IndividualPerson';

export function Driver(): JSX.Element {
  const driverState = useSelector((state: RootState) => state.driver);

  const dispatch = useDispatch();

  const [driver, setDriver] = useState(new DriverModel());

  const [states, setStates] = useState(new Array<State>());
  const [cities, setCities] = useState(new Array<City>());

  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState<string | undefined>(undefined);
  const [cpf, setCpf] = useState('');
  const [errorCpf, setErrorCpf] = useState<string | undefined>(undefined);
  const [birth, setBirth] = useState('');
  const [errorBirth, setErrorBirth] = useState<string | undefined>(undefined);

  const [cnh, setCnh] = useState('');
  const [errorCnh, setErrorCnh] = useState<string | undefined>(undefined);

  const [bank, setBank] = useState('');
  const [errorBank, setErrorBank] = useState<string | undefined>(undefined);
  const [agency, setAgency] = useState('');
  const [errorAgency, setErrorAgency] = useState<string | undefined>(undefined);
  const [account, setAccount] = useState('');
  const [accountDigit, setAccountDigit] = useState('');
  const [errorAccount, setErrorAccount] = useState<string | undefined>(undefined);
  const [type, setType] = useState('');
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
      const driver = await new DriverModel().getOne(id);
      if (driver) {
        setDriver(driver);

        setName((driver.person.individual as IndividualPerson).name);
        setCpf((driver.person.individual as IndividualPerson).cpf);
        setBirth(formatarDataIso((driver.person.individual as IndividualPerson).birth));

        setCnh(driver.cnh);

        setBank(driver.bankData.bank);
        setAgency(driver.bankData.agency);
        setAccount(driver.bankData.account);
        setType(driver.bankData.type.toString());

        setStreet(driver.person.contact.address.street);
        setNumber(driver.person.contact.address.number);
        setNeighborhood(driver.person.contact.address.neighborhood);
        setComplement(driver.person.contact.address.complement);
        setCode(driver.person.contact.address.code);
        setState(driver.person.contact.address.city.state.id.toString());
        setCities(states[driver.person.contact.address.city.state.id - 1].cities);
        setCity(driver.person.contact.address.city.id.toString());

        setPhone(driver.person.contact.phone);
        setCellphone(driver.person.contact.cellphone);
        setEmail(driver.person.contact.email);
      }
    };

    const loadPage = async () => {
      if (method == 'editar') await getData(await getStates());
      else await getStates();
    };

    loadPage();
  }, []);

  const verifyCpf = async (cpf: string) => {
    const drivers = await new DriverModel().get();
    const driver = drivers.find(
      (item) => (item.person.individual as IndividualPerson).cpf == cpf,
    );

    return !!driver && (driver.person.individual as IndividualPerson).cpf != cpf;
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
        if (!driver.person.individual) driver.person.individual = new IndividualPerson();
        (driver.person.individual as IndividualPerson).name = value;
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
        if (!driver.person.individual) driver.person.individual = new IndividualPerson();
        (driver.person.individual as IndividualPerson).cpf = value;
        return true;
      }
    },
    birth: (value: string) => {
      const date = new Date(value);
      if (value.length == 0) {
        setErrorBirth('A data precisa ser preenchida');
        return false;
      } else if (new Date(Date.now()).getFullYear() - date.getFullYear() < 18) {
        setErrorBirth('A data preenchida é inválida');
        return false;
      } else {
        setErrorBirth(undefined);
        if (!driver.person.individual) driver.person.individual = new IndividualPerson();
        (driver.person.individual as IndividualPerson).birth = value;
        return true;
      }
    },
    cnh: (value: string) => {
      if (value.length == 0) {
        setErrorCnh('A CNH do motorista precisa ser preenchida.');
        return false;
      } else {
        setErrorCnh(undefined);
        driver.cnh = value;
        return true;
      }
    },
    bank: (value: string) => {
      if (value.length == 0) {
        setErrorBank('O número do banco precisa ser preenchido.');
        return false;
      } else {
        setErrorBank(undefined);
        driver.bankData.bank = value;
        return true;
      }
    },
    agency: (value: string) => {
      if (value.length == 0) {
        setErrorAgency('A agência do banco precisa ser preenchida.');
        return false;
      } else {
        setErrorAgency(undefined);
        driver.bankData.agency = value;
        return true;
      }
    },
    account: (value: string) => {
      if (value.length == 0) {
        setErrorAccount('A conta do banco precisa ser preenchida');
        return false;
      } else {
        setErrorAccount(undefined);
        driver.bankData.account = value;
        return true;
      }
    },
    type: (value: string) => {
      if (value == '0') {
        setErrorType('O tipo de conta precisa ser selecionado.');
        return false;
      } else {
        setErrorType(undefined);
        driver.bankData.type = Number(value);
        return true;
      }
    },
    street: (value: string) => {
      if (value.length == 0) {
        setErrorStreet('A rua precisa ser preenchida');
        return false;
      } else {
        setErrorStreet(undefined);
        if (!driver.person.individual) driver.person.individual = new IndividualPerson();
        driver.person.contact.address.street = value;
        return true;
      }
    },
    number: (value: string) => {
      if (value.length == 0) {
        setErrorNumber('O número precisa ser preenchido');
        return false;
      } else {
        setErrorNumber(undefined);
        if (!driver.person.individual) driver.person.individual = new IndividualPerson();
        driver.person.contact.address.number = value;
        return true;
      }
    },
    neighborhood: (value: string) => {
      if (value.length == 0) {
        setErrorNeighborhood('O bairro precisa ser preenchido');
        return false;
      } else {
        setErrorNeighborhood(undefined);
        if (!driver.person.individual) driver.person.individual = new IndividualPerson();
        driver.person.contact.address.neighborhood = value;
        return true;
      }
    },
    code: (value: string) => {
      if (value.length == 0) {
        setErrorCode('O CEP precisa ser preenchido');
        return false;
      } else if (value.length < 10) setErrorCode('O CEP preenchido é inválido');
      else {
        setErrorCode(undefined);
        if (!driver.person.individual) driver.person.individual = new IndividualPerson();
        driver.person.contact.address.code = value;
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
        if (!driver.person.individual) driver.person.individual = new IndividualPerson();
        driver.person.contact.address.city = cities.find(
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
        if (!driver.person.individual) driver.person.individual = new IndividualPerson();
        driver.person.contact.phone = value;
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
        if (!driver.person.individual) driver.person.individual = new IndividualPerson();
        driver.person.contact.cellphone = value;
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
        if (!driver.person.individual) driver.person.individual = new IndividualPerson();
        driver.person.contact.email = value;
        return true;
      }
    },
  };

  const validateFields = async () => {
    return (
      validate.name(name) &&
      (await validate.cpf(cpf)) &&
      validate.birth(birth) &&
      validate.cnh(cnh) &&
      validate.bank(bank) &&
      validate.agency(agency) &&
      validate.account(account) &&
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
    setDriver(new DriverModel());
    setName('');
    setCpf('');
    setBirth('');

    setCnh('');

    setBank('');
    setAgency('');
    setAccount('');
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

  const handlePerson = {
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

  const handleCnhChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCnh(e.target.value);
    validate.cnh(e.target.value);
  };

  const handleBankChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBank(e.target.value);
    validate.bank(e.target.value);
  };

  const handleAgencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgency(e.target.value);
    validate.agency(e.target.value);
  };

  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
    validate.account(e.target.value);
  };

  const handleAccountDigitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccountDigit(e.target.value);
    driver.bankData.account += e.target.value;
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
      driver.person.contact.address.complement = e.target.value;
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
        if (await driver.save()) clearFields();
      } else await driver.update();
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

  const personFields = {
    name,
    errorName,
    cpf,
    errorCpf,
    birth,
    errorBirth,
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
                mask="00000000000"
                onChange={(e) => handleCnhChange(e)}
                message={errorCnh}
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
                mask="000"
                value={bank}
                onChange={(e) => handleBankChange(e)}
                message={errorBank}
              />
              <FormInputText
                colSm={2}
                id="agencia"
                label="Agência"
                obrigatory
                mask="0000-0"
                value={agency}
                onChange={(e) => handleAgencyChange(e)}
                message={errorAgency}
              />
              <FormInputText
                colSm={3}
                id="conta"
                label="Conta"
                obrigatory
                mask="0000000000"
                value={account}
                onChange={(e) => handleAccountChange(e)}
                message={errorAccount}
              />
              <FormInputText
                colSm={1}
                id="conta-digito"
                label={<span>&nbsp;</span>}
                obrigatory={false}
                mask="0"
                value={accountDigit}
                onChange={(e) => handleAccountDigitChange(e)}
              />
              <FormInputSelect
                colSm={4}
                id="tipo"
                label="Tipo de Conta"
                obrigatory
                value={type}
                onChange={(e) => handleTypeChange(e)}
                message={errorType}
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
