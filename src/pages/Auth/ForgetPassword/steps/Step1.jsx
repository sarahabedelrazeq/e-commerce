import { useLanguage } from "hooks";
import React from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";

export default function Step1({ onSubmit, message, errors }) {
  const [identifier, setIdentifier] = React.useState("");
  const language = useLanguage();

  return (
    <form onSubmit={(event) => onSubmit(event, { identifier })}>
      <Row className="login--container py-5 bg-info rounded-3 text-white px-4">
        <Col xs={12} className="text-center">
          {errors && !errors.errors && (
            <Alert variant="danger">{errors.message}</Alert>
          )}
        </Col>
        <Col xs={12} className="text-center">
          {message && <Alert>{message}</Alert>}
        </Col>
        <Col xs={12} className="mb-3">
          <Form.Group className="login--username" controlId="formBasicphone">
            <Form.Label>{language.phone}</Form.Label>
            <Form.Control
              type="text"
              className={`h7 ${
                errors && errors.errors?.phone ? "border-danger" : ""
              }`}
              placeholder={language.phone}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <div className="text-danger">{errors && errors.errors?.phone}</div>
          </Form.Group>
        </Col>

        <Col xs={12} className="m-auto text-center fw-bold mb-3">
          <Button
            variant="outline-secondary"
            type="submit"
            className="w-50 text-white"
          >
            {language.loginButton}
          </Button>
        </Col>
      </Row>
    </form>
  );
}
