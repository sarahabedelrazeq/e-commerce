import React from "react";
import { Col, Row, Form, Button, InputGroup } from "react-bootstrap";
import { useFetch, useLanguage, useToggle } from "hooks";
import { ProfileLayout } from "components/layouts";
import {PasswordShow} from "components";
import onSuccess from "helpers/onSucces";
import { useNavigate } from "react-router";

/* Add new user - page  */
export default function UserCreate() {
  /* Change language and direction */
  const language = useLanguage();
  const name = React.useRef(null);
  const branch_id = React.useRef(null);
  const phone = React.useRef(null);
  const password = React.useRef(null);
  const [errors, setErrors] = React.useState(null);
  const [branchesResponse, branchesRequest] = useFetch("agent/get-branches");
  const [_, addBranchRequest] = useFetch("agent/add-branch-user", "POST");
  const [show, setShow] = useToggle();
  const navigate = useNavigate();

  React.useEffect(() => {
    branchesRequest();
  }, [branchesRequest]);

  const DataContent = branchesResponse.result.data;

  const resetValues = () => {
    name.current.value = "";
    branch_id.current.value = "";
    phone.current.value = "";
    password.current.value = "";
    setErrors(null);
  };

  const handleSave = () => {
    addBranchRequest(
      {
        name: name.current.value,
        branch_id: branch_id.current.value,
        phone: phone.current.value,
        password: password.current.value,
      },
      null,
      (_, title) =>
        onSuccess({
          title,
          after: () => {
            resetValues();
            navigate(-1);
          },
        }),
      (error) => setErrors(error.errors)
    );
  };

  return (
    <ProfileLayout id="add-new-user-page">
      <Row id="addNewUser">
        <Col xl={12} lg={12} md={12} xs={12} className="mb-4 mb-md-5">
          <h1 className="addNewUser--title">{language.addedNewUser}</h1>
        </Col>
        <Col xl={12} lg={12} md={12} xs={12}>
          {/* input New user - username */}
          <Row>
            <Col xl={6} lg={6} md={6} xs={12} className="mt-3">
              <Form.Group
                className="mb-2 addNewUser--label"
                controlId="formBasicUsername"
              >
                <Form.Label>{language.username}</Form.Label>
                <Form.Control
                  ref={name}
                  type="text"
                  placeholder={language.username}
                  className={`addNewUser--input h7 ${
                    errors?.name && "border-danger"
                  }`}
                />
                <p className="text-danger">{errors?.name}</p>
              </Form.Group>
            </Col>
            {/* input New user - branchName */}
            <Col xl={6} lg={6} md={6} xs={12} className="mt-3">
              <Form.Group
                className="mb-2 addNewUser--label"
                controlId="formBasicLastname"
              >
                <Form.Label>{language.branchName}</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  ref={branch_id}
                  className={`addNewUser--input ${
                    errors?.branch_id && "border-danger"
                  }`}
                >
                  {DataContent &&
                    DataContent.map((x, index) => (
                      <option value={index} key={index}>
                        {x.agent_name}
                      </option>
                    ))}
                </Form.Select>
                <p className="text-danger">{errors?.branch_id}</p>
              </Form.Group>
            </Col>
            {/* input New user - phone */}
            <Col xl={6} lg={6} md={6} xs={12} className="mt-3">
              <Form.Group
                className="mb-2 addNewUser--label"
                controlId="formBasicPhonenumber"
              >
                <Form.Label>{language.phone}</Form.Label>
                <Form.Control
                  ref={phone}
                  type="text"
                  placeholder={language.phone}
                  pattern="[1-9]"
                  maxLength="10"
                  className={`addNewUser--input h7 ${
                    errors?.phone && "border-danger"
                  }`}
                  required
                  max={5}
                />
                <p className="text-danger">{errors?.phone}</p>
              </Form.Group>
            </Col>
            {/* input New user - password */}
            <Col xl={6} lg={6} md={6} xs={12} className="mt-3">
              <Form.Group
                className="mb-2 addNewUser--label"
                controlId="formBasicPassword"
              >
                <Form.Label>{language.password}</Form.Label>
                <InputGroup>
                  <Form.Control
                    ref={password}
                    type={show ? "text" : "password"}
                    placeholder={language.password}
                    className={`addNewUser--input h7 ${
                      errors?.password && "border-danger"
                    }`}
                  />
                  <PasswordShow show={show} setShow={setShow} />
                </InputGroup>
                <p className="text-danger">{errors?.password}</p>
              </Form.Group>
            </Col>
            {/* input New user - save button */}
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
