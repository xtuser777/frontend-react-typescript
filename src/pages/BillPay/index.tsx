import React, { ChangeEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Button, Col, Row } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputSelect } from '../../components/form-input-select';

export function BillPay(): JSX.Element {
  const [bill, setBill] = useState('');
  const handleBillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBill(e.target.value);
  };

  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const [installment, setInstallment] = useState('');
  const handleInstallmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInstallment(e.target.value);
  };

  const [description, setDescription] = useState('');
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const [enterprise, setEnterprise] = useState('');
  const handleEnterpriseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnterprise(e.target.value);
  };

  const [type, setType] = useState('');
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const [category, setCategory] = useState('');
  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const [source, setSource] = useState('');
  const handleSourceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSource(e.target.value);
  };

  const [dueDate, setDueDate] = useState(new Date().toISOString().substring(0, 10));
  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const [amount, setAmount] = useState('');
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const [situation, setSituation] = useState('');
  const handleSituationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSituation(e.target.value);
  };

  const [form, setForm] = useState('0');
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
  };

  const [amountPaid, setAmountPaid] = useState('');
  const handleAmountPaidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountPaid(e.target.value);
  };

  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().substring(0, 10),
  );
  const handlePaymentDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentDate(e.target.value);
  };

  const handleCancelClick = () => {
    alert('Cancelando...');
  };
  const handlePayOffClick = () => {
    alert('Quitando...');
  };

  return (
    <>
      <CardTitle text="Detalhes da conta" />
      <FieldsetCard legend="Dados da conta">
        <Row>
          <FormInputText
            colSm={1}
            id="conta"
            label="Conta"
            obrigatory={false}
            value={bill}
            onChange={handleBillChange}
            readonly
          />
          <FormInputDate
            colSm={3}
            id="data"
            label="Data"
            obrigatory={false}
            value={date}
            onChange={handleDateChange}
            readonly
          />
          <FormInputText
            colSm={2}
            id="parcela"
            label="Parcela"
            obrigatory={false}
            value={installment}
            onChange={handleInstallmentChange}
            readonly
          />
          <FormInputText
            colSm={6}
            id="descricao"
            label="Descrição"
            obrigatory={false}
            value={description}
            onChange={handleDescriptionChange}
            readonly
          />
        </Row>
        <Row>
          <FormInputText
            colSm={4}
            id="empresa"
            label="Empresa"
            obrigatory={false}
            value={enterprise}
            onChange={handleEnterpriseChange}
            readonly
          />
          <FormInputText
            colSm={2}
            id="tipo"
            label="Tipo"
            obrigatory={false}
            value={type}
            onChange={handleTypeChange}
            readonly
          />
          <FormInputText
            colSm={3}
            id="categoria"
            label="Categoria"
            obrigatory={false}
            value={category}
            onChange={handleCategoryChange}
            readonly
          />
          <FormInputText
            colSm={3}
            id="fonte"
            label="Fonte"
            obrigatory={false}
            value={source}
            onChange={handleSourceChange}
            readonly
          />
        </Row>
        <Row>
          <FormInputDate
            colSm={3}
            id="vencimento"
            label="Vencimento"
            obrigatory={false}
            value={dueDate}
            onChange={handleDueDateChange}
            readonly
          />
          <FormInputGroupText
            colSm={3}
            id="valor"
            label="Valor despesa"
            groupText={'R$'}
            obrigatory={false}
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={amount}
            onChange={handleAmountChange}
            readonly
          />
          <FormInputText
            colSm={6}
            id="situacao"
            label="Situação"
            obrigatory={false}
            value={situation}
            onChange={handleSituationChange}
            readonly
          />
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Dados do pagamento" obrigatoryFields>
        <Row>
          <FormInputSelect
            colSm={6}
            id="forma-pagamento"
            label="Forma Pagamento"
            obrigatory
            value={form}
            onChange={handlePaymentDateChange}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
          <FormInputGroupText
            colSm={3}
            id="valor-pago"
            label="Valor pago"
            obrigatory
            groupText={'R$'}
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={amountPaid}
            onChange={handleAmountPaidChange}
          />
          <FormInputDate
            colSm={3}
            id="data-pagamento"
            label="Data pagamento"
            obrigatory
            value={paymentDate}
            onChange={handlePaymentDateChange}
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
        <Col sm="8"></Col>
        <Col sm="2">
          <Button
            id="quitar"
            color="success"
            style={{ width: '100%' }}
            size="sm"
            onClick={handlePayOffClick}
          >
            QUITAR
          </Button>
        </Col>
      </Row>
    </>
  );
}
