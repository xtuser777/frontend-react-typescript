import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputNumber } from '../../components/form-input-number';
import { FormButton } from '../../components/form-button';
import { FormInputGroupNumber } from '../../components/form-input-group-number';
import { FreightOrder as FreightOrderModel } from '../../models/FreightOrder';
import { FreightBudget, IFreightBudget } from '../../models/FreightBudget';
import { ISaleOrder, SaleOrder } from '../../models/SaleOrder';
import { ICity } from '../../models/City';
import { Client, IClient } from '../../models/Client';
import { IPaymentForm, PaymentForm } from '../../models/PaymentForm';
import { IProduct, Product } from '../../models/Product';
import { IRepresentation, Representation } from '../../models/Representation';
import { IState } from '../../models/State';
import { IProprietary, Proprietary } from '../../models/Proprietary';
import { ITruckType } from '../../models/TruckType';
import { ITruck, Truck } from '../../models/Truck';
import { Driver, IDriver } from '../../models/Driver';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import history from '../../services/history';
import { formatarDataIso, formatarPeso, formatarValor } from '../../utils/format';
import { useParams } from 'react-router-dom';
import { IFreightItem } from '../../models/FreightItem';
import { FaTrash } from 'react-icons/fa';
import { calculateMinimumFloor } from '../../utils/calc';
import { ILoadStep } from '../../models/LoadStep';

export function FreightOrder(): JSX.Element {
  const [order, setOrder] = useState(new FreightOrderModel());

  const [budgets, setBudgets] = useState(new Array<IFreightBudget>());
  const [sales, setSales] = useState(new Array<ISaleOrder>());
  const [clients, setClients] = useState(new Array<IClient>());
  const [states, setStates] = useState(new Array<IState>());
  const [cities, setCities] = useState(new Array<ICity>());

  const [representations, setRepresentations] = useState(new Array<IRepresentation>());
  const [representationsDb, setRepresentationsDb] = useState(
    new Array<IRepresentation>(),
  );
  const [products, setProducts] = useState(new Array<IProduct>());
  const [productsDb, setProductsDb] = useState(new Array<IProduct>());

  const [steps, setSteps] = useState(new Array<ILoadStep>());

  const [paymentForms, setPaymentForms] = useState(new Array<IPaymentForm>());
  const [proprietaries, setProprietaries] = useState(new Array<IProprietary>());
  const [drivers, setDrivers] = useState(new Array<IDriver>());
  const [truckTypes, setTruckTypes] = useState(new Array<ITruckType>());
  const [trucks, setTrucks] = useState(new Array<ITruck>());
  const [trucksDb, setTrucksDb] = useState(new Array<ITruck>());

  const [budget, setBudget] = useState('0');
  const [sale, setSale] = useState('0');
  const [representation, setRepresentation] = useState('0');
  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState<string | undefined>(undefined);
  const [client, setClient] = useState('0');
  const [errorClient, setErrorClient] = useState<string | undefined>(undefined);

  const [truckType, setTruckType] = useState('0');
  const [errorTruckType, setErrorTruckType] = useState<string | undefined>(undefined);
  const [proprietary, setProprietary] = useState('0');
  const [errorProprietary, setErrorProprietary] = useState<string | undefined>(undefined);
  const [truck, setTruck] = useState('0');
  const [errorTruck, setErrorTruck] = useState<string | undefined>(undefined);
  const [distance, setDistance] = useState(1);
  const [errorDistance, setErrorDistance] = useState<string | undefined>(undefined);

  const [destinyState, setDestinyState] = useState('0');
  const [errorDestinyState, setErrorDestinyState] = useState<string | undefined>(
    undefined,
  );
  const [destinyCity, setDestinyCity] = useState('0');
  const [errorDestinyCity, setErrorDestinyCity] = useState<string | undefined>(undefined);

  const [driver, setDriver] = useState('0');
  const [errorDriver, setErrorDriver] = useState<string | undefined>(undefined);
  const [driverAmount, setDriverAmount] = useState('');
  const [errorDriverAmount, setErrorDriverAmount] = useState<string | undefined>(
    undefined,
  );
  const [driverAmountEntry, setDriverAmountEntry] = useState('');
  const [driverForm, setDriverForm] = useState('0');

  const [weight, setWeight] = useState('');
  const [errorWeight, setErrorWeight] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState<string | undefined>(undefined);
  const [shipping, setShipping] = useState(new Date().toISOString().substring(0, 10));
  const [errorShipping, setErrorShipping] = useState<string | undefined>(undefined);
  const [form, setForm] = useState('0');
  const [errorForm, setErrorForm] = useState<string | undefined>(undefined);

  const [minimumFloor, setMinimumFloor] = useState(0);

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  useEffect(() => {
    const getBudgets = async () => {
      const response = await new FreightBudget().get();
      setBudgets(response);
    };

    const getSales = async () => {
      const response = await new SaleOrder().get();
      setSales(response);
    };

    const getStates = async () => {
      const response = await axios.get('/state');
      setStates(response.data);
      return response.data;
    };

    const getClients = async () => {
      const response = await new Client().get();
      setClients(response);
    };

    const getRepresentations = async (products: Product[]) => {
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
        ) as Product;
        setItemWeight(formatarPeso(product.weight));
        setItemQuantity(1);
        setTotalItemWeight(formatarPeso(product.weight * itemQuantity));
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

    const getDrivers = async () => {
      const response = await new Driver().get();
      setDrivers(response);
    };

    const getProprietaries = async () => {
      const response = await new Proprietary().get();
      setProprietaries(response);
    };

    const getTrucks = async () => {
      const response = await new Truck().get();
      setTrucksDb(response);
      setTrucks(response);
    };

    const getPaymentForms = async () => {
      const response = (await new PaymentForm().get()).filter((item) => item.link == 2);
      setPaymentForms(response);
    };
    const getData = async (states: IState[]) => {
      const order = await new FreightOrderModel().getOne(id);
      if (order) {
        setOrder(order);

        setDescription(order.description);
        setSale(order.saleOrder ? order.saleOrder.id.toString() : '0');
        setRepresentation(
          order.representation ? order.representation.id.toString() : '0',
        );
        setClient(order.client.id.toString());
        setDestinyState(order.destiny.state.id.toString());
        setCities(states[order.destiny.state.id - 1].cities);
        setDestinyCity(order.destiny.id.toString());
        setTruckType(order.truckType.id.toString());
        setDistance(order.distance);

        setWeight(formatarPeso(order.weight));
        setPrice(formatarValor(order.value));
        setShipping(formatarDataIso(order.shipping));

        setItems(order.items);
        const newTypes: ITruckType[] = [];
        for (const item of order.items) {
          for (const t of item.product.types) {
            const exists = newTypes.find((i) => i.id == t.id);
            if (!exists) newTypes.push(t);
          }
        }
        setTruckTypes(newTypes);
      }
    };

    const load = async () => {
      await getBudgets();
      await getSales();
      await getClients();
      await getRepresentations(await getProducts());
      await getDrivers();
      await getProprietaries();
      await getTrucks();
      await getPaymentForms();
      if (method == 'detalhes') await getData(await getStates());
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
        order.description = value;
        return true;
      }
    },
    client: (value: string) => {
      if (value == '0') {
        setErrorClient('O cliente precisa ser selecionado.');
        return false;
      } else {
        setErrorClient(undefined);
        order.client = (
          clients.find((item) => item.id == Number(value)) as Client
        ).toAttributes;
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
        order.destiny = city;
        return true;
      }
    },
    type: (value: string) => {
      if (value == '0') {
        setErrorTruckType('O tipo de caminhão precisa ser selecionado.');
        return false;
      } else {
        setErrorTruckType(undefined);
        const t = truckTypes.find((item) => item.id == Number(value)) as ITruckType;

        if (
          Number.parseFloat(
            order.weight
              .toString()
              .replace(',', '#')
              .replaceAll('.', ',')
              .replace('#', '.'),
          ) > t.capacity
        ) {
          setErrorTruckType('O tipo de caminhão não suporta a carga.');
          return false;
        }

        order.truckType = t;
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

        const t = truckTypes.find((x) => x.id == Number(truckType)) as ITruckType;
        const piso = t.axes > 3 ? calculateMinimumFloor(Number(value), t.axes) : 1.0;
        setPrice(formatarValor(piso));
        setMinimumFloor(piso);

        order.distance = v;
        if (order.value < piso) order.value = piso;
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
        order.weight = Number.parseFloat(
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
        ) < minimumFloor
      ) {
        setErrorPrice('O preço do frete informado é inválido ou abaixo do piso.');
        return false;
      } else {
        setErrorPrice(undefined);
        order.value = Number.parseFloat(
          value.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        );
        return true;
      }
    },
    shipping: (value: string) => {
      const val = new Date(value + 'T12:00:00');
      const now = new Date(Date.now());
      if (value.length == 0) {
        setErrorShipping('A data de entrega precisa ser preenchida');
        return false;
      } else if (
        now.getFullYear() == val.getFullYear() &&
        now.getMonth() == val.getMonth() &&
        now.getDate() > val.getDate()
      ) {
        setErrorShipping('A data de entrega preenchida é inválida');
        return false;
      } else {
        setErrorShipping(undefined);
        order.shipping = value;
        return true;
      }
    },
    items: () => {
      if (items.length == 0) {
        toast.info('Não há itens adicionados ao pedido.');
        return false;
      } else {
        order.items = filterItems();
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
            truckTypes.forEach((y) => {
              if (x.id == y.id) typesCommon++;
            });
          });

          if (items.length > 0 && typesCommon == 0) {
            setErrorTruckType(
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
    const sale = (await new SaleOrder().getOne(saleId)) as SaleOrder;
    setBudget('0');
    order.budget = undefined;
    setRepresentation('0');
    order.representation = undefined;
    setClient(sale.client ? sale.client.id.toString() : '0');
    setDestinyState(sale.destiny.state.id.toString());
    setCities(states[sale.destiny.state.id - 1].cities);
    setDestinyCity(sale.destiny.id.toString());

    const newTypes: ITruckType[] = [];
    const newItems: IFreightItem[] = [];
    const newSteps: ILoadStep[] = [];
    for (const item of sale.items) {
      newItems.push({
        id: 0,
        product: item.product,
        quantity: item.quantity,
        weight: item.weight,
        order: order.toAttributes,
      });
      for (const t of item.product.types) {
        const exists = newTypes.find((i) => i.id == t.id);
        if (!exists) newTypes.push(t);
      }
    }
    setItems(newItems);
    setTruckTypes(newTypes);
    order.weight = sale.toAttributes.weight;
    setWeight(formatarValor(sale.toAttributes.weight));
    order.saleOrder = sale.toAttributes;
  };

  //const handleChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
  };
  const handleSaleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSale(e.target.value);
    if (e.target.value != '0') {
      await fillFieldsSale(Number(e.target.value));
    } else {
      setClient('0');
      setDestinyState('0');
      setDestinyCity('0');
      setItems([]);
      setWeight('');
      setTruckTypes([]);
      order.saleOrder = undefined;
    }
  };
  const handleRepresentationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepresentation(e.target.value);
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleClientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value);
  };

  const handleClearItemsClick = () => {
    alert('Limpar itens!');
  };

  const [addItems, setAddItems] = useState(false);

  const handleTruckTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTruckType(e.target.value);
  };
  const handleProprietaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProprietary(e.target.value);
  };
  const handleTruckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTruck(e.target.value);
  };
  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDistance(Number.parseInt(e.target.value));
  };

  const handleDestinyStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinyState(e.target.value);
  };
  const handleDestinyCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDestinyCity(e.target.value);
  };

  const handleDriverChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDriver(e.target.value);
  };
  const handleDriverAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDriverAmount(e.target.value);
  };
  const handleDriverAmountEntryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDriverAmountEntry(e.target.value);
  };
  const handleDriverFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDriverForm(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
  };
  const handleShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShipping(e.target.value);
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
    let newProducts = [...products];
    newProducts = newProducts.filter(
      (item) => item.representation.id == newRepresentations[0].id,
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
    alert('Adicionar item!');
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
      <CardTitle text={'Abrir Pedido de Frete'} />
      <FieldsetCard legend="Dados do Pedido" obrigatoryFields>
        <Row>
          <FormInputSelect
            colSm={4}
            id="orcamento-frete"
            label="Orçamento de frete"
            obrigatory={false}
            value={budget}
            onChange={handleBudgetChange}
          >
            <option value="0">SELECIONE</option>
            {budgets.map((item) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={4}
            id="pedido-venda"
            label="Pedido de venda"
            obrigatory={false}
            value={sale}
            onChange={handleSaleChange}
          >
            <option value="0">SELECIONE</option>
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
            obrigatory
            value={representation}
            onChange={handleRepresentationChange}
          >
            <option value="0">SELECIONE</option>
            {representationsDb.map((item) => (
              <option key={item.id} value={item.id}>
                {item.person.enterprise?.fantasyName + ' (' + item.unity + ')'}
              </option>
            ))}
          </FormInputSelect>
        </Row>
        <Row>
          <FormInputText
            colSm={7}
            id="desc"
            label="Descrição"
            obrigatory
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          />
          <FormInputSelect
            colSm={5}
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
                <th>TOTAL (R$)</th>
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
                        if (sale == '0' && budget == '0') {
                          const newItems = [...items];
                          delete newItems[
                            newItems.findIndex((i) => i.product.id == item.product.id)
                          ];
                          newItems.length--;
                          setItems(newItems);
                          let totalWeight = 0.0;
                          newItems.forEach((item) => (totalWeight += item.weight));
                          totalWeight = Number(totalWeight.toString());
                          setWeight(formatarValor(totalWeight));
                          order.weight = totalWeight;
                          const newTypes: ITruckType[] = [];
                          newItems.forEach((i) => {
                            for (const t of i.product.types) {
                              const exists = newTypes.find((it) => it.id == t.id);
                              if (!exists) newTypes.push(t);
                            }
                          });
                          setTruckTypes(newTypes);
                        }
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
            />
            <FormInputNumber
              colSm={2}
              id="quantidade-item"
              label="Qtde desejada"
              obrigatory
              value={itemQuantity}
              onChange={handleItemQuantityChange}
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
      <FieldsetCard legend="Etapas de carregamento">
        <div className="table-container" style={{ height: '150px' }}>
          <Table id="load-steps" striped hover>
            <thead>
              <tr>
                <th>ORDEM</th>
                <th>REPRESENTAÇÃO</th>
                <th>CIDADE</th>
                <th>CARGA (Kg)</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody id="tbodySteps">
              {steps.map((item) => (
                <tr key={item.representation.id}>
                  <td>{item.order}</td>
                  <td>{item.representation.person.enterprise?.fantasyName}</td>
                  <td>{item.representation.unity}</td>
                  <td>{item.load}</td>
                  <td>
                    {item.status == 1
                      ? 'PENDENTE'
                      : item.status == 2
                      ? 'AUTORIZADO'
                      : 'CARREGADO'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </FieldsetCard>
      <FieldsetCard legend="Dados do transporte" obrigatoryFields>
        <Row>
          <FormInputSelect
            colSm={3}
            id="truck-type"
            label="Tipo Caminhão"
            obrigatory
            value={truckType}
            onChange={handleTruckTypeChange}
          >
            <option value="0">SELECIONAR</option>
            {truckTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.description + ' - ' + item.axes + ' EIXOS'}
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={3}
            id="proprietario"
            label="Proprietário Caminhão"
            obrigatory
            value={proprietary}
            onChange={handleProprietaryChange}
          >
            <option value="0">SELECIONE</option>
            {proprietaries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.person.type == 1
                  ? item.person.individual?.name
                  : item.person.enterprise?.fantasyName}
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={3}
            id="caminhao"
            label="Caminhão"
            obrigatory
            value={truck}
            onChange={handleTruckChange}
          >
            <option value="0">SELECIONE</option>
            {trucks.map((item) => (
              <option key={item.id} value={item.id}>
                {item.brand + ' ' + item.model}
              </option>
            ))}
          </FormInputSelect>
          <FormInputGroupNumber
            colSm={3}
            id="distancia"
            label="Distância"
            groupText={'KM'}
            obrigatory
            value={distance}
            onChange={handleDistanceChange}
          />
        </Row>
      </FieldsetCard>
      <Row>
        <Col sm="4">
          <FieldsetCard legend="Destino" obrigatoryFields>
            <Row>
              <FormInputSelect
                colSm={12}
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
            </Row>
            <Row>
              <FormInputSelect
                colSm={12}
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
            </Row>
          </FieldsetCard>
        </Col>
        <Col sm="8">
          <FieldsetCard legend="Pagamento motorista" obrigatoryFields>
            <Row>
              <FormInputSelect
                colSm={7}
                id="motorista"
                label="Motorista"
                obrigatory
                value={driver}
                onChange={handleDriverChange}
              >
                <option value="0">SELECIONE</option>
                {drivers.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.person.individual?.name}
                  </option>
                ))}
              </FormInputSelect>
              <FormInputGroupText
                colSm={5}
                id="valor-motorista"
                label="Valor"
                groupText={'R$'}
                obrigatory
                mask="#.##0,00"
                maskReversal={true}
                maskPlaceholder="0,00"
                value={driverAmount}
                onChange={handleDriverAmountChange}
              />
            </Row>
            <Row>
              <FormInputGroupText
                colSm={5}
                id="valor-adiantamento-motorista"
                label="Valor adiantamento"
                groupText={'R$'}
                obrigatory
                mask="#.##0,00"
                maskReversal={true}
                maskPlaceholder="0,00"
                value={driverAmountEntry}
                onChange={handleDriverAmountEntryChange}
              />
              <FormInputSelect
                colSm={7}
                id="forma-pagamento-motorista"
                label="Forma de Pagamento"
                obrigatory
                value={driverForm}
                onChange={handleDriverFormChange}
              >
                <option value="0">SELECIONE</option>
                {paymentForms.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </FormInputSelect>
            </Row>
          </FieldsetCard>
        </Col>
      </Row>
      <FieldsetCard legend="Valores do Pedido" obrigatoryFields>
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
          <FormInputSelect
            colSm={3}
            id="forma-pagamento"
            label="Forma de Pagamento"
            obrigatory
            value={form}
            onChange={handleFormChange}
          >
            <option value="0">SELECIONE</option>
            {paymentForms.map((item) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </FormInputSelect>
          <FormInputDate
            colSm={3}
            id="entrega"
            label="Data Aprox. de Entrega"
            obrigatory
            value={shipping}
            onChange={handleShippingChange}
          />
        </Row>
      </FieldsetCard>
      <FormButtonsSave backLink="/pedido/frete" clear handle={handleButtons} />
    </>
  );
}
