const AppRoutes = {
  Home: "/",
  Login: "/login",
  Register: "/register",
  Forgot: "/forgot/:token",
  Verification: "/verification",
  ChangePassword: "/change/:token",
  Logout: "/logout",
  NotFound: "/404",
  Contact: "/contact",
  Checkout: "/checkout",
  Profile: "/profile",
  ClientArea: "/area",
  ProfileBilling: "/profile/billing",
  Orders: "/orders",
  ToS: "/tos",
  AdminDashboard: "/admin",
  AdminOrders: "/admin/orders",
  AdminProducts: "/admin/products",
  AdminProductsRegions: "/admin/products/regions",
  AdminProductsRegionsAdd: "/admin/products/regions/add",
  AdminUsers: "/admin/users",
  AdminUsersPermissions: "/admin/users/permissions",
  AdminUsersPermissionsAdd: "/admin/users/permissions/add",
  AdminUsersPermissionsEdit: "/admin/users/permissions/edit/:id"
};

export default AppRoutes;
