import React, { Component } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { BsPhoneFill, BsTelephoneFill } from 'react-icons/bs';
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormContact } from '../../components/form-contact';
import { FormButtonsSave } from '../../components/form-buttons-save';
import { FormEnterprisePerson } from '../../components/form-enterprise-person';

export class Parameterization extends Component {
  render() {
    return (
      <>
        <CardTitle text="Parametrização do sistema" />
        <FieldsetCard legend="Dados da empresa" obrigatoryFields>
          <FormEnterprisePerson />
        </FieldsetCard>
        <FieldsetCard legend="Dados de contato da empresa" obrigatoryFields>
          <FormContact />
        </FieldsetCard>
        <FieldsetCard legend="Dados adicionais">
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="logotipo">Logotipo:</Label>
                <Input type="file" id="logotipo" style={{ width: '100%' }} />
                <div id="mslogo"></div>
              </FormGroup>
            </Col>
          </Row>
        </FieldsetCard>
        <FormButtonsSave />
      </>
    );
  }
}
