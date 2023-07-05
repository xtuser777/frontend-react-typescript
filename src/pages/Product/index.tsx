import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Button, Col, Row, Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { FormInputSelect } from '../../components/form-input-select';
import { FormInputGroupText } from '../../components/form-input-group-text';
import { Product as ProductModel } from '../../models/Product';
import { IRepresentation, Representation } from '../../models/Representation';
import { formatarPeso, formatarValor } from '../../utils/format';
import { ITruckType, TruckType } from '../../models/TruckType';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import history from '../../services/history';

export function Product(): JSX.Element {
  const [product, setProduct] = useState(new ProductModel());

  const [representations, setRepresentations] = useState(new Array<Representation>());

  const [types, setTypes] = useState(new Array<ITruckType>());
  const [typesLinked, setTypesLinked] = useState(new Array<ITruckType>());
  const [errorTypesLinked, setErrorTypesLinked] = useState<string | undefined>(undefined);

  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState<string | undefined>(undefined);
  const [representation, setRepresentation] = useState('');
  const [errorRepresentation, setErrorRepresentation] = useState<string | undefined>(
    undefined,
  );
  const [mensure, setMensure] = useState('');
  const [errorMensure, setErrorMensure] = useState<string | undefined>(undefined);
  const [weight, setWeight] = useState('');
  const [errorWeight, setErrorWeight] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState<string | undefined>(undefined);
  const [priceOut, setPriceOut] = useState('');
  const [errorPriceOut, setErrorPriceOut] = useState<string | undefined>(undefined);
  const [type, setType] = useState('0');
  const [errorType, setErrorType] = useState<string | undefined>(undefined);

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  useEffect(() => {
    // validar se existe representações, caso contrário notifique o usuário e volte.
    const getRepresentations = async () => {
      const data = await new Representation().get();
      if (data.length == 0) {
        toast.info('Não existem representações cadastradas.');
        history.push('/produtos');
        history.go(1);
      }
      setRepresentations(data);
    };

    const getTypes = async () => {
      const data = await new TruckType().get();
      setTypes(data);
    };

    const getData = async () => {
      const data = await new ProductModel().getOne(id);
      if (data) {
        setProduct(data);
        setDescription(data.description);
        setRepresentation(data.representation.id.toString());
        setMensure(data.measure);
        setWeight(formatarPeso(data.weight));
        setPrice(formatarValor(data.price));
        setPriceOut(formatarValor(data.priceOut));
        setTypesLinked(data.types);
      }
    };

    const load = async () => {
      await getRepresentations();
      await getTypes();
      if (method == 'editar') getData();
    };

    load();
  }, []);

  const validate = {
    description: (value: string) => {
      if (value.length == 0)
        setErrorDescription('A descrição do produto precisa ser preenchida.');
      else if (value.length < 2)
        setErrorDescription('A descrição preenchida tem tamanho inválido.');
      else {
        setErrorDescription(undefined);
        product.description = value;
      }
    },
    representation: (value: string) => {
      if (value == '0')
        setErrorRepresentation('A representação do produto precisa ser preenchida.');
      else {
        setErrorRepresentation(undefined);
        product.representation = representations.find((item) => item.id == Number(value))
          ?.toAttributes as IRepresentation;
      }
    },
    measure: (value: string) => {
      if (value.length == 0)
        setErrorMensure('A unidade de medida precisa ser preenchida.');
      else if (value.length < 2)
        setErrorMensure('A unidade de medida preenchida tem tamanho inválido.');
      else {
        setErrorMensure(undefined);
        product.measure = value;
      }
    },
    weight: (value: string) => {
      if (value.length == 0) setErrorWeight('O peso do produto precisa ser preenchido.');
      else if (Number(value) <= 0)
        setErrorWeight('O peso do produto informado é inválido.');
      else {
        setErrorWeight(undefined);
        product.weight = Number.parseFloat(
          value.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        );
      }
    },
    price: (value: string) => {
      if (value.length == 0) setErrorPrice('O preço do produto precisa ser preenchido.');
      else if (Number(value) <= 0)
        setErrorPrice('O preço do produto informado é inválido.');
      else {
        setErrorPrice(undefined);
        product.price = Number.parseFloat(
          value.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        );
      }
    },
    priceOut: (value: string) => {
      if (value.length == 0)
        setErrorPriceOut('O preço fora do estado do produto precisa ser preenchido.');
      else if (Number(value) <= 0)
        setErrorPriceOut('O preço fora do estado informado é inválido.');
      else {
        setErrorPriceOut(undefined);
        product.priceOut = Number.parseFloat(
          value.replace(',', '#').replaceAll('.', ',').replace('#', '.'),
        );
      }
    },
    types: () => {
      if (typesLinked.length == 0)
        setErrorTypesLinked('Os tipos do caminhão compatíveis precisam ser adicionados.');
      else {
        setErrorTypesLinked(undefined);
        product.types = typesLinked;
      }
    },
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    validate.description(e.target.value);
  };

  const handleRepresentationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepresentation(e.target.value);
    validate.representation(e.target.value);
  };

  const handleMensureChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMensure(e.target.value);
    validate.measure(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
    validate.weight(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    setPriceOut(e.target.value);
    validate.price(e.target.value);
  };

  const handlePriceOutChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceOut(e.target.value);
    validate.priceOut(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    if (e.target.value == '0') setErrorType('O tipo de caminhão precisa ser selecinado.');
    else setErrorType(undefined);
  };

  const addType = () => {
    if (type == '0') setErrorType('O tipo de caminhão precisa ser selecinado.');
    else {
      setErrorType(undefined);
      let exists = undefined;
      if (typesLinked.length > 0)
        exists = typesLinked.find((item) => item.id == Number(type));
      if (!exists) {
        const newTypes = [...typesLinked];
        newTypes.push(
          (types.find((item) => item.id == Number(type)) as TruckType).toAttributes,
        );
        setTypesLinked(newTypes);
      }
    }
  };

  const delType = (id: number) => {
    let newTypes = [...typesLinked];
    newTypes = newTypes.filter((type) => type.id != id);
    setTypesLinked(newTypes);
  };

  const validateFields = () => {
    validate.description(description);
    validate.representation(representation);
    validate.measure(mensure);
    validate.weight(weight);
    validate.price(price);
    validate.priceOut(priceOut);
    validate.types();

    return (
      !errorDescription &&
      !errorRepresentation &&
      !errorMensure &&
      !errorWeight &&
      !errorPrice &&
      !errorPriceOut &&
      !errorTypesLinked
    );
  };

  const clearFields = () => {
    setDescription('');
    setRepresentation('0');
    setMensure('');
    setWeight('');
    setPrice('');
    setPriceOut('');
    setTypesLinked([]);
  };

  const persistData = async () => {
    if (validateFields()) {
      if (method == 'novo') {
        if (await product.save()) clearFields();
      } else await product.update();
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
            message={errorDescription}
          />
          <FormInputSelect
            colSm={5}
            id="representacao"
            label="Representação"
            obrigatory
            value={representation}
            onChange={(e) => handleRepresentationChange(e)}
            message={errorRepresentation}
          >
            <option value="0">SELECIONE</option>
            {representations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.person.enterprise?.fantasyName + ' (' + item.unity + ')'}
              </option>
            ))}
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
            message={errorMensure}
          />
          <FormInputGroupText
            colSm={3}
            id="peso"
            label="Peso"
            groupText={'KG'}
            obrigatory
            mask="000.000,0"
            maskReversal={true}
            maskPlaceholder="0,0"
            value={weight}
            onChange={(e) => handleWeightChange(e)}
            message={errorWeight}
          />
          <FormInputGroupText
            colSm={3}
            id="preco"
            label="Preço"
            groupText={'R$'}
            obrigatory
            mask="00.000.000,00"
            maskReversal={true}
            value={price}
            onChange={(e) => handlePriceChange(e)}
            message={errorPrice}
          />
          <FormInputGroupText
            colSm={3}
            id="preco-out"
            label="Preço fora do estado"
            groupText={'R$'}
            obrigatory
            mask="00.000.000,00"
            maskReversal={true}
            value={priceOut}
            onChange={(e) => handlePriceOutChange(e)}
            message={errorPriceOut}
          />
        </Row>
      </FieldsetCard>
      <Row>
        <Col sm={5}>
          <FieldsetCard legend="Adicionar tipos de caminhão compatíveis" obrigatoryFields>
            <Row>
              <FormInputSelect
                colSm={12}
                id="tipocaminhao"
                label="Tipo de Caminhão"
                obrigatory
                value={type}
                onChange={(e) => handleTypeChange(e)}
                message={errorType}
              >
                <option value="0">SELECIONE</option>
                {types.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.description + ' - ' + item.axes + ' Eixos'}
                  </option>
                ))}
              </FormInputSelect>
            </Row>
            <Row>
              <Col sm="12" style={{ paddingTop: '18px' }}>
                <Button
                  size="sm"
                  color="success"
                  id="adicionatipo"
                  onClick={addType}
                  style={{ width: '100%' }}
                >
                  ADICIONAR TIPO
                </Button>
              </Col>
            </Row>
          </FieldsetCard>
        </Col>
        <Col sm={7}>
          <FieldsetCard legend="Tipos de caminhão compatíveis">
            <Row>
              <div className="table-container" style={{ height: '150px' }}>
                <Table id="tableLinks" size="sm" striped hover responsive>
                  <thead>
                    <tr>
                      <th className="hidden">ID</th>
                      <th style={{ width: '40%' }}>DESCRIÇÃO</th>
                      <th style={{ width: '16%' }}>EIXOS</th>
                      <th style={{ width: '10%' }}>CAPACIDADE</th>
                      <th style={{ width: '2%' }}>&nbsp;</th>
                    </tr>
                  </thead>

                  <tbody id="tbodyLinks">
                    {typesLinked.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.description}</td>
                        <td>{item.axes}</td>
                        <td>{item.capacity}</td>
                        <td>
                          <FaTrash
                            role="button"
                            color="red"
                            size={14}
                            title="Excluir"
                            onClick={() => delType(item.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Row>
          </FieldsetCard>
        </Col>
      </Row>
      <FormButtonsSave
        backLink="/produtos"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
