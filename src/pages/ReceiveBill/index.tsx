import React, { ChangeEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Button, Col, Row } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { FormInputSelect } from '../../components/form-input-select';
import { useParams } from 'react-router-dom';

export function ReceiveBill(): JSX.Element {
  const routeParams = useParams();
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  const [bill, setBill] = useState('');
  const handleBillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBill(e.target.value);
  };

  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const [description, setDescription] = useState('');
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const [source, setSource] = useState('');
  const handleSourceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSource(e.target.value);
  };

  const [payer, setPayer] = useState('');
  const handlePayerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPayer(e.target.value);
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

  const [amountReceived, setAmountReceived] = useState('');
  const handleAmountReceivedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountReceived(e.target.value);
  };

  const [receiveDate, setReceiveDate] = useState(
    new Date().toISOString().substring(0, 10),
  );
  const handleReceiveDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReceiveDate(e.target.value);
  };

  const handleCancelClick = () => {
    alert('Cancelando...');
  };
  const handleReceiveClick = () => {
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
            colSm={2}
            id="data"
            label="Data"
            obrigatory={false}
            value={date}
            onChange={handleDateChange}
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
          <FormInputText
            colSm={3}
            id="pagador"
            label="Pagador"
            obrigatory={false}
            value={payer}
            onChange={handlePayerChange}
            readonly
          />
          <FormInputDate
            colSm={2}
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
            label="Valor"
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
            colSm={4}
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
            onChange={handleFormChange}
          >
            <option value="0">SELECIONE</option>
          </FormInputSelect>
          <FormInputGroupText
            colSm={3}
            id="valor-recebido"
            label="Valor recebido"
            obrigatory
            groupText={'R$'}
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={amountReceived}
            onChange={handleAmountReceivedChange}
          />
          <FormInputDate
            colSm={3}
            id="data-recebimento"
            label="Data recebimento"
            obrigatory
            value={receiveDate}
            onChange={handleReceiveDateChange}
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
            id="receive"
            color="success"
            style={{ width: '100%' }}
            size="sm"
            onClick={handleReceiveClick}
          >
            RECEBER
          </Button>
        </Col>
      </Row>
    </>
  );
}
