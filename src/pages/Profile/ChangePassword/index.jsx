import React from "react";
import {
  Col,
  Row,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useFetch, useLanguage, useToggle } from "hooks";
import { ProfileLayout } from "components/layouts";
import {PasswordShow} from "components";
import onSuccess from "helpers/onSucces";

/* Add new user - page  */
export default function ChangePassword() {
  /* Change language and direction */
  const language = useLanguage();
  const [errors, setErrors] = React.useState(null);
  const [_, changePasswordRequest] = useFetch("/user/change-password", "POST");
  const [passwordShow, setPasswordShow] = useToggle();
  const [oldPasswordShow, setOldPasswordShow] = useToggle();
  const [passwordConfirmationShow, setPasswordConfirmationShow] = useToggle();
  const [password, setPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  const resetValues = () => {
    setOldPassword("");
    setPassword("");
    setPasswordConfirmation("");
    setErrors(null);
  };

  const handleSave = () => {
    if (passwordConfirmation === password) {
      changePasswordRequest(
        {
          old_password: oldPassword,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        null,
        (_, title) =>
          onSuccess({
            title,
            after: () => resetValues(),
          }),
        (error) => setErrors(error.errors)
      );
    }
  };

  return (
    <ProfileLayout id="add-new-user-page">
      <Row id="addNewUser">
        <Col xl={12} lg={12} md={12} xs={12} className="mb-4 mb-md-5">
          <h1 className="addNewUser--title">{language.changePassword}</h1>
        </Col>
        <Col xl={12} lg={12} md={12} xs={12}>
          {/* input New user - username */}
          <Row>
            <Col xl={6} lg={6} md={6} xs={12} className="mt-3">
              <Form.Group
                className="mb-2 addNewUser--label"
                controlId="formBasicOldPassword"
              >
                <Form.Label>{language.oldPassword}</Form.Label>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setOldPassword(e.target.value)}
                    type={oldPasswordShow ? "text" : "password"}
                    value={oldPassword}
                    placeholder={language.oldPassword}
                    className={`addNewUser--input h7 ${
                      errors?.old_password && "border-danger"
                    }`}
                  />
                  <PasswordShow
                    show={oldPasswordShow}
                    setShow={setOldPasswordShow}
                  />
                </InputGroup>
                <p className="text-danger">{errors?.old_password}</p>
              </Form.Group>
            </Col>

            <Col xl={6} lg={6} md={6} xs={12} className="mt-3">
              <Form.Group
                className="mb-2 addNewUser--label"
                controlId="formBasicPassword"
              >
                <Form.Label>{language.password}</Form.Label>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    type={passwordShow ? "text" : "password"}
                    value={password}
                    placeholder={language.password}
                    className={`addNewUser--input h7 ${
                      errors?.password && "border-danger"
                    }`}
                  />
                  <PasswordShow show={passwordShow} setShow={setPasswordShow} />
                </InputGroup>
                <p className="text-danger">
                  {errors?.password || errors?.password}
                </p>
              </Form.Group>
            </Col>

            <Col xl={6} lg={6} md={6} xs={12} className="mt-3">
              <Form.Group
                className="mb-2 addNewUser--label"
                controlId="formBasicPasswordConfirmation"
              >
                <Form.Label>{language.passwordConfirmation}</Form.Label>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type={passwordConfirmationShow ? "text" : "password"}
                    value={passwordConfirmation}
                    placeholder={language.passwordConfirmation}
                    className={`addNewUser--input h7 ${
                      passwordConfirmation !== password && "border-danger"
                    }`}
                  />
                  <PasswordShow
                    show={passwordConfirmationShow}
                    setShow={setPasswordConfirmationShow}
                  />
                </InputGroup>
                <p className="text-danger">
                  {passwordConfirmation !== password && language.PasswordMatch}
                </p>
              </Form.Group>
            </Col>
            <Col
              xl={12}
              lg={12}
              md={12}
              xs={12}
              className="mt-3 text-end text-sm-cetner text-xs-cetner"
            >
              <Button
                className="addNewUser--btn"
                variant="primary"
                type="submit"
                onClick={handleSave}
              >
                {language.save}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </ProfileLayout>
  );
}
