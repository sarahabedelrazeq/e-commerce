import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useLanguage, useToggle } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { loginAgent, loginWithOtp } from "store/auth";
import { PasswordShow, Otp } from "components";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Login() {
  /* Change language and direction */
  const language = useLanguage();
  const dispatch = useDispatch();
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [show, setShow] = useToggle();
  const loginError = useSelector((state) => state.auth.errors.login);
  const loading = useSelector((state) => state.auth.loading);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAgent({ credentials: { identifier, password } }));
  };

  React.useEffect(() => {
    if (loginError?.state === -1) {
    }
  }, [loginError]);

  const otpHandler = (data) => {
    setOtp(data);
    if (data.length === 4) {
      dispatch(loginWithOtp({ credentials: { identifier, login_otp: data } }));
    }
  };

  return (
    <div className="page-container">
      {loading && (
        <div className="vh-100 vw-100 position-fixed d-flex align-items-center justify-content-center top-0 left-0 right-0 bottom-0 overlay">
          <Oval color="#ffee00" height={80} width={80} />
        </div>
      )}
      <section id="Login">
        <Container>
          <Row className="justify-content-center">
            <Col xl={6} lg={8} md={10} sm={12} xs={12}>
              <form onSubmit={handleLogin}>
                <Row className="login--container py-5 bg-info rounded-3 text-white px-4">
                  <Col
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="text-center"
                  >
                    {loginError && !loginError.errors && (
                      <Alert variant="danger">{loginError.message}</Alert>
                    )}
                  </Col>
                  {loginError?.status === -1 || otp !== "" ? (
                    <Col xs={12}>
                      <Otp onChange={otpHandler} />
                    </Col>
                  ) : (
                    <>
                      <Col
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="mb-3"
                      >
                        <Form.Group
                          className="login--username"
                          controlId="formBasicphone"
                        >
                          <Form.Label>{language.phone}</Form.Label>
                          <Form.Control
                            type="text"
                            className={`h7 ${
                              loginError &&
                              loginError.errors &&
                              loginError.errors?.phone
                                ? "border-danger"
                                : ""
                            }`}
                            placeholder={language.phone}
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                          />
                          <div className="text-danger">
                            {loginError &&
                              loginError.errors &&
                              loginError.errors?.phone}
                          </div>
                        </Form.Group>
                      </Col>

                      <Col
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="mb-3"
                      >
                        <Form.Group
                          className="login--password"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>{language.password}</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type={show ? "text" : "password"}
                              className={`login--showPassword h7 ${
                                loginError &&
                                loginError.errors &&
                                loginError.errors?.password
                                  ? "border-danger"
                                  : ""
                              }`}
                              placeholder={language.password}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <PasswordShow show={show} setShow={setShow} />
                          </InputGroup>
                          <div className="text-danger">
                            {loginError &&
                              loginError.errors &&
                              loginError.errors?.password}
                          </div>
                        </Form.Group>
                      </Col>

                      <Col
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="mb-3"
                      >
                        <Link to="/forget-password">{language.forgetPassword}</Link>
                      </Col>

                      <Col
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="m-auto text-center fw-bold mb-3"
                      >
                        <Button
                          variant="outline-secondary"
                          type="submit"
                          className="w-50 text-white"
                        >
                          {language.loginButton}
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
