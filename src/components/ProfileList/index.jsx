import React from "react";
import { Col, Row, Image, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "hooks";
import { Icons } from "components";
import { useSelector } from "react-redux";

export default function ProfileList() {
  const language = useLanguage();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div id="ProfileList" className="d-none d-lg-block h-100">
      <div className="bg-white rounded-3 h-100">
        <Row>
          <Col xs={12}>
            <div className="bg-light2 p-lg-4 p-xl-5 rounded-3-top">
              <Row className="align-items-center">
                <Col xs={4} className="text-center">
                  {/* user profile image */}
                  <Image src="/images/user-image.png" className="mw-100" />
                </Col>
                <Col xs={8} className="text-center">
                  {/* username */}
                  <h2>{(isLoggedIn && user.name) || "Username"}</h2>
                </Col>
              </Row>
            </div>
          </Col>
          {user?.agent ? (
            <Col xs={12}>
              <div className="p-lg-4 p-xl-5 bg-light">
                <Row>
                  {user?.role === "agent" ? (
                    <Col>
                      <div className="d-flex">
                        <Link to="/wallet" className="w-25">
                          <Button
                            variant="primary"
                            type="submit"
                            className="profileList--section-btn h-100 w-100"
                          >
                            <Image src="/images/UserProfile/add-square.png" />
                          </Button>
                        </Link>
                        <div className="profileList--balance-field border bg-white w-75 d-flex align-items-center justify-content-center">
                          <p className="h4 mb-0 font fw-bold">
                            {(isLoggedIn &&
                              parseFloat(user?.agent?.balance).toFixed(2)) ||
                              "xxx"}
                            <sup className="px-lg-2 px-1">
                              {isLoggedIn && user.place_parent.currency}
                            </sup>
                          </p>
                        </div>
                      </div>
                    </Col>
                  ) : (
                    <Col>
                      <div className="d-flex">
                        <div className=" border bg-white w-100 rounded-2 d-flex align-items-center justify-content-center">
                          <p className="h4 mb-0 font fw-bold">
                            {(isLoggedIn &&
                              parseFloat(user?.agent?.balance).toFixed(2)) ||
                              "xxx"}
                            <sup className="px-lg-2 px-1">
                              {isLoggedIn && user.place_parent.currency}
                            </sup>
                          </p>
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
          ) : (
            <Col xs={12}>
              <div className="p-lg-4 p-xl-5 bg-light">
                <Row>
                    <Col>
                      <div className="d-flex">
                        <Link to="/wallet" className="w-25">
                          <Button
                            variant="primary"
                            type="submit"
                            className="profileList--section-btn h-100 w-100"
                          >
                            <Image src="/images/UserProfile/add-square.png" />
                          </Button>
                        </Link>
                        <div className="profileList--balance-field border bg-white w-75 d-flex align-items-center justify-content-center">
                          <p className="h4 mb-0 font fw-bold">
                            {(isLoggedIn &&
                              parseFloat(user?.balance).toFixed(2)) ||
                              "xxx"}
                            <sup className="px-lg-2 px-1">
                              {isLoggedIn && user.place_parent.currency}
                            </sup>
                          </p>
                        </div>
                      </div>
                    </Col>
                </Row>
              </div>
            </Col>
          )}

          <Col xs={12}>
            <div className="bg-white p-lg-4 p-xl-5 rounded-3-bottom">
              <Row>
                {user?.agent ? (
                  <Col xs={12} className="mb-2">
                    <NavLink className="dropdown-item" to="/store-profile">
                      <Row>
                        <Col xs={3}>
                          {/* profile image */}
                          <div className="text-center">
                            <Icons.UserCircle
                              width="25"
                              height="25"
                              className="mw-100 fill-light6"
                            />
                          </div>
                        </Col>
                        <Col xl={8} lg={8} md={9} xs={9}>
                          <h6 className="pt-2 text-light6">
                            {language.personalProfile}
                          </h6>
                        </Col>
                      </Row>
                    </NavLink>
                  </Col>
                ) : (
                  <Col xs={12} className="mb-2">
                    <NavLink className="dropdown-item" to="/user-profile">
                      <Row>
                        <Col xs={3}>
                          {/* profile image */}
                          <div className="text-center">
                            <Icons.UserCircle
                              width="25"
                              height="25"
                              className="mw-100 fill-light6"
                            />
                          </div>
                        </Col>
                        <Col xl={8} lg={8} md={9} xs={9}>
                          <h6 className="pt-2 text-light6">
                            {language.personalProfile}
                          </h6>
                        </Col>
                      </Row>
                    </NavLink>
                  </Col>
                )}

                {user?.role === "agent" && (
                  <Col xs={12} className="mb-2">
                    <NavLink className="dropdown-item" to="/branches-and-users">
                      <Row>
                        <Col xs={3}>
                          <div className="text-center">
                            <Icons.Branches
                              width="25"
                              height="25"
                              className="mw-100 fill-light6"
                            />
                          </div>
                        </Col>
                        <Col xs={9}>
                          <h6 className="pt-2 text-light6">
                            {language.branchesandUsers}
                          </h6>
                        </Col>
                      </Row>
                    </NavLink>
                  </Col>
                )}
                {(user?.role === "agent" || user?.role === "user") && (
                  <Col xs={12} className="mb-2">
                    <NavLink className="dropdown-item" to="/wallet">
                      <Row>
                        <Col xs={3}>
                          <div className="text-center">
                            <Icons.Wallet
                              width="25"
                              height="25"
                              className="mw-100 fill-light6"
                            />
                          </div>
                        </Col>
                        <Col xs={9}>
                          <h6 className="pt-2 text-light6">
                            {language.rechargeWallet}
                          </h6>
                        </Col>
                      </Row>
                    </NavLink>
                  </Col>
                )}
                {user?.role === "agent" && (
                  <Col xs={12} className="mb-2">
                    <NavLink className="dropdown-item" to="/loyalty-points">
                      <Row>
                        <Col xs={3}>
                          {/* profile image */}
                          <div className="text-center">
                            <Icons.Medal
                              width="25"
                              height="25"
                              className="mw-100 fill-light6"
                            />
                          </div>
                        </Col>
                        <Col xs={9}>
                          <h6 className="pt-2 text-light6">
                            {language.loyaltyPoints}
                          </h6>
                        </Col>
                      </Row>
                    </NavLink>
                  </Col>
                )}

                <Col xs={12} className="mb-2">
                  <NavLink className="dropdown-item" to="/change-password">
                    <Row>
                      <Col xs={3}>
                        <div className="text-center">
                          <Icons.PasswordChange
                            width="25"
                            height="25"
                            className="mw-100 fill-light6"
                          />
                        </div>
                      </Col>
                      <Col xs={9}>
                        <h6 className="pt-2 text-light6">
                          {language.changePassword}
                        </h6>
                      </Col>
                    </Row>
                  </NavLink>
                </Col>
                <Col xl={12} lg={12} md={12} xs={12}>
                  <NavLink className="dropdown-item" to="/wishlist">
                    <Row>
                      <Col xs={3}>
                        {/* profile image */}
                        <div className="text-center">
                          <Icons.WishlistProfile
                            width="25"
                            height="25"
                            className="mw-100 fill-light6"
                          />
                        </div>
                      </Col>
                      <Col xs={9}>
                        <h6 className="pt-2 text-light6">
                          {language.myWishlist}
                        </h6>
                      </Col>
                    </Row>
                  </NavLink>
                  <Col xl={12} lg={12} md={12} xs={12}>
                    <NavLink className="dropdown-item" to="/contact-us">
                      <Row>
                        <Col xs={3}>
                          {/* profile image */}
                          <div className="text-center">
                            <Icons.ContactUs
                              width="25"
                              height="25"
                              className="mw-100 fill-light6"
                            />
                          </div>
                        </Col>
                        <Col xs={9}>
                          <h6 className="pt-2 text-light6">
                            {language.contactUs}
                          </h6>
                        </Col>
                      </Row>
                    </NavLink>
                  </Col>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
