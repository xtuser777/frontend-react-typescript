import React, { Component } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { FormContact } from '../../components/form-contact';
import { FormIndividualPerson } from '../../components/form-individual-person';
import { FormAuthenticationData } from '../../components/form-authentication-data';
import { FormButtonsSave } from '../../components/form-buttons-save';

export class User extends Component {
  private tipoAtual = 1;

  render() {
    return (
      <>
        <CardTitle text="Dados do Funcionário" />
        <FieldsetCard legend="Dados do Funcionário" obrigatoryFields>
          <FormIndividualPerson />
        </FieldsetCard>
        <FieldsetCard legend="Dados de contato do funcionário" obrigatoryFields>
          <FormContact />
        </FieldsetCard>
        {this.tipoAtual == 1 ? (
          <FieldsetCard legend="Dados de autenticação" obrigatoryFields>
            <FormAuthenticationData page="data" />
          </FieldsetCard>
        ) : (
          ''
        )}
        <FormButtonsSave />
      </>
    );
  }
}
