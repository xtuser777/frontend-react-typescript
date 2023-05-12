import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
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

type State = { id: number; name: string; acronym: string };
type City = { id: number; name: string; state: number };

export function Parameterization(): JSX.Element {
  const [addressId, setAddressId] = useState(0);
  const [contactId, setContactId] = useState(0);
  const [personId, setPersonId] = useState(0);

  const [method, setMethod] = useState(1);

  const [states, setStates] = useState(new Array<State>());
  const [citiesData, setCitiesData] = useState(new Array<City>());
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
    };

    const loadCities = async () => {
      const receivedData = await axios.get('/city');
      setCitiesData(receivedData.data);
      return receivedData.data;
    };

    const loadData = async (citiesData: City[]) => {
      const receivedData = await axios.get('/parameterization');

      if (receivedData.data) {
        setMethod(2);

        setCorporateName(receivedData.data.person.corporateName);
        setFantasyName(receivedData.data.person.fantasyName);
        setCnpj(receivedData.data.person.cnpj);

        setAddressId(receivedData.data.person.contact.address.id);
        setContactId(receivedData.data.person.contact.id);
        setPersonId(receivedData.data.person.id);

        setStreet(receivedData.data.person.contact.address.street);
        setNumber(receivedData.data.person.contact.address.number);
        setNeighborhood(receivedData.data.person.contact.address.neighborhood);
        setComplement(receivedData.data.person.contact.address.complement);
        setCode(receivedData.data.person.contact.address.code);
        setState(receivedData.data.person.contact.address.city.state.id);
        setCities(
          citiesData.filter(
            (item) =>
              item.state == receivedData.data.person.contact.address.city.state.id,
          ),
        );
        setCity(receivedData.data.person.contact.address.city.id);
        setPhone(receivedData.data.person.contact.phone);
        setCellphone(receivedData.data.person.contact.cellphone);
        setEmail(receivedData.data.person.contact.email);
      }
    };

    const loadPage = async () => {
      await loadStates();

      await loadData(await loadCities());
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

  const handlePerson = {
    handleCorporateNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCorporateName(e.target.value);

      if (e.target.value.length == 0)
        setErrorCorporateName('A razão social precisa ser preenchida.');
      else if (e.target.value.length < 5)
        setErrorCorporateName('A razão social inválida.');
      else setErrorCorporateName(undefined);
    },
    handleFantasyNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setFantasyName(e.target.value);

      if (e.target.value.length == 0)
        setErrorFantasyName('O nome fantasia precisa ser preenchido.');
      else setErrorFantasyName(undefined);
    },
    handleCnpjChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCnpj(e.target.value);

      if (e.target.value.length == 0) setErrorCnpj('O CNPJ precisa ser preenchido.');
      else if (!validateCnpj(e.target.value))
        setErrorCnpj('O CNPJ preenchido é inválido.');
      else setErrorCnpj(undefined);
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

  const handleLogotypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const file = files[0];
    setLogotype(file);
  };

  const handleButtons = {
    handleClearClick: () => {
      alert('Limpar clicado.');
    },
    handleSaveClick: async () => {
      if (
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
            corporateName,
            fantasyName,
            cnpj,
          },
          parameterization: {
            logotype: URL.createObjectURL(logotype),
          },
        };

        if (method == 1) {
          try {
            const response = await axios.post('/parameterization', data);
            if (response.status == 200)
              if (response.data.length == 0)
                toast.success('Dados cadastrados com sucesso!');
              else toast.error('Erro de requisição: ' + response.data);
          } catch (err) {
            if (isAxiosError(err))
              toast.error('Erro de requisição: ' + err.response?.data);
          }
        } else {
          try {
            const response = await axios.put('/parameterization', data);
            if (response.status == 200)
              if (response.data.length == 0)
                toast.success('Dados atualizados com sucesso!');
              else toast.error('Erro de requisição: ' + response.data);
          } catch (err) {
            if (isAxiosError(err))
              toast.error('Erro de requisição: ' + err.response?.data);
          }
        }
      }
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
