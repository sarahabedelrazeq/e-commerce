import React from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Navbar,
  Nav,
  Image,
  Button,
  FormControl,
  Dropdown,
  Badge,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { switchLanguage } from "../../store/app";
import { useFetch, useLanguage, useToggle } from "hooks";
import { logout } from "store/auth";
import { useNavigate } from "react-router-dom";
import { Icons, Skeleton, SideBar, Gallery } from "components";

export default function MainNavbar() {
  let navigate = useNavigate();
  const language = useLanguage();
  const [expanded, setExpanded] = React.useState(false);
  const [searchedItem, setSearchedItem] = React.useState("");
  const refForCollapseToggle = React.useRef(null);
  const { user, isLoggedIn, auth_checked } = useSelector((state) => state.auth);
  const { numberOfNotifications } = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.user.favorites.data);
  const cart = useSelector((state) => state.user.cart.data);
  const dispatch = useDispatch();
  const [show, setShow] = useToggle(false);

  const [itemResponse, itemRequest] = useFetch(
    `/user/search-item?key=${searchedItem?.toLowerCase()}`
  );

  const languageHandler = () => {
    if (language.code === "ar") {
      return dispatch(switchLanguage("en"));
    }
    dispatch(switchLanguage("ar"));
  };
  const closeCollapseToggle = () => {
    setExpanded(expanded ? false : "expanded");
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleClickOutside = (event) => {
    if (
      refForCollapseToggle.current &&
      !refForCollapseToggle.current.contains(event.target)
    ) {
      setExpanded(false);
    }
  };
  const searchSubmitHandler = (e) => {
    const searchedRef = searchedItem;
    if (searchedItem.length > 0) {
      navigate("search-results/search-item?key=" + searchedRef.toLowerCase());
    } else {
      return null;
    }
  };
  const phoneSearchSubmitHandler = (e) => {
    if (searchedItem) itemRequest(null);
  };
  const searchEnterHandler = (event) => {
    if (event.key === "Enter") {
      searchSubmitHandler();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <header className="py-4">
      <Container className="nav--container">
        <Row className="align-items-center">
          <Col
            lg={2}
            md={3}
            sm={4}
            xs={6}
            className="order-2 order-md-2 order-lg-1"
          >
            <NavLink to="/">
              <div className="py-2 d-flex w-100 gap-2 justify-content-center w-100">
                <Icons.Logo />
              </div>
            </NavLink>
          </Col>

          <Col
            lg={3}
            md={1}
            sm={4}
            xs={3}
            className="order-1 order-md-1 order-lg-1"
          >
            <Navbar expanded={expanded} expand="lg">
              <Navbar.Toggle
                onClick={closeCollapseToggle}
                className="p-0 border-0 w-100 mw-100 shadow-none "
                aria-controls="basic-navbar-nav"
                ref={refForCollapseToggle}
              />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="position-relative justify-content-center"
                data-toggle="dropdown"
              >
                <Nav className="nav--collapse-props position-absolute">
                  <NavLink
                    className="nav--links h6 fw-bold text-info mt-2 mt-xl-0 mt-lg-0 px-4 px-xl-2 px-lg-2 pt-2"
                    to="/"
                    onClick={() => setExpanded(false)}
                  >
                    {language.home}
                  </NavLink>
                  <NavLink
                    className="nav--links h6 fw-bold text-info px-4 px-xl-3 px-lg-2 pt-2"
                    to="/categories"
                    onClick={() => setExpanded(false)}
                  >
                    {language.categories}
                  </NavLink>
                  <NavLink
                    className="nav--links h6 fw-bold text-info mb-md-4 mb-xl-0 mb-lg-0 px-4 px-xl-3 px-lg-2 pt-2 pb-md-2 pb-3"
                    to="/my-orders"
                    onClick={() => setExpanded(false)}
                  >
                    {language.myOrders}
                  </NavLink>
                  <NavLink
                    className="nav--links h6 fw-bold text-info d-block d-lg-none mb-4 mb-xl-0 mb-lg-0 px-4 px-xl-0 px-lg-0"
                    to="#"
                    onClick={languageHandler}
                  >
                    {language.x_lang}
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>

          <Col
            lg={2}
            md={3}
            sm={6}
            xs={3}
            className="order-4 order-md-3 order-lg-1"
          >
            <div className="border border-1 w-100 d-flex rounded-2 bg-white d-none d-sm-block">
              <Row className="m-0 align-items-center">
                <Col sm={9} xs={12} className="p-0">
                  <FormControl
                    placeholder={language.searchLookingFor}
                    aria-label="search"
                    aria-describedby="basic-addon1"
                    value={searchedItem}
                    className="border-0 bg-transparent h9"
                    onKeyPress={(event) => searchEnterHandler(event)}
                    onChange={(event) => setSearchedItem(event.target.value)}
                  />
                </Col>
                <Col sm={3} xs={12} className="p-0">
                  <InputGroup.Text className="bg-transparent border-0 text-center p-0 d-flex justify-content-center">
                    <Button
                      variant="none"
                      size="sm"
                      className="p-0 text-center text-light3"
                      onClick={searchSubmitHandler}
                    >
                      <Icons.Search />
                    </Button>
                  </InputGroup.Text>
                </Col>
              </Row>
            </div>
            <SideBar
              icon={<Icons.Search className="mw-100 text-light6" />}
              hiddenOn="sm"
              title={language.searchLookingFor}
              show={show}
              setShow={setShow}
            >
              <Row>
                <Col xs={12} className="mb-5">
                  <div className="border border-1 w-100 rounded-2 bg-white py-2">
                    <Row className="align-items-center w-100">
                      <Col xs={10}>
                        <FormControl
                          placeholder={language.searchLookingFor}
                          aria-label="search"
                          aria-describedby="basic-addon1"
                          value={searchedItem}
                          className="border-0 bg-transparent h8"
                          onKeyPress={(event) => {
                            if (event.key === "Enter")
                              phoneSearchSubmitHandler(event);
                          }}
                          onChange={(event) =>
                            setSearchedItem(event.target.value)
                          }
                        />
                      </Col>
                      <Col xs={2}>
                        <InputGroup.Text className="bg-transparent border-0 text-center p-0 d-flex justify-content-end">
                          <Button
                            variant="none"
                            size="sm"
                            className="p-0 text-center text-light5"
                            onClick={phoneSearchSubmitHandler}
                          >
                            <Icons.Search />
                          </Button>
                        </InputGroup.Text>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col xs={12} className="searchResults--gallery pt-1">
                  {itemResponse.loading ? (
                    <Row className="d-flex justify-content-center">
                      <Col
                        xs={12}
                        className="mb-4 mb-md-5 gallery-skeleton-col"
                      >
                        <Skeleton
                          count={1}
                          width="100%"
                          height="100%"
                          className="mb-4 d-block h-100"
                        />
                        <Skeleton
                          count={1}
                          width="100%"
                          height="10px"
                          className="mt-4 d-block h-100"
                        />
                      </Col>
                    </Row>
                  ) : (
                    <>
                      <Gallery
                        data={itemResponse.result.data}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        xxl={12}
                      />
                      {itemResponse.result.data &&
                        itemResponse.result.data.length !== 0 && (
                          <div className="text-center">
                            <button
                              className="btn"
                              onClick={() => {
                                setShow();
                                searchSubmitHandler();
                              }}
                            >
                              {language.showMore}
                            </button>
                          </div>
                        )}
                    </>
                  )}
                </Col>
              </Row>
            </SideBar>
          </Col>

          <Col
            lg={2}
            md={2}
            sm={4}
            xs={3}
            className="nav--col-icons-sec order-3 order-md-3 order-lg-1"
          >
            <ul
              className={`d-flex ${
                user?.role === "user"
                  ? "justify-content-between"
                  : "justify-content-center gap-4"
              } align-items-center`}
            >
              {user?.role === "user" && (
                <li>
                  <div className="position-relative nev-icon-container">
                    {auth && cart.length > 0 && (
                      <Badge
                        className="position-absolute bg-danger rounded-circle border-light p-1"
                        dir="ltr"
                      >
                        {cart.length < 10 ? cart.length : "+9"}
                      </Badge>
                    )}

                    <NavLink to="/cart">
                      <div className="w-100">
                        <Icons.Cart />
                      </div>
                    </NavLink>
                  </div>
                </li>
              )}

              <li>
                <div className="position-relative nev-icon-container">
                  {auth && favorites.length > 0 && (
                    <Badge
                      className="position-absolute bg-danger rounded-circle border-light p-1"
                      dir="ltr"
                    >
                      {favorites.length < 10 ? favorites.length : "+9"}
                    </Badge>
                  )}

                  <NavLink to="/wishlist">
                    <div className="w-100">
                      <Icons.Wishlist />
                    </div>
                  </NavLink>
                </div>
              </li>
              <li className="d-none d-lg-block">
                <div className=" nev-icon-container">
                  <Button
                    onClick={languageHandler}
                    variant="link"
                    className="p-0 w-100 border-0 "
                  >
                    <Icons.LangLogo className="w-100" />
                  </Button>
                </div>
              </li>
            </ul>
          </Col>

          <Col
            xl={3}
            lg={3}
            md={3}
            sm={6}
            xs={9}
            className="order-5 order-md-3 order-lg-1 text-center"
          >
            {isLoggedIn && auth_checked ? (
              <Dropdown className="user-dropdown">
                <Dropdown.Toggle
                  id="dropdown-split-basic"
                  variant="none"
                  className="p-0 border-0 shadow-none w-100 px-4"
                >
                  <Row className="align-items-center pt-2">
                    <Col lg={3} md={3} sm={3} xs={4} className="p-0 d-flex">
                      <div className="position-relative notifications">
                        <Image
                          className="mw-100"
                          src="/images/user-image.png"
                        />
                        {numberOfNotifications.number > 0 && (
                          <Badge
                            dir="ltr"
                            className="position-absolute bg-danger rounded-circle border-light p-1"
                          >
                            {isLoggedIn &&
                              (numberOfNotifications.number <= 9
                                ? numberOfNotifications.number
                                : "+9")}
                          </Badge>
                        )}
                      </div>
                    </Col>
                    {user?.agent ? (
                      <Col xl={8} lg={8} md={7} sm={8} xs={7}>
                        <div>
                          <h6 className="mb-0">{user?.agent?.name}</h6>
                          <p className="nav--signed-title-sub h8 mb-0">
                            <span className="d-none d-sm-inline">
                              {language.balance} |
                            </span>
                            {parseFloat(user?.agent?.balance).toFixed(2)}
                            {user.place_parent.currency}
                          </p>
                        </div>
                      </Col>
                    ) : (
                      <Col xl={8} lg={8} md={7} sm={8} xs={7}>
                        <div>
                          <h6 className="mb-0">{user.name}</h6>
                          {user?.role === "user" && (
                            <p className="nav--signed-title-sub h8 mb-0">
                              <span className="d-none d-sm-inline">
                                {language.balance} |
                              </span>
                              {parseFloat(user?.balance).toFixed(2)}
                              {user.place_parent.currency}
                            </p>
                          )}
                        </div>
                      </Col>
                    )}
                    {/* {!user.name && (<h2>aaa</h2>)} */}
                    <Col xl={1} lg={1} md={2} sm={1} xs={1} className="p-0">
                      <Image
                        src="/images/down-vector.svg"
                        className="down_vector"
                      />
                    </Col>
                  </Row>
                </Dropdown.Toggle>
                <Dropdown.Menu className="nav--signed-dropdown mw-100 w-100">
                  {user?.agent && (
                    <div className="dropdown-item">
                      <p className="nav--signed-links mb-0 dropdown-item text-center">
                        {language.tableUsername}: {user.name}
                      </p>
                    </div>
                  )}
                  {user?.agent ? (
                    <Dropdown.Item
                      as={NavLink}
                      className="w-100 mx-1 mx-lg-3"
                      to="/store-profile"
                    >
                      <div className=" py-2 d-flex w-100 gap-2 justify-content-start w-100">
                        {/* User profile image */}
                        <Icons.UserCircle width="20" height="20" />
                        <p className="nav--signed-links mb-0">
                          {language.personalProfile}
                        </p>
                      </div>
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item
                      as={NavLink}
                      className="w-100 mx-1 mx-lg-3"
                      to="/user-profile"
                    >
                      <div className=" py-2 d-flex w-100 gap-2 justify-content-start w-100">
                        {/* User profile image */}
                        <Icons.UserCircle width="20" height="20" />
                        <p className="nav--signed-links mb-0">
                          {language.personalProfile}
                        </p>
                      </div>
                    </Dropdown.Item>
                  )}

                  {user?.role === "agent" && (
                    <>
                      <Dropdown.Item
                        as={NavLink}
                        className="w-100 mx-1 mx-lg-3"
                        to="/branches-and-users"
                      >
                        <div className=" py-2 d-flex w-100 gap-2 justify-content-start w-100">
                          {/* branches image */}
                          <Icons.Branches width="20" height="20" />
                          <p className="nav--signed-links mb-0">
                            {language.branchesandUsers}
                          </p>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={NavLink}
                        className="w-100 mx-1 mx-lg-3"
                        to="/wallet"
                      >
                        <div className=" py-2 d-flex w-100 gap-2 justify-content-start w-100">
                          {/* wallet image */}
                          <Icons.Wallet width="20" height="20" />
                          <p className="nav--signed-links mb-0">
                            {language.rechargeWallet}
                          </p>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={NavLink}
                        className="w-100  mx-1 mx-lg-3"
                        to="/loyalty-points"
                      >
                        <div className=" py-2 d-flex w-100 gap-2 justify-content-start w-100">
                          {/* loyalty-Points image */}
                          <Icons.Medal width="20" height="20" />
                          <p className="nav--signed-links mb-0">
                            {language.loyaltyPoints}
                          </p>
                        </div>
                      </Dropdown.Item>
                    </>
                  )}

                  {user?.role === "user" && (
                    <>
                      <Dropdown.Item
                        as={NavLink}
                        className="w-100 mx-1 mx-lg-3"
                        to="/wallet"
                      >
                        <div className=" py-2 d-flex w-100 gap-2 justify-content-start w-100">
                          {/* wallet image */}
                          <Icons.Wallet width="20" height="20" />
                          <p className="nav--signed-links mb-0">
                            {language.rechargeWallet}
                          </p>
                        </div>
                      </Dropdown.Item>
                    </>
                  )}

                  <Dropdown.Item
                    as={NavLink}
                    className="w-100  mx-1 mx-lg-3"
                    to="/notification"
                  >
                    <div className="py-2 d-flex w-100 gap-2 w-100 ">
                      {/* logout image */}
                      <div className="d-flex gap-2">
                        <Icons.Notification width="20" height="20" />
                        <p className="nav--signed-links mb-0">
                          {language.notification}
                        </p>
                      </div>
                      {numberOfNotifications.number > 0 && (
                        <Badge
                          dir="ltr"
                          className=" bg-danger rounded-circle border-light p-1"
                        >
                          {isLoggedIn &&
                            (numberOfNotifications.number <= 9
                              ? numberOfNotifications.number
                              : "+9")}
                        </Badge>
                      )}
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={NavLink}
                    className="w-100  mx-1 mx-lg-3"
                    to="/contact-us"
                  >
                    <div className=" py-2 d-flex w-100 gap-2 justify-content-start w-100">
                      {/* logout image */}
                      <Icons.ContactUs width="20" height="20" />
                      <p className="nav--signed-links mb-0">
                        {language.contactUs}
                      </p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={NavLink}
                    className="w-100 mx-1 mx-lg-3"
                    to="/instructional-videos"
                  >
                    <div className=" py-2 d-flex w-100 gap-2 justify-content-start w-100">
                      {/* logout image */}
                      <Icons.ContactUs width="20" height="20" />
                      <p className="nav--signed-links mb-0">
                        {language.instructionalVideos}
                      </p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={NavLink}
                    className="w-100 mx-1 mx-lg-3"
                    to="/change-password"
                  >
                    <div className=" py-2 d-flex w-100 gap-2 justify-content-start w-100">
                      {/* logout image */}
                      <Icons.PasswordChange width="20" height="20" />
                      <p className="nav--signed-links mb-0">
                        {language.changePassword}
                      </p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="w-100 mx-1 mx-lg-3">
                    <button onClick={handleLogout} className="dropdown-item">
                      <div className=" py-2 d-flex w-100 gap-2 justify-content-start w-100">
                        {/* logout image */}
                        <Icons.Logout width="20" height="20" />
                        <p className="nav--signed-links mb-0">
                          {language.logout}
                        </p>
                      </div>
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Row>
                <Col
                  xl={0}
                  lg={0}
                  md={0}
                  sm={12}
                  xs={12}
                  className="justify-content-center"
                >
                  <NavLink to="#login">
                    <Button className="d-none w-100">{language.login}</Button>
                  </NavLink>
                </Col>
                <Col xl={12} lg={12} md={12}>
                  <NavLink className="fw-bold text-uppercase" to="/login">
                    {language.signIn}
                  </NavLink>
                  {/** /
                  <NavLink className="fw-bold" to="/register">
                    {language.newAccount}
                  </NavLink> */}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
}
