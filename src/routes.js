import React from "react";

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: React.lazy(() => import("pages/Home")),
  },
  {
    path: "*",
    exact: true,
    name: "Not Found",
    component: React.lazy(() => import("pages/NotFound")),
  },
  {
    path: "categories",
    exact: true,
    name: "Categories",
    component: React.lazy(() => import("pages/Categories/CategoryTypes")),
  },
  {
    path: "category/:category_id",
    exact: true,
    name: "category",
    component: React.lazy(() => import("pages/Categories/Category")),
  },
  {
    path: "sub_category/:sub_id",
    exact: true,
    name: "Sub Category",
    component: React.lazy(() => import("pages/Categories/SubCategory")),
  },
  {
    path: "product/:product_id",
    exact: true,
    name: "Product",
    component: React.lazy(() => import("pages/ProductDetails")),
  },
  {
    path: "search-results/:search",
    exact: true,
    name: "Search",
    component: React.lazy(() => import("pages/SearchResults")),
  },
  {
    path: "contact-us-form",
    exact: true,
    name: "contact us form",
    component: React.lazy(() => import("pages/ContactUsForm")),
  },
  {
    path: "public-page/:machine_name",
    exact: true,
    name: "Public Page",
    component: React.lazy(() => import("pages/PublicPage")),
  },
  {
    path: "terms-and-conditions",
    exact: true,
    name: "terms and conditions",
    component: React.lazy(() => import("pages/Terms")),
  },
  {
    path: "checkout",
    exact: true,
    name: "Checkout",
    auth: true,
    role: ["user"],
    component: React.lazy(() => import("pages/Checkout")),
  },
  {
    path: "cart",
    exact: true,
    name: "Cart",
    auth: true,
    role: ["user"],
    component: React.lazy(() => import("pages/Cart")),
  },
  {
    path: "my-orders",
    exact: true,
    name: "my orders",
    auth: true,
    component: React.lazy(() => import("pages/MyOrders")),
  },
  {
    path: "my-orders-details/:order_id",
    exact: true,
    name: "my orders details",
    auth: true,
    component: React.lazy(() => import("pages/OrderDetails")),
  },
  {
    path: "store-profile",
    exact: true,
    name: "store profile",
    auth: true,
    role: ["agent", "sub agent"],
    component: React.lazy(() => import("pages/Profile/StoreProfile")),
  },
  {
    path: "user-profile",
    exact: true,
    name: "user profile",
    auth: true,
    role: ["user"],
    component: React.lazy(() => import("pages/Profile/StoreProfile")),
    componentProps: { isUser: true },
  },
  {
    path: "instructional-videos",
    exact: true,
    name: "instructional videos",
    auth: true,
    component: React.lazy(() => import("pages/Profile/InstructionalVideos")),
  },
  {
    path: "notification",
    exact: true,
    name: "notification",
    auth: true,
    component: React.lazy(() => import("pages/Profile/Notifications")),
  },
  {
    path: "wishList",
    exact: true,
    name: "WishList",
    auth: true,
    component: React.lazy(() => import("pages/Profile/WishList")),
  },
  {
    path: "contact-us",
    exact: true,
    name: "ContactUs",
    auth: true,
    component: React.lazy(() => import("pages/ContactUs")),
  },
  {
    path: "change-password",
    exact: true,
    name: "change password",
    auth: true,
    component: React.lazy(() => import("pages/Profile/ChangePassword")),
  },
  {
    path: "add-new-user",
    exact: true,
    name: "add new user",
    auth: true,
    role: ["agent"],
    component: React.lazy(() => import("pages/Profile/UserCreate")),
  },
  {
    path: "add-new-branch",
    exact: true,
    name: "add new Branch",
    auth: true,
    role: ["agent"],
    component: React.lazy(() => import("pages/Profile/BranchCreate")),
  },
  {
    path: "edit-branch/:id",
    exact: true,
    name: "edit branch",
    auth: true,
    role: ["agent"],
    component: React.lazy(() => import("pages/Profile/BranchEdit")),
  },
  {
    path: "edit-user/:id",
    exact: true,
    name: "edit user",
    auth: true,
    role: ["agent"],
    component: React.lazy(() => import("pages/Profile/UserEdit")),
  },
  {
    path: "branches-and-users",
    exact: true,
    name: "branches and users",
    auth: true,
    role: ["agent"],
    component: React.lazy(() => import("pages/Profile/BranchesUsers")),
  },
  {
    path: "loyalty-points",
    exact: true,
    name: "loyalty point",
    auth: true,
    role: ["agent"],
    component: React.lazy(() => import("pages/Profile/LoyaltyPoints")),
  },
  {
    path: "wallet",
    exact: true,
    name: "Wallet",
    auth: true,
    role: ["agent", "user"],
    component: React.lazy(() => import("pages/Profile/Wallet")),
  },

  {
    path: "login",
    exact: true,
    name: "Login",
    noAuth: true,
    component: React.lazy(() => import("pages/Auth/Login")),
  },
  {
    path: "register",
    exact: true,
    name: "Register",
    noAuth: true,
    component: React.lazy(() => import("pages/Auth/Register")),
  },
  {
    path: "forget-password",
    exact: true,
    name: "Forget Password",
    noAuth: true,
    component: React.lazy(() => import("pages/Auth/ForgetPassword")),
  },
];

export default routes;
