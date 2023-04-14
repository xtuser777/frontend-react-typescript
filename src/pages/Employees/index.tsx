import React, { Component } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Employees extends Component {
  render() {
    return (
      <>
        <CardTitle text="Gerenciar Funcionários" />
        <FieldsetCard legend="Filtragem de Funcionários">
          <Row>
            <Col sm="8">
              <FormGroup>
                <Label for="filtro">Filtro:</Label>
                <Input
                  type="text"
                  id="filtro"
                  style={{ width: '100%' }}
                  placeholder="Filtrar por nome, login e email..."
                />
              </FormGroup>
            </Col>
            <Col sm="2">
              <FormGroup>
                <Label for="adm">Admissão:</Label>
                <Input type="date" id="adm" style={{ width: '100%' }} />
              </FormGroup>
            </Col>
            <Col sm="2">
              <FormGroup>
                <Label for="filtrar">&nbsp;</Label>
                <Button
                  id="filtrar"
                  color="primary"
                  style={{ width: '100%' }}
                  onClick={undefined}
                >
                  FILTRAR
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </FieldsetCard>
        <FieldsetCard legend="Funcionários Cadastrados">
          <Row style={{ marginBottom: '10px' }}>
            <Col sm="10">
              <FormGroup>
                <Label for="ord">Ordenar por:</Label>
                <Input
                  type="select"
                  id="ord"
                  style={{ width: '100%' }}
                  onChange={undefined}
                >
                  <option value="1">REGISTRO (CRESCENTE)</option>
                  <option value="2">REGISTRO (DECRESCENTE)</option>
                  <option value="3">NOME (CRESCENTE)</option>
                  <option value="4">NOME (DECRESCENTE)</option>
                  <option value="5">USUÁRIO (CRESCENTE)</option>
                  <option value="6">USUÁRIO (DECRESCENTE)</option>
                  <option value="7">NÍVEL (CRESCENTE)</option>
                  <option value="8">NÍVEL (DECRESCENTE)</option>
                  <option value="9">CPF (CRESCENTE)</option>
                  <option value="10">CPF (DECRESCENTE)</option>
                  <option value="11">ADMISSÃO (CRESCENTE)</option>
                  <option value="12">ADMISSÃO (DECRESCENTE)</option>
                  <option value="13">TIPO (CRESCENTE)</option>
                  <option value="14">TIPO (DECRESCENTE)</option>
                  <option value="15">ATIVO (CRESCENTE)</option>
                  <option value="16">ATIVO (DECRESCENTE)</option>
                  <option value="17">EMAIL (CRESCENTE)</option>
                  <option value="18">EMAIL (DECRESCENTE)</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm="2">
              <FormGroup>
                <Label for="novo">&nbsp;</Label>
                <Link to={'/funcionario/novo'}>
                  <Button
                    id="novo"
                    color="success"
                    style={{ width: '100%' }}
                    onClick={undefined}
                  >
                    NOVO
                  </Button>
                </Link>
              </FormGroup>
            </Col>
          </Row>
          <Table id="tableEmployees" striped hover responsive>
            <thead>
              <tr>
                <th className="hidden">ID</th>
                <th style={{ width: '20%' }}>NOME</th>
                <th style={{ width: '10%' }}>USUÁRIO</th>
                <th style={{ width: '12%' }}>NÍVEL</th>
                <th style={{ width: '12%' }}>CPF</th>
                <th style={{ width: '8%' }}>ADMISSÃO</th>
                <th style={{ width: '10%' }}>TIPO</th>
                <th style={{ width: '8%' }}>ATIVO</th>
                <th>EMAIL</th>
                <th style={{ width: '2%' }}>&nbsp;</th>
                <th style={{ width: '2%' }}>&nbsp;</th>
                <th style={{ width: '2%' }}>&nbsp;</th>
              </tr>
            </thead>

            <tbody id="tbodyEmployees"></tbody>
          </Table>
        </FieldsetCard>
      </>
    );
  }
}
