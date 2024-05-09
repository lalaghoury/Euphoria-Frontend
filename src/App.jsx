import { useCallback, useEffect, useState } from "react";
import { ConfigProvider, message } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import { themeConfig } from "./themeConfig";
import {
  SignUpPage,
  SignInPage,
  HomePage,
  ForgotPasswordPage,
  NewPasswordPage,
  PageNotFound,
  AdminDashboard,
  AdminLayout,
  AllUsersList,
  AllProductsList,
  AllCategoriesList,
  AllOrdersList,
  AddCategory,
  AddProduct,
  EditProduct,
  Shop,
  ProductDetails,
  CartPage,
  PrivateRoute,
  CheckoutPage,
  OrderConfirmed,
  UserProfileLayout,
  MyOrders,
  MyWishlist,
  MyInfo,
  SearchPage,
  LoginSuccess,
  AllDressStylesList,
  AddDressStyle,
  IsAdmin,
  AlreadyLoggedInRoute,
  MainLayout,
} from "./comp";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import OrderDetails from "./admin/AllOrders/OrderDetails";

function App() {
  axios.defaults.withCredentials = true;
  const [theme, setTheme] = useState("light");

  const changeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    message.loading({
      content: `Switching to ${newTheme} mode...`,
      key: "theme",
    });

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    setTimeout(() => {
      message.success({
        content: `Switched to ${newTheme} mode`,
        key: "theme",
        duration: 2,
      });
    }, 800);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      localStorage.setItem("theme", theme);
    } else {
      setTheme(storedTheme);
    }
  }, [changeTheme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout changeTheme={changeTheme} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/auth/login/success",
          element: <LoginSuccess />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/product/:productId",
          element: <ProductDetails authRequired={false} />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/",
          element: <PrivateRoute />,
          children: [
            {
              path: "/forgot-password",
              element: <ForgotPasswordPage />,
            },
            {
              path: "/cart",
              element: <CartPage />,
              // errorElement: <ErrorPage  />,
            },
            {
              path: "/profile",
              element: <UserProfileLayout />,
              children: [
                {
                  path: "/profile/my-orders",
                  element: <MyOrders />,
                },
                {
                  path: "/profile/order-details/:id",
                  element: <OrderDetails />,
                },
                {
                  path: "/profile/my-wishlist",
                  element: <MyWishlist />,
                },
                {
                  path: "/profile/my-info",
                  element: <MyInfo />,
                },
              ],
            },
            {
              path: "/reset-password/:resetToken",
              element: <NewPasswordPage />,
            },
            {
              path: "/checkout",
              element: <CheckoutPage />,
            },
            {
              path: "/order-confirmed",
              element: <OrderConfirmed />,
            },
          ],
        },
        {
          path: "/",
          element: <IsAdmin />,
          children: [
            {
              path: "/dashboard",
              element: <AdminLayout />,
              children: [
                {
                  index: true,
                  element: <AdminDashboard />,
                },
                {
                  path: "orders/orders-list",
                  element: <AllOrdersList />,
                },
                {
                  path: "orders/order-details/:id",
                  element: <AllOrdersList />,
                },
                {
                  path: "orders/edit-order/:id",
                  element: <AllOrdersList />,
                },
                {
                  path: "users/all-users-list",
                  element: <AllUsersList />,
                },
                {
                  path: "users/add-user",
                  element: <AllUsersList />,
                },
                {
                  path: "users/details/:id",
                  element: <AllUsersList />,
                },
                {
                  path: "products/products-list",
                  element: <AllProductsList />,
                },
                {
                  path: "products/add-product",
                  element: <AddProduct />,
                },
                {
                  path: "products/edit-product/:id",
                  element: <EditProduct />,
                },
                {
                  path: "categories/categories-list",
                  element: <AllCategoriesList />,
                },
                {
                  path: "categories/add-category",
                  element: <AddCategory />,
                },
                {
                  path: "dress-styles/dress-styles-list",
                  element: <AllDressStylesList />,
                },
                {
                  path: "dress-styles/add-dress-style",
                  element: <AddDressStyle />,
                },
              ],
            },
          ],
        },
        {
          path: "/",
          element: <AlreadyLoggedInRoute />,
          children: [
            {
              path: "/sign-up",
              element: <SignUpPage changeTheme={changeTheme} />,
            },
            {
              path: "/sign-in",
              element: <SignInPage changeTheme={changeTheme} />,
            },
          ],
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);

  return (
    <ConfigProvider theme={themeConfig[theme]}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;