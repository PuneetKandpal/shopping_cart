type ERROR_CODE_TYPE = {
  code: string;
  message: string;
};

export const ERROR_CODES = {
  CLOUD_INSTANCE_CREATE_FAILED: {
    code: "CLOUD_INSTANCE_CREATE_FAILED",
    message: "Failed to create cloud instance",
  },
  CLOUD_GET_COMMAND_FAILED:{
    code: "CLOUD_GET_COMMAND_FAILED",
    message: "Failed to create get object command",
  },
  FETCH_PRODUCTS_FAILED:{
    code: "FETCH_PRODUCTS_FAILED",
    message: "Failed to fetch products",
  },
  FETCH_PRODUCTS_FAMILY_FAILED:{
    code: "FETCH_PRODUCTS_FAMILY_FAILED",
    message: "Failed to fetch products family",
  }
} as const;

class ApplicationError extends Error {
  code: string;
  constructor(errorDetailObject: ERROR_CODE_TYPE) {
    const { code, message } = errorDetailObject;
    super(message);
    this.code = code;
  }
}

export default ApplicationError;
