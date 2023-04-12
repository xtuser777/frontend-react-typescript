import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export function FormEnterprisePerson(): JSX.Element {
  return (
    <>
      <Row>
        <Col sm="12">
          <FormGroup>
            <Label for="razao_social">
              Razão Social <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="text" id="razao_social" style={{ width: '100%' }} />
            <div id="msrs"></div>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="9">
          <FormGroup>
            <Label for="nome_fantasia">
              Nome Fantasia <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="text" id="nome_fantasia" style={{ width: '100%' }} />
            <div id="msnf"></div>
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <Label for="cnpj">
              CNPJ <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="text" id="cnpj" style={{ width: '100%' }} />
            <div id="mscnpj"></div>
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}
