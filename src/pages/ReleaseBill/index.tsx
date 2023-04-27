import React, { ChangeEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Button, Col, Row } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputNumber } from '../../components/form-input-number';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormButtonsSave } from '../../components/form-buttons-save';

export function ReleaseBill(): JSX.Element {
  const [enterprise, setEnterprise] = useState('');
  const handleEntrepriseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnterprise(e.target.value);
  };

  const [category, setCategory] = useState('0');
  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const [freightOrder, setFreightOrder] = useState('0');
  const handleFreightOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFreightOrder(e.target.value);
  };

  const [bill, setBill] = useState('');
  const handleBillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBill(e.target.value);
  };

  const [description, setDescription] = useState('');
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const [type, setType] = useState('0');
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const [form, setForm] = useState('0');
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
  };

  const [interval, setInterval] = useState(1);
  const handleIntervalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInterval(Number.parseInt(e.target.value));
  };

  const [frequency, setFrequency] = useState('0');
  const handleFrequencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFrequency(e.target.value);
  };

  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const [amountPaid, setAmountPaid] = useState('');
  const handleAmountPaidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountPaid(e.target.value);
  };

  const [installments, setInstallments] = useState(1);
  const handleInstallmentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInstallments(Number.parseInt(e.target.value));
  };

  const [amount, setAmount] = useState('');
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const [dueDate, setDueDate] = useState(new Date().toISOString().substring(0, 10));
  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleCancelClick = () => {
    alert('Cancelando...');
  };

  const handleClearClick = () => {
    alert('Limpando...');
  };

  const handleSaveClick = () => {
    alert('Salvando...');
  };

  return (
    <>
      <CardTitle text="Lançar Nova Despesa" />
      <FieldsetCard legend="Fonte da despesa" obrigatoryFields>
        <Row>
          <FormInputText
            colSm={12}
            id="empresa"
            label="Empresa"
            obrigatory
            value={enterprise}
            onChange={handleEntrepriseChange}
          />
        </Row>
        <Row>
          <FormInputSelect
            colSm={4}
            id="categoria"
            label="Categoria"
            obrigatory
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={8}
            id="pedido-frete"
            label="Pedido de Frete"
            obrigatory
            value={freightOrder}
            onChange={handleFreightOrderChange}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Dados da despesa">
        <Row>
          <FormInputText
            colSm={1}
            id="conta"
            label="Conta"
            obrigatory
            value={bill}
            onChange={handleBillChange}
            readonly
          />
          <FormInputText
            colSm={5}
            id="descricao"
            label="Descrição"
            obrigatory
            value={description}
            onChange={handleDescriptionChange}
          />
          <FormInputSelect
            colSm={2}
            id="tipo"
            label="Tipo"
            obrigatory
            value={type}
            onChange={handleTypeChange}
          >
            <option value="0">SELECIONE</option>
            <option value="1">A VISTA</option>
            <option value="2">A PRAZO</option>
            <option value="3">FIXA</option>
          </FormInputSelect>
          <FormInputSelect
            colSm={4}
            id="forma-pagamento"
            label="Forma de Pagamento"
            obrigatory
            value={form}
            onChange={handleFormChange}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
        </Row>
        <Row>
          <FormInputNumber
            colSm={1}
            id="intervalo"
            label="Intervalo entre parcelas"
            obrigatory
            value={interval}
            onChange={handleIntervalChange}
          />
          <FormInputSelect
            colSm={2}
            id="frequencia"
            label="Frequencia"
            obrigatory
            value={frequency}
            onChange={handleFrequencyChange}
          >
            <option value="0">SELECIONE</option>
            <option value="1">MENSAL</option>
            <option value="2">ANUAL</option>
          </FormInputSelect>
          <FormInputDate
            colSm={2}
            id="data-despesa"
            label="Data despesa"
            obrigatory
            value={date}
            onChange={handleDateChange}
          />
          <FormInputGroupText
            colSm={2}
            id="valor-pago"
            label="Valor pago"
            groupText={'R$'}
            obrigatory
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={amountPaid}
            onChange={handleAmountPaidChange}
          />
          <FormInputNumber
            colSm={1}
            id="parcelas"
            label="Parcelas"
            obrigatory
            value={installments}
            onChange={handleInstallmentsChange}
          />
          <FormInputGroupText
            colSm={2}
            id="valor"
            label="Valor Despesa"
            groupText={'R$'}
            obrigatory
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={amount}
            onChange={handleAmountChange}
          />
          <FormInputDate
            colSm={2}
            id="vencimento"
            label="Vencimento"
            obrigatory
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </Row>
      </FieldsetCard>
      <Row>
        <Col sm="2">
          <Button
            id="cancelar"
            color="danger"
            style={{ width: '100%' }}
            size="sm"
            onClick={handleCancelClick}
          >
            CANCELAR
          </Button>
        </Col>
        <Col sm="6"></Col>
        <Col sm="2">
          <Button
            id="limpar"
            color="primary"
            style={{ width: '100%' }}
            size="sm"
            onClick={handleClearClick}
          >
            LIMPAR
          </Button>
        </Col>
        <Col sm="2">
          <Button
            id="salvar"
            color="success"
            style={{ width: '100%' }}
            size="sm"
            onClick={handleSaveClick}
          >
            SALVAR
          </Button>
        </Col>
      </Row>
    </>
  );
}
