import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

interface IHandle {
  handleClearClick: () => void;
  handleSaveClick: () => void;
}

interface IProp {
  clear: boolean;
  backLink: string;
  handle: IHandle;
}

export function FormButtonsSave(props: IProp): JSX.Element {
  return (
    <Row>
      <Col sm="2">
        <Link to={props.backLink}>
          <Button color="secondary" id="voltar" size="sm" style={{ width: '100%' }}>
            VOLTAR
          </Button>
        </Link>
      </Col>
      {props.clear ? (
        <>
          <Col sm="6"></Col>
          <Col sm="2">
            <Button
              color="primary"
              id="limpar"
              size="sm"
              style={{ width: '100%' }}
              onClick={props.handle.handleClearClick}
            >
              LIMPAR
            </Button>
          </Col>
        </>
      ) : (
        <Col sm="8"></Col>
      )}
      <Col sm="2">
        <Button
          color="success"
          id="salvar"
          size="sm"
          style={{ width: '100%' }}
          onClick={props.handle.handleSaveClick}
        >
          SALVAR
        </Button>
      </Col>
    </Row>
  );
}
