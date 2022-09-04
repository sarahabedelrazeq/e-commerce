import React from "react";
import { Col, Row, Form, Image, Button } from "react-bootstrap";
import { TableLoyaltyPoints } from "components";
import { useFetch, useLanguage, usePagination, useToggle } from "hooks";
import Swal from "sweetalert2";
import { ProfileLayout } from "components/layouts";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "store/user";
import onSuccess from "helpers/onSucces";
import { checkLogin } from "store/auth";

export default function LoyaltyPoints() {
  const language = useLanguage();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { page } = usePagination();
  const [loading, setLoading] = useToggle();
  const [itemResponse, itemRequest] = useFetch("agent/get-my-loyalty-point");
  const [_, transferRequest] = useFetch("user/add-balance-transfer", "POST");

  React.useEffect(() => {
    itemRequest(null, `?page=${page}`);
  }, [itemRequest, page]);

  const transfer = () => {
    Swal.fire({
      title: language.loyaltyConfirmMessage,
      showCancelButton: true,
      confirmButtonText: language.yes,
      cancelButtonText: language.cancel,
      confirmButtonColor: "#0063f7",
      cancelButtonColor: "#900",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading();
        transferRequest(
          { loyalty_points: user?.agent?.loyalty_points },
          null,
          (_, title) =>
            onSuccess({
              title,
              after: () => {
                itemRequest(null, `?page=${page}`);
                dispatch(checkLogin());
                dispatch(addNotification());
                setLoading();

              },
              before: () => {
              },
            }),
          onError
        );

      }
    });
  };

  const onError = (x) => {
    setLoading();

    Swal.fire({
      icon: "error",
      title: x.message,
      showConfirmButton: true,
      timer: 1500,
    });
  };

  return (
    <ProfileLayout id="loyalty-points-page">
      {loading && (
        <div className="vh-100 vw-100 position-fixed d-flex align-items-center justify-content-center top-0 left-0 right-0 bottom-0 overlay">
          <Oval color="#ffee00" height={80} width={80} />
        </div>
      )}

      <Row id="loyaltyPoints" className="loyaltyPoints--box-padd">
        <Col xl={12} lg={12} md={12} xs={12} className="mb-4 mb-md-5">
          <h3 className="fw-bold">{language.loyaltyPoints} </h3>
        </Col>
        <Col xl={12} lg={12} md={12} xs={12}>
          <Row className="align-items-center">
            <Col xl={3} lg={3} md={4} xs={4}>
              <h4 className="pt-1 fw-bold">{language.pointsBalance}</h4>
            </Col>
            <Col xl={3} lg={4} md={4} xs={8}>
              <div className="d-flex ">
                <Form.Control
                  type="number"
                  placeholder={user?.agent?.loyalty_points}
                  className={`${
                    itemResponse?.result?.data?.length !== 0 &&
                    "loyaltyPoints--section-inputField"
                  } h7 h2 mb-0 px-2 py-0 bg-white fw-bold`}
                  disabled
                />
                <Button
                  type="submit"
                  className={`loyaltyPoints--section-btn ${
                    itemResponse?.result?.data?.length === 0 && "d-none"
                  }`}
                  onClick={transfer}
                >
                  <Image className="w-100" src="/images/LoyaltyPoints/arrange-square.svg" />
                </Button>
              </div>
            </Col>
          </Row>
        </Col>

        <Col xl={12} lg={12} md={12} xs={12}>
          <TableLoyaltyPoints
            data={itemResponse?.result?.data}
            loading={itemResponse?.loading}
            total={itemResponse?.result?.meta?.total}
            per_page={itemResponse?.result?.meta?.per_page}
          />
        </Col>
      </Row>
    </ProfileLayout>
  );
}
