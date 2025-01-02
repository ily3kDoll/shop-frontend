import ProtectedRoute from "@/components/protected-route";
import NotFoundPage from "@/pages/404";
import CategoriesPage from "@/pages/admin/categories";
import CreateCategoryPage from "@/pages/admin/categories/create";
import UpdateCategoryPage from "@/pages/admin/categories/update";
import LoginPage from "@/pages/admin/login";
import ProductPage from "@/pages/admin/products";
import CreateProductPage from "@/pages/admin/products/create";
import UpdateProductPage from "@/pages/admin/products/update";
import UsersPage from "@/pages/admin/users";
import CreateUsersPage from "@/pages/admin/users/create";
import UpdateUserPage from "@/pages/admin/users/update";
import HomePage from "@/pages/home";
import LayoutHomePages from "@/pages/home/layout";
import { createBrowserRouter } from "react-router-dom";
import CustomersPage from "@/pages/admin/customers";
import OrdersPage from "@/pages/admin/orders";
import AuthorsPage from "@/pages/admin/authors";
import CreateAuthorPage from "@/pages/admin/authors/create";
import UpdateAuthorPage from "@/pages/admin/authors/update";
import LoginHomePage from "@/pages/home/login";
import RegisterPage from "@/pages/home/register";
import ProductsHomePage from "@/pages/home/products";
import ProductDetailPage from "@/pages/home/products/detail";
import CartPage from "@/pages/home/cart";
import ForgotPasswordPage from "@/pages/home/forgot-password";
import ResetPasswordPage from "@/pages/home/reset-password";
import CheckoutPage from "@/pages/home/checkout";
import ThanksPage from "@/pages/home/checkout/thanks";
import ProfilePage from "@/pages/home/profile";
import LayOutAdminPage from "@/pages/admin";
import { DashBoardPage } from "@/pages/admin/dashboard";
import BlogsPage from "@/pages/admin/blogs";
import CreateBlogPage from "@/pages/admin/blogs/create";
import BlogHomePage from "@/pages/home/blog";
import BlogDetailPage from "@/pages/home/blog/detail";
import UpdateBlogPage from "@/pages/admin/blogs/update";
import ContactPage from "@/pages/home/contact";
import ScrollToTop from "@/components/ScrollToTop";

const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
        <LayoutHomePages />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductsHomePage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/place-order",
        element: <CheckoutPage />,
      },
      {
        path: "/thanks",
        element: <ThanksPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/blogs",
        element: <BlogHomePage />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetailPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },

  {
    element: (
      <ProtectedRoute>
        <LayOutAdminPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <DashBoardPage />,
      },
      {
        path: "/admin/users",
        element: <UsersPage />,
      },
      {
        path: "/admin/users/create-user",
        element: <CreateUsersPage />,
      },
      {
        path: "/admin/products",
        element: <ProductPage />,
      },
      {
        path: "/admin/products/create-product",
        element: <CreateProductPage />,
      },
      {
        path: "/admin/users/:id",
        element: <UpdateUserPage />,
      },
      {
        path: "/admin/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/admin/categories/create-category",
        element: <CreateCategoryPage />,
      },
      {
        path: "/admin/categories/:id",
        element: <UpdateCategoryPage />,
      },
      {
        path: "/admin/products/:id",
        element: <UpdateProductPage />,
      },
      {
        path: "/admin/customers",
        element: <CustomersPage />,
      },
      {
        path: "/admin/orders",
        element: <OrdersPage />,
      },
      {
        path: "/admin/authors",
        element: <AuthorsPage />,
      },
      {
        path: "/admin/authors/:id",
        element: <UpdateAuthorPage />,
      },
      {
        path: "/admin/authors/create-author",
        element: <CreateAuthorPage />,
      },
      {
        path: "/admin/blogs",
        element: <BlogsPage />,
      },
      {
        path: "/admin/blogs/create-blog",
        element: <CreateBlogPage />,
      },
      {
        path: "/admin/blogs/:id",
        element: <UpdateBlogPage />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginHomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
