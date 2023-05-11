import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormContact } from '../../components/form-contact';
import { FormIndividualPerson } from '../../components/form-individual-person';
import { FormAuthenticationData } from '../../components/form-authentication-data';
import { FormButtonsSave } from '../../components/form-buttons-save';
import axios from '../../services/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { formatarDataIso } from '../../utils/format';
import isEmail from 'validator/lib/isEmail';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

type State = { id: number; name: string; acronym: string };
type City = { id: number; name: string; state: number };

export function User(): JSX.Element {
  const authState = useSelector((state: RootState) => state.auth);

  const [addressId, setAddressId] = useState(0);
  const [contactId, setContactId] = useState(0);
  const [personId, setPersonId] = useState(0);
  const [employeeId, setEmployeeId] = useState(0);
  const [userId, setUserId] = useState(0);

  const [active, setActive] = useState(true);
  const [admission, setAdmission] = useState('');
  const [currentCpf, setCurrentCpf] = useState('');

  const [user, setUser] = useState({});

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

  const [type, setType] = useState(0);

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

  const [level, setLevel] = useState(0);
  const [login, setLogin] = useState('');
  const [errorLogin, setErrorLogin] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState<string | undefined>(undefined);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState<string | undefined>(
    undefined,
  );

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

    const loadData = async (citiesData: City[]) => {
      const receivedData = await axios.get(`/employee/${authState.user.id}`);
      setUserId(authState.user.id);
      setAddressId(receivedData.data.employee.person.contact.address.id);
      setContactId(receivedData.data.employee.person.contact.id);
      setPersonId(receivedData.data.employee.person.id);
      setEmployeeId(receivedData.data.employee.id);

      setName(receivedData.data.employee.person.name);
      setRg(receivedData.data.employee.person.rg);
      setCpf(receivedData.data.employee.person.cpf);
      setCurrentCpf(receivedData.data.employee.person.cpf);
      setBirthDate(formatarDataIso(receivedData.data.employee.person.birthDate));

      setAdmission(receivedData.data.employee.admission);
      setType(receivedData.data.employee.type);

      setStreet(receivedData.data.employee.person.contact.address.street);
      setNumber(receivedData.data.employee.person.contact.address.number);
      setNeighborhood(receivedData.data.employee.person.contact.address.neighborhood);
      setComplement(receivedData.data.employee.person.contact.address.complement);
      setCode(receivedData.data.employee.person.contact.address.code);
      setState(receivedData.data.employee.person.contact.address.city.state.id);
      setCities(
        citiesData.filter(
          (item) =>
            item.state == receivedData.data.employee.person.contact.address.city.state.id,
        ),
      );
      setCity(receivedData.data.employee.person.contact.address.city.id);
      setPhone(receivedData.data.employee.person.contact.phone);
      setCellphone(receivedData.data.employee.person.contact.cellphone);
      setEmail(receivedData.data.employee.person.contact.email);

      if (receivedData.data.employee.type == 1) {
        setLevel(receivedData.data.level.id);
        setLogin(receivedData.data.login);
      }
    };

    const loadPage = async () => {
      await loadStates();

      await loadData(await loadCities());
    };

    loadPage();
  }, []);

  const validarCpf = (cpf: string) => {
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
    const users = await axios.get('/employee');
    const user = users.data.find((item: { login: string }) => item.login == login);
    if (user) {
      if (user.id == userId) return false;
      else return true;
    }

    return false;
  };

  const handlePerson = {
    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      if (e.target.value.length == 0) setErrorName('O nome precisa ser preenchido');
      else if (e.target.value.length < 3) setErrorName('O nome preenchido é inválido');
      else setErrorName(undefined);
    },
    handleRgChange: (e: ChangeEvent<HTMLInputElement>) => {
      setRg(e.target.value);
      if (e.target.value.length == 0) setErrorRg('O RG precisa ser preenchido');
      else setErrorRg(undefined);
    },
    handleCpfChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCpf(e.target.value);
      if (e.target.value.length == 0) setErrorCpf('O CPF precisa ser preenchido');
      else if (!validarCpf(e.target.value)) setErrorCpf('O CPF preenchido é inválido');
      else setErrorCpf(undefined);
    },
    handleBirthDateChange: (e: ChangeEvent<HTMLInputElement>) => {
      setBirthDate(e.target.value);
      const date = new Date(e.target.value);
      if (e.target.value.length == 0) setErrorBirthDate('A data precisa ser preenchida');
      else if (new Date(Date.now()).getFullYear() - date.getFullYear() < 18)
        setErrorBirthDate('A data preenchida é inválida');
      else setErrorBirthDate(undefined);
    },
  };

  const handleContact = {
    handleStreetChange: (e: ChangeEvent<HTMLInputElement>) => {
      setStreet(e.target.value);
      if (e.target.value.length == 0) setErrorStreet('A rua precisa ser preenchida');
      else setErrorStreet(undefined);
    },
    handleNumberChange: (e: ChangeEvent<HTMLInputElement>) => {
      setNumber(e.target.value);
      if (e.target.value.length == 0) setErrorNumber('O número precisa ser preenchido');
      else setErrorNumber(undefined);
    },
    handleNeighborhoodChange: (e: ChangeEvent<HTMLInputElement>) => {
      setNeighborhood(e.target.value);
      if (e.target.value.length == 0)
        setErrorNeighborhood('O bairro precisa ser preenchido');
      else setErrorNeighborhood(undefined);
    },
    handleComplementChange: (e: ChangeEvent<HTMLInputElement>) => {
      setComplement(e.target.value);
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
      else setErrorCity(undefined);
    },
    handleCodeChange: async (e: ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);
      if (e.target.value.length == 0) setErrorCode('O CEP precisa ser preenchido');
      else if (e.target.value.length < 10) setErrorCode('O CEP preenchido é inválido');
      else setErrorCode(undefined);
    },
    handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value);
      if (e.target.value.length == 0) setErrorPhone('O telefone precisa ser preenchido');
      else if (e.target.value.length < 14)
        setErrorPhone('O telefone preenchido é inválido');
      else setErrorPhone(undefined);
    },
    handleCellphoneChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCellphone(e.target.value);
      if (e.target.value.length == 0)
        setErrorCellphone('O celular precisa ser preenchido');
      else if (e.target.value.length < 15)
        setErrorCellphone('O celular preenchido é inválido');
      else setErrorCellphone(undefined);
    },
    handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (e.target.value.length == 0) setErrorEmail('O e-mail precisa ser preenchido');
      else if (!isEmail(e.target.value)) setErrorEmail('O e-mail preenchido é inválido');
      else setErrorEmail(undefined);
    },
  };

  const handleAuth = {
    handleLevelChange: (e: ChangeEvent<HTMLInputElement>) => {
      /**nada */
    },
    handleLoginChange: async (e: ChangeEvent<HTMLInputElement>) => {
      setLogin(e.target.value);
      if (e.target.value.length == 0) setErrorLogin('O login precisa ser preenchido');
      else if (await vefifyLogin(e.target.value))
        setErrorLogin('O login já exite no cadastro');
      else setErrorLogin(undefined);
    },
    handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
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
    handleClearClick: () => {
      /* void */
    },
    handleSaveClick: async () => {
      if (
        !errorName &&
        !errorRg &&
        !errorCpf &&
        !errorBirthDate &&
        !errorStreet &&
        !errorNumber &&
        !errorNeighborhood &&
        !errorCode &&
        !errorState &&
        !errorCity &&
        !errorPhone &&
        !errorCellphone &&
        !errorEmail &&
        (type == 1 ? !errorLogin && !errorPassword && !errorPasswordConfirm : true)
      ) {
        const data = {
          address: {
            street,
            number,
            neighborhood,
            complement,
            code,
            city,
          },
          contact: {
            phone,
            cellphone,
            email,
          },
          person: {
            name,
            rg,
            cpf: currentCpf,
            birthDate,
          },
          employee: {
            type,
            admission: admission.substring(0, 10),
          },
          user: {
            login,
            password: password.length == 6 ? password : undefined,
            level,
          },
        };

        console.log(data);

        try {
          const response = await axios.put(`/employee/${userId}`, data);
          if (response.status == 200 && response.data.length == 0)
            toast.success('Dados atualizados com sucesso!');
        } catch (e) {
          if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
        }
      }
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
    login,
    errorLogin,
    password,
    errorPassword,
    passwordConfirm,
    errorPasswordConfirm,
  };

  return (
    <>
      <CardTitle text="Dados do Funcionário" />
      <FieldsetCard legend="Dados pessoais do funcionário" obrigatoryFields>
        <FormIndividualPerson fields={personFields} handleChanges={handlePerson} />
      </FieldsetCard>
      <FieldsetCard legend="Dados de contato do funcionário" obrigatoryFields>
        <FormContact fields={contactFields} handleChanges={handleContact} />
      </FieldsetCard>
      {type == 1 ? (
        <FieldsetCard legend="Dados de autenticação" obrigatoryFields>
          <FormAuthenticationData
            page="data"
            fields={authFields}
            handleChanges={handleAuth}
          />
        </FieldsetCard>
      ) : (
        ''
      )}
      <FormButtonsSave backLink="/" clear={false} handle={handleButtons} />
    </>
  );
}
