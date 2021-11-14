import axios from "axios";
const state = {
  customers: [],
};
const getters = {
  allCustomers: (state) => state.customers,
};

const mutations = {
  GET_ALL_CUSTOMERS(state, customers) {
    state.customers = customers;
  },
  ADD_CUSTOMER(state, customer) {
    state.customers.unshift(customer);
  },
  GET_CUSTOMER(state, id) {
    state.customers.find((customer) => customer.id === id);
  },
  DELETE_CUSTOMER(state, id) {
    state.customers = state.customers.filter((customer) => customer.id !== id);
  },
  UPDATE_CUSTOMER(state, updateCustomer) {
    const index = state.todos.findIndex(
      (customer) => customer.id === updateCustomer
    );
    if (index !== -1) {
      state.todos.splice(index, 1, updateCustomer);
    }
  },
};
const actions = {
  async fetchAllCustomers({ commit }) {
    const customers = await axios.get(
      "https://617a7d18cb1efe001700fecb.mockapi.io/sp5/api/v1/customer"
    );
    commit("GET_ALL_CUSTOMERS", customers.data.items);
  },
  async getCustomer({ commit }, id) {
    await axios.get(
      `https://617a7d18cb1efe001700fecb.mockapi.io/sp5/api/v1/customer/${id}`
    );
    commit("GET_CUSTOMER", id);
  },
  async addCustomer({ commit }, data) {
    const customer = await axios.post(
      "https://617a7d18cb1efe001700fecb.mockapi.io/sp5/api/v1/customer",
      data
    );
    //console.log(customer);
    commit("ADD_CUSTOMER", customer);
  },
  async deleteCustomer({ commit }, id) {
    await axios.delete(
      `https://617a7d18cb1efe001700fecb.mockapi.io/sp5/api/v1/customer/${id}`
    );

    commit("DELETE_CUSTOMER", id);
  },
  async updateCustomer({ commit }, updateCustomer) {
    const customers = await axios.put(
      `https://617a7d18cb1efe001700fecb.mockapi.io/sp5/api/v1/customer/${updateCustomer.id}`,
      updateCustomer
    );
    commit("UPDATE_CUSTOMER", customers);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
