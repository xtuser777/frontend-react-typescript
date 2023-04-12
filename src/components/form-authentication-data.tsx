import React from 'react';
import { FaKey, FaUserAlt } from 'react-icons/fa';
import {
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

interface IProps {
  page: string;
}

export function FormAuthenticationData(props: IProps): JSX.Element {
  return (
    <>
      {props.page == 'employee' ? (
        <>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="nivel">
                  Nível <span style={{ color: 'red' }}>*</span>:
                </Label>
                <Input type="select" id="nivel" style={{ width: '100%' }}>
                  <option value="0">SELECIONAR</option>
                </Input>
                <span id="msNivel" className="label label-danger hidden"></span>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label for="login">
                  Login <span style={{ color: 'red' }}>*</span>:
                </Label>
                <InputGroup style={{ width: '100%' }}>
                  <InputGroupText>
                    <FaUserAlt />
                  </InputGroupText>
                  <Input type="text" id="login" />
                </InputGroup>
                <span id="msLogin" className="label label-danger hidden"></span>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="senha">
                  Senha <span style={{ color: 'red' }}>*</span>:
                </Label>
                <InputGroup style={{ width: '100%' }}>
                  <InputGroupText>
                    <FaKey />
                  </InputGroupText>
                  <Input type="password" id="senha" />
                </InputGroup>
                <span id="msSenha" className="label label-danger hidden"></span>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label for="conf-senha">
                  Confirmar Senha <span style={{ color: 'red' }}>*</span>:
                </Label>
                <InputGroup style={{ width: '100%' }}>
                  <InputGroupText>
                    <FaKey />
                  </InputGroupText>
                  <Input type="password" id="conf-senha" />
                </InputGroup>
                <span id="msConfSenha" className="label label-danger hidden"></span>
              </FormGroup>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col sm="4">
            <FormGroup>
              <Label for="login">
                Login <span style={{ color: 'red' }}>*</span>:
              </Label>
              <InputGroup style={{ width: '100%' }}>
                <InputGroupText>
                  <FaUserAlt />
                </InputGroupText>
                <Input type="text" id="login" />
              </InputGroup>
              <span id="msLogin" className="label label-danger hidden"></span>
            </FormGroup>
          </Col>
          <Col sm="4">
            <FormGroup>
              <Label for="senha">
                Senha <span style={{ color: 'red' }}>*</span>:
              </Label>
              <InputGroup style={{ width: '100%' }}>
                <InputGroupText>
                  <FaKey />
                </InputGroupText>
                <Input type="password" id="senha" />
              </InputGroup>
              <span id="msSenha" className="label label-danger hidden"></span>
            </FormGroup>
          </Col>
          <Col sm="4">
            <FormGroup>
              <Label for="conf-senha">
                Confirmar Senha <span style={{ color: 'red' }}>*</span>:
              </Label>
              <InputGroup style={{ width: '100%' }}>
                <InputGroupText>
                  <FaKey />
                </InputGroupText>
                <Input type="password" id="conf-senha" />
              </InputGroup>
              <span id="msConfSenha" className="label label-danger hidden"></span>
            </FormGroup>
          </Col>
        </Row>
      )}
    </>
  );
}
