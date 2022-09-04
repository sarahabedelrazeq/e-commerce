import React from "react";
import {
  Col,
  Row,
  Form,
  ToggleButton,
  Button,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useFetch, useLanguage, useToggle } from "hooks";
import { useSelector } from "react-redux";
import onSuccess from "helpers/onSucces";
import { Oval } from "react-loader-spinner";

export default function AddBalance() {
  const language = useLanguage();
  const { walletTypes } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.auth);
  const [balanceType, setBalanceType] = React.useState(1);
  const [photoURL, setPhotoURL] = React.useState("");
  const [fileKey, setFileKey] = React.useState(1);
  const [errors, setErrors] = React.useState(null);
  const [walletType, setWalletType] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const fileRef = React.useRef("");
  const [loading, setLoading] = useToggle();

  const [photoUploadResponse, photoUploadRequest] = useFetch(
    `general/upload-file`,
    "POST"
  );
  const [_, chargeRequest] = useFetch(`user/charge-request`, "POST");

  const handleChooseBalanceType = (e) => {
    resetChoices();
    if (walletTypes) setWalletType(walletTypes[0]?.id);
    setBalanceType(Number(e.target.value));
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    var formData = new FormData();
    formData.append("file", e.target.files[0]);

    photoUploadRequest(formData, null, (data, title) =>
      setPhotoURL(data?.data)
    );
  };

  React.useEffect(() => {
    if (walletTypes) setWalletType(walletTypes[0]?.id);
  }, [walletTypes]);

  const resetChoices = () => {
    setAmount("");
    setNotes("");
    setPhotoURL(null);
    setErrors(null);
    setWalletType("");
    setFileKey((fileKey) => fileKey + 1);
    if (fileRef?.current?.files) fileRef.current.files = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    setLoading();
    chargeRequest(
      {
        user_type: balanceType,
        amount: amount,
        notes: notes,
        photo: photoURL,
        ...(walletType && { type_of_wallet_id: walletType }),
      },
      null,
      (_, title) =>
        onSuccess({
          _,
          title,
          after: () => {
            setLoading();
            resetChoices();
          },
        }),
      (error) => {
        setErrors(error.errors);
        setLoading();
      }
    );
    setErrors(newErrors);
  };

  return (
    <div id="AddBalance">
      {loading && (
        <div className="vh-100 vw-100 position-fixed d-flex align-items-center justify-content-center top-0 left-0 right-0 bottom-0 overlay">
          <Oval color="#ffee00" height={80} width={80} />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-4">
            <Row>
              <Col xl={4} lg={4} md={5} sm={12} xs={12}>
                <h5 className="text-light6">{language.orderBalance}</h5>
              </Col>
              {user?.role === "agent" && (
                <Col xl={8} lg={8} md={7} sm={12} xs={12}>
                  <ToggleButtonGroup
                    name="balanceTypeGroup"
                    type="radio"
                    defaultValue={balanceType}
                    value={balanceType}
                  >
                    <ToggleButton
                      variant={"outline-primary"}
                      type="radio"
                      id={`radio-1`}
                      className="rounded-2 mx-2"
                      value={2}
                      onChange={handleChooseBalanceType}
                    >
                      {language.admin}
                    </ToggleButton>

                    <ToggleButton
                      variant={"outline-primary"}
                      type="radio"
                      id={`radio-2`}
                      className="rounded-2 mx-2"
                      value={1}
                      onChange={handleChooseBalanceType}
                    >
                      {language.agent}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Col>
              )}
            </Row>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-4">
            <Form.Group className="p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0 ">
              <Form.Label>{language.amount}</Form.Label>
              <Form.Control
                key={balanceType}
                type="number"
                min="0.5"
                step="0.5"
                placeholder="0"
                className={`${errors && errors.amount ? "border-danger" : ""}`}
                onChange={(e) => setAmount(e?.target?.value)}
                value={amount}
              />
              <p className="text-danger">{errors?.amount}</p>
            </Form.Group>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-4">
            <Form.Group className="p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0">
              <Form.Label>{language.uploadTransaction}</Form.Label>
              <Form.Control
                key={`${balanceType} - ${fileKey}`}
                type="file"
                onChange={onSelectFile}
                className={`${
                  errors && errors.photoURL ? "border-danger" : ""
                }`}
                ref={fileRef}
              />
              <p className="text-danger">{errors?.photoURL}</p>
            </Form.Group>
          </Col>
          {(balanceType === 2 || user?.role === "user") && (
            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mb-4">
              <Form.Group className="p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0 ">
                <Form.Label>{language.transferType}</Form.Label>
                <Form.Select
                  key={balanceType}
                  className={`${
                    errors && errors.type_of_wallet_id ? "border-danger" : ""
                  }`}
                  onChange={(e) => setWalletType(e?.target?.value)}
                  value={walletType}
                >
                  <option value={0} disabled>
                    {language.picTransferType}
                  </option>
                  {walletTypes.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
                <p className="text-danger">{errors?.type_of_wallet_id}</p>
              </Form.Group>
            </Col>
          )}
          <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-4">
            <h5 className="text-light6">{language.notes}</h5>
            <Form.Control
              key={balanceType}
              className={`${errors && errors.notes ? "border-danger" : ""}`}
              as="textarea"
              onChange={(e) => setNotes(e?.target?.value)}
              value={notes}
            />
            <p className="text-danger">{errors?.notes}</p>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-4">
            <Button type="submit" className="px-4 px-lg-5">
              {language.send}
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}
