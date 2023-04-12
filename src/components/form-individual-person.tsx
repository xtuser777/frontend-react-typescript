import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export function FormIndividualPerson(): JSX.Element {
  return (
    <>
      <Row>
        <Col sm="12">
          <FormGroup>
            <Label for="nome">
              Nome <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="text" id="nome" style={{ width: '100%' }} />
            <span id="msNome" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="4">
          <FormGroup>
            <Label for="rg">
              RG <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="text" id="rg" style={{ width: '100%' }} maxLength={30} />
            <span id="msrg" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label for="cpf">
              CPF <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="text" id="cpf" style={{ width: '100%' }} />
            <span id="mscpf" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label for="nasc">
              Nascimento <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="date" id="nasc" style={{ width: '100%' }} />
            <span id="msnasc" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}
