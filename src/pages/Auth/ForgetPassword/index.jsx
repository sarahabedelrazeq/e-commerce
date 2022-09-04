import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useFetch } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { checkOtp, getOtp, loginAgent } from "store/auth";
import { Otp } from "components";
import { Oval } from "react-loader-spinner";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const [step, setStep] = React.useState(1);
  const [identifier, setIdentifier] = React.useState("");

  const [passwordResetErrors, setPasswordResetErrors] = React.useState({});

  const loginError = useSelector((state) => state.auth.errors.forgetPassword);
  const forgetPasswordMessage = useSelector(
    (state) => state.auth.forgetPasswordMessage
  );
  const loading = useSelector((state) => state.auth.loading);
  const [_, passwordResetRequest] = useFetch(
    `auth/reset-password/reset-password`,
    "POST"
  );

  const handleLogin = (event, { identifier }) => {
    event.preventDefault();
    setIdentifier(identifier);
    dispatch(getOtp({ credentials: { identifier } })).then(({ payload }) => {
      if (payload.status) setStep(2);
    });
  };

  const otpHandler = (data) => {
    if (data.length === 4) {
      dispatch(checkOtp({ credentials: { identifier, login_otp: data } })).then(
        ({ payload }) => {
          if (payload.status) setStep(3);
        }
      );
    }
  };
  const passwordResetHandler = (event, { password, passwordConfirmation }) => {
    event.preventDefault();
    passwordResetRequest(
      {
        phone: identifier,
        password: password,
        password_confirmation: passwordConfirmation,
      },
      null,
      () => {
        dispatch(loginAgent({ credentials: { identifier, password } }));
      },
      setPasswordResetErrors
    );
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
              {step === 1 && (
                <Step1
                  onSubmit={handleLogin}
                  message={forgetPasswordMessage}
                  errors={loginError}
                />
              )}
              {step === 2 && (
                <Row className="login--container py-5 bg-info rounded-3 text-white px-4">
                  <Col xs={12} className="text-center">
                    {forgetPasswordMessage && (
                      <Alert>{forgetPasswordMessage}</Alert>
                    )}
                  </Col>
                  <Col xs={12} className="text-center">
                    {loginError && !loginError.errors && (
                      <Alert variant="danger">{loginError.message}</Alert>
                    )}
                  </Col>
                  <Col xs={12}>
                    <Otp onChange={otpHandler} />
                  </Col>
                </Row>
              )}
              {step === 3 && (
                <Step2
                  onSubmit={passwordResetHandler}
                  errors={passwordResetErrors}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
