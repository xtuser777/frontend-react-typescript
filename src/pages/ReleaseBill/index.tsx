import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Button, Col, Row } from 'reactstrap';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputNumber } from '../../components/form-input-number';
import { FormInputDate } from '../../components/form-input-date';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { BillPay as BillPayModel } from '../../models/BillPay';
import { IPaymentForm, PaymentForm } from '../../models/PaymentForm';
import history from '../../services/history';
import { BillPayCategory, IBillPayCategory } from '../../models/BillPayCategory';
import { FreightOrder, IFreightOrder } from '../../models/FreightOrder';

export function ReleaseBill(): JSX.Element {
  const [billPay, setBillPay] = useState(new BillPayModel());
  const [forms, setForms] = useState(new Array<IPaymentForm>());
  const [categories, setCategories] = useState(new Array<IBillPayCategory>());
  const [freightOrders, setFreightOrders] = useState(new Array<IFreightOrder>());

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
  const [errorFrequency, setErrorFrequency] = useState<string | undefined>(undefined);
  const handleFrequencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFrequency(e.target.value);
    if (type == '3') {
      if (e.target.value == '0') {
        setErrorFrequency('A frequência da conta fixa precisa ser selecionada.');
        setInstallments(1);
        setInterval(1);
      } else {
        setErrorFrequency(undefined);
        if (e.target.value == '1') {
          setInstallments(12);
          setInterval(30);
        } else {
          setInstallments(2);
          setInterval(365);
        }
      }
    }
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

  useEffect(() => {
    const getForms = async () => {
      const response = (await new PaymentForm().get()).filter((form) => form.link == 1);
      setForms(response);
    };

    const getOrders = async () => {
      const freightOrders = await new FreightOrder().get();
      setFreightOrders(freightOrders);
    };

    const getCategories = async () => {
      const categories = await new BillPayCategory().get();
      setCategories(categories);
    };

    const getBill = async () => {
      const bills = await new BillPayModel().get();
      setBill(
        bills.length > 0 ? ((bills.pop() as BillPayModel).bill + 1).toString() : '1',
      );
    };

    const load = async () => {
      await getForms();
      await getOrders();
      await getCategories();
      await getBill();
    };

    load();
  }, []);

  const clearFields = () => {
    setEnterprise('');
    setCategory('0');
    setFreightOrder('0');
    setBill('');
    setDescription('');
    setDate('');
    setType('0');
    setFrequency('0');
    setForm('0');
    setAmountPaid('');
    setInstallments(1);
    setInterval(1);
    setAmount('');
    setDueDate('');
  };

  const handleCancelClick = () => {
    history.push(`/lancar/despesas`);
    window.location.reload();
  };

  const handleClearClick = () => {
    clearFields();
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
            colSm={6}
            id="empresa"
            label="Empresa"
            obrigatory
            value={enterprise}
            onChange={handleEntrepriseChange}
          />
          <FormInputSelect
            colSm={2}
            id="categoria"
            label="Categoria"
            obrigatory
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="0">SELECIONE</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.description}
              </option>
            ))}
          </FormInputSelect>
          <FormInputSelect
            colSm={4}
            id="pedido-frete"
            label="Pedido de Frete"
            obrigatory
            value={freightOrder}
            onChange={handleFreightOrderChange}
          >
            <option value="0">SELECIONE</option>
            {freightOrders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.description}
              </option>
            ))}
          </FormInputSelect>
        </Row>
      </FieldsetCard>
      <FieldsetCard legend="Dados da despesa" obrigatoryFields>
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
          <FormInputDate
            colSm={2}
            id="data-despesa"
            label="Data despesa"
            obrigatory
            value={date}
            onChange={handleDateChange}
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
            colSm={2}
            id="frequencia"
            label="Frequencia"
            obrigatory={false}
            value={frequency}
            onChange={handleFrequencyChange}
            disable={type != '3'}
            message={errorFrequency}
          >
            <option value="0">SELECIONE</option>
            <option value="1">MENSAL</option>
            <option value="2">ANUAL</option>
          </FormInputSelect>
        </Row>
        <Row>
          <FormInputSelect
            colSm={3}
            id="forma-pagamento"
            label="Forma de Pagamento"
            obrigatory={false}
            value={form}
            onChange={handleFormChange}
            disable={type != '1'}
          >
            <option value="0">SELECIONE</option>
            {forms.map((form) => (
              <option key={form.id} value={form.id}>
                {form.description}
              </option>
            ))}
          </FormInputSelect>
          <FormInputGroupText
            colSm={2}
            id="valor-pago"
            label="Valor pago"
            groupText={'R$'}
            obrigatory={false}
            mask="#.##0,00"
            maskReversal={true}
            maskPlaceholder="0,00"
            value={amountPaid}
            onChange={handleAmountPaidChange}
            readonly={form != '0'}
          />
          <FormInputNumber
            colSm={1}
            id="parcelas"
            label="Parcelas"
            obrigatory
            value={installments}
            onChange={handleInstallmentsChange}
            readonly={type != '2'}
          />
          <FormInputNumber
            colSm={2}
            id="intervalo"
            label="Intervalo entre parcelas"
            obrigatory
            value={interval}
            onChange={handleIntervalChange}
            readonly={type != '2'}
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
