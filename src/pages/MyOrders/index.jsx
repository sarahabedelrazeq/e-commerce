import React from "react";
import { Icons, PaginationSection, Skeleton, TableOrders } from "components";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Image,
  Collapse,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFetch, useLanguage, usePagination } from "hooks";
import qs from "qs";
import { useSelector } from "react-redux";

/* My Orders - page  */
const MyOrders = () => {
  const todayDate = new Date();
  const language = useLanguage();
  const { page, handleSetPage } = usePagination();
  const [searchUser, setSearchUser] = React.useState(0);
  const [searchBranch, setSearchBranch] = React.useState(0);
  const [searchType, setSearchType] = React.useState(0);
  const [searchStatus, setSearchStatus] = React.useState(0);
  const [searchFromDate, setSearchFromDate] = React.useState(todayDate);
  const [searchToDate, setSearchToDate] = React.useState(todayDate);
  const user = useSelector(({ auth }) => auth.user);
  const [open, setOpen] = React.useState(false);

  const orderType = React.useMemo(() => {
    return [
      { id: 0, name: language.AllOrders },
      { id: 1, name: language.ChargeCards },
      { id: 2, name: language.ProvideBalance },
      { id: 3, name: language.DirectCharging },
    ];
  }, [language]);
  const orderStatus = React.useMemo(() => {
    return [
      { id: 1, name: language.allStatuses, status: 0 },
      { id: 1, name: language.cancelled, status: -2 },
      { id: 2, name: language.pending, status: 1 },
      { id: 3, name: language.underProcess, status: 2 },
      { id: 4, name: language.completed, status: 3 },
    ];
  }, [language]);

  const [branchesResponse, branchesRequest] = useFetch(
    `agent/get-branches`,
    "GET"
  );

  const [usersResponse, usersRequest] = useFetch(
    `agent/get-branches-users`,
    "GET"
  );

  const [myOrdersResponse, myOrdersRequest] = useFetch(
    `agent/my-orders`,
    "GET"
  );

  const handleGetData = React.useCallback(() => {
    if (user?.role) {
      let params = {
        type: 2,
        date_from: searchFromDate.toISOString().split("T")[0],
        date_to: searchToDate.toISOString().split("T")[0],
        branch_id: searchBranch,
        user_id: user?.role === "agent" ? searchUser : user.id,
        order_type: searchType,
        order_status: searchStatus,
        page: page,
      };

      if (searchUser) params = { ...params, user_id: searchUser };

      params = qs.stringify(params);
      myOrdersRequest(null, `?${params}`);
    }
  }, [
    myOrdersRequest,
    page,
    searchBranch,
    searchUser,
    searchToDate,
    searchFromDate,
    searchType,
    searchStatus,
    user,
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    handleSetPage(1);
    handleGetData();
  };

  React.useEffect(() => {
    if (user?.role === "agent") {
      branchesRequest();
    }
  }, [branchesRequest]);

  React.useEffect(() => {
    if (user?.role === "agent") {
      if (searchBranch) usersRequest(null, `?branch_id=${searchBranch}`);
      else usersRequest();
    }
  }, [usersRequest, searchBranch]);

  React.useEffect(() => {
    handleGetData();
  }, [page]);

  return (
    <div id="MyOrders" className="page-container position-relative">
      <section>
        <Container>
          <Row>
            <Col xs={12} className="mb-5">
              <div className="rounded-4 align-items-center">
                <div className="d-flex gap-4 align-items-center border-bottom border-2 pb-4">
                  <div>
                    <Image src={`/orders.png`} className="rounded-4" />
                  </div>

                  <div>
                    <h1 className="Category--heroImage-title">
                      {language.myOrders}
                    </h1>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={12} className="mb-5">
              {branchesResponse.loading ? (
                <div className="justify-content-start mt-2 pt-4 mb-2 align-items-center">
                  <Skeleton count={1} width="100%" height={100} />
                </div>
              ) : (
                <form onSubmit={handleSearch}>
                  <Row className="g-2 g-sm-4">
                    <Col xs={12}>
                      <h2 className="m-0">{language.theSearch}</h2>
                    </Col>
                    <Col xl={2} md={4} xs={6}>
                      <div className="bg-white input-container">
                        <Row className="align-items-center gx-1 gx-sm-4">
                          <Col xs={4}>
                            <span className="h6 m-0">{language.from}</span>
                          </Col>
                          <Col xs={8}>
                            <DatePicker
                              selected={searchFromDate}
                              className="w-100 border-0 bg-transparent p-0 h6 m-0"
                              onChange={(date) => setSearchFromDate(date)}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col xl={2} md={4} xs={6}>
                      <div className="bg-white input-container">
                        <Row className="align-items-center gx-1 gx-sm-4">
                          <Col xs={4}>
                            <span className="h6 m-0">{language.to}</span>
                          </Col>
                          <Col xs={8}>
                            <DatePicker
                              selected={
                                searchToDate >= searchFromDate
                                  ? searchToDate
                                  : searchFromDate
                              }
                              className="w-100 border-0 bg-transparent p-0  h6 m-0"
                              onChange={(date) => setSearchToDate(date)}
                              minDate={searchFromDate}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    {user?.role === "agent" && (
                      <>
                        <Col xl={2} md={4} xs={6} className="d-none d-sm-block">
                          <Form.Select
                            onChange={(e) =>
                              setSearchBranch(Number(e.target.value))
                            }
                            value={searchBranch || ""}
                            className="h6 m-0"
                          >
                            <option value={0}>{language.allBranches}</option>
                            {branchesResponse.result.data &&
                              branchesResponse.result.data.map(
                                (item, index) => (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                )
                              )}
                          </Form.Select>
                        </Col>
                        <Col xl={2} md={4} xs={6} className="d-none d-sm-block">
                          <Form.Select
                            onChange={(e) =>
                              setSearchUser(Number(e.target.value))
                            }
                            value={searchUser || ""}
                            className="h6 m-0"
                          >
                            <option value={0}>{language.allUsers}</option>
                            {(!searchBranch ||
                              (branchesResponse?.result?.data &&
                                searchBranch ===
                                  branchesResponse?.result?.data[0].id)) && (
                              <>
                                <option value={user?.id}>{user?.name}</option>
                              </>
                            )}
                            {!usersResponse.loading &&
                              usersResponse.result.data?.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                          </Form.Select>
                        </Col>
                        <Col xl={2} md={4} xs={6} className="d-none d-sm-block">
                          <Form.Select
                            onChange={(e) =>
                              setSearchType(Number(e.target.value))
                            }
                            value={searchType || ""}
                            className="h6 m-0"
                          >
                            {orderType.map(({ id, name }, index) => (
                              <option value={id} key={index}>
                                {name}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        {searchType === 3 && (
                          <Col
                            xl={2}
                            md={4}
                            xs={6}
                            className="d-none d-sm-block"
                          >
                            <Form.Select
                              onChange={(e) =>
                                setSearchStatus(Number(e.target.value))
                              }
                              value={searchStatus || ""}
                              className="h6 m-0"
                            >
                              {orderStatus.map(
                                ({ id, name, status }, index) => (
                                  <option value={status} key={index}>
                                    {name}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </Col>
                        )}

                        <Col xs={12} className="d-sm-none">
                          <div>
                            <Button
                              onClick={() => setOpen(!open)}
                              aria-controls="example-collapse-text"
                              aria-expanded={open}
                              variant="link"
                              className="mb-2 text-secondary text-decoration-none h5"
                            >
                              {language.theAdvanceSearch}
                              <span
                                className={`down_vector px-2 ${
                                  open ? "flipY" : ""
                                }`}
                              >
                                <Icons.DropdownVector
                                  className={open ? "flipY" : ""}
                                />
                              </span>
                            </Button>
                            <Collapse in={open}>
                              <div id="example-collapse-text">
                                <Row className="g-2 g-sm-4 mb-2">
                                  <Col xs={6}>
                                    <Form.Select
                                      onChange={(e) =>
                                        setSearchBranch(Number(e.target.value))
                                      }
                                      value={searchBranch || ""}
                                      className="h6 m-0"
                                    >
                                      <option value={0}>
                                        {language.allBranches}
                                      </option>
                                      {branchesResponse.result.data &&
                                        branchesResponse.result.data.map(
                                          (item, index) => (
                                            <option key={index} value={item.id}>
                                              {item.name}
                                            </option>
                                          )
                                        )}
                                    </Form.Select>
                                  </Col>
                                  <Col xs={6}>
                                    <Form.Select
                                      onChange={(e) =>
                                        setSearchUser(Number(e.target.value))
                                      }
                                      value={searchUser || ""}
                                      className="h6 m-0"
                                    >
                                      <option value={0}>
                                        {language.allUsers}
                                      </option>
                                      {(!searchBranch ||
                                        (branchesResponse?.result?.data &&
                                          searchBranch ===
                                            branchesResponse?.result?.data[0]
                                              .id)) && (
                                        <>
                                          <option value={user?.id}>
                                            {user?.name}
                                          </option>
                                        </>
                                      )}
                                      {!usersResponse.loading &&
                                        usersResponse.result.data?.map(
                                          (item, index) => (
                                            <option key={index} value={item.id}>
                                              {item.name}
                                            </option>
                                          )
                                        )}
                                    </Form.Select>
                                  </Col>
                                  <Col xs={6}>
                                    <Form.Select
                                      onChange={(e) =>
                                        setSearchType(Number(e.target.value))
                                      }
                                      value={searchType || ""}
                                      className="h6 m-0"
                                    >
                                      {orderType.map(({ id, name }, index) => (
                                        <option value={id} key={index}>
                                          {name}
                                        </option>
                                      ))}
                                    </Form.Select>
                                  </Col>
                                  {searchType === 3 && (
                                    <Col xs={6}>
                                      <Form.Select
                                        onChange={(e) =>
                                          setSearchStatus(
                                            Number(e.target.value)
                                          )
                                        }
                                        value={searchStatus || ""}
                                        className="h6 m-0"
                                      >
                                        {orderStatus.map(
                                          ({ id, name, status }, index) => (
                                            <option value={status} key={index}>
                                              {name}
                                            </option>
                                          )
                                        )}
                                      </Form.Select>
                                    </Col>
                                  )}
                                </Row>
                              </div>
                            </Collapse>
                          </div>
                        </Col>
                      </>
                    )}
                    <Col xl={2} md={4} xs={6}>
                      {/* <div className="w-100 d-flex justify-content-center position-fixed bottom-0 right-0 left-0 px-3 d-sm-none">
                        <Button className="w-100 btn btn-primary h5" type="submit">
                          {language.search}
                        </Button>
                      </div> */}
                      <div >
                        <Button className="w-100 btn btn-primary h5" type="submit">
                          {language.search}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </form>
              )}
            </Col>

            <Col xs={12} className="mb-5">
              {myOrdersResponse.loading ? (
                <Row>
                  <Col
                    xl={12}
                    lg={12}
                    md={12}
                    xs={12}
                    className="justify-content-start align-items-center"
                  >
                    <Skeleton count={1} width="100%" height={500} />
                  </Col>
                </Row>
              ) : (
                <TableOrders DataContent={myOrdersResponse.result.data} />
              )}
            </Col>

            <Col xs={12} className="mb-5">
              {!myOrdersResponse.loading && myOrdersResponse.result.data && (
                <PaginationSection
                  count={myOrdersResponse.result.meta.total}
                  perPage={myOrdersResponse.result.meta.per_page}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default MyOrders;
