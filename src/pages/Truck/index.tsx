import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import * as actions from '../../store/modules/truck/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Truck as TruckModel } from '../../models/Truck';
import { TruckType } from '../../models/truck-type';
import { Proprietary } from '../../models/Proprietary';
import { IndividualPerson } from '../../models/individual-person';
import { EnterprisePerson } from '../../models/enterprise-person';

export function Truck(): JSX.Element {
  const truckState = useSelector((state: RootState) => state.truck);

  const dispatch = useDispatch();

  const [truck, setTruck] = useState(new TruckModel());

  const [types, setTypes] = useState(new Array<TruckType>());
  const [proprietaries, setProprietaries] = useState(new Array<Proprietary>());

  const [plate, setPlate] = useState('');
  const [errorPlate, setErrorPlate] = useState<string | undefined>(undefined);
  const [brand, setBrand] = useState('');
  const [errorBrand, setErrorBrand] = useState<string | undefined>(undefined);
  const [model, setModel] = useState('');
  const [errorModel, setErrorModel] = useState<string | undefined>(undefined);
  const [color, setColor] = useState('');
  const [errorColor, setErrorColor] = useState<string | undefined>(undefined);
  const [manufactureYear, setManufactureYear] = useState('');
  const [errorManufactureYear, setErrorManufactureYear] = useState<string | undefined>(
    undefined,
  );
  const [modelYear, setModelYear] = useState('');
  const [errorModelYear, setErrorModelYear] = useState<string | undefined>(undefined);
  const [type, setType] = useState('');
  const [errorType, setErrorType] = useState<string | undefined>(undefined);
  const [proprietary, setProprietary] = useState('');
  const [errorProprietary, setErrorProprietary] = useState<string | undefined>(undefined);

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  useEffect(() => {
    const getTypes = async () => {
      const typesDB = await new TruckType().get();
      setTypes(typesDB);
    };

    const getProprietaries = async () => {
      const propsDB = await new Proprietary().get();
      setProprietaries(propsDB);
    };

    const getData = async () => {
      const truck = await new TruckModel().getOne(id);
      if (truck) {
        setTruck(truck);

        setPlate(truck.plate);
        setBrand(truck.brand);
        setModel(truck.model);
        setColor(truck.color);
        setManufactureYear(truck.manufactureYear.toString());
        setModelYear(truck.modelYear.toString());
        setType(truck.type.id.toString());
        setProprietary(truck.proprietary.id.toString());
      }
    };

    const loadPage = async () => {
      await getTypes();
      await getProprietaries();
      if (method == 'editar') await getData();
    };

    loadPage();
  }, []);

  const validate = {
    plate: (value: string) => {
      if (value.length <= 0) setErrorPlate('A placa do caminhão precisa ser preenchida.');
      else if (value.length < 8) setErrorPlate('A placa do caminhão é inválida.');
      else {
        setErrorPlate(undefined);
        truck.plate = value;
      }
    },
    brand: (value: string) => {
      if (value.length <= 0) setErrorBrand('A marca do caminhão precisa ser preenchida.');
      else if (value.length < 3) setErrorBrand('A marca do caminhão é inválida.');
      else {
        setErrorBrand(undefined);
        truck.brand = value;
      }
    },
    model: (value: string) => {
      if (value.length <= 0)
        setErrorModel('O modelo do caminhão precisa ser preenchido.');
      else if (value.length < 2) setErrorModel('O modelo do caminhão é inválido.');
      else {
        setErrorModel(undefined);
        truck.model = value;
      }
    },
    color: (value: string) => {
      if (value.length <= 0) setErrorColor('A cor do caminhão precisa ser preenchida.');
      else if (value.length < 3) setErrorColor('A cor do caminhão é inválida.');
      else {
        setErrorColor(undefined);
        truck.color = value;
      }
    },
    manufactureYear: (value: string) => {
      if (Number(value) < 1980)
        setErrorManufactureYear('O ano de fabricação do caminhão é inválida.');
      else {
        setErrorManufactureYear(undefined);
        truck.manufactureYear = Number(value);
      }
    },
    modelYear: (value: string) => {
      if (Number(value) < 1980)
        setErrorModelYear('O ano do modelo do caminhão é inválida.');
      else {
        setErrorModelYear(undefined);
        truck.modelYear = Number(value);
      }
    },
    type: (value: string) => {
      if (value == '0') setErrorType('O tipo de caminhão precisa ser selecionado.');
      else {
        setErrorType(undefined);
        truck.type = types.find((item) => item.id == Number(value)) as TruckType;
      }
    },
    proprietary: (value: string) => {
      if (value == '0')
        setErrorProprietary('O proprietário do caminhão precisa ser selecionado.');
      else {
        setErrorProprietary(undefined);
        truck.proprietary = proprietaries.find(
          (item) => item.id == Number(value),
        ) as Proprietary;
      }
    },
  };

  const handlePlateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlate(e.target.value.toUpperCase());
    validate.plate(e.target.value);
  };

  const handleBrandChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
    validate.brand(e.target.value);
  };

  const handleModelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModel(e.target.value);
    validate.model(e.target.value);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    validate.color(e.target.value);
  };

  const handleManufactureYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setManufactureYear(e.target.value);
    validate.manufactureYear(e.target.value);
  };

  const handleModelYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModelYear(e.target.value);
    validate.modelYear(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    validate.type(e.target.value);
  };

  const handleProprietaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProprietary(e.target.value);
    validate.proprietary(e.target.value);
  };

  const validateFields = () => {
    validate.plate(plate);
    validate.brand(brand);
    validate.model(model);
    validate.color(color);
    validate.manufactureYear(manufactureYear);
    validate.modelYear(modelYear);
    validate.type(type);
    validate.proprietary(proprietary);

    return (
      !errorPlate &&
      !errorBrand &&
      !errorModel &&
      !errorColor &&
      !errorManufactureYear &&
      !errorModelYear &&
      !errorType &&
      !errorProprietary
    );
  };

  const clearFields = () => {
    setPlate('');
    setBrand('');
    setModel('');
    setColor('');
    setManufactureYear('');
    setModelYear('');
    setType('0');
    setProprietary('0');
  };

  const persistData = () => {
    if (validateFields()) {
      if (method == 'novo') {
        dispatch(
          actions.truckSaveRequest({
            truck: {
              plate: truck.plate,
              brand: truck.brand,
              model: truck.model,
              color: truck.color,
              manufactureYear: truck.manufactureYear,
              modelYear: truck.modelYear,
              type: truck.type.id,
              prop: truck.proprietary.id,
            },
          }),
        );
        if (truckState.success) clearFields();
      } else {
        dispatch(
          actions.truckUpdateRequest({
            truck: {
              id: truck.id,
              plate: truck.plate,
              brand: truck.brand,
              model: truck.model,
              color: truck.color,
              manufactureYear: truck.manufactureYear,
              modelYear: truck.modelYear,
              type: truck.type.id,
              prop: truck.proprietary.id,
            },
          }),
        );
      }
    }
  };

  const handleButtons = {
    handleClearClick: () => {
      clearFields();
    },
    handleSaveClick: () => {
      persistData();
    },
  };

  return (
    <>
      <CardTitle
        text={method == 'novo' ? 'Cadastrar Novo Caminhão' : 'Detalhes do Caminhão'}
      />
      <FieldsetCard legend="Dados do Caminhão" obrigatoryFields>
        <Row>
          <FormInputText
            colSm={2}
            id="placa"
            label="Placa"
            mask="SSS 0A00"
            obrigatory
            value={plate}
            onChange={(e) => handlePlateChange(e)}
            message={errorPlate}
          />
          <FormInputText
            colSm={3}
            id="marca"
            label="Marca"
            obrigatory
            value={brand}
            onChange={(e) => handleBrandChange(e)}
            message={errorBrand}
          />
          <FormInputText
            colSm={4}
            id="modelo"
            label="Modelo"
            obrigatory
            value={model}
            onChange={(e) => handleModelChange(e)}
            message={errorModel}
          />
          <FormInputText
            colSm={3}
            id="cor"
            label="Cor"
            obrigatory
            value={color}
            onChange={(e) => handleColorChange(e)}
            message={errorColor}
          />
        </Row>
        <Row>
          <FormInputText
            colSm={2}
            id="ano-fabricacao"
            label="Ano Fabricação"
            mask="0000"
            obrigatory
            value={manufactureYear}
            onChange={(e) => handleManufactureYearChange(e)}
            message={errorManufactureYear}
          />
          <FormInputText
            colSm={2}
            id="ano-modelo"
            label="Ano Modelo"
            mask="0000"
            obrigatory
            value={modelYear}
            onChange={(e) => handleModelYearChange(e)}
            message={errorModelYear}
          />
          <FormInputSelect
            colSm={3}
            id="tipo"
            label="Tipo"
            obrigatory
            value={type}
            onChange={(e) => handleTypeChange(e)}
            message={errorType}
          >
            <option value="0">SELECIONE</option>
            {types.map((item) => (
              <option key={item.id} value={item.id}>
                {item.description} - {item.axes} Eixos
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={5}
            id="proprietario"
            label="Proprietário"
            obrigatory
            value={proprietary}
            onChange={(e) => handleProprietaryChange(e)}
            message={errorProprietary}
          >
            <option value="0">SELECIONE</option>
            {proprietaries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.person.type == 1
                  ? (item.person.individual as IndividualPerson).name
                  : (item.person.enterprise as EnterprisePerson).fantasyName}
              </option>
            ))}
          </FormInputSelect>
        </Row>
      </FieldsetCard>
      <FormButtonsSave
        backLink="/caminhoes"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
