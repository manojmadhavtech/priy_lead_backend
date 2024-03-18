module.exports = {
  //---------------------------- HTTP CODES ----------------------------//
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  MOVED_PERMANENTLY: 301,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  REQUEST_TOO_LONG: 413,
  REQUEST_URI_TOO_LONG: 414,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  //---------------------------- MESSAGES ----------------------------//
  UNAUTHORIZE_ERROR: "Unauthorized!",
  FORBIDDEN_ERROR: "Access Forbidden!",
  NOT_REGISTER: "User is not registered!",
  INVALID_CREDENTIALS: "Invalid Credentials!",
  VALIDATION_ERROR: "Validation Error! Please check your inputs",
  DUPLICATE_ERROR: "Already exist!",
  RECORD_FOUND: "Record fetched successfully",
  NO_RECORD_FOUND: "No record found!",
  RECORD_NOT_EXIST: "Record does not exist!",
  INVALID_EMAIL: "Invalid email, Please check your email and try again",
  ACCOUNT_ALREADY_EXISTS: "An account with this email already exists",
  EMAIL_ALREADY_VERIFIED: "Your e-mail has already been verified You can now login",
  INVALID_REQUEST_TRY_AGAIN: "Invalid request, Please try again",
  CUSTOMER_SIGNUP: "Customer Sign up successfully",
  CUSTOMER_SIGNIN: "Customer Sign in successfully",
  ADMIN_SIGNIN: "Admin Sign in successfully",
  USER_NOT_FOUND: "User not found",
  VERIFICATION_LINK_SENT: "Verification link has been sent",
  SUBSCRIPTION_EXPIRED: "Your Subscription is expired For further used please Renew your account by clicking on this link",
  ACCOUNT_NOT_FOUND: "We couldn't find your account",
  CHECK_EMAIL_RESET_PASSWORD: "Please check your email to reset your password",
  PASSWORD_RESET_LINK_EXPIRED: "Your password reset link has been expired Please try again",
  PASSWORD_RESET_SUCCESS: "Your password has been reset",


 
  CATEGORY_FOUND: "Category fetched successfully",
  CATEGORYS_FOUND: "Categorys fetched successfully",
  CATEGORY_CREATED: "Category created successfully",
  CATEGORY_UPDATED: "Category updated successfully",
  CATEGORY_DELETED: "Category deleted successfully",


 STATUS_FOUND: "Status fetched successfully",
 STATUS_CREATED: "Status created successfully",
 STATUS_UPDATED: "Status updated successfully",
 STATUS_DELETED: "Status deleted successfully",
 STATUS_DUPLICATE:"Status is already exists",
 STATUS_NOT_FOUND:"Primary 'id' column not found in the status. Please ensure the required columns are available.",

 DATA_SOURCE_FOUND: "Data source fetched successfully",
 DATA_SOURCE_CREATED: "Data source created successfully",
 DATA_SOURCE_UPDATED: "Data source updated successfully",
 DATA_SOURCE_DELETED: "Data source deleted successfully",
 DATA_SOURCE_DUPLICATE:"Data source is already exists",
 DATA_SOURCE_NOT_FOUND:"Data source not found",
 DATA_SOURCE_NOT_FOUND:"Primary 'id' column not found in the data source. Please ensure the required columns are available.",




 AREA_FOUND: "Area fetched successfully",
 AREA_CREATED: "Area created successfully",
 AREA_UPDATED: "Area updated successfully",
 AREA_DELETED: "Area deleted successfully",
 AREA_DUPLICATE:"Area is already exists",
 AREA_NOT_FOUND:"Primary 'id' column not found in the area. Please ensure the required columns are available.",



  LEAD_FOUND: "Lead fetched successfully",
  LEAD_NOT_FOUND: "Primary 'id' column not found in the lead. Please ensure the required columns are available.",

  LEADS_FOUND: "lead fetched successfully",
  LEAD_CREATED: "lead created successfully",
  LEAD_UPDATED: "lead updated successfully",
  LEAD_DELETED: "lead deleted successfully",
  LEAD_DUPLICATE: "Client with the provided email already exists",


  SERVER_ERROR: "Something bad happened on server!",
  BAD_REQUEST_MESSAGE: "Please pass all the required inputs!",
  NOT_AUTHORIZED: "You are not authorized to perfrom this action!",

  //---------------------------- ROLES ----------------------------//
  USER_TYPES: {
    SUPER_ADMIN: 1,
    ADMIN: 2,
    ADMIN_STAFF: 3,
    CUSTOMER: 4,
    CUSTOMER_STAFF: 5
  },

  
};
