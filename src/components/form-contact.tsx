import React from 'react';
import { BsPhoneFill, BsTelephoneFill } from 'react-icons/bs';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
} from 'reactstrap';

export function FormContact(): JSX.Element {
  return (
    <>
      <Row>
        <Col sm="9">
          <FormGroup>
            <Label for="rua">
              Rua <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="text" id="rua" style={{ width: '100%' }} />
            <span id="msRua" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <Label for="numero">
              Número <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="text" id="numero" style={{ width: '100%' }} />
            <span id="msNumero" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Label for="bairro">
              Bairro <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="text" id="bairro" style={{ width: '100%' }} />
            <span id="msBairro" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label for="complemento">Complemento:</Label>
            <Input type="text" id="complemento" style={{ width: '100%' }} />
            <span id="msComplemento" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="4">
          <FormGroup>
            <Label for="cbestado">
              Estado <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input
              type="select"
              id="cbestado"
              style={{ width: '100%' }}
              onChange={undefined}
            >
              <option value="0">SELECIONE</option>
            </Input>
            <span id="msEstado" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
        <Col sm="5">
          <FormGroup>
            <Label for="cbcidade">
              Cidade <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="select" id="cbcidade" style={{ width: '100%' }}>
              <option value="0">SELECIONE</option>
            </Input>
            <span id="msCidade" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <Label for="cep">
              CEP <span style={{ color: 'red' }}>*</span>:
            </Label>
            <Input type="text" id="cep" style={{ width: '100%' }} />
            <span id="msCep" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="3">
          <FormGroup>
            <Label for="tel">
              Telefone <span style={{ color: 'red' }}>*</span>:
            </Label>
            <InputGroup>
              <InputGroupText>
                <BsTelephoneFill />
              </InputGroupText>
              <Input type="text" id="tel" />
            </InputGroup>
            <span id="msTelefone" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <Label for="cel">
              Celular <span style={{ color: 'red' }}>*</span>:
            </Label>
            <InputGroup>
              <InputGroupText>
                <BsPhoneFill />
              </InputGroupText>
              <Input type="text" id="cel" />
            </InputGroup>
            <span id="msCelular" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label for="email">
              E-Mail <span style={{ color: 'red' }}>*</span>:
            </Label>
            <InputGroup>
              <InputGroupText>@</InputGroupText>
              <Input id="email" />
            </InputGroup>
            <span id="msEmail" className="label label-danger hidden"></span>
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}
