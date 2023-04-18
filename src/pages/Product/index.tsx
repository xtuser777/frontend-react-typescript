import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputGroupText } from '../../components/form-input-group-text';

export function Product(): JSX.Element {
  const [description, setDescription] = useState('');
  const [representation, setRepresentation] = useState('');
  const [mensure, setMensure] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [priceOut, setPriceOut] = useState('');

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value.toUpperCase());
  };

  const handleRepresentationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepresentation(e.target.value);
  };

  const handleMensureChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMensure(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handlePriceOutChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceOut(e.target.value);
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
        text={method == 'novo' ? 'Cadastrar Novo Produto' : 'Detalhes do Produto'}
      />
      <FieldsetCard legend="Dados do Produto" obrigatoryFields>
        <Row>
          <FormInputText
            colSm={7}
            id="descricao"
            label="Descrição"
            obrigatory
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          />
          <FormInputSelect
            colSm={5}
            id="representacao"
            label="Representação"
            obrigatory
            value={representation}
            onChange={(e) => handleRepresentationChange(e)}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
        </Row>
        <Row>
          <FormInputText
            colSm={3}
            id="medida"
            label="Medida"
            obrigatory
            placeholder="Exemplo: Kg, Sacos de X Kg..."
            value={mensure}
            onChange={(e) => handleMensureChange(e)}
          />
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
          />
          <FormInputGroupText
            colSm={3}
            id="preco"
            label="Preço"
            groupText={'R$'}
            obrigatory
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={price}
            onChange={(e) => handlePriceChange(e)}
          />
          <FormInputGroupText
            colSm={3}
            id="preco-out"
            label="Preço fora do estado"
            groupText={'R$'}
            obrigatory
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={priceOut}
            onChange={(e) => handlePriceOutChange(e)}
          />
        </Row>
      </FieldsetCard>
      <FormButtonsSave
        backLink="/produtos"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
