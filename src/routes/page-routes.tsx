import { createBrowserRouter } from "react-router";
import { routes } from "./routes";
import { lazy } from "react";
import App from "@/App";

// Layouts
const Main_Layout = lazy(() => import("@/layouts/main-layout"));
const Unauthorized_Layout = lazy(() => import("@/layouts/unauthorized-layout"));

// Home Route
const Home_Page = lazy(() => import("@/pages/home-page"));

// Cart Route
const Cart_Page = lazy(() => import("@/pages/cart-page"));

// Profile Routes
const Profile_Page = lazy(() => import("@/pages/profile-page"));
const MyNotifications_Page = lazy(() => import("@/pages/my-notifications-page"));
const Settings_Page = lazy(() => import("@/pages/settings-page"));
const CreateSetting_Page = lazy(() => import("@/pages/create-setting-page"));

// Products Routes
const ProductsPage = lazy(() => import("@/pages/products-page"));
const CreateProduct_Page = lazy(() => import("@/pages/create-product-page"));
const UploadProducts_Page = lazy(() => import("@/pages/upload-products-page"));
const AllProducts_Page = lazy(() => import("@/pages/all-products-page"));
const PublicProducts_Page = lazy(() => import("@/pages/public-products-page"));

// Categories Routes
const Categories_Page = lazy(() => import("@/pages/categories-page"));
const CreateCategory_Page = lazy(() => import("@/pages/create-category-page"));
const AllCategories_Page = lazy(() => import("@/pages/all-categories-page"));
const PublicCategories_Page = lazy(() => import("@/pages/public-categories-page"));

// Colors Routes
const Colors_Page = lazy(() => import("@/pages/colors-page"));
const CreateColor_Page = lazy(() => import("@/pages/create-color-page"));
const AllColors_Page = lazy(() => import("@/pages/all-colors-page"));
const PublicColors_Page = lazy(() => import("@/pages/public-colors-page"));

// Stock Routes
const Stock_Page = lazy(() => import("@/pages/stock-page"));
const StockProducts_Page = lazy(() => import("@/pages/stock-products-page"));
const StockRefills_Page = lazy(() => import("@/pages/stock-refills-page"));

// Orders Routes
const Orders_Page = lazy(() => import("@/pages/orders-page"));
const FastOrders_Page = lazy(() => import("@/pages/fast-orders-page"));
const ScheduledOrders_Page = lazy(() => import("@/pages/scheduled-orders-page"));
const ReturnRequests_Page = lazy(() => import("@/pages/return-requests-page"));
const OrdersIssues_Page = lazy(() => import("@/pages/orders-issues-page"));

// Stores
const Stores_Page = lazy(() => import("@/pages/stores-page"));
const CreateStore_Page = lazy(() => import("@/pages/create-store-page"));
const AllStores_Page = lazy(() => import("@/pages/all-stores-page"));

// Users Routes
const Users_Page = lazy(() => import("@/pages/users-page"));
const CreateUser_Page = lazy(() => import("@/pages/create-user-page"));
const Registers_Page = lazy(() => import("@/pages/registers-page"));
const Clients_Page = lazy(() => import("@/pages/clients-page"));
const Admins_Page = lazy(() => import("@/pages/admins-page"));
const Managers_Page = lazy(() => import("@/pages/managers-page"));
const Storekeepers_Page = lazy(() => import("@/pages/storekeepers-page"));
const Cashiers_Page = lazy(() => import("@/pages/cashiers-page"));

// Providers Routes
const Providers_Page = lazy(() => import("@/pages/providers-page"));
const CreateProvider_Page = lazy(() => import("@/pages/create-provider-page"));
const AllProviders_Page = lazy(() => import("@/pages/all-providers-page"));
const PublicProviders_Page = lazy(() => import("@/pages/public-providers-page"));

// Reviews Routes
const Reviews_Page = lazy(() => import("@/pages/reviews-page"));
const CreateCompanyReview_Page = lazy(() => import("@/pages/create-company-review-page"));
const ProductsReviews_Page = lazy(() => import("@/pages/products-reviews-page"));
const CompanyReviews_Page = lazy(() => import("@/pages/company-reviews-page"));
const OrdersReviews_Page = lazy(() => import("@/pages/orders-reviews-page"));

// Notifications Routes
const Notifications_Page = lazy(() => import("@/pages/notifications-page"));
const CreateNotification_Page = lazy(() => import("@/pages/create-notification-page"));
const AllNotifications_Page = lazy(() => import("@/pages/all-notifications-page"));

// Discounts Routes
const Discounts_Page = lazy(() => import("@/pages/discounts-page"));
const CreateDiscount_Page = lazy(() => import("@/pages/create-discount-page"));
const AllDiscounts_Page = lazy(() => import("@/pages/all-discounts-page"));

// Authentications Routes
const SignIn_Page = lazy(() => import("@/pages/sign-in-page"));

// Fallback Route
const NotFound_Page = lazy(() => import("@/pages/not-found-page"));

export const pageRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Unauthorized Layout
      {
        path: routes.home,
        element: <Unauthorized_Layout />,
        children: [
          // Authentications Routes
          { path: routes.signIn, element: <SignIn_Page /> },

          // Fallback Route
          { path: "*", element: <NotFound_Page /> },
        ],
      },

      // Main Layout
      {
        path: routes.home,
        element: <Main_Layout />,
        children: [
          // Home Route
          { index: true, element: <Home_Page /> },

          // Cart Route
          { path: routes.cart, element: <Cart_Page /> },

          // Profile Routes
          { path: routes.profile, element: <Profile_Page /> },
          { path: routes.myNotifications, element: <MyNotifications_Page /> },
          { path: routes.settings, element: <Settings_Page /> },
          { path: routes.createSetting, element: <CreateSetting_Page /> },

          // Products Routes
          { path: routes.products, element: <ProductsPage /> },
          { path: routes.createProduct, element: <CreateProduct_Page /> },
          { path: routes.uploadProducts, element: <UploadProducts_Page /> },
          { path: routes.allProducts, element: <AllProducts_Page /> },
          { path: routes.publicProducts, element: <PublicProducts_Page /> },

          // Categories Routes
          { path: routes.categories, element: <Categories_Page /> },
          { path: routes.createCategory, element: <CreateCategory_Page /> },
          { path: routes.allCategories, element: <AllCategories_Page /> },
          { path: routes.publicCategories, element: <PublicCategories_Page /> },

          // Colors Routes
          { path: routes.colors, element: <Colors_Page /> },
          { path: routes.createColor, element: <CreateColor_Page /> },
          { path: routes.allColors, element: <AllColors_Page /> },
          { path: routes.publicColors, element: <PublicColors_Page /> },

          // Stock Routes
          { path: routes.stock, element: <Stock_Page /> },
          { path: routes.stockProducts, element: <StockProducts_Page /> },
          { path: routes.stockRefills, element: <StockRefills_Page /> },

          // Orders Routes
          { path: routes.orders, element: <Orders_Page /> },
          { path: routes.fastOrders, element: <FastOrders_Page /> },
          { path: routes.scheduledOrders, element: <ScheduledOrders_Page /> },
          { path: routes.returnRequests, element: <ReturnRequests_Page /> },
          { path: routes.ordersIssues, element: <OrdersIssues_Page /> },

          // Stores Routes
          { path: routes.stores, element: <Stores_Page /> },
          { path: routes.createStore, element: <CreateStore_Page /> },
          { path: routes.allStores, element: <AllStores_Page /> },

          // Users Routes
          { path: routes.users, element: <Users_Page /> },
          { path: routes.createUser, element: <CreateUser_Page /> },
          { path: routes.registers, element: <Registers_Page /> },
          { path: routes.clients, element: <Clients_Page /> },
          { path: routes.admins, element: <Admins_Page /> },
          { path: routes.managers, element: <Managers_Page /> },
          { path: routes.storekeepers, element: <Storekeepers_Page /> },
          { path: routes.cashiers, element: <Cashiers_Page /> },

          // Providers Routes
          { path: routes.providers, element: <Providers_Page /> },
          { path: routes.createProvider, element: <CreateProvider_Page /> },
          { path: routes.allProviders, element: <AllProviders_Page /> },
          { path: routes.publicProviders, element: <PublicProviders_Page /> },

          // Reviews Routes
          { path: routes.reviews, element: <Reviews_Page /> },
          { path: routes.createCompanyReview, element: <CreateCompanyReview_Page /> },
          { path: routes.productsReviews, element: <ProductsReviews_Page /> },
          { path: routes.companyReviews, element: <CompanyReviews_Page /> },
          { path: routes.ordersReviews, element: <OrdersReviews_Page /> },

          // Notifications Routes
          { path: routes.notifications, element: <Notifications_Page /> },
          { path: routes.createNotification, element: <CreateNotification_Page /> },
          { path: routes.allNotifications, element: <AllNotifications_Page /> },

          // Discounts Routes
          { path: routes.discounts, element: <Discounts_Page /> },
          { path: routes.createDiscount, element: <CreateDiscount_Page /> },
          { path: routes.allDiscounts, element: <AllDiscounts_Page /> },
        ],
      },
    ],
  },
]);
