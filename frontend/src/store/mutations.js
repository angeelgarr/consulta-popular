const setState = (state, payload) => {
  state[payload.field] = payload.value;
};

const clearError = (state) => {
  state.error = {
    name: "",
    message: "",
  };
};

const getMetamask = (state) => {
  state.error = { name: "No wallet detected", message: "Please get Metamask" };
};

export default {
  setState,
  getMetamask,
  clearError,
};
