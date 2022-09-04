import React from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { useFetch, useLanguage } from "hooks";
import Swal from "sweetalert2";

/* Checkout - page  */
export default function ContactUsForm() {
  const language = useLanguage();
  const [errors, setErrors] = React.useState({});
  const [_, contactFormRequest] = useFetch(
    "/user/contact-us",
    "POST"
  );
  const nameInputRef = React.useRef();
  const phoneInputRef = React.useRef();
  const messageInputRef = React.useRef();

  const handleSubmitContactForm = (e) => {
    e.preventDefault();
    contactFormRequest(
      {
        name: nameInputRef.current.value,
        phone: phoneInputRef.current.value,
        message: messageInputRef.current.value,
      },
      null,
      (_, title) => {
        resetInputs();
        return Swal.fire({
          icon: "success",
          title: title,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        setErrors(error.errors);
      }
    );
  };

  const resetInputs = () => {
    nameInputRef.current.value = "";
    phoneInputRef.current.value = "";
    messageInputRef.current.value = "";
    setErrors({});
  };
  return (
    <div id="contact-us-form-page" className="page-container">
      <section>
        <Container>
          <Row>
            <Col xl={6} lg={8} xs={12}>
              <form onSubmit={handleSubmitContactForm}>
                <Row>
                  <Col xs={12} className="mb-4 mb-md-5">
                    <h1 className="addNewUser--title">
                      {language.complaintsAndSuggestions}
                    </h1>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-4">
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label>{language.name}</Form.Label>
                      <Form.Control
                        type="text"
                        ref={nameInputRef}
                        className={`h7 ${
                          errors.name && errors.name[0] && "border-danger"
                        }`}
                        placeholder={language.name}
                      />
                      <div className="text-danger">
                        {errors.name && errors.name[0]}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-4">
                    <Form.Group controlId="formBasicPhone">
                      <Form.Label>{language.phone}</Form.Label>
                      <Form.Control
                        type="tel"
                        ref={phoneInputRef}
                        className={`h7 ${
                          errors.phone && errors.phone[0] && "border-danger"
                        }`}
                        placeholder={language.phone}
                      />
                      <div className="text-danger">
                        {errors.phone && errors.phone[0]}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-4">
                    <Form.Group controlId="formBasicNotes">
                      <Form.Label>{language.notes}</Form.Label>
                      <Form.Control
                        type="text"
                        ref={messageInputRef}
                        className={`h7 ${
                          errors.message && errors.message[0] && "border-danger"
                        }`}
                        placeholder={language.notes}
                        as="textarea"
                        rows={3}
                      />
                      <div className="text-danger">
                        {errors.message && errors.message[0]}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="mb-4 d-flex justify-content-end"
                  >
                    <button className="btn btn-primary w-50">
                      {language.send}
                    </button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
