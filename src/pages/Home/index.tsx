import React, { Component } from 'react';
import { CardTitle } from '../../components/card-title';
import { FieldsetCard } from '../../components/fieldset-card';
import { Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';

interface Props {
  text: string;
}

export class Home extends Component {
  render() {
    return (
      <>
        <CardTitle text="Eventos do Sistema" />
        <FieldsetCard legend="Filtragem dos Eventos">
          <Row>
            <Col sm="5">
              <FormGroup>
                <Label for="textFiltro">Filtro:</Label>
                <Input
                  type="text"
                  name="textFiltro"
                  id="textFiltro"
                  style={{ width: '100%' }}
                />
              </FormGroup>
            </Col>
            <Col sm="2">
              <FormGroup>
                <Label for="dateEvento">Data dos Eventos:</Label>
                <Input
                  type="date"
                  name="dateEvento"
                  id="dateEvento"
                  style={{ width: '100%' }}
                />
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup>
                <Label for="selectTipoPedido">Data dos Eventos:</Label>
                <Input
                  type="select"
                  name="selectTipoPedido"
                  id="selectTipoPedido"
                  style={{ width: '100%' }}
                >
                  <option value="0">SELECIONE</option>
                  <option value="1">VENDA</option>
                  <option value="2">FRETE</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm="2">
              <FormGroup>
                <Label for="btFiltrar">&nbsp;</Label>
                <Button
                  color="primary"
                  name="btFiltrar"
                  id="btFiltrar"
                  style={{ width: '100%' }}
                  onClick={undefined}
                >
                  FILTRAR
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </FieldsetCard>
        <FieldsetCard legend="Eventos do Sistema">
          <Table id="tableEventos" striped hover>
            <thead>
              <tr>
                <th>DESCRIÇÃO</th>
                <th>DATA</th>
                <th>HORA</th>
                <th>PEDIDO</th>
                <th>AUTOR</th>
              </tr>
            </thead>

            <tbody id="tbodyEventos">
              <tr>
                <td>Teste</td>
                <td>11/04/2023</td>
                <td>12:00</td>
                <td>001</td>
                <td>Suporte</td>
              </tr>
              <tr>
                <td>Teste</td>
                <td>11/04/2023</td>
                <td>12:00</td>
                <td>001</td>
                <td>Suporte</td>
              </tr>
              <tr>
                <td>Teste</td>
                <td>11/04/2023</td>
                <td>12:00</td>
                <td>001</td>
                <td>Suporte</td>
              </tr>
              <tr>
                <td>Teste</td>
                <td>11/04/2023</td>
                <td>12:00</td>
                <td>001</td>
                <td>Suporte</td>
              </tr>
              <tr>
                <td>Teste</td>
                <td>11/04/2023</td>
                <td>12:00</td>
                <td>001</td>
                <td>Suporte</td>
              </tr>
            </tbody>
          </Table>
        </FieldsetCard>
        <Row>
          <Col sm="4"></Col>
          <Col sm="4">
            <Button color="primary" id="btGerarPdf" style={{ width: '100%' }}>
              Gerar PDF
            </Button>
          </Col>
          <Col sm="4"></Col>
        </Row>
      </>
    );
  }
}
