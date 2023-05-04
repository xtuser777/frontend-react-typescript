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

type State = { id: number; name: string; acronym: string };
type City = { id: number; name: string; state: State };

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

  const [name, setName] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState(new Date().toISOString().substring(0, 10));

  const [type, setType] = useState(0);

  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    const loadData = async () => {
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
      setState(receivedData.data.employee.person.contact.address.city.state.name);
      setCity(receivedData.data.employee.person.contact.address.city.name);
      setPhone(receivedData.data.employee.person.contact.phone);
      setCellphone(receivedData.data.employee.person.contact.cellphone);
      setEmail(receivedData.data.employee.person.contact.email);

      if (receivedData.data.employee.type == 1) {
        setLogin(receivedData.data.login);
      }
    };

    const loadPage = async () => {
      await loadData();
    };

    loadPage();
  }, []);

  const handlePerson = {
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
    handleStateChange: async (e: ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);

      // setCities(
      //   citiesData.filter((item) => item.state.id == Number.parseInt(e.target.value)),
      // );
    },
    handleCityChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
    },
    handleCodeChange: async (e: ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);

      type DataCEP = {
        cep: string;
        logradouro: string;
        complemento: string;
        bairro: string;
        localidade: string;
        uf: string;
      };

      const data: DataCEP = await axios.get(
        `https://viacep.com.br/ws/${e.target.value
          .replace('.', '')
          .replace('-', '')}/json/`,
      );

      const c: City[] = await axios.get(`/city/name/${data.localidade}`);

      setState(c[0].state.name);
      setCity(c[0].name);
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

  const handleAuth = {
    handleLevelChange: (e: ChangeEvent<HTMLInputElement>) => {
      /**nada */
    },
    handleLoginChange: (e: ChangeEvent<HTMLInputElement>) => {
      setLogin(e.target.value);
    },
    handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    handlePasswordConfirmChange: (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(e.target.value);
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
    rg,
    cpf,
    birthDate,
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

  const authFields = {
    login,
    password,
    passwordConfirm,
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
