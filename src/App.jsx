import React from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router";
import { useLanguage } from "hooks";
import { MainNavbar, Footer, Fallback, ErrorBoundary } from "components";
import { Auth } from "pages";
import { useSelector, useDispatch } from "react-redux";
import { checkLogin } from "store/auth";
import { getFavorites } from "store/user";
import { getCategoryTypes, getPlaces, getTypesOfWallet } from "store/app";
import { getAppInfo } from "store/general/actions";
import { getCartItems, getNumberOfNotifications } from "store/user/actions";
import "./scss/index.scss";
import routes from "routes";

const App = () => {
  const language = useLanguage();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {
    auth_checked,
    isLoggedIn,
    loading: authLoading,
  } = useSelector((state) => state.auth);
  const { loading: appLoading } = useSelector((state) => state.app);

  React.useLayoutEffect(() => {
    document.documentElement.setAttribute("lang", language.code);
    document.documentElement.setAttribute("dir", language.dir);
  }, [language]);

  React.useEffect(() => {
    dispatch(getPlaces());
    dispatch(getAppInfo());
    dispatch(getCategoryTypes());
  }, [dispatch, language]);

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  React.useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch, pathname, language]);

  React.useEffect(() => {
    if (isLoggedIn) dispatch(getNumberOfNotifications());
  }, [dispatch, pathname, isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(getFavorites());
      dispatch(getCartItems());
      dispatch(getTypesOfWallet());
    }
  }, [dispatch, isLoggedIn]);

  if (auth_checked && !authLoading.checkLogin && !appLoading.categoryTypes) {
    return (
      <div className="App">
        <ErrorBoundary>
          <div className="text-name">
            <React.Suspense fallback={<Fallback />}>
              <MainNavbar />
              <Routes basename="/">
                {routes.map((route, idx) => {
                  return (
                    route.component && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        element={
                          <Auth.Check {...route}>
                            <route.component {...route.componentProps} />
                          </Auth.Check>
                        }
                      />
                    )
                  );
                })}
              </Routes>
              <Footer />
            </React.Suspense>
          </div>
        </ErrorBoundary>
      </div>
    );
  }
  return <Fallback />;
};

export default App;
