import { routes } from "./routes";

export const navigationRoutes: {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
  }[];
}[] = [
  {
    title: "products",
    url: routes.products,
    items: [
      { title: "all products", url: routes.allProducts },
      { title: "public products", url: routes.publicProducts },
    ],
  },
  {
    title: "categories",
    url: routes.categories,
    items: [
      { title: "all categories", url: routes.allCategories },
      { title: "public categories", url: routes.publicCategories },
    ],
  },
  {
    title: "colors",
    url: routes.colors,
    items: [
      { title: "all colors", url: routes.allColors },
      { title: "public colors", url: routes.publicColors },
    ],
  },
  {
    title: "stock",
    url: routes.stock,
    items: [
      { title: "products", url: routes.stockProducts },
      { title: "refill orders", url: routes.stockRefills },
    ],
  },
  {
    title: "orders",
    url: routes.orders,
    items: [
      { title: "fast orders", url: routes.fastOrders },
      { title: "scheduled orders", url: routes.scheduledOrders },
      { title: "return requests", url: routes.returnRequests },
      { title: "issues", url: routes.ordersIssues },
    ],
  },
  {
    title: "stores",
    url: routes.stores,
    items: [{ title: "all stores", url: routes.allStores }],
  },
  {
    title: "users",
    url: routes.users,
    items: [
      { title: "registers", url: routes.registers },
      { title: "clients", url: routes.clients },
      { title: "admins", url: routes.admins },
      { title: "managers", url: routes.managers },
      { title: "storekeepers", url: routes.storekeepers },
      { title: "cashiers", url: routes.cashiers },
    ],
  },
  {
    title: "providers",
    url: routes.providers,
    items: [
      { title: "all providers", url: routes.allProviders },
      { title: "public providers", url: routes.publicProviders },
    ],
  },
  {
    title: "reviews",
    url: routes.reviews,
    items: [
      { title: "products reviews", url: routes.productsReviews },
      { title: "company reviews", url: routes.companyReviews },
      { title: "orders reviews", url: routes.ordersReviews },
    ],
  },
  {
    title: "notifications",
    url: routes.notifications,
    items: [{ title: "all notifications", url: routes.allNotifications }],
  },
  {
    title: "discounts",
    url: routes.discounts,
    items: [{ title: "all discounts", url: routes.allDiscounts }],
  },
];
