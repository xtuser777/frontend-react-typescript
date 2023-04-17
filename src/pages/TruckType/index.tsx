import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputNumber } from '../../components/form-input-number';

export function TruckType(): JSX.Element {
  const [description, setDescription] = useState('');
  const [axes, setAxes] = useState(0);
  const [capacity, setCapacity] = useState('');

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAxesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAxes(Number.parseInt(e.target.value));
  };

  const handleCapacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCapacity(e.target.value);
  };

  const handleButtons = {
    handleClearClick: (e: MouseEvent) => {
      alert('Limpar clicado.');
    },
    handleSaveClick: (e: MouseEvent) => {
      alert('Salvar clicado.');
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
          />
          <FormInputNumber
            colSm={3}
            id="eixos"
            label="Eixos"
            obrigatory
            value={axes}
            onChange={(e) => handleAxesChange(e)}
          />
          <FormInputGroupText
            colSm={3}
            id="capacity"
            label="Capacidade"
            groupText={'KG'}
            obrigatory
            value={capacity}
            onChange={(e) => handleCapacityChange(e)}
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
