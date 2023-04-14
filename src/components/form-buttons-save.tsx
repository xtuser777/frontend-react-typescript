import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

interface IProp {
  clear: boolean;
}

export function FormButtonsSave(props: IProp): JSX.Element {
  return (
    <Row>
      <Col sm="2">
        <Link style={{ textDecoration: 'none', color: 'white' }} to={'/inicio'}>
          <Button color="secondary" id="voltar" style={{ width: '100%' }}>
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
              style={{ width: '100%' }}
              onClick={undefined}
            >
              LIMPAR
            </Button>
          </Col>
        </>
      ) : (
        <Col sm="8"></Col>
      )}
      <Col sm="2">
        <Button color="success" id="salvar" style={{ width: '100%' }} onClick={undefined}>
          SALVAR
        </Button>
      </Col>
    </Row>
  );
}
