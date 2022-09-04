import React from "react";
import {
  Col,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import { useFetch, useLanguage } from "hooks";
import { useSelector } from "react-redux";
import { ProfileLayout } from "components/layouts";
import onSuccess from "helpers/onSucces";
import { useNavigate } from "react-router";

/* Add new branch - page  */
export default function BranchCreate() {
  const language = useLanguage();
  const places = useSelector((state) => state.app.places);
  const name = React.useRef(null);
  const place_id = React.useRef(null);
  const sub_place_id = React.useRef(null);
  const address = React.useRef(null);
  const [_, addBranchRequest] = useFetch("agent/add-branch", "POST");
  const [subPlaces, subPlacesRequest] = useFetch("general/get-places");
  const [errors, setErrors] = React.useState(null);
  const navigate = useNavigate();


  React.useEffect(() => {
    if (place_id.current) place_id.current.value = places[0]?.id;
  }, [places]);

  React.useEffect(() => {
    if (place_id.current?.value)
      subPlacesRequest(null, `?parent_id=${place_id.current?.value}`);
  }, [place_id, subPlacesRequest]);

  const handleSave = () => {
    addBranchRequest(
      {
        name: name.current.value,
        place_id: sub_place_id.current.value,
        address: address.current.value,
      },
      null,
      (_, title) => onSuccess({ title , after: () => navigate(-1)}),
      (error) => setErrors(error.errors)
    );
  };
  return (
    <ProfileLayout id="userBranch-page">
      <Row id="userBranch">
        <Col xl={12} lg={12} md={12} xs={12} className="mb-4 mb-md-5">
          <h2 className="userBranch--title">{language.addNewBranch}</h2>
        </Col>
        {/* Input New Branch - title */}
        <Col xl={6} lg={6} md={6} xs={12} className="mt-1">
          <Form.Group
            className="p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0 userBranch--label"
            controlId="formBasicUsername"
          >
            <Form.Label>{language.branchName}</Form.Label>
            <Form.Control
              type="text"
              placeholder={language.branchName}
              className={`h7 userBranch--input ${
                errors && errors.name && "border-danger"
              }`}
              ref={name}
            />
            <p className="text-danger"> {errors && errors.name} </p>
          </Form.Group>
        </Col>
        {/* Input New Branch - phone */}
        <Col
          xl={6}
          lg={6}
          md={6}
          xs={12}
          className={`mt-1 ${places.length === 1 ? "d-none" : ""}`}
        >
          <Form.Group
            className="mb-2 p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0 userBranch--label"
            controlId="formBasicPhoneNumber"
          >
            <Form.Label>{language.country}</Form.Label>
            <Form.Select
              aria-label=""
              className={`userBranch--input ${
                errors && errors.place_id && "border-danger"
              }`}
              ref={place_id}
            >
              {places.map((x, index) => (
                <option key={index} value={x.id}>
                  {x.name}
                </option>
              ))}
            </Form.Select>
            <p className="text-danger"> {errors && errors.place_id} </p>
          </Form.Group>
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          xs={12}
          className={`mt-1 ${
            subPlaces?.result?.data?.length === 1 ? "d-none" : ""
          }`}
        >
          <Form.Group
            className="mb-2 p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0 userBranch--label"
            controlId="formBasicPlace"
          >
            <Form.Label>{language.place}</Form.Label>
            <Form.Select
              aria-label=""
              className={`userBranch--input ${
                errors && errors.sub_place_id && "border-danger"
              }`}
              ref={sub_place_id}
            >
              {subPlaces?.result?.data?.map((x, index) => (
                <option key={index} value={x.id}>
                  {x.name}
                </option>
              ))}
            </Form.Select>
            <p className="text-danger"> {errors && errors.place_id} </p>
          </Form.Group>
        </Col>

        {/* Input New Branch - address */}
        <Col xl={12} lg={12} md={12} xs={12} className="mt-1">
          <Form.Group
            className="mb-2  p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0 userBranch--label"
            controlId="formBasicAddress"
          >
            <Form.Label>{language.branchAddress}</Form.Label>
            <Form.Control
              ref={address}
              type="text"
              placeholder={language.branchAddress}
              className={`h7 userBranch--input ${
                errors && errors.address && "border-danger"
              }`}
            />
            <p className="text-danger"> {errors && errors.address} </p>
          </Form.Group>
        </Col>
        {/* Input New Branch - save button */}
        <Col
          xl={12}
          lg={12}
          md={12}
          xs={12}
          className="mt-1 text-end text-sm-cetner text-xs-cetner"
        >
          <Button
            className="userBranch--btn"
            variant="primary"
            type="submit"
            onClick={handleSave}
          >
            {language.save}
          </Button>
        </Col>
      </Row>
    </ProfileLayout>
  );
}
