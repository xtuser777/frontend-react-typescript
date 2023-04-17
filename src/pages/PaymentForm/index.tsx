import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputNumber } from '../../components/form-input-number';
import { FormInputSelect } from '../../components/form-input-select';

export function PaymentForm(): JSX.Element {
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('0');
  const [deadLine, setDeadLine] = useState(0);

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleDeadLineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeadLine(Number.parseInt(e.target.value));
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
            ? 'Cadastrar Nova Forma de Pagamento'
            : 'Detalhes da Forma de Pagamento'
        }
      />
      <FieldsetCard legend="Dados da Forma de Pagamento" obrigatoryFields>
        <Row>
          <FormInputText
            colSm={6}
            id="desc"
            label="Descrição"
            obrigatory
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          />
          <FormInputSelect
            colSm={3}
            id="vinculo"
            label="Vínculo"
            obrigatory
            value={link}
            onChange={(e) => handleLinkChange(e)}
          >
            <option value="0">SELECIONE</option>
            <option value="1">CONTA A PAGAR</option>
            <option value="2">CONTA A RECEBER</option>
          </FormInputSelect>
          <FormInputNumber
            colSm={3}
            id="deadline"
            label="Prazo (dias)"
            obrigatory
            value={deadLine}
            onChange={(e) => handleDeadLineChange(e)}
          />
        </Row>
      </FieldsetCard>
      <FormButtonsSave
        backLink="/formaspagamento"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
