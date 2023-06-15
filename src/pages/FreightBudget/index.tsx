import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Badge, Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputNumber } from '../../components/form-input-number';
import { FormButton } from '../../components/form-button';
import { FreightBudget as FreightBudgetModel } from '../../models/FreightBudget';
import { ICity } from '../../models/City';
import { Client, IClient } from '../../models/Client';
import { IProduct, Product } from '../../models/Product';
import { IRepresentation, Representation } from '../../models/Representation';
import { IState } from '../../models/State';
import { ISaleBudget, SaleBudget } from '../../models/SaleBudget';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import history from '../../services/history';
import { formatarDataIso, formatarPeso, formatarValor } from '../../utils/format';
import { IFreightItem } from '../../models/FreightItem';
import { ITruckType, TruckType } from '../../models/TruckType';
import { FaTrash } from 'react-icons/fa';
import { calculateMinimumFloor } from '../../utils/calc';

export function FreightBudget(): JSX.Element {
  const [budget, setBudget] = useState(new FreightBudgetModel());

  const [sales, setSales] = useState(new Array<ISaleBudget>());
  const [representations, setRepresentations] = useState(new Array<IRepresentation>());
  const [representationsDb, setRepresentationsDb] = useState(
    new Array<IRepresentation>(),
  );
  const [products, setProducts] = useState(new Array<IProduct>());
  const [productsDb, setProductsDb] = useState(new Array<IProduct>());
  const [clients, setClients] = useState(new Array<IClient>());
  const [states, setStates] = useState(new Array<IState>());
  const [cities, setCities] = useState(new Array<ICity>());
  const [typesDb, setTypesDb] = useState(new Array<ITruckType>());
  const [types, setTypes] = useState(new Array<ITruckType>());

  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState<string | undefined>(undefined);
  const [salesBudget, setSalesBudget] = useState('0');
  const [representation, setRepresentation] = useState('0');
  const [client, setClient] = useState('0');
  const [errorClient, setErrorClient] = useState<string | undefined>(undefined);

  const [destinyState, setDestinyState] = useState('0');
  const [errorDestinyState, setErrorDestinyState] = useState<string | undefined>(
    undefined,
  );
  const [destinyCity, setDestinyCity] = useState('0');
  const [errorDestinyCity, setErrorDestinyCity] = useState<string | undefined>(undefined);
  const [truckType, setTruckType] = useState('0');
  const [errorType, setErrorType] = useState<string | undefined>(undefined);
  const [distance, setDistance] = useState(1);
  const [errorDistance, setErrorDistance] = useState<string | undefined>(undefined);

  const [weight, setWeight] = useState('');
  const [errorWeight, setErrorWeight] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState<string | undefined>(undefined);
  const [shipping, setShipping] = useState(new Date().toISOString().substring(0, 10));
  const [errorShipping, setErrorShipping] = useState<string | undefined>(undefined);
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

    const getSales = async () => {
      const data = await new SaleBudget().get();
      setSales(data);
    };

    const getClients = async () => {
      const response = await new Client().get();
      setClients(response);
    };

    const getTypes = async () => {
      const data = await new TruckType().get();
      setTypesDb(data);
      //setTypes(data);
    };

    const getRepresentations = async (products: IProduct[]) => {
      const response = await new Representation().get();
      if (response.length == 0) {
        toast.info('Não há representações cadastradas.');
        history.push('/representacoes');
        window.location.reload();
      }
      setRepresentationsDb(response);
      setRepresentations(response);

      setItemRepresentation(response[0].id.toString());
      let newProducts = [...products];
      newProducts = newProducts.filter(
        (item) => item.representation.id == response[0].id,
      );
      setProducts(newProducts);
      if (newProducts.length > 0) {
        setItem(newProducts[0].id.toString());
        const product = newProducts.find(
          (item) => item.id == newProducts[0].id,
        ) as IProduct;
        setItemWeight(formatarPeso(product.weight));
        setItemQuantity(1);
        setTotalItemWeight(formatarValor(product.weight * itemQuantity));
      }
    };

    const getProducts = async () => {
      const response = await new Product().get();
      if (response.length == 0) {
        toast.info('Não há produtos cadastrados.');
        history.push('/produtos');
        window.location.reload();
      }
      setProductsDb(response);
      return response;
    };

    const getData = async (states: IState[]) => {
      const budget = await new FreightBudgetModel().getOne(id);
      if (budget) {
        setBudget(budget);

        setDescription(budget.description);
        setSalesBudget(budget.saleBudget ? budget.saleBudget.id.toString() : '0');
        setRepresentation(
          budget.representation ? budget.representation.id.toString() : '0',
        );
        setClient(budget.client.id.toString());
        setDestinyState(budget.destiny.state.id.toString());
        setCities(states[budget.destiny.state.id - 1].cities);
        setDestinyCity(budget.destiny.id.toString());
        setTruckType(budget.truckType.id.toString());
        setDistance(budget.distance);

        setWeight(formatarPeso(budget.weight));
        setPrice(formatarValor(budget.value));
        setShipping(formatarDataIso(budget.shipping));
        setDueDate(formatarDataIso(budget.validate));

        setItems(budget.items);
      }
    };

    const load = async () => {
      await getSales();
      await getClients();
      await getTypes();
      await getRepresentations(await getProducts());
      if (method == 'editar') await getData(await getStates());
      else await getStates();
    };

    load();
  }, []);

  const validate = {
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
    client: (value: string) => {
      if (value == '0') {
        setErrorClient('O cliente precisa ser selecionado.');
        return false;
      } else {
        setErrorClient(undefined);
        budget.client = clients.find((item) => item.id == Number(value)) as IClient;
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
        const city = cities.find((item) => item.id == Number(value)) as ICity;
        budget.destiny = city;
        return true;
      }
    },
    type: (value: string) => {
      if (value == '0') {
        setErrorType('O tipo de caminhão precisa ser selecionado.');
        return false;
      } else {
        setErrorType(undefined);
        const t = types.find((item) => item.id == Number(value)) as ITruckType;
        if (budget.weight > t.capacity) {
          setErrorType('O tipo de caminhão não suporta a carga.');
          return false;
        }
        budget.truckType = t;
        return true;
      }
    },
    distance: (value: string) => {
      const v = Number(value);
      if (Number.isNaN(v)) {
        setErrorDistance('A distância do frete precisa ser preenchida.');
        return false;
      } else if (v <= 0) {
        setErrorDistance('A distância preenchida é inválida.');
        return false;
      } else if (truckType == '0') {
        setErrorDistance('o Tipo de caminhão precisa ser selecionado primeiro.');
        return false;
      } else {
        setErrorDistance(undefined);

        const t = types.find((x) => x.id == Number(truckType)) as ITruckType;
        const piso = t.axes > 3 ? calculateMinimumFloor(Number(value), t.axes) : 1.0;
        setPrice(formatarValor(piso));

        budget.distance = v;
        budget.value = piso;
        return true;
      }
    },
    weight: (value: string) => {
      if (value.length == 0) {
        setErrorWeight('O peso do frete precisa ser preenchido.');
        return false;
      } else if (
        Number.parseFloat(
          value.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        ) <= 0
      ) {
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
        setErrorPrice('O preço do frete precisa ser preenchido.');
        return false;
      } else if (
        Number.parseFloat(
          value.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        ) <= 0
      ) {
        setErrorPrice('O preço do frete informado é inválido.');
        return false;
      } else {
        setErrorPrice(undefined);
        budget.value = Number.parseFloat(
          value.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        );
        return true;
      }
    },
    shipping: (value: string) => {
      const val = new Date(value + 'T12:00:00');
      const now = new Date(Date.now());
      if (value.length == 0) {
        setErrorDueDate('A data de entrega precisa ser preenchida');
        return false;
      } else if (
        now.getFullYear() == val.getFullYear() &&
        now.getMonth() == val.getMonth() &&
        now.getDate() > val.getDate()
      ) {
        setErrorDueDate('A data de entrega preenchida é inválida');
        return false;
      } else {
        setErrorDueDate(undefined);
        budget.validate = value;
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
        if (representations.length > 0) {
          let newProducts = [...productsDb];
          const representation = representations.find(
            (i) => i.id == Number(value),
          ) as Representation;
          newProducts = newProducts.filter(
            (item) => item.representation.id == representation.id,
          );
          setProducts(newProducts);
          if (newProducts.length > 0) {
            setItem(newProducts[0].id.toString());
            const product = newProducts.find(
              (item) => item.id == newProducts[0].id,
            ) as Product;
            setItemWeight(formatarPeso(product.weight));
            setItemQuantity(1);
            setTotalItemWeight(formatarPeso(product.weight * itemQuantity));
          }
        }
        return true;
      }
    },
    item: (value: string) => {
      if (value == '0' || products.length == 0) {
        setErrorItem('O item precisa ser selecionado.');
        return false;
      } else {
        const product = products.find((item) => item.id == Number(value)) as Product;
        const itemProduct = items.find((i) => i.product.id == product.id);
        if (itemProduct) {
          setErrorItem('Este item já foi adicionado.');
          return false;
        } else {
          let typesCommon = 0;
          product.types.forEach((x) => {
            types.forEach((y) => {
              if (x.id == y.id) typesCommon++;
            });
          });

          if (items.length > 0 && typesCommon == 0) {
            setErrorType(
              'Este produto não pode ser carregado junto os outros já adicionados.',
            );
            return false;
          }

          setErrorItem(undefined);

          setItemWeight(formatarPeso(product.weight));
          setItemQuantity(1);
          setTotalItemWeight(formatarPeso(product.weight * itemQuantity));
          return true;
        }
      }
    },
    itemWeight: (value: string) => {
      if (value.length == 0) {
        setErrorItemWeight('O peso do item precisa ser preenchido.');
        return false;
      } else if (
        Number.parseFloat(
          value.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        ) <= 0
      ) {
        setErrorItemWeight('O peso do item informado é inválido.');
        return false;
      } else {
        setErrorItemWeight(undefined);
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
        //const product = products.find((i) => i.id == Number(item)) as Product;
        const weight = Number.parseFloat(
          itemWeight.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        );
        setTotalItemWeight(formatarValor(weight * val));
        return true;
      }
    },
    totalItemWeight: (value: string) => {
      if (value.length == 0) {
        setErrorTotalItemWeight('O peso total do item precisa ser preenchido.');
        return false;
      } else if (
        Number.parseFloat(
          value.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        ) <= 0
      ) {
        setErrorTotalItemWeight('O peso total do item informado é inválido.');
        return false;
      } else {
        setErrorTotalItemWeight(undefined);
        return true;
      }
    },
  };

  const fillFieldsSale = async (saleId: number) => {
    const sale = (await new SaleBudget().getOne(saleId)) as ISaleBudget;
    setRepresentation('0');
    setClient(sale.client ? sale.client.id.toString() : '0');
    setDestinyState(sale.destiny.state.id.toString());
    setCities(states[sale.destiny.state.id - 1].cities);
    setDestinyCity(sale.destiny.id.toString());
    setDueDate(formatarDataIso(sale.validate));

    const newTypes: ITruckType[] = [];
    let totalWeight = 0.0;
    const newItems: IFreightItem[] = [];
    for (const item of sale.items) {
      newItems.push({
        id: 0,
        product: item.product,
        quantity: item.quantity,
        weight: item.weight,
      });
      totalWeight += item.weight;
      for (const t of item.product.types) {
        const exists = newTypes.find((i) => i.id == t.id);
        if (!exists) newTypes.push(t);
      }
    }
    setItems(newItems);
    setTypes(newTypes);
    setWeight(formatarValor(totalWeight));
    budget.weight = totalWeight;
  };

  //const handleChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    validate.description(e.target.value);
  };
  const handleSalesBudgetChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSalesBudget(e.target.value);
    if (e.target.value != '0') {
      await fillFieldsSale(Number(e.target.value));
    } else {
      setClient('0');
      setDestinyState('0');
      setDestinyCity('0');
      setDueDate(new Date().toISOString().substring(0, 10));
      setItems([]);
      setWeight('');
      setTypes([]);
    }
  };
  const handleRepresentationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepresentation(e.target.value);
    if (e.target.value != '0') {
      setItemRepresentation(e.target.value);
      let newProducts = [...productsDb];
      newProducts = newProducts.filter(
        (item) => item.representation.id == Number(e.target.value),
      );
      setProducts(newProducts);
      if (newProducts.length > 0) {
        setItem(newProducts[0].id.toString());
        const product = newProducts.find(
          (item) => item.id == newProducts[0].id,
        ) as IProduct;
        setItemWeight(formatarPeso(product.weight));
        setItemQuantity(1);
        setTotalItemWeight(formatarValor(product.weight * itemQuantity));
      }
      setItems([]);
      setWeight('');
      setPrice('');
      setSalesBudget('0');
      setClient('0');
      setDestinyState('0');
      setDestinyCity('0');
      setDueDate(new Date().toISOString().substring(0, 10));
      setTypes([]);
    }
  };
  const handleClientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value);
    validate.client(e.target.value);
  };

  const handleClearItemsClick = () => {
    setItems([]);
    setWeight('');
    setPrice('');
    setTypes([]);
  };

  const [addItems, setAddItems] = useState(false);

  const handleDestinyStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinyState(e.target.value);
    validate.destinyState(e.target.value);
  };
  const handleDestinyCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinyCity(e.target.value);
    validate.destinyCity(e.target.value);
  };
  const handleTruckTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTruckType(e.target.value);
    validate.type(e.target.value);
  };
  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDistance(Number.parseInt(e.target.value));
    validate.distance(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
    validate.weight(e.target.value);
  };
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    validate.price(e.target.value);
  };
  const handleShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShipping(e.target.value);
    validate.shipping(e.target.value);
  };
  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
    validate.dueDate(e.target.value);
  };

  const handleButtons = {
    handleClearClick: () => {
      alert('Limpar clicado.');
    },
    handleSaveClick: () => {
      alert('Salvar clicado.');
    },
  };

  // Items
  const [items, setItems] = useState(new Array<IFreightItem>());
  const [itemRepresentation, setItemRepresentation] = useState('0');
  const [errorItemRepresentation, setErrorItemRepresentation] = useState<
    string | undefined
  >(undefined);
  const [itemRepresentationFilter, setItemRepresentationFilter] = useState('');
  const [item, setItem] = useState('0');
  const [errorItem, setErrorItem] = useState<string | undefined>(undefined);
  const [itemFilter, setItemFilter] = useState('');

  const [itemWeight, setItemWeight] = useState('');
  const [errorItemWeight, setErrorItemWeight] = useState<string | undefined>(undefined);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [errorItemQuantity, setErrorItemQuantity] = useState<string | undefined>(
    undefined,
  );
  const [totalItemWeight, setTotalItemWeight] = useState('');
  const [errorTotalItemWeight, setErrorTotalItemWeight] = useState<string | undefined>(
    undefined,
  );

  const handleItemRepresentationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemRepresentation(e.target.value);
    validate.itemRepresentation(e.target.value);
  };
  const handleItemRepresentationFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newRepresentations: IRepresentation[] = [];
    if (e.target.value.trim().length > 0) {
      clearItemFields();
      setItemRepresentationFilter(e.target.value);
      newRepresentations = [...representationsDb];
      newRepresentations = newRepresentations.filter(
        (item) =>
          item.person.enterprise?.fantasyName.includes(e.target.value) ||
          item.unity.includes(e.target.value),
      );
    } else {
      clearItemFields();
      setItemRepresentationFilter(e.target.value);
      newRepresentations = [...representationsDb];
    }
    setRepresentations(newRepresentations);
    if (newRepresentations.length > 0) {
      setItemFilter('');
      setItemRepresentation(newRepresentations[0].id.toString());
      let newProducts = [...productsDb];
      newProducts = newProducts.filter(
        (item) => item.representation.id == newRepresentations[0].id,
      );
      setProducts(newProducts);
      if (newProducts.length > 0) {
        setItem(newProducts[0].id.toString());
        const product = newProducts.find(
          (item) => item.id == newProducts[0].id,
        ) as Product;
        setItemWeight(formatarValor(product.weight));
        setItemQuantity(1);
        setTotalItemWeight(formatarValor(product.weight * itemQuantity));
      }
    }
  };
  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
    validate.item(e.target.value);
  };
  const handleItemFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemFilter(e.target.value);
    if (e.target.value.trim().length > 0) {
      setItemWeight('');
      setItemQuantity(1);
      setTotalItemWeight('');
      let newProducts = [...productsDb];
      newProducts = newProducts.filter(
        (item) =>
          item.representation.id == Number(itemRepresentation) &&
          item.description.includes(e.target.value),
      );
      setProducts(newProducts);
      if (newProducts.length > 0) {
        const product = newProducts.find(
          (item) => item.id == newProducts[0].id,
        ) as Product;
        setItem(product.id.toString());
        setItemWeight(formatarValor(product.weight));
        setItemQuantity(1);
        setTotalItemWeight(formatarValor(product.weight * itemQuantity));
      }
    }
  };

  const handleItemWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemWeight(e.target.value);
    validate.itemWeight(e.target.value);
  };
  const handleItemQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(Number.parseInt(e.target.value));
    validate.itemQuantity(e.target.value);
  };
  const handleTotalItemWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalItemWeight(e.target.value);
    validate.totalItemWeight(e.target.value);
  };

  const clearItemFields = () => {
    setItemRepresentationFilter('');
    const newRepresentations = [...representationsDb];
    setRepresentations(newRepresentations);
    setItemFilter('');
    setProducts([]);
    setItemWeight('');
    setItemQuantity(1);
    setTotalItemWeight('');
    //setItems([]);
  };

  const validateItemFields = () => {
    return (
      validate.itemRepresentation(itemRepresentation) &&
      validate.item(item) &&
      validate.itemWeight(itemWeight) &&
      validate.itemQuantity(itemQuantity.toString()) &&
      validate.totalItemWeight(totalItemWeight)
    );
  };

  const handleClearItemClick = () => {
    clearItemFields();
  };
  const handleAddItemClick = () => {
    if (validateItemFields()) {
      const newItems = [...items];
      const product = (products.find((i) => i.id == Number(item)) as Product)
        .toAttributes;
      newItems.push({
        id: 0,
        product: product,
        quantity: itemQuantity,
        weight: product.weight * itemQuantity,
      });
      setItems(newItems);
      let totalWeight = 0.0;
      newItems.forEach((item) => (totalWeight += item.weight));
      const newTypes = [...types];
      for (const t of product.types) {
        const exists = newTypes.find((i) => i.id == t.id);
        if (!exists) newTypes.push(t);
      }
      setWeight(formatarValor(totalWeight));
      budget.weight = totalWeight;
      setTypes(newTypes);
    }
  };

  const filterItems = () => {
    if (truckType != '0') {
      const tmp = [...items];
      return tmp.filter(
        (i) => i.product.types.find((t) => t.id == Number(truckType)) != undefined,
      );
    }

    return items;
  };

  return (
    <>
      <CardTitle
        text={
          method == 'novo' ? 'Abrir Orçamento de Frete' : 'Detalhes do Orçamento de Frete'
        }
      />
      <FieldsetCard legend="Dados do Orçamento" obrigatoryFields>
        <Row>
          <FormInputText
            colSm={12}
            id="desc"
            label="Descrição"
            obrigatory
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          />
        </Row>
        <Row>
          <FormInputSelect
            colSm={4}
            id="orcamento-venda"
            label="Orçamento Venda"
            obrigatory={false}
            value={salesBudget}
            onChange={handleSalesBudgetChange}
            disable={representation != '0' ? true : false}
          >
            <option value="0">SELECIONAR</option>
            {sales.map((item) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={4}
            id="representacao"
            label="Representação"
            obrigatory={false}
            value={representation}
            onChange={handleRepresentationChange}
            disable={salesBudget != '0' ? true : false}
          >
            <option value="0">SELECIONAR</option>
            {representationsDb.map((item) => (
              <option key={item.id} value={item.id}>
                {item.person.enterprise?.fantasyName + ' (' + item.unity + ')'}
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={4}
            id="cliente"
            label="Cliente"
            obrigatory
            value={client}
            onChange={handleClientChange}
          >
            <option value="0">SELECIONAR</option>
            {clients.map((item) => (
              <option key={item.id} value={item.id}>
                {item.person.type == 1
                  ? item.person.individual?.name
                  : item.person.enterprise?.fantasyName}
              </option>
            ))}
          </FormInputSelect>
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Itens fretados">
        <div className="table-container" style={{ height: '150px' }}>
          <Table id="tableItens" hover striped size="sm">
            <thead>
              <tr>
                <th>DESCRIÇÃO</th>
                <th>REPRESENTAÇÃO</th>
                <th>PESO (KG)</th>
                <th>QTDE.</th>
                <th>TOTAL (KG)</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody id="tbodyItens">
              {filterItems().map((item) => (
                <tr key={item.product.id}>
                  <td>{item.product.description}</td>
                  <td>
                    {item.product.representation.person.enterprise?.fantasyName +
                      ' (' +
                      item.product.representation.unity +
                      ')'}
                  </td>
                  <td>{formatarValor(item.product.weight)}</td>
                  <td>{item.quantity}</td>
                  <td>{formatarValor(item.weight)}</td>
                  <td>
                    <FaTrash
                      role="button"
                      color="red"
                      size={14}
                      title="Excluir"
                      onClick={() => {
                        const newItems = [...items];
                        delete newItems[
                          newItems.findIndex((i) => i.product.id == item.product.id)
                        ];
                        newItems.length--;
                        setItems(newItems);
                        let totalWeight = 0.0;
                        newItems.forEach((item) => (totalWeight += item.weight));
                        setWeight(formatarValor(totalWeight));
                        budget.weight = totalWeight;
                        const newTypes: ITruckType[] = [];
                        newItems.forEach((i) => {
                          for (const t of i.product.types) {
                            const exists = newTypes.find((it) => it.id == t.id);
                            if (!exists) newTypes.push(t);
                          }
                        });
                        setTypes(newTypes);
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
              disabled={salesBudget != '0' ? true : false}
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
              disabled={salesBudget != '0' ? true : false}
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
                  disabled={representation == '0' ? false : true}
                >
                  {representations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.person.enterprise?.fantasyName + ' (' + item.unity + ')'}
                    </option>
                  ))}
                </Input>
                <Badge
                  id={`ms-representacao-item`}
                  color="danger"
                  className={errorItemRepresentation ? 'hidden' : ''}
                >
                  {errorItemRepresentation ? errorItemRepresentation : ''}
                </Badge>
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
                >
                  {products.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.description}
                    </option>
                  ))}
                </Input>
                <Badge
                  id={`ms-item`}
                  color="danger"
                  className={errorItem ? 'hidden' : ''}
                >
                  {errorItem ? errorItem : ''}
                </Badge>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <FormInputGroupText
              colSm={3}
              id="peso-produto"
              label="Peso"
              groupText={'KG'}
              obrigatory
              mask="##0,0"
              maskReversal={true}
              maskPlaceholder="0,0"
              value={itemWeight}
              onChange={handleItemWeightChange}
              readonly
              message={errorItemWeight}
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
              id="peso-total-item"
              label="Peso Total"
              groupText={'KG'}
              obrigatory
              mask="##0,0"
              maskReversal={true}
              maskPlaceholder="0,0"
              value={totalItemWeight}
              onChange={handleTotalItemWeightChange}
              readonly
              message={errorTotalItemWeight}
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
      <FieldsetCard legend="Dados do transporte" obrigatoryFields>
        <Row>
          <FormInputSelect
            colSm={3}
            id="estado-destino"
            label="Estado de destino"
            obrigatory
            value={destinyState}
            onChange={handleDestinyStateChange}
          >
            <option value="0">SELECIONAR</option>
            {states.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={3}
            id="cidade-destino"
            label="Cidade de destino"
            obrigatory
            value={destinyCity}
            onChange={handleDestinyCityChange}
            disable={destinyState == '0' ? true : false}
          >
            <option value="0">SELECIONAR</option>
            {cities.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={3}
            id="truck-type"
            label="Tipo Caminhão"
            obrigatory
            value={truckType}
            onChange={handleTruckTypeChange}
          >
            <option value="0">SELECIONAR</option>
            {types.map((item) => (
              <option key={item.id} value={item.id}>
                {item.description + ' - ' + item.axes + ' EIXOS'}
              </option>
            ))}
          </FormInputSelect>
          <FormInputNumber
            colSm={3}
            id="distancia"
            label="Distância"
            obrigatory
            value={distance}
            onChange={handleDistanceChange}
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Valores do Orçamento" obrigatoryFields>
        <Row>
          <FormInputGroupText
            colSm={3}
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
          />
          <FormInputGroupText
            colSm={3}
            id="preco-frete"
            label="Valor Frete"
            groupText={'R$'}
            obrigatory
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={price}
            onChange={(e) => handlePriceChange(e)}
          />
          <FormInputDate
            colSm={3}
            id="entrega"
            label="Data Aprox. de Entrega"
            obrigatory
            value={shipping}
            onChange={handleShippingChange}
          />
          <FormInputDate
            colSm={3}
            id="validade"
            label="Validade"
            obrigatory
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </Row>
      </FieldsetCard>
      <FormButtonsSave
        backLink="/orcamentos/frete"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
