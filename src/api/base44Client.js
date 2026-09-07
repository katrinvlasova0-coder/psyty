const noop = async () => null;
const emptyList = async () => [];

const entityApi = {
  list: emptyList,
  filter: emptyList,
  get: noop,
  create: noop,
  update: noop,
  delete: noop,
};

export const base44 = {
  auth: {
    isAuthenticated: async () => false,
    me: async () => null,
    loginViaEmailPassword: noop,
    logout: noop,
    register: noop,
    redirectToLogin: noop,
    resetPasswordRequest: noop,
    resetPassword: noop,
    loginWithProvider: noop,
    verifyOtp: noop,
    resendOtp: noop,
    setToken: noop,
  },
  entities: new Proxy(
    {},
    {
      get: () => entityApi,
    },
  ),
  functions: {
    invoke: async () => ({ data: null }),
  },
  integrations: {
    Core: {
      SendEmail: noop,
      UploadFile: noop,
      InvokeLLM: async () => ({ response: '' }),
    },
  },
};
