import React from "react";
import { Row, Col, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { useLanguage, useToggle } from "hooks";
import { PasswordShow } from "components";
export default function Step2({ onSubmit, message, errors }) {
  const language = useLanguage();
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = useToggle();
  const [showConfirmedPassword, setShowConfirmedPassword] = useToggle();

  return (
    <form
      onSubmit={(event) => onSubmit(event, { password, passwordConfirmation })}
    >
      <Row className="login--container py-5 bg-info rounded-3 text-white px-4">
        <Col xs={12} className="text-center">
          {errors.message && !errors.errors && (
            <Alert variant="danger">{errors.message}</Alert>
          )}
        </Col>
        <Col xs={12} className="text-center">
          {message && <Alert>{message}</Alert>}
        </Col>
        <Col xs={12} className="mb-3">
          <Form.Group className="" controlId="register-form-password">
            <Form.Label>{language.password}</Form.Label>
            <InputGroup>
              <Form.Control
                type={show ? "text" : "password"}
                placeholder={language.password}
                className={`login--showPassword h7 ${
                  errors?.errors?.password ? "border-danger" : ""
                }`}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <PasswordShow show={show} setShow={setShow} />
            </InputGroup>
            <div className="text-danger">
              <p>{errors?.errors?.password && errors?.errors?.password[0]}</p>
            </div>
          </Form.Group>
        </Col>
        <Col xs={12} className="mb-3">
          <Form.Group className="" controlId="register-form-confirmPassword">
            <Form.Label>{language.confirmPassword}</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmedPassword ? "text" : "password"}
                placeholder={language.confirmPassword}
                className={`login--showPassword h7 ${
                  errors?.errors?.password_confirmation ? "border-danger" : ""
                }`}
                value={passwordConfirmation}
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
              />
              <PasswordShow
                show={showConfirmedPassword}
                setShow={setShowConfirmedPassword}
              />
            </InputGroup>
            {errors?.errors?.password_confirmation && (
              <div className="text-danger">
                <p>{errors.errors.password_confirmation[0]}</p>
              </div>
            )}

            <div className="text-danger">
              <p>
                {passwordConfirmation !== password && language.PasswordMatch}
              </p>
            </div>
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
