import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputNumber } from '../../components/form-input-number';
import { FormInputSelect } from '../../components/form-input-select';
import { PaymentForm as PaymentFormModel } from '../../models/PaymentForm';

export function PaymentForm(): JSX.Element {
  const [form, setForm] = useState(new PaymentFormModel());

  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState<string | undefined>(undefined);
  const [link, setLink] = useState('0');
  const [errorLink, setErrorLink] = useState<string | undefined>(undefined);
  const [deadLine, setDeadLine] = useState(0);
  const [errorDeadLine, setErrorDeadLine] = useState<string | undefined>(undefined);

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  useEffect(() => {
    const getData = async () => {
      const data = await new PaymentFormModel().getOne(id);
      if (data) {
        setForm(data);
        setDescription(data.description);
        setLink(data.link.toString());
        setDeadLine(data.deadline);
      }
    };

    if (method == 'editar') getData();
  }, []);

  const validate = {
    description: (value: string) => {
      if (value.length == 0) {
        setErrorDescription('A descrição da forma de pagamento precisa ser preenchida.');
        return false;
      } else {
        setErrorDescription(undefined);
        form.description = value;
        return true;
      }
    },
    link: (value: string) => {
      if (value == '0') {
        setErrorLink('O vínculo da forma de pagamento precisa ser selecionado.');
        return false;
      } else {
        setErrorLink(undefined);
        form.link = Number(value);
        return true;
      }
    },
    deadline: (value: number) => {
      if (value <= 0) {
        setErrorDeadLine('O prazo de pagamento precisa ser preenchido.');
        return false;
      } else {
        setErrorDeadLine(undefined);
        form.deadline = value;
        return true;
      }
    },
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    validate.description(e.target.value);
  };

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    validate.link(e.target.value);
  };

  const handleDeadLineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeadLine(Number.parseInt(e.target.value));
    validate.deadline(Number.parseInt(e.target.value));
  };

  const validateFields = () => {
    const desc = validate.description(description);
    const lnk = validate.link(link);
    const dln = validate.deadline(deadLine);

    return desc && lnk && dln;
  };

  const clearFields = () => {
    setDescription('');
    setLink('0');
    setDeadLine(0);
  };

  const persistData = async () => {
    if (validateFields()) {
      if (method == 'novo') {
        if (await form.save()) clearFields();
      } else await form.update();
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
            message={errorDescription}
          />
          <FormInputSelect
            colSm={3}
            id="vinculo"
            label="Vínculo"
            obrigatory
            value={link}
            onChange={(e) => handleLinkChange(e)}
            message={errorLink}
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
            message={errorDeadLine}
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
