const API_BASE_URL = process.env.REACT_APP_MODE === "dev" ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD;
const API_ENDPOINTS = {
  STRIPE_CHECKOUT_SESSION: `${API_BASE_URL}/stripe/checkout-session`,
  STRIPE_CREATE_CHECKOUT_SESSION: `${API_BASE_URL}/stripe/create-checkout-session`,

  USER_LOGIN: `${API_BASE_URL}/users/login`,
  USER_REGISTER: `${API_BASE_URL}/users/register`,
  USER_VERIFY: `${API_BASE_URL}/users/verify`,
  USER_CHANGE_PASSWORD: `${API_BASE_URL}/users/changePassword`,
  USER_UPDATE: `${API_BASE_URL}/users/update`,
  USER_DISABLE: `${API_BASE_URL}/users/disable`,
  USER_DELETE: `${API_BASE_URL}/users/disable`,
  USERS_PERMISSIONS: `${API_BASE_URL}/users-permissions`,
  USERS_PERMISSIONS_CREATE: `${API_BASE_URL}/users-permissions/create`,
  USERS_PERMISSIONS_UPDATE: `${API_BASE_URL}/users-permissions/update`,
  USERS_PERMISSIONS_DELETE: `${API_BASE_URL}/users-permissions/delete`,
  USER_ORDERS: `${API_BASE_URL}/orders/users`,
  USERS: `${API_BASE_URL}/users`,

  PRODUCT_REGIONS: `${API_BASE_URL}/products-regions`,
  PRODUCT_REGIONS_CREATE: `${API_BASE_URL}/products-regions/create`,
  PRODUCT_REGIONS_UPDATE: `${API_BASE_URL}/products-regions/update`,
  PRODUCT_REGIONS_DELETE: `${API_BASE_URL}/products-regions/delete`,
  PRODUCT_CREATE: `${API_BASE_URL}/products/create`,
  PRODUCT_UPDATE: `${API_BASE_URL}/products/update`,
  PRODUCT_DELETE: `${API_BASE_URL}/products/delete`,
  PRODUCTS: `${API_BASE_URL}/products`,

  ORDERS: `${API_BASE_URL}/orders`,
  CONTACT: `${API_BASE_URL}/contact`,

  PRIVACY_POLICY: "https://www.iubenda.com/api/privacy-policy/75549895",
  COOKIE_POLICY: "https://www.iubenda.com/api/privacy-policy/78615554/cookie-policy",
  TERMS_AND_CONDITIONS: "https://www.iubenda.com/api/terms-and-conditions/78615554"
};

export { API_ENDPOINTS };
