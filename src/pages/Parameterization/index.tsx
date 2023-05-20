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
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { State } from '../../models/state';
import { City } from '../../models/city';
import { Parameterization as ParameterizationModel } from '../../models/parameterization';
import { EnterprisePerson } from '../../models/enterprise-person';
import * as actions from '../../store/modules/parameterization/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

export function Parameterization(): JSX.Element {
  const parameterizationState = useSelector((state: RootState) => state.parameterization);

  const dispatch = useDispatch();

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
        setMethod(2);

        setCorporateName(
          (parameterization.person.enterprise as EnterprisePerson).corporateName,
        );
        setFantasyName(
          (parameterization.person.enterprise as EnterprisePerson).fantasyName,
        );
        setCnpj((parameterization.person.enterprise as EnterprisePerson).cnpj);

        setStreet(
          (parameterization.person.enterprise as EnterprisePerson).contact.address.street,
        );
        setNumber(
          (parameterization.person.enterprise as EnterprisePerson).contact.address.number,
        );
        setNeighborhood(
          (parameterization.person.enterprise as EnterprisePerson).contact.address
            .neighborhood,
        );
        setComplement(
          (parameterization.person.enterprise as EnterprisePerson).contact.address
            .complement,
        );
        setCode(
          (parameterization.person.enterprise as EnterprisePerson).contact.address.code,
        );
        setState(
          (
            parameterization.person.enterprise as EnterprisePerson
          ).contact.address.city.state.id.toString(),
        );
        setCities(
          states[
            (parameterization.person.enterprise as EnterprisePerson).contact.address.city
              .state.id - 1
          ].cities,
        );
        setCity(
          (
            parameterization.person.enterprise as EnterprisePerson
          ).contact.address.city.id.toString(),
        );
        setPhone((parameterization.person.enterprise as EnterprisePerson).contact.phone);
        setCellphone(
          (parameterization.person.enterprise as EnterprisePerson).contact.cellphone,
        );
        setEmail((parameterization.person.enterprise as EnterprisePerson).contact.email);
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
      if (value.length == 0)
        setErrorCorporateName('A razão social precisa ser preenchida.');
      else if (value.length < 5) setErrorCorporateName('A razão social inválida.');
      else setErrorCorporateName(undefined);
    },
    fantasyName: (value: string) => {
      if (value.length == 0)
        setErrorFantasyName('O nome fantasia precisa ser preenchido.');
      else setErrorFantasyName(undefined);
    },
    cnpj: (value: string) => {
      if (value.length == 0) setErrorCnpj('O CNPJ precisa ser preenchido.');
      else if (!validateCnpj(value)) setErrorCnpj('O CNPJ preenchido é inválido.');
      else setErrorCnpj(undefined);
    },
    street: (value: string) => {
      if (value.length == 0) setErrorStreet('A rua precisa ser preenchida');
      else setErrorStreet(undefined);
    },
    number: (value: string) => {
      if (value.length == 0) setErrorNumber('O número precisa ser preenchido');
      else setErrorNumber(undefined);
    },
    neighborhood: (value: string) => {
      if (value.length == 0) setErrorNeighborhood('O bairro precisa ser preenchido');
      else setErrorNeighborhood(undefined);
    },
    code: (value: string) => {
      if (value.length == 0) setErrorCode('O CEP precisa ser preenchido');
      else if (value.length < 10) setErrorCode('O CEP preenchido é inválido');
      else setErrorCode(undefined);
    },
    state: (value: string) => {
      if (value == '0') setErrorState('O Estado precisa ser selecionado');
      else {
        setErrorState(undefined);
        setCities(
          states[
            (parameterization.person.enterprise as EnterprisePerson).contact.address.city
              .state.id - 1
          ].cities,
        );
      }
    },
    city: (value: string) => {
      if (value == '0') setErrorCity('A cidade precisa ser selecionada');
      else setErrorCity(undefined);
    },
    phone: (value: string) => {
      if (value.length == 0) setErrorPhone('O telefone precisa ser preenchido');
      else if (value.length < 14) setErrorPhone('O telefone preenchido é inválido');
      else setErrorPhone(undefined);
    },
    cellphone: (value: string) => {
      if (value.length == 0) setErrorCellphone('O celular precisa ser preenchido');
      else if (value.length < 15) setErrorCellphone('O celular preenchido é inválido');
      else setErrorCellphone(undefined);
    },
    email: (value: string) => {
      if (value.length == 0) setErrorEmail('O e-mail precisa ser preenchido');
      else if (!isEmail(value)) setErrorEmail('O e-mail preenchido é inválido');
      else setErrorEmail(undefined);
    },
  };

  const validateFields = async () => {
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
    setParameterization(new ParameterizationModel());

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
        dispatch(
          actions.parameterizationSaveRequest({
            address: {
              street: (parameterization.person.enterprise as EnterprisePerson).contact
                .address.street,
              number: (parameterization.person.enterprise as EnterprisePerson).contact
                .address.number,
              neighborhood: (parameterization.person.enterprise as EnterprisePerson)
                .contact.address.neighborhood,
              complement: (parameterization.person.enterprise as EnterprisePerson).contact
                .address.complement,
              code: (parameterization.person.enterprise as EnterprisePerson).contact
                .address.code,
              city: (parameterization.person.enterprise as EnterprisePerson).contact
                .address.city.id,
            },
            contact: {
              phone: (parameterization.person.enterprise as EnterprisePerson).contact
                .phone,
              cellphone: (parameterization.person.enterprise as EnterprisePerson).contact
                .cellphone,
              email: (parameterization.person.enterprise as EnterprisePerson).contact
                .email,
            },
            person: {
              corporateName: (parameterization.person.enterprise as EnterprisePerson)
                .corporateName,
              fantasyName: (parameterization.person.enterprise as EnterprisePerson)
                .fantasyName,
              cnpj: (parameterization.person.enterprise as EnterprisePerson).cnpj,
            },
            parameterization: {
              id: parameterization.id,
              logotype: parameterization.logotype,
            },
          }),
        );
        if (parameterizationState.success) clearFields();
      } else {
        dispatch(
          actions.parameterizationUpdateRequest({
            address: {
              street: (parameterization.person.enterprise as EnterprisePerson).contact
                .address.street,
              number: (parameterization.person.enterprise as EnterprisePerson).contact
                .address.number,
              neighborhood: (parameterization.person.enterprise as EnterprisePerson)
                .contact.address.neighborhood,
              complement: (parameterization.person.enterprise as EnterprisePerson).contact
                .address.complement,
              code: (parameterization.person.enterprise as EnterprisePerson).contact
                .address.code,
              city: (parameterization.person.enterprise as EnterprisePerson).contact
                .address.city.id,
            },
            contact: {
              phone: (parameterization.person.enterprise as EnterprisePerson).contact
                .phone,
              cellphone: (parameterization.person.enterprise as EnterprisePerson).contact
                .cellphone,
              email: (parameterization.person.enterprise as EnterprisePerson).contact
                .email,
            },
            person: {
              corporateName: (parameterization.person.enterprise as EnterprisePerson)
                .corporateName,
              fantasyName: (parameterization.person.enterprise as EnterprisePerson)
                .fantasyName,
              cnpj: (parameterization.person.enterprise as EnterprisePerson).cnpj,
            },
            parameterization: {
              id: parameterization.id,
              logotype: parameterization.logotype,
            },
          }),
        );
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
