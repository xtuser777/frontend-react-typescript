import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputGroupEmail } from '../../components/form-input-group-email';
import { BsPhoneFill, BsTelephoneFill } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputNumber } from '../../components/form-input-number';
import { FormButton } from '../../components/form-button';
import { SaleBudget } from '../../models/SaleBudget';
import { Client } from '../../models/Client';
import { State } from '../../models/state';
import { City } from '../../models/city';
import { Employee } from '../../models/Employee';
import axios from '../../services/axios';
import { formatarData, formatarPeso, formatarValor } from '../../utils/format';
import { Representation } from '../../models/Representation';
import { Product } from '../../models/Product';
import isEmail from 'validator/lib/isEmail';
import { toast } from 'react-toastify';
import { IndividualPerson } from '../../models/individual-person';
import { EnterprisePerson } from '../../models/enterprise-person';
import { SaleBudgetItem } from '../../models/SaleBudgetItem';
import { FaTrash } from 'react-icons/fa';
import history from '../../services/history';

export function SalesBudget(): JSX.Element {
  const [budget, setBudget] = useState(new SaleBudget());

  const [clients, setClients] = useState(new Array<Client>());
  const [states, setStates] = useState(new Array<State>());
  const [cities, setCities] = useState(new Array<City>());
  const [salesmans, setSalesmans] = useState(new Array<Employee>());

  const [representations, setRepresentations] = useState(new Array<Representation>());
  const [representationsDb, setRepresentationsDb] = useState(new Array<Representation>());
  const [products, setProducts] = useState(new Array<Product>());
  const [productsDb, setProductsDb] = useState(new Array<Product>());

  const [client, setClient] = useState('0');
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState<string | undefined>(undefined);
  const [type, setType] = useState('1');
  const [errorType, setErrorType] = useState<string | undefined>(undefined);
  const [cpf, setCpf] = useState('');
  const [errorCpf, setErrorCpf] = useState<string | undefined>(undefined);
  const [cnpj, setCnpj] = useState('');
  const [errorCnpj, setErrorCnpj] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState<string | undefined>(undefined);
  const [cellphone, setCellphone] = useState('');
  const [errorCellphone, setErrorCellphone] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState<string | undefined>(undefined);

  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState<string | undefined>(undefined);
  const [salesman, setSalesman] = useState('0');
  const [destinyState, setDestinyState] = useState('0');
  const [errorDestinyState, setErrorDestinyState] = useState<string | undefined>(
    undefined,
  );
  const [destinyCity, setDestinyCity] = useState('0');
  const [errorDestinyCity, setErrorDestinyCity] = useState<string | undefined>(undefined);

  const [weight, setWeight] = useState('');
  const [errorWeight, setErrorWeight] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState<string | undefined>(undefined);
  const [dueDate, setDueDate] = useState(new Date().toISOString().substring(0, 10));
  const [errorDueDate, setErrorDueDate] = useState<string | undefined>(undefined);

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

    const getSalesmans = async () => {
      const response = await new Employee().get();
      const salesman = response.filter((item) => item.type == 2);
      setSalesmans(salesman);
    };

    const getClients = async () => {
      const response = await new Client().get();
      setClients(response);
    };

    const getRepresentations = async () => {
      const response = await new Representation().get();
      if (response.length == 0) {
        toast.info('Não há representações cadastradas.');
        history.push('/representacoes');
        window.location.reload();
      }
      setRepresentationsDb(response);
      setRepresentations(response);
    };

    const getProducts = async () => {
      const response = await new Product().get();
      if (response.length == 0) {
        toast.info('Não há produtos cadastrados.');
        history.push('/produtos');
        window.location.reload();
      }
      setProducts(response);
      setProductsDb(response);
    };

    const getData = async (states: State[]) => {
      const budget = await new SaleBudget().getOne(id);
      if (budget) {
        setBudget(budget);

        if (budget.client) {
          setClient(budget.client.id.toString());
        }

        setName(budget.clientName);
        setType(budget.clientDocument.length == 14 ? '1' : '2');
        if (budget.clientDocument.length == 14) setCpf(budget.clientDocument);
        else setCnpj(budget.clientDocument);
        setPhone(budget.clientPhone);
        setCellphone(budget.clientCellphone);
        setEmail(budget.clientEmail);

        setDescription(budget.description);
        setSalesman(budget.salesman ? budget.salesman.id.toString() : '0');
        setDestinyState(budget.destiny.state.id.toString());
        setCities(states[budget.destiny.state.id - 1].cities);
        setDestinyCity(budget.destiny.id.toString());

        setWeight(formatarPeso(budget.weight));
        setPrice(formatarValor(budget.value));
        setDueDate(formatarData(budget.validate));

        setItems(budget.items);
      }
    };

    const load = async () => {
      await getClients();
      await getSalesmans();
      await getRepresentations();
      await getProducts();
      if (method == 'editar') await getData(await getStates());
      else await getStates();
    };

    load();
  }, []);

  const fillClient = (client: Client) => {
    if (client.person.type == 1) {
      setName((client.person.individual as IndividualPerson).name);
      setType('1');
      setCpf((client.person.individual as IndividualPerson).cpf);
    } else {
      setName((client.person.enterprise as EnterprisePerson).fantasyName);
      setType('2');
      setCnpj((client.person.enterprise as EnterprisePerson).cnpj);
    }
    setPhone(client.person.contact.phone);
    setCellphone(client.person.contact.cellphone);
    setEmail(client.person.contact.email);
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
        budget.clientName = value;
        return true;
      }
    },
    type: (value: string) => {
      if (value == '0') {
        setErrorType('O tipo do cliente precisa ser selecionado.');
        return false;
      } else {
        setErrorType(undefined);
        return true;
      }
    },
    cpf: (value: string) => {
      if (value.length == 0) {
        setErrorCpf('O CPF precisa ser preenchido');
        return false;
      } else if (!validateCpf(value)) {
        setErrorCpf('O CPF preenchido é inválido');
        return false;
      } else {
        setErrorCpf(undefined);
        budget.clientDocument = value;
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
        budget.clientDocument = value;
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
        budget.clientPhone = value;
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
        budget.clientCellphone = value;
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
        budget.clientEmail = value;
        return true;
      }
    },
    description: (value: string) => {
      if (value.length == 0) {
        setErrorDescription('A descrição do orçamento precisa ser preenchida.');
        return false;
      } else if (value.length < 2) {
        setErrorDescription('A descrição preenchida tem tamanho inválido.');
        return false;
      } else {
        setErrorDescription(undefined);
        budget.description = value;
        return true;
      }
    },
    destinyState: (value: string) => {
      if (value == '0') {
        setErrorDestinyState('O Estado precisa ser selecionado');
        return false;
      } else {
        setErrorDestinyState(undefined);
        setCities(states[Number(value) - 1].cities);
        return true;
      }
    },
    destinyCity: (value: string) => {
      if (value == '0') {
        setErrorDestinyCity('A cidade precisa ser selecionada');
        return false;
      } else {
        setErrorDestinyCity(undefined);
        budget.destiny = cities.find((item) => item.id == Number(value)) as City;
        return true;
      }
    },
    weight: (value: string) => {
      if (value.length == 0) {
        setErrorWeight('O peso do frete precisa ser preenchido.');
        return false;
      } else if (Number(value) <= 0) {
        setErrorWeight('O peso do frete informado é inválido.');
        return false;
      } else {
        setErrorWeight(undefined);
        budget.weight = Number.parseFloat(
          value.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        );
        return true;
      }
    },
    price: (value: string) => {
      if (value.length == 0) {
        setErrorPrice('O preço do produto precisa ser preenchido.');
        return false;
      } else if (Number(value) <= 0) {
        setErrorPrice('O preço do produto informado é inválido.');
        return false;
      } else {
        setErrorPrice(undefined);
        budget.value = Number.parseFloat(
          value.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        );
        return true;
      }
    },
    dueDate: (value: string) => {
      const val = new Date(value);
      const now = new Date(Date.now());
      if (value.length == 0) {
        setErrorDueDate('A data de validade precisa ser preenchida');
        return false;
      } else if (
        now.getFullYear() == val.getFullYear() &&
        now.getMonth() == val.getMonth() &&
        now.getDate() > val.getDate()
      ) {
        setErrorDueDate('A data de validade preenchida é inválida');
        return false;
      } else {
        setErrorDueDate(undefined);
        budget.validate = value;
        return true;
      }
    },
    items: () => {
      if (items.length == 0) {
        toast.info('Não há itens adicionados ao orçamento.');
        return false;
      } else {
        budget.items = items;
        return true;
      }
    },
    itemRepresentation: (value: string) => {
      if (value == '0') {
        setErrorItemRepresentation('A representação do item precisa ser selecionada.');
        return false;
      } else {
        setErrorItemRepresentation(undefined);
        setItemFilter('');
        setItem('0');
        let newProducts = [...productsDb];
        newProducts = newProducts.filter(
          (item) => item.representation.id == Number(value),
        );
        setProducts(newProducts);
        return true;
      }
    },
    item: (value: string) => {
      if (value == '0') {
        setErrorItem('O item precisa ser selecionado.');
        return false;
      } else {
        setErrorItem(undefined);
        const product = products.find((item) => item.id == Number(value)) as Product;
        setPrice(
          formatarValor(
            product.representation.person.contact.address.city.state.id ==
              Number(destinyState)
              ? product.price
              : product.priceOut,
          ),
        );
        setItemQuantity(1);
        setTotalItemPrice(
          formatarValor(
            product.representation.person.contact.address.city.state.id ==
              Number(destinyState)
              ? product.price * itemQuantity
              : product.priceOut * itemQuantity,
          ),
        );
        return true;
      }
    },
    itemPrice: (value: string) => {
      if (value.length == 0) {
        setErrorItemPrice('O preço do item precisa ser preenchido.');
        return false;
      } else if (Number(value) <= 0) {
        setErrorItemPrice('O preço do item informado é inválido.');
        return false;
      } else {
        setErrorItemPrice(undefined);
        return true;
      }
    },
    itemQuantity: (value: string) => {
      const val = Number(value);
      if (val <= 0) {
        setErrorItemQuantity('A quantidade do item precisa ser preenchida.');
        return false;
      } else {
        setErrorItemQuantity(undefined);
        const product = products.find((item) => item.id == Number(value)) as Product;
        setTotalItemPrice(
          formatarValor(
            product.representation.person.contact.address.city.state.id ==
              Number(destinyState)
              ? product.price * itemQuantity
              : product.priceOut * itemQuantity,
          ),
        );
        return true;
      }
    },
    totalItemPrice: (value: string) => {
      if (value.length == 0) {
        setErrorTotalItemPrice('O preço total do item precisa ser preenchido.');
        return false;
      } else if (Number(value) <= 0) {
        setErrorTotalItemPrice('O preço total do item informado é inválido.');
        return false;
      } else {
        setErrorTotalItemPrice(undefined);
        return true;
      }
    },
  };

  const handleClientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value);
    if (e.target.value != '0') {
      budget.client = clients.find((item) => item.id == Number(e.target.value));
      fillClient(budget.client as Client);
    } else {
      budget.client = undefined;
      setName('');
      setType('1');
      setCpf('');
      setCnpj('');
      setPhone('');
      setCellphone('');
      setEmail('');
    }
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    validate.name(e.target.value);
  };
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    validate.type(e.target.value);
  };
  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
    validate.cpf(e.target.value);
  };
  const handleCnpjChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCnpj(e.target.value);
    validate.cnpj(e.target.value);
  };
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    validate.phone(e.target.value);
  };
  const handleCellphoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCellphone(e.target.value);
    validate.cellphone(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validate.email(e.target.value);
  };

  //const handleChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    validate.description(e.target.value);
  };
  const handleSalesmanChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalesman(e.target.value);
    if (e.target.value != '0')
      budget.salesman = salesmans.find((item) => item.id == Number(e.target.value));
  };
  const handleDestinyStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinyState(e.target.value);
    validate.destinyState(e.target.value);
  };
  const handleDestinyCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinyCity(e.target.value);
    validate.destinyCity(e.target.value);
  };

  const handleClearItemsClick = () => {
    setItems([]);
  };

  const [addItems, setAddItems] = useState(false);

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
    validate.weight(e.target.value);
  };
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    validate.price(e.target.value);
  };
  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
    validate.dueDate(e.target.value);
  };

  const validateFields = () => {
    return (
      validate.name(name) &&
      validate.type(type) &&
      (type == '1' ? validate.cpf(cpf) : validate.cnpj(cnpj)) &&
      validate.phone(phone) &&
      validate.cellphone(cellphone) &&
      validate.email(email) &&
      validate.description(description) &&
      validate.destinyState(destinyState) &&
      validate.destinyCity(destinyCity) &&
      validate.items() &&
      validate.weight(weight) &&
      validate.price(price) &&
      validate.dueDate(dueDate)
    );
  };

  const clearFields = () => {
    setClient('0');
    setName('');
    setType('1');
    setCpf('');
    setCnpj('');
    setPhone('');
    setCellphone('');
    setEmail('');
    setSalesman('0');
    setDescription('');
    setDestinyState('0');
    setDestinyCity('0');
    setItems([]);
    clearItemFields();
    setWeight('');
    setPrice('');
    setDueDate('');
  };

  const handleButtons = {
    handleClearClick: () => {
      clearFields();
    },
    handleSaveClick: async () => {
      if (validateFields()) {
        if (method == 'novo') {
          if (await budget.save()) clearFields();
        } else await budget.update();
      }
    },
  };

  // Items
  const [items, setItems] = useState(new Array<SaleBudgetItem>());
  const [itemRepresentation, setItemRepresentation] = useState('0');
  const [errorItemRepresentation, setErrorItemRepresentation] = useState<
    string | undefined
  >(undefined);
  const [itemRepresentationFilter, setItemRepresentationFilter] = useState('');
  const [item, setItem] = useState('0');
  const [errorItem, setErrorItem] = useState<string | undefined>(undefined);
  const [itemFilter, setItemFilter] = useState('');

  const [itemPrice, setItemPrice] = useState('');
  const [errorItemPrice, setErrorItemPrice] = useState<string | undefined>(undefined);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [errorItemQuantity, setErrorItemQuantity] = useState<string | undefined>(
    undefined,
  );
  const [totalItemPrice, setTotalItemPrice] = useState('');
  const [errorTotalItemPrice, setErrorTotalItemPrice] = useState<string | undefined>(
    undefined,
  );

  const handleItemRepresentationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemRepresentation(e.target.value);
    validate.itemRepresentation(e.target.value);
  };
  const handleItemRepresentationFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemRepresentationFilter(e.target.value);
    if (e.target.value.trim().length > 0) {
      clearItemFields();
      let newRepresentations = [...representationsDb];
      newRepresentations = newRepresentations.filter(
        (item) =>
          item.person.enterprise?.fantasyName.includes(e.target.value) ||
          item.unity.includes(e.target.value),
      );
      setRepresentations(newRepresentations);
    }
  };
  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
    validate.item(e.target.value);
  };
  const handleItemFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemFilter(e.target.value);
    if (e.target.value.trim().length > 0) {
      setItem('0');
      setItemPrice('');
      setItemQuantity(1);
      setTotalItemPrice('');
      let newProducts = [...productsDb];
      newProducts = newProducts.filter(
        (item) =>
          item.representation.id == Number(itemRepresentation) &&
          item.description.includes(e.target.value),
      );
      setProducts(newProducts);
    }
  };

  const handleItemPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemPrice(e.target.value);
    validate.itemPrice(e.target.value);
  };
  const handleItemQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(Number.parseInt(e.target.value));
    validate.itemQuantity(e.target.value);
  };
  const handleTotalItemPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalItemPrice(e.target.value);
    validate.totalItemPrice(e.target.value);
  };

  const clearItemFields = () => {
    setItemRepresentationFilter('');
    setItemRepresentation('0');
    setItemFilter('');
    setItem('0');
    setItemPrice('');
    setItemQuantity(1);
    setTotalItemPrice('');
    setItems([]);
  };

  const validateItemFields = () => {
    return (
      validate.itemRepresentation(itemRepresentation) &&
      validate.item(item) &&
      validate.itemPrice(itemPrice) &&
      validate.itemQuantity(itemQuantity.toString()) &&
      validate.totalItemPrice(totalItemPrice)
    );
  };

  const handleClearItemClick = () => {
    clearItemFields();
  };
  const handleAddItemClick = () => {
    if (validateItemFields()) {
      const newItems = [...items];
      const product = products.find((item) => item.id == Number(item)) as Product;
      newItems.push(
        new SaleBudgetItem({
          id: 0,
          budget: budget,
          product: product,
          quantity: itemQuantity,
          weight: product.weight * itemQuantity,
          price: Number.parseFloat(
            totalItemPrice.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
          ),
        }),
      );
      setItems(newItems);
    }
  };

  return (
    <>
      <CardTitle
        text={
          method == 'novo' ? 'Abrir Orçamento de Venda' : 'Detalhes do Orçamento de Venda'
        }
      />
      <FieldsetCard legend="Dados do Cliente" obrigatoryFields>
        <Row>
          <FormInputSelect
            colSm={4}
            id="cliente"
            label="Cliente"
            obrigatory={false}
            value={client}
            onChange={handleClientChange}
          >
            <option value="0">SELECIONAR</option>
            {clients.map((item) => (
              <option key={item.id} value={item.id}>
                {item.person.type == 1
                  ? (item.person.individual as IndividualPerson).name
                  : (item.person.enterprise as EnterprisePerson).fantasyName}
              </option>
            ))}
          </FormInputSelect>
          <FormInputText
            colSm={4}
            id="nome"
            label="Nome / Nome Fantasia"
            obrigatory
            value={name}
            onChange={handleNameChange}
            readonly={client != '0' ? true : false}
            message={errorName}
          />
          <FormInputSelect
            colSm={2}
            id="tipo-documento"
            label="Tipo"
            obrigatory
            value={type}
            onChange={handleTypeChange}
            readonly={client != '0' ? true : false}
            message={errorType}
          >
            <option value="1">CPF</option>
            <option value="2">CNPJ</option>
          </FormInputSelect>
          {type == '1' ? (
            <FormInputText
              colSm={2}
              id="cpf"
              label="CPF"
              obrigatory
              mask="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
              readonly={client != '0' ? true : false}
              message={errorCpf}
            />
          ) : (
            <FormInputText
              colSm={2}
              id="cnpj"
              label="CNPJ"
              obrigatory
              mask="00.000.000/0000-00"
              value={cnpj}
              onChange={handleCnpjChange}
              readonly={client != '0' ? true : false}
              message={errorCnpj}
            />
          )}
        </Row>
        <Row>
          <FormInputGroupText
            colSm={3}
            id="tel"
            label="Telefone"
            groupText={<BsTelephoneFill />}
            obrigatory
            mask="(00) 0000-0000"
            value={phone}
            onChange={(e) => handlePhoneChange(e)}
            readonly={client != '0' ? true : false}
            message={errorPhone}
          />
          <FormInputGroupText
            colSm={3}
            id="cel"
            label="Celular"
            groupText={<BsPhoneFill />}
            obrigatory
            mask="(00) 00000-0000"
            value={cellphone}
            onChange={(e) => handleCellphoneChange(e)}
            readonly={client != '0' ? true : false}
            message={errorCellphone}
          />
          <FormInputGroupEmail
            colSm={6}
            id="email"
            label="E-mail"
            groupText={<MdAlternateEmail />}
            obrigatory
            value={email}
            onChange={(e) => handleEmailChange(e)}
            readonly={client != '0' ? true : false}
            message={errorEmail}
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Dados do Orçamento" obrigatoryFields>
        <Row>
          <FormInputText
            colSm={12}
            id="desc"
            label="Descrição"
            obrigatory
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
            message={errorDescription}
          />
        </Row>
        <Row>
          <FormInputSelect
            colSm={5}
            id="vendedor"
            label="Vendedor"
            obrigatory={false}
            value={salesman}
            onChange={handleSalesmanChange}
          >
            <option value="0">SELECIONAR</option>
            {salesmans.map((item) => (
              <option key={item.id} value={item.id}>
                {(item.person.individual as IndividualPerson).name}
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={3}
            id="estado-destino"
            label="Estado de destino"
            obrigatory
            value={destinyState}
            onChange={handleDestinyStateChange}
            message={errorDestinyState}
          >
            <option value="0">SELECIONAR</option>
            {states.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={4}
            id="cidade-destino"
            label="Cidade de destino"
            obrigatory
            value={destinyCity}
            onChange={handleDestinyCityChange}
            disable={destinyState == '0' ? true : false}
            message={errorDestinyCity}
          >
            <option value="0">SELECIONAR</option>
            {cities.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </FormInputSelect>
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Itens do Orçamento">
        <div className="table-container" style={{ height: '150px' }}>
          <Table id="tableItens" hover striped size="sm">
            <thead>
              <tr>
                <th>DESCRIÇÃO</th>
                <th>REPRESENTAÇÃO</th>
                <th>VALOR (R$)</th>
                <th>QTDE.</th>
                <th>TOTAL (R$)</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody id="tbodyItens">
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product.description}</td>
                  <td>{item.product.representation.person.enterprise?.fantasyName}</td>
                  <td>
                    {formatarValor(
                      item.product.representation.person.contact.address.city.state.id ==
                        Number(destinyState)
                        ? item.product.price
                        : item.product.priceOut,
                    )}
                  </td>
                  <td>{item.quantity}</td>
                  <td>{formatarValor(item.price)}</td>
                  <td>
                    <FaTrash
                      role="button"
                      color="red"
                      size={14}
                      title="Excluir"
                      onClick={() => {
                        const newItems = [...items];
                        delete newItems[newItems.findIndex((i) => i.id == item.id)];
                        newItems.length--;
                        setItems(newItems);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row>
          <Col sm="4"></Col>
          <Col sm="4">
            <Button
              id="limpar-itens"
              color="primary"
              size="sm"
              style={{ width: '100%' }}
              onClick={handleClearItemsClick}
            >
              LIMPAR ITENS
            </Button>
          </Col>
          <Col sm="4">
            <Button
              id="adicionar-itens"
              color={addItems ? 'secondary' : 'success'}
              size="sm"
              style={{ width: '100%' }}
              onClick={() => setAddItems(!addItems)}
            >
              {addItems ? 'CONCLUIR ADIÇÂO' : 'ADICIONAR ITENS'}
            </Button>
          </Col>
        </Row>
      </FieldsetCard>
      {addItems ? (
        <FieldsetCard legend="Adicionar Item" obrigatoryFields>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="filtro-representacao-item">
                  Representação <span style={{ color: 'red' }}>*</span> :
                </Label>
                <Input
                  type="text"
                  id="filtro-representacao-item"
                  bsSize="sm"
                  style={{ width: '100%', marginBottom: '5px' }}
                  value={itemRepresentationFilter}
                  onChange={handleItemRepresentationFilterChange}
                />
                <Input
                  type="select"
                  id="representacao-item"
                  bsSize="sm"
                  style={{ width: '100%' }}
                  value={itemRepresentation}
                  onChange={handleItemRepresentationChange}
                  message={errorItemRepresentation}
                >
                  {representations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.person.enterprise?.fantasyName + ' (' + item.unity + ')'}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label for="filtro-item">
                  Produto <span style={{ color: 'red' }}>*</span> :
                </Label>
                <Input
                  type="text"
                  id="filtro-item"
                  bsSize="sm"
                  style={{ width: '100%', marginBottom: '5px' }}
                  value={itemFilter}
                  onChange={handleItemFilterChange}
                />
                <Input
                  type="select"
                  id="item"
                  bsSize="sm"
                  style={{ width: '100%' }}
                  value={item}
                  onChange={handleItemChange}
                  message={errorItem}
                >
                  {products.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.description}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <FormInputGroupText
              colSm={3}
              id="preco-produto"
              label="Valor Unitário"
              groupText={'R$'}
              obrigatory
              mask="#.##0,00"
              maskReversal={true}
              maskPlaceholder="0,00"
              value={itemPrice}
              onChange={handleItemPriceChange}
              readonly
              message={errorItemPrice}
            />
            <FormInputNumber
              colSm={2}
              id="quantidade-item"
              label="Qtde desejada"
              obrigatory
              value={itemQuantity}
              onChange={handleItemQuantityChange}
              message={errorItemQuantity}
            />
            <FormInputGroupText
              colSm={3}
              id="preco-total-item"
              label="Valor Total"
              groupText={'R$'}
              obrigatory
              mask="#.##0,00"
              maskReversal={true}
              maskPlaceholder="0,00"
              value={totalItemPrice}
              onChange={handleTotalItemPriceChange}
              readonly
              message={errorTotalItemPrice}
            />
            <FormButton
              colSm={2}
              color="primary"
              id="limpar-item"
              text="LIMPAR"
              onClick={handleClearItemClick}
            />
            <FormButton
              colSm={2}
              color="success"
              id="adicionar-item"
              text="ADICIONAR"
              onClick={handleAddItemClick}
            />
          </Row>
        </FieldsetCard>
      ) : (
        ''
      )}
      <FieldsetCard legend="Valores do Orçamento" obrigatoryFields>
        <Row>
          <FormInputGroupText
            colSm={4}
            id="peso"
            label="Peso"
            groupText={'KG'}
            obrigatory
            mask="##0,0"
            maskReversal={true}
            maskPlaceholder="0,0"
            value={weight}
            onChange={(e) => handleWeightChange(e)}
            readonly
            message={errorWeight}
          />
          <FormInputGroupText
            colSm={4}
            id="preco"
            label="Preço"
            groupText={'R$'}
            obrigatory
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={price}
            onChange={(e) => handlePriceChange(e)}
            readonly
            message={errorPrice}
          />
          <FormInputDate
            colSm={4}
            id="validade"
            label="Validade"
            obrigatory
            value={dueDate}
            onChange={handleDueDateChange}
            message={errorDueDate}
          />
        </Row>
      </FieldsetCard>
      <FormButtonsSave
        backLink="/orcamentos/venda"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
