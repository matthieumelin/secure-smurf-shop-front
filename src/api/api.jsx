const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_ENDPOINTS = {
  STRIPE_CHECKOUT_SESSION: `${API_BASE_URL}/stripe/create-checkout-session`,
  USER_PERMISSIONS: `${API_BASE_URL}/users/permissions`,
  USER_LOGIN: `${API_BASE_URL}/users/login`,
  USER_REGISTER: `${API_BASE_URL}/users/register`,
  USER_VERIFY: `${API_BASE_URL}/users/verify`,
  USER_FORGOT_PASSWORD: `${API_BASE_URL}/users/forgotPassword`,
  USER_CHANGE_PASSWORD: `${API_BASE_URL}/users/changePassword`,
  USER_UPDATE: `${API_BASE_URL}/users/update`,
  PRODUCT_SERVERS: `${API_BASE_URL}/products/servers`,
  PRODUCTS: `${API_BASE_URL}/products`,
  ORDER: `${API_BASE_URL}/orders`,
  USER_ORDERS: `${API_BASE_URL}/orders/users`,
  CONTACT: `${API_BASE_URL}/contact`,
};

export { API_ENDPOINTS };
