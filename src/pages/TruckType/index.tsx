import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputNumber } from '../../components/form-input-number';
import * as actions from '../../store/modules/truck-type/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TruckType as TruckTypeModel } from '../../models/TruckType';

export function TruckType(): JSX.Element {
  const typeState = useSelector((state: RootState) => state.truckType);

  const dispatch = useDispatch();

  const [type, setType] = useState(new TruckTypeModel());

  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState<string | undefined>(undefined);
  const [axes, setAxes] = useState(0);
  const [errorAxes, setErrorAxes] = useState<string | undefined>(undefined);
  const [capacity, setCapacity] = useState('');
  const [errorCapacity, setErrorCapacity] = useState<string | undefined>(undefined);

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  useEffect(() => {
    const getData = async () => {
      const type = await new TruckTypeModel().getOne(id);
      if (type) {
        setType(type);

        setDescription(type.description);
        setAxes(type.axes);
        setCapacity(type.capacity.toString());
      }
    };

    const loadPage = async () => {
      if (method == 'editar') await getData();
    };

    loadPage();
  }, []);

  const validate = {
    description: (value: string) => {
      if (value.length <= 0) {
        setErrorDescription('A descrição do tipo precisa ser preenchido.');
        return false;
      } else {
        setErrorDescription(undefined);
        type.description = value;
        return true;
      }
    },
    axes: (value: string) => {
      if (value.length <= 0 || Number(value) <= 0) {
        setErrorAxes('O número de eixos precisa ser preenchido.');
        return false;
      } else {
        setErrorAxes(undefined);
        type.axes = Number(value);
        return true;
      }
    },
    capacity: (value: string) => {
      if (value.length <= 0) {
        setErrorCapacity('A capacidade precisa ser preenchida.');
        return false;
      } else {
        setErrorCapacity(undefined);
        type.capacity = Number(value);
        return true;
      }
    },
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    validate.description(e.target.value);
  };

  const handleAxesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAxes(Number.parseInt(e.target.value));
    validate.axes(e.target.value);
  };

  const handleCapacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCapacity(e.target.value);
    validate.capacity(e.target.value);
  };

  const validateFields = () => {
    const desc = validate.description(description);
    const axs = validate.axes(axes.toString());
    const cap = validate.capacity(capacity);

    return desc && axs && cap;
  };

  const clearFields = () => {
    setDescription('');
    setAxes(0);
    setCapacity('');
  };

  const persistData = async () => {
    if (validateFields()) {
      if (method == 'novo') {
        if (await type.save()) clearFields();
      } else await type.update();
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

  return (
    <>
      <CardTitle
        text={
          method == 'novo'
            ? 'Cadastrar Novo Tipo de Caminhão'
            : 'Detalhes do Tipo de Caminhão'
        }
      />
      <FieldsetCard legend="Dados do Tipo de Caminhão" obrigatoryFields>
        <Row>
          <FormInputText
            colSm={6}
            id="desc"
            label="Descrição"
            obrigatory
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
            message={errorDescription}
          />
          <FormInputNumber
            colSm={3}
            id="eixos"
            label="Eixos"
            obrigatory
            value={axes}
            onChange={(e) => handleAxesChange(e)}
            message={errorAxes}
          />
          <FormInputGroupText
            colSm={3}
            id="capacity"
            label="Capacidade"
            groupText={'KG'}
            obrigatory
            value={capacity}
            onChange={(e) => handleCapacityChange(e)}
            message={errorCapacity}
          />
        </Row>
      </FieldsetCard>
      <FormButtonsSave
        backLink="/tiposcaminhao"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
