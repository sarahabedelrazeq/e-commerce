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
import { useFetch, useLanguage, useToggle } from "hooks";
import { Otp, PasswordShow } from "components";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginWithOtp, userRegister } from "store/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default function Register() {
  const dispatch = useDispatch();
  const language = useLanguage();
  const [show, setShow] = useToggle();
  const [showConfirmedPassword, setShowConfirmedPassword] = useToggle();
  const [otp, setOtp] = React.useState("");
  const [digits, setDigits] = React.useState(10);
  const registerError = useSelector((state) => state.auth?.errors.register);
  const places = useSelector((state) => state.app.places);
  const [subPlaces, subPlacesRequest] = useFetch("general/get-places");

  const schema = React.useMemo(() => {
    return yup
      .object({
        name: yup
          .string(language.thisFieldIsRequired)
          .required(language.thisFieldIsRequired),
        password: yup
          .string(language.thisFieldIsRequired)
          .required(language.thisFieldIsRequired),
        phone: yup
          .string(language.thisFieldIsRequired)
          .matches(phoneRegExp, language.phoneIsNotValid)
          .required(language.thisFieldIsRequired),
        password_confirmation: yup
          .string(language.thisFieldIsRequired)
          .required(language.thisFieldIsRequired),
      })
      .required();
  }, [language]);

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    setError,
    control,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(userRegister(data));
  };

  const otpHandler = (data) => {
    setOtp(data);
    if (data.length === 4) {
      dispatch(
        loginWithOtp({
          credentials: { identifier: getValues("phone"), login_otp: data },
        })
      );
    }
  };

  React.useEffect(() => {
    if (registerError?.errors) {
      Object.keys(registerError?.errors).forEach((error) => {
        setError(error, { message: registerError?.errors[error][0] });
      });
    }
  }, [registerError, setError]);

  React.useEffect(() => {
    subPlacesRequest(null, `?parent_id=${places[0]?.id}`);
    setDigits(places[0]?.digits);
  }, [places, subPlacesRequest]);

  return (
    <div className="page-container">
      <section id="Register">
        <Container>
          <Row className="justify-content-center">
            <Col xl={6} lg={8} md={10} sm={12} xs={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row className="register--container py-5 bg-info rounded-3 text-white px-4">
                  <Col
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="text-center"
                  >
                    {registerError && !registerError.errors && (
                      <Alert>{registerError.message}</Alert>
                    )}
                  </Col>
                  {registerError?.status === -1 || otp !== "" ? (
                    <Col xs={12}>
                      <Otp onChange={otpHandler} />
                    </Col>
                  ) : (
                    <>
                      <Col
                        xl={6}
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        className="mb-3"
                      >
                        <Form.Group
                          className=""
                          controlId="register-form-username"
                        >
                          <Form.Label>{language.username}</Form.Label>
                          <Form.Control
                            placeholder={language.username}
                            className={`login--showPassword h7 ${
                              errors?.name ? "border-danger" : ""
                            }`}
                            {...register("name")}
                          />
                          <div className="text-danger">
                            <p>{errors?.name?.message} </p>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col
                        xl={6}
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        className="mb-3"
                      >
                        <Form.Group
                          className=""
                          controlId="register-form-phone"
                        >
                          <Form.Label>{language.phone}</Form.Label>
                          <Form.Control
                            className={`login--showPassword h7 ${
                              errors?.phone ? "border-danger" : ""
                            }`}
                            placeholder={language.phone}
                            {...register("phone")}
                            maxlength={digits}
                            type="tel"
                          />
                          <div className="text-danger">
                            <p>{errors?.phone?.message}</p>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col
                        xl={6}
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        className="mb-3"
                      >
                        <Form.Group
                          className=""
                          controlId="register-form-password"
                        >
                          <Form.Label>{language.password}</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type={show ? "text" : "password"}
                              placeholder={language.password}
                              className={`login--showPassword h7 ${
                                errors?.password ? "border-danger" : ""
                              }`}
                              {...register("password")}
                            />
                            <PasswordShow show={show} setShow={setShow} />
                          </InputGroup>
                          <div className="text-danger">
                            <p>{errors?.password?.message}</p>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col
                        xl={6}
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        className="mb-3"
                      >
                        <Form.Group
                          className=""
                          controlId="register-form-confirmPassword"
                        >
                          <Form.Label>{language.confirmPassword}</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type={showConfirmedPassword ? "text" : "password"}
                              placeholder={language.confirmPassword}
                              className={`login--showPassword h7 ${
                                errors?.password_confirmation
                                  ? "border-danger"
                                  : ""
                              }`}
                              {...register("password_confirmation")}
                            />
                            <PasswordShow
                              show={showConfirmedPassword}
                              setShow={setShowConfirmedPassword}
                            />
                          </InputGroup>
                          {errors?.password_confirmation?.message && (
                            <div className="text-danger">
                              <p>{errors.password_confirmation.message}</p>
                            </div>
                          )}
                          <div className="text-danger">
                            <p>
                              {getValues("password_confirmation") !==
                                getValues("password") && language.PasswordMatch}
                            </p>
                          </div>
                        </Form.Group>
                      </Col>
                      {places.length > 0 && (
                        <Col
                          md={6}
                          xs={12}
                          className={`mt-1 ${
                            places.length === 1 ? "d-none" : ""
                          }`}
                        >
                          <Form.Group
                            className="mb-2 p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0 userBranch--label"
                            controlId="formBasicCountry"
                          >
                            <Form.Label>{language.country}</Form.Label>
                            <Controller
                              name="place_id"
                              control={control}
                              defaultValue={places[0]?.id}
                              render={({ field }) => (
                                <Form.Select
                                  {...field}
                                  aria-label=""
                                  className={`userBranch--input ${
                                    errors && errors.place_id && "border-danger"
                                  }`}
                                  onChange={(event) => {
                                    field.onChange(event);
                                    subPlacesRequest(
                                      null,
                                      `?parent_id=${event.target.value}`
                                    );

                                    setDigits(
                                      places.filter(
                                        (place) =>
                                          place.id == event.target.value
                                      )[0]?.digits
                                    );
                                  }}
                                >
                                  {places.map((x, index) => (
                                    <option key={index} value={x.id}>
                                      {x.name}
                                    </option>
                                  ))}
                                </Form.Select>
                              )}
                            />

                            <div className="text-danger">
                              <p>{errors?.place_id?.message}</p>
                            </div>
                          </Form.Group>
                        </Col>
                      )}

                      {!subPlaces?.loading &&
                        subPlaces?.result?.data?.length > 0 && (
                          <Col xl={6} lg={6} md={6} xs={12}>
                            <Form.Group
                              className="mb-2 p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0 userBranch--label"
                              controlId="formBasicPlace"
                            >
                              <Form.Label>{language.place}</Form.Label>
                              <Form.Select
                                aria-label=""
                                className={`userBranch--input ${
                                  errors &&
                                  errors.sub_place_id &&
                                  "border-danger"
                                }`}
                                {...register("sub_place_id")}
                              >
                                {subPlaces?.result?.data?.map((x, index) => (
                                  <option key={index} value={x.id}>
                                    {x.name}
                                  </option>
                                ))}
                              </Form.Select>
                              <div className="text-danger">
                                <p>{errors?.place_id?.message}</p>
                              </div>
                            </Form.Group>
                          </Col>
                        )}

                      <Col xs={12} className="mb-3 mx-auto text-center">
                        <Button
                          variant="outline-secondary"
                          type="submit"
                          className="w-50 text-white"
                        >
                          {language.register}
                        </Button>
                      </Col>
                      <Col
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="text-center"
                      >
                        <Form.Group controlId="register-form-formBasicCheckbox">
                          <span>{language.haveAcount}</span>
                          <a href="/login" className="register--signin">
                            {language.signIn}
                          </a>
                        </Form.Group>
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
