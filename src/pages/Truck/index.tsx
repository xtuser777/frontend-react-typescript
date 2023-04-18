import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';

export function Truck(): JSX.Element {
  const [plate, setPlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [type, setType] = useState('');
  const [proprietary, setProprietary] = useState('');

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  const handlePlateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlate(e.target.value.toUpperCase());
  };

  const handleBrandChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
  };

  const handleModelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModel(e.target.value);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleManufactureYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setManufactureYear(e.target.value);
  };

  const handleModelYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModelYear(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleProprietaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProprietary(e.target.value);
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
          />
          <FormInputText
            colSm={3}
            id="marca"
            label="Marca"
            obrigatory
            value={brand}
            onChange={(e) => handleBrandChange(e)}
          />
          <FormInputText
            colSm={4}
            id="modelo"
            label="Modelo"
            obrigatory
            value={model}
            onChange={(e) => handleModelChange(e)}
          />
          <FormInputText
            colSm={3}
            id="cor"
            label="Cor"
            obrigatory
            value={color}
            onChange={(e) => handleColorChange(e)}
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
          />
          <FormInputText
            colSm={2}
            id="ano-modelo"
            label="Ano Modelo"
            mask="0000"
            obrigatory
            value={modelYear}
            onChange={(e) => handleModelYearChange(e)}
          />
          <FormInputSelect
            colSm={3}
            id="tipo"
            label="Tipo"
            obrigatory
            value={type}
            onChange={(e) => handleTypeChange(e)}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={5}
            id="proprietario"
            label="Proprietário"
            obrigatory
            value={proprietary}
            onChange={(e) => handleProprietaryChange(e)}
          >
            <option value="0">SELECIONE</option>
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
