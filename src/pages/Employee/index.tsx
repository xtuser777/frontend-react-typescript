import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
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
import { User } from '../../models/user';
import { State } from '../../models/state';
import { City } from '../../models/city';
import axios from '../../services/axios';
import { IndividualPerson } from '../../models/individual-person';
import { formatarDataIso } from '../../utils/format';
import { Level } from '../../models/level';
import isEmail from 'validator/lib/isEmail';

export function Employee(): JSX.Element {
  const [employee, setEmployee] = useState(new User());

  const [states, setStates] = useState(new Array<State>());
  const [citiesData, setCitiesData] = useState(new Array<City>());
  const [cities, setCities] = useState(new Array<City>());

  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState<string | undefined>(undefined);
  const [rg, setRg] = useState('');
  const [errorRg, setErrorRg] = useState<string | undefined>(undefined);
  const [cpf, setCpf] = useState('');
  const [errorCpf, setErrorCpf] = useState<string | undefined>(undefined);
  const [birthDate, setBirthDate] = useState(new Date().toISOString().substring(0, 10));
  const [errorBirthDate, setErrorBirthDate] = useState<string | undefined>(undefined);

  const [type, setType] = useState('');
  const [errorType, setErrorType] = useState<string | undefined>(undefined);
  const [admission, setAdmission] = useState(new Date().toISOString().substring(0, 10));
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
    };

    const loadCities = async () => {
      const receivedData = await axios.get('/city');
      setCitiesData(receivedData.data);
      return receivedData.data;
    };

    const loadLevels = async () => {
      const receivedData = await axios.get('/level');
      setLevels(receivedData.data);
    };

    const loadData = async (citiesData: City[]) => {
      const user = await new User().getOne(id);
      if (user) {
        setEmployee(user);
        setName((user.employee.person as IndividualPerson).name);
        setRg((user.employee.person as IndividualPerson).rg);
        setCpf((user.employee.person as IndividualPerson).cpf);
        setBirthDate(
          formatarDataIso((user.employee.person as IndividualPerson).birthDate),
        );

        setAdmission(formatarDataIso(user.employee.admission));
        setType(user.employee.type.toString());

        setStreet((user.employee.person as IndividualPerson).contact.address.street);
        setNumber((user.employee.person as IndividualPerson).contact.address.number);
        setNeighborhood(
          (user.employee.person as IndividualPerson).contact.address.neighborhood,
        );
        setComplement(
          (user.employee.person as IndividualPerson).contact.address.complement,
        );
        setCode((user.employee.person as IndividualPerson).contact.address.code);
        setState(
          (
            user.employee.person as IndividualPerson
          ).contact.address.city.state.toString(),
        );
        setCities(
          citiesData.filter(
            (item) =>
              item.state ==
              (user.employee.person as IndividualPerson).contact.address.city.state,
          ),
        );
        setCity(
          (user.employee.person as IndividualPerson).contact.address.city.id.toString(),
        );
        setPhone((user.employee.person as IndividualPerson).contact.phone);
        setCellphone((user.employee.person as IndividualPerson).contact.cellphone);
        setEmail((user.employee.person as IndividualPerson).contact.email);

        setLevel(user.level.id.toString());
        setLogin(user.login);
      }
    };

    const loadPage = async () => {
      await loadStates();
      if (method == 'editar') await loadData(await loadCities());
      else await loadCities();
      await loadLevels();
    };

    loadPage();
  }, []);

  const verifyCpf = async (cpf: string) => {
    const users = await new User().get();
    const user = users.find(
      (item) => (item.employee.person as IndividualPerson).cpf == cpf,
    );

    return !!user && (employee.employee.person as IndividualPerson).cpf != cpf;
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
    const users = await new User().get();
    const user = users.find((item) => item.login == login);
    if (user) {
      if (user.id == employee.id) return false;
      else return true;
    }

    return false;
  };

  const verifyAdmin = async () => {
    const users = await new User().get();
    const user = users.filter((item) => item.level.id == 1);

    return user.length == 1 && employee.level.id == 1;
  };

  const validate = {
    name: (value: string) => {
      if (value.length == 0) setErrorName('O nome precisa ser preenchido');
      else if (value.length < 3) setErrorName('O nome preenchido é inválido');
      else setErrorName(undefined);
    },
    rg: (value: string) => {
      if (value.length == 0) setErrorRg('O RG precisa ser preenchido');
      else setErrorRg(undefined);
    },
  };

  const handlePerson = {
    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      (employee.employee.person as IndividualPerson).name = e.target.value;
      validate.name(e.target.value);
    },
    handleRgChange: (e: ChangeEvent<HTMLInputElement>) => {
      setRg(e.target.value);
      (employee.employee.person as IndividualPerson).rg = e.target.value;
      validate.rg(e.target.value);
    },
    handleCpfChange: async (e: ChangeEvent<HTMLInputElement>) => {
      setCpf(e.target.value);
      (employee.employee.person as IndividualPerson).cpf = e.target.value;
      if (e.target.value.length == 0) setErrorCpf('O CPF precisa ser preenchido');
      else if (!validateCpf(e.target.value)) setErrorCpf('O CPF preenchido é inválido');
      else if (await verifyCpf(e.target.value))
        setErrorCpf('O CPF preenchido já existe no cadastro');
      else setErrorCpf(undefined);
    },
    handleBirthDateChange: (e: ChangeEvent<HTMLInputElement>) => {
      setBirthDate(e.target.value);
      (employee.employee.person as IndividualPerson).birthDate = e.target.value;
      const date = new Date(e.target.value);
      if (e.target.value.length == 0) setErrorBirthDate('A data precisa ser preenchida');
      else if (new Date(Date.now()).getFullYear() - date.getFullYear() < 18)
        setErrorBirthDate('A data preenchida é inválida');
      else setErrorBirthDate(undefined);
    },
  };

  const handleAdmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmission(e.target.value);
    employee.employee.admission = e.target.value;
    const value = new Date(e.target.value);
    const now = new Date(Date.now());
    if (e.target.value.length == 0)
      setErrorAdmission('A data de admissão precisa ser preenchida');
    else if (
      now.getFullYear() == value.getFullYear() &&
      now.getMonth() == value.getMonth() &&
      now.getDate() < value.getDate()
    )
      setErrorAdmission('A data de admissão preenchida é inválida');
    else setErrorAdmission(undefined);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    employee.employee.type = Number(e.target.value);
    if (e.target.value == '0')
      setErrorType('O tipo de funcionário precisa ser selecionado.');
    else setErrorType(undefined);
  };

  const handleContact = {
    handleStreetChange: (e: ChangeEvent<HTMLInputElement>) => {
      setStreet(e.target.value);
      (employee.employee.person as IndividualPerson).contact.address.street =
        e.target.value;
      if (e.target.value.length == 0) setErrorStreet('A rua precisa ser preenchida');
      else setErrorStreet(undefined);
    },
    handleNumberChange: (e: ChangeEvent<HTMLInputElement>) => {
      setNumber(e.target.value);
      (employee.employee.person as IndividualPerson).contact.address.number =
        e.target.value;
      if (e.target.value.length == 0) setErrorNumber('O número precisa ser preenchido');
      else setErrorNumber(undefined);
    },
    handleNeighborhoodChange: (e: ChangeEvent<HTMLInputElement>) => {
      setNeighborhood(e.target.value);
      (employee.employee.person as IndividualPerson).contact.address.neighborhood =
        e.target.value;
      if (e.target.value.length == 0)
        setErrorNeighborhood('O bairro precisa ser preenchido');
      else setErrorNeighborhood(undefined);
    },
    handleComplementChange: (e: ChangeEvent<HTMLInputElement>) => {
      setComplement(e.target.value);
      (employee.employee.person as IndividualPerson).contact.address.complement =
        e.target.value;
    },
    handleStateChange: (e: ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);

      if (e.target.value == '0') setErrorState('O Estado precisa ser selecionado');
      else setErrorState(undefined);

      setCities(
        citiesData.filter((item) => item.state == Number.parseInt(e.target.value)),
      );
    },
    handleCityChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);

      if (e.target.value == '0') setErrorCity('A cidade precisa ser selecionada');
      else {
        setErrorCity(undefined);
        (employee.employee.person as IndividualPerson).contact.address.city = cities.find(
          (item) => item.id == Number(e.target.value),
        ) as City;
      }
    },
    handleCodeChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);
      (employee.employee.person as IndividualPerson).contact.address.code =
        e.target.value;
      if (e.target.value.length == 0) setErrorCode('O CEP precisa ser preenchido');
      else if (e.target.value.length < 10) setErrorCode('O CEP preenchido é inválido');
      else setErrorCode(undefined);
    },
    handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value);
      (employee.employee.person as IndividualPerson).contact.phone = e.target.value;
      if (e.target.value.length == 0) setErrorPhone('O telefone precisa ser preenchido');
      else if (e.target.value.length < 14)
        setErrorPhone('O telefone preenchido é inválido');
      else setErrorPhone(undefined);
    },
    handleCellphoneChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCellphone(e.target.value);
      (employee.employee.person as IndividualPerson).contact.cellphone = e.target.value;
      if (e.target.value.length == 0)
        setErrorCellphone('O celular precisa ser preenchido');
      else if (e.target.value.length < 15)
        setErrorCellphone('O celular preenchido é inválido');
      else setErrorCellphone(undefined);
    },
    handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      (employee.employee.person as IndividualPerson).contact.email = e.target.value;
      if (e.target.value.length == 0) setErrorEmail('O e-mail precisa ser preenchido');
      else if (!isEmail(e.target.value)) setErrorEmail('O e-mail preenchido é inválido');
      else setErrorEmail(undefined);
    },
  };

  const handleAuth = {
    handleLevelChange: async (e: ChangeEvent<HTMLInputElement>) => {
      setLevel(e.target.value);
      if (e.target.value == '0')
        setErrorLevel('O nível de usuário precisa ser selecionado.');
      else if ((await verifyAdmin()) && e.target.value != '1')
        setErrorLevel('O não é permitido alterar o último administrador.');
      else setErrorLevel(undefined);
    },
    handleLoginChange: async (e: ChangeEvent<HTMLInputElement>) => {
      setLogin(e.target.value);
      employee.login = e.target.value;
      if (e.target.value.length == 0) setErrorLogin('O login precisa ser preenchido');
      else if (await vefifyLogin(e.target.value))
        setErrorLogin('O login já exite no cadastro');
      else setErrorLogin(undefined);
    },
    handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      employee.password = e.target.value;
      if (e.target.value.length == 0) setErrorPassword('A senha precisa ser preenchida');
      else if (e.target.value.length < 6)
        setErrorPassword('A senha preenchida tem tamanho inválido');
      else setErrorPassword(undefined);
    },
    handlePasswordConfirmChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(e.target.value);
      if (e.target.value.length == 0)
        setErrorPasswordConfirm('A senha de confirmação precisa ser preenchida');
      else if (e.target.value.length < 6)
        setErrorPasswordConfirm('A senha preenchida tem tamanho inválido');
      else if (e.target.value != password)
        setErrorPasswordConfirm('As senhas não conferem');
      else setErrorPasswordConfirm(undefined);
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
    errorName,
    rg,
    errorRg,
    cpf,
    errorCpf,
    birthDate,
    errorBirthDate,
  };

  const contactFields = {
    street,
    number,
    neighborhood,
    complement,
    code,
    state,
    states,
    city,
    cities,
    phone,
    cellphone,
    email,
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
          />
          <FormInputSelect
            colSm={6}
            id="tipo"
            label="Tipo"
            obrigatory
            value={type}
            onChange={(e) => handleTypeChange(e)}
            message={errorType}
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
