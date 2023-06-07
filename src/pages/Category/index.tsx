import React, { ChangeEvent, useEffect, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FormInputText } from '../../components/form-input-text';
import { BillPayCategory as BillPayCategoryModel } from '../../models/BillPayCategory';

export function Category(): JSX.Element {
  const [category, setCategory] = useState(new BillPayCategoryModel());

  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState<string | undefined>(undefined);

  const routeParams = useParams();
  const method = routeParams.method as string;
  let id = 0;
  if (routeParams.id) id = Number.parseInt(routeParams.id);

  useEffect(() => {
    const getData = async () => {
      const data = await new BillPayCategoryModel().getOne(id);
      if (data) {
        setCategory(data);
        setDescription(data.description);
      }
    };

    if (method == 'editar') getData();
  }, []);

  const validate = {
    description: (value: string) => {
      if (value.length == 0) {
        setErrorDescription('A descrição da categoria precisa ser preenchida.');
        return false;
      } else {
        setErrorDescription(undefined);
        category.description = value;
        return true;
      }
    },
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    validate.description(e.target.value);
  };

  const validateFields = () => {
    const desc = validate.description(description);

    return desc;
  };

  const clearFields = () => {
    setDescription('');
  };

  const persistData = async () => {
    if (validateFields()) {
      if (method == 'novo') {
        if (await category.save()) clearFields();
      } else await category.update();
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
            ? 'Cadastrar Novo Categoria de Contas'
            : 'Detalhes do Categoria de Contas'
        }
      />
      <FieldsetCard legend="Dados da Categoria" obrigatoryFields>
        <Row>
          <FormInputText
            colSm={12}
            id="desc"
            label="Descrição"
            obrigatory
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
            message={errorDescription}
          />
        </Row>
      </FieldsetCard>
      <FormButtonsSave
        backLink="/categorias"
        clear={method == 'novo' ? true : false}
        handle={handleButtons}
      />
    </>
  );
}
