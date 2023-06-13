import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { Employee as EmployeeModel } from '../../models/Employee';
import { State } from '../../models/State';
import { City } from '../../models/City';
import axios from '../../services/axios';
import { IndividualPerson } from '../../models/IndividualPerson';
import { formatarDataIso } from '../../utils/format';
import { Level } from '../../models/Level';
import isEmail from 'validator/lib/isEmail';

export function Employee(): JSX.Element {
  const [employee, setEmployee] = useState(new EmployeeModel());

  const [states, setStates] = useState(new Array<State>());
  const [cities, setCities] = useState(new Array<City>());

  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState<string | undefined>(undefined);
  const [cpf, setCpf] = useState('');
  const [errorCpf, setErrorCpf] = useState<string | undefined>(undefined);
  const [birth, setBirth] = useState('');
  const [errorBirthDate, setErrorBirthDate] = useState<string | undefined>(undefined);

  const [type, setType] = useState('');
  const [errorType, setErrorType] = useState<string | undefined>(undefined);
  const [admission, setAdmission] = useState('');
  const [errorAdmission, setErrorAdmission] = useState<string | undefined>(undefined);

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

  const [levels, setLevels] = useState(new Array<Level>());

  const [level, setLevel] = useState('');
  const [errorLevel, setErrorLevel] = useState<string | undefined>(undefined);
  const [login, setLogin] = useState('');
  const [errorLogin, setErrorLogin] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState<string | undefined>(undefined);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState<string | undefined>(
    undefined,
  );

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  useEffect(() => {
    const loadStates = async () => {
      const receivedData = await axios.get('/state');
      setStates(receivedData.data);

      return receivedData.data;
    };

    const loadLevels = async () => {
      const receivedData = await axios.get('/level');
      setLevels(receivedData.data);
    };

    const loadData = async (states: State[]) => {
      const user = await new EmployeeModel().getOne(id);
      if (user) {
        setEmployee(user);
        setName((user.person.individual as IndividualPerson).name);
        setCpf((user.person.individual as IndividualPerson).cpf);
        setBirth(formatarDataIso((user.person.individual as IndividualPerson).birth));

        setAdmission(formatarDataIso(user.admission));
        setType(user.type.toString());

        setStreet(user.person.contact.address.street);
        setNumber(user.person.contact.address.number);
        setNeighborhood(user.person.contact.address.neighborhood);
        setComplement(user.person.contact.address.complement);
        setCode(user.person.contact.address.code);
        setState(user.person.contact.address.city.state.id.toString());
        setCities(states[user.person.contact.address.city.state.id - 1].cities);
        setCity(user.person.contact.address.city.id.toString());
        setPhone(user.person.contact.phone);
        setCellphone(user.person.contact.cellphone);
        setEmail(user.person.contact.email);

        setLevel(user.level.id.toString());
        setLogin(user.login);
      }
    };

    const loadPage = async () => {
      if (method == 'editar') await loadData(await loadStates());
      else await loadStates();
      await loadLevels();
    };

    loadPage();
  }, []);

  const verifyCpf = async (cpf: string) => {
    const users = await new EmployeeModel().get();
    const user = users.find(
      (item) => (item.person.individual as IndividualPerson).cpf == cpf,
    );

    return !!user && (employee.person.individual as IndividualPerson).cpf != cpf;
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

  const vefifyLogin = async (login: string): Promise<boolean> => {
    const users = await new EmployeeModel().get();
    const user = users.find((item) => item.login == login);
    if (user) {
      if (user.id == employee.id) return false;
      else return true;
    }

    return false;
  };

  const verifyAdmin = async () => {
    const users = await new EmployeeModel().get();
    const user = users.filter((item) => item.level.id == 1);

    return user.length == 1 && employee.level && employee.level.id == 1;
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
        if (!employee.person.individual)
          employee.person.individual = new IndividualPerson();
        (employee.person.individual as IndividualPerson).name = value;
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
        if (!employee.person.individual)
          employee.person.individual = new IndividualPerson();
        (employee.person.individual as IndividualPerson).cpf = value;
        return true;
      }
    },
    birth: (value: string) => {
      const date = new Date(value);
      if (value.length == 0) {
        setErrorBirthDate('A data precisa ser preenchida');
        return false;
      } else if (new Date(Date.now()).getFullYear() - date.getFullYear() < 18) {
        setErrorBirthDate('A data preenchida é inválida');
        return false;
      } else {
        setErrorBirthDate(undefined);
        if (!employee.person.individual)
          employee.person.individual = new IndividualPerson();
        (employee.person.individual as IndividualPerson).birth = value;
        return true;
      }
    },
    admission: (value: string) => {
      const val = new Date(value);
      const now = new Date(Date.now());
      if (value.length == 0) {
        setErrorAdmission('A data de admissão precisa ser preenchida');
        return false;
      } else if (
        now.getFullYear() == val.getFullYear() &&
        now.getMonth() == val.getMonth() &&
        now.getDate() < val.getDate()
      ) {
        setErrorAdmission('A data de admissão preenchida é inválida');
        return false;
      } else {
        setErrorAdmission(undefined);
        employee.admission = value;
        return true;
      }
    },
    type: (value: string) => {
      if (value == '0') {
        setErrorType('O tipo de funcionário precisa ser selecionado.');
        return false;
      } else {
        setErrorType(undefined);
        employee.type = Number(value);
        return true;
      }
    },
    street: (value: string) => {
      if (value.length == 0) {
        setErrorStreet('A rua precisa ser preenchida');
        return false;
      } else {
        setErrorStreet(undefined);
        if (!employee.person.individual)
          employee.person.individual = new IndividualPerson();
        employee.person.contact.address.street = value;
        return true;
      }
    },
    number: (value: string) => {
      if (value.length == 0) {
        setErrorNumber('O número precisa ser preenchido');
        return false;
      } else {
        setErrorNumber(undefined);
        if (!employee.person.individual)
          employee.person.individual = new IndividualPerson();
        employee.person.contact.address.number = value;
        return true;
      }
    },
    neighborhood: (value: string) => {
      if (value.length == 0) {
        setErrorNeighborhood('O bairro precisa ser preenchido');
        return false;
      } else {
        setErrorNeighborhood(undefined);
        if (!employee.person.individual)
          employee.person.individual = new IndividualPerson();
        employee.person.contact.address.neighborhood = value;
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
        if (!employee.person.individual)
          employee.person.individual = new IndividualPerson();
        employee.person.contact.address.code = value;
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
        if (!employee.person.individual)
          employee.person.individual = new IndividualPerson();
        employee.person.contact.address.city = cities.find(
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
        if (!employee.person.individual)
          employee.person.individual = new IndividualPerson();
        employee.person.contact.phone = value;
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
        if (!employee.person.individual)
          employee.person.individual = new IndividualPerson();
        employee.person.contact.cellphone = value;
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
        if (!employee.person.individual)
          employee.person.individual = new IndividualPerson();
        employee.person.contact.email = value;
        return true;
      }
    },
    level: async (value: string) => {
      if (value == '0') {
        setErrorLevel('O nível de usuário precisa ser selecionado.');
        return false;
      } else if ((await verifyAdmin()) && value != '1') {
        setErrorLevel('O não é permitido alterar o último administrador.');
        return false;
      } else {
        setErrorLevel(undefined);
        employee.level = levels.find((item) => item.id == Number(value)) as Level;
        return true;
      }
    },
    login: async (value: string) => {
      if (value.length == 0) {
        setErrorLogin('O login precisa ser preenchido');
        return false;
      } else if (await vefifyLogin(value)) {
        setErrorLogin('O login já exite no cadastro');
        return false;
      } else {
        setErrorLogin(undefined);
        return true;
      }
    },
    password: (value: string) => {
      if (value.length == 0 && method == 'novo') {
        setErrorPassword('A senha precisa ser preenchida');
        return false;
      } else if (value.length < 6 && method == 'novo') {
        setErrorPassword('A senha preenchida tem tamanho inválido');
        return false;
      } else {
        setErrorPassword(undefined);
        return true;
      }
    },
    passwordConfirm: (value: string) => {
      if (value.length == 0 && method == 'novo') {
        setErrorPasswordConfirm('A senha de confirmação precisa ser preenchida');
        return false;
      } else if (value.length < 6 && method == 'novo') {
        setErrorPasswordConfirm('A senha preenchida tem tamanho inválido');
        return false;
      } else if (value != password) setErrorPasswordConfirm('As senhas não conferem');
      else {
        setErrorPasswordConfirm(undefined);
        return true;
      }
    },
  };

  const validateFields = async () => {
    return (
      validate.name(name) &&
      (await validate.cpf(cpf)) &&
      validate.birth(birth) &&
      validate.admission(admission) &&
      validate.type(type) &&
      validate.street(street) &&
      validate.number(number) &&
      validate.neighborhood(neighborhood) &&
      validate.code(code) &&
      validate.state(state) &&
      validate.city(city) &&
      validate.phone(phone) &&
      validate.cellphone(cellphone) &&
      validate.email(email) &&
      (type == '1'
        ? (await validate.level(level)) &&
          (await validate.login(login)) &&
          validate.password(password) &&
          validate.passwordConfirm(passwordConfirm)
        : true)
    );
  };

  const clearFields = () => {
    setEmployee(new EmployeeModel());
    setName('');
    setCpf('');
    setBirth('');

    setAdmission('');
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

    setLevel('0');
    setLogin('');
    setPassword('');
    setPasswordConfirm('');
  };

  const handlePerson = {
    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      validate.name(e.target.value);
    },
    handleCpfChange: async (e: ChangeEvent<HTMLInputElement>) => {
      setCpf(e.target.value);
      await validate.cpf(e.target.value);
    },
    handleBirthChange: (e: ChangeEvent<HTMLInputElement>) => {
      setBirth(e.target.value);
      validate.birth(e.target.value);
    },
  };

  const handleAdmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmission(e.target.value);
    validate.admission(e.target.value);
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
      if (!employee.person.individual)
        employee.person.individual = new IndividualPerson();
      employee.person.contact.address.complement = e.target.value;
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

  const handleAuth = {
    handleLevelChange: async (e: ChangeEvent<HTMLInputElement>) => {
      setLevel(e.target.value);
      validate.level(e.target.value);
    },
    handleLoginChange: async (e: ChangeEvent<HTMLInputElement>) => {
      setLogin(e.target.value);
      employee.login = e.target.value;
      validate.login(e.target.value);
    },
    handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      employee.password = e.target.value;
      validate.password(e.target.value);
    },
    handlePasswordConfirmChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(e.target.value);
      validate.passwordConfirm(e.target.value);
    },
  };

  const persistData = async () => {
    if (await validateFields()) {
      if (method == 'novo') {
        if (await employee.save()) clearFields();
      } else await employee.update();
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
    errorBirthDate,
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

  const authFields = {
    levels,
    level,
    errorLevel,
    login,
    errorLogin,
    password,
    errorPassword,
    passwordConfirm,
    errorPasswordConfirm,
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
            message={errorAdmission}
            readonly={method == 'editar' ? true : false}
          />
          <FormInputSelect
            colSm={6}
            id="tipo"
            label="Tipo"
            obrigatory
            value={type}
            onChange={(e) => handleTypeChange(e)}
            message={errorType}
            disable={method == 'editar' ? true : false}
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
