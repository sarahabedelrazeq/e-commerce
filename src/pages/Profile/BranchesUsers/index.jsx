import React from "react";
import { Col, Row, Image, Button } from "react-bootstrap";
import { Skeleton, NoData } from "components";
import { useFetch, useLanguage } from "hooks";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { ProfileLayout } from "components/layouts";
import onSuccess from "helpers/onSucces";

/* Branches and Users - page  */
export default function BranchesUsers() {
  const language = useLanguage();
  const [branchesUsersResponse, branchesUsersRequest] = useFetch(
    "agent/get-branches-users"
  );
  const [branchesResponse, branchesRequest] = useFetch("agent/get-branches");
  const [deleteBranch, deleteBranchRequest] = useFetch(
    "agent/delete-branch",
    "POST"
  );
  const [deleteUser, deleteUserRequest] = useFetch(
    "agent/delete-branch-user",
    "POST"
  );
  const [errors, setErrors] = React.useState(null);

  React.useEffect(() => {
    branchesUsersRequest();
    branchesRequest();
  }, [branchesUsersRequest, branchesRequest]);

  const onDeleteBranch = (id) => {
    Swal.fire({
      title: language.deleteConfirmMessage,
      showCancelButton: true,
      confirmButtonText: language.yes,
      cancelButtonText: language.cancel,
      confirmButtonColor: "#0063f7",
      cancelButtonColor: "#900",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBranchRequest(
          {
            branch_id: id,
          },
          null,
          (_, title) =>
            onSuccess({
              title,
              after: () => {
                branchesRequest();
                branchesUsersRequest();
              },
            }),
          setErrors
        );
      }
    });
  };

  const onDeleteUser = (id) => {
    Swal.fire({
      title: language.deleteConfirmMessage,
      showCancelButton: true,
      confirmButtonText: language.yes,
      cancelButtonText: language.cancel,
      confirmButtonColor: "#0063f7",
      cancelButtonColor: "#900",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserRequest(
          {
            user_id: id,
          },
          null,
          (_, title) =>
            onSuccess({
              title,
              after: () => {
                branchesRequest();
                branchesUsersRequest();
              },
            }),
          setErrors
        );
      }
    });
  };

  return (
    <ProfileLayout id="branches-users-page">
      <Row id="branchesUsers" className="mx-0 p-md-0">
        <Col xl={12} lg={12} md={12} xs={12}>
          <h3 className="mb-4 mb-lg-5">{language.branchesAndUsers}</h3>
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          className="p-md-0 mb-4 mb-md-0"
        >
          <div className="rounded-4 border border-light5 branchesUsers--box branchesUsers--box-right">
            <Row className="p-3 p-md-4">
              <Col xl={12} lg={12} md={12} xs={12} className="mb-4 mb-lg-5">
                <h4>{language.branches}</h4>
              </Col>

              <Col xl={12} lg={12} md={12} xs={12} className="content">
                {branchesResponse.loading ? (
                  <Row>
                    <Col xl={12} lg={12} md={12} xs={12}>
                      <Skeleton count={4} width="100%" height={100} />
                    </Col>
                  </Row>
                ) : branchesResponse.result.data?.length !== 0 ? (
                  branchesResponse.result.data?.map((items, index) => (
                    <div className="bg-light rounded-3 mb-3 py-3" key={index}>
                      <Row className="m-0">
                        <Col xl={10} lg={10} md={10} xs={10}>
                          {/* Branches title */}
                          <h6>{items.agent_name}</h6>
                        </Col>
                        <Col xl={2} lg={2} md={2} xs={2}>
                          {/* delete icon */}
                          {items.id !== 1 && (
                            <Image
                              role="button"
                              onClick={() => onDeleteBranch(items.id)}
                              src="/images/BranchesAndUSers/trash.svg"
                            />
                          )}
                        </Col>

                        <Col xl={10} lg={10} md={10} xs={10}>
                          <p className="text-light4 mb-0">{`${items.address}`}</p>
                        </Col>

                        <Col xl={2} lg={2} md={2} xs={2}>
                          {items.id !== 1 && (
                            <Link to={`/edit-branch/${items.id}`}>
                              {/* delete icon */}
                              <Image src="/images/BranchesAndUSers/setting.svg" />
                            </Link>
                          )}
                        </Col>
                      </Row>
                    </div>
                  ))
                ) : (
                  <NoData />
                )}
              </Col>

              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="add-button text-center"
              >
                <Link to="/add-new-branch">
                  <Button className="branchesUsers--inner-btn w-75">
                    {language.addNewBranch}
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          className="p-md-0 mb-4 mb-md-0"
        >
          <div className="rounded-4 border border-light5  branchesUsers--box branchesUsers--box-left">
            <Row className="p-3 p-md-4">
              <Col xl={12} lg={12} md={12} xs={12} className="mb-4 mb-lg-5">
                <h4>{language.users}</h4>
              </Col>
              <Col xl={12} lg={12} md={12} xs={12} className="content">
                {branchesUsersResponse.loading ? (
                  <Row>
                    <Col
                      xl={12}
                      lg={12}
                      md={12}
                      xs={12}
                      className="justify-content-start align-items-center"
                    >
                      <Skeleton
                        count={4}
                        width="100%"
                        height={100}
                        // className="mb-4"
                      />
                    </Col>
                  </Row>
                ) : branchesUsersResponse.result.data?.length !== 0 ? (
                  branchesUsersResponse.result.data?.map((items, index) => (
                    <div className="bg-light rounded-3 mb-3 py-3" key={index}>
                      <Row className="m-0">
                        <Col xl={10} lg={10} md={10} xs={10}>
                          {/* Branches title */}
                          <h6>{items.name}</h6>
                        </Col>
                        <Col xl={2} lg={2} md={2} xs={2}>
                          {/* delete icon */}
                          <Image
                            role="button"
                            onClick={() => onDeleteUser(items.id)}
                            src="/images/BranchesAndUSers/trash.svg"
                          />
                        </Col>

                        <Col xl={10} lg={10} md={10} xs={10}>
                          {/* Branches name */}
                          <p className="text-light4 mb-0">
                            {`${items?.agent?.agent_name}`} /{" "}
                            {`${items?.place_parent?.name} ${items?.place?.name}`}
                          </p>
                          <p className="text-light4 mb-0"></p>
                        </Col>
                        <Col xl={2} lg={2} md={2} xs={2}>
                          <Link to={`/edit-user/${items.id}`}>
                            {/* delete icon */}
                            <Image src="/images/BranchesAndUSers/setting.svg" />
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  ))
                ) : (
                  <NoData />
                )}
              </Col>

              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="add-button text-center"
              >
                <Link to="/add-new-user">
                  <Button className="w-75">{language.addNewUser}</Button>
                </Link>
              </Col>
              {/* Branches and Users sections - branches_section - {end} */}
            </Row>
          </div>
        </Col>
      </Row>
    </ProfileLayout>
  );
}
