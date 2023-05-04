const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_ENDPOINTS = {
  STRIPE_CHECKOUT_SESSION: `${API_BASE_URL}/stripe/checkout-session`,
  STRIPE_CREATE_CHECKOUT_SESSION: `${API_BASE_URL}/stripe/create-checkout-session`,
  USER_LOGIN: `${API_BASE_URL}/users/login`,
  USER_REGISTER: `${API_BASE_URL}/users/register`,
  USER_VERIFY: `${API_BASE_URL}/users/verify`,
  USER_FORGOT_PASSWORD: `${API_BASE_URL}/users/forgotPassword`,
  USER_CHANGE_PASSWORD: `${API_BASE_URL}/users/changePassword`,
  USER_UPDATE: `${API_BASE_URL}/users/update`,
  USER_DISABLE: `${API_BASE_URL}/users/disable`,
  USERS_PERMISSIONS: `${API_BASE_URL}/users-permissions`,
  USERS_PERMISSIONS_ADD: `${API_BASE_URL}/users-permissions/create`,
  USERS_PERMISSIONS_UPDATE: `${API_BASE_URL}/users-permissions/update`,
  USERS_PERMISSIONS_DELETE: `${API_BASE_URL}/users-permissions/delete`,
  USER_ORDERS: `${API_BASE_URL}/orders/users`,
  USERS: `${API_BASE_URL}/users`,
  PRODUCT_SERVERS: `${API_BASE_URL}/products/servers`,
  PRODUCTS: `${API_BASE_URL}/products`,
  ORDERS: `${API_BASE_URL}/orders`,
  CONTACT: `${API_BASE_URL}/contact`,
};

export { API_ENDPOINTS };
