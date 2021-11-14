<template>
  <div class="container">
    <div class="container-left">
      <SideNavigation :open="navOpen" />
    </div>
    <div class="container-right ms-5">
      <section class="my-container">
        <Menu class="menu" @toggleNav="navOpen = !navOpen" />
        <div class="top-row">
          <Heading
            heading="Customer Data"
            subHeading="Registered customers Information is available on this page"
          />

          <hr class="mt-3 w-100" />
          <div class="form-items">
            <Search class="mt-4" />
            <!-- Modal -->
            <div
              class="modal fade"
              id="addModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      {{ ModalHeading }}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form @submit="onSubmit">
                    <div class="modal-body">
                      <div class="input-id">
                        <label for="customerID">Customer ID:</label>
                        <input
                          type="text"
                          name="customerID"
                          class="form-control"
                          v-model="id"
                        />
                      </div>
                      <!-- <Input label="ID:" type="text" v-model="customer.id" /> -->
                      <label for="createdDate">Created At:</label>
                      <datepicker
                        type="text"
                        v-model="createdAt"
                        id="form-date"
                      />
                      <Input label="Name:" type="text" v-model="name" />
                      <Input label="Address:" type="text" v-model="address" />
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" class="btn btn-success">
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <AddButton
              title="Add Customer"
              class="btnAdd"
              data-bs-toggle="modal"
              data-bs-target="#addModal"
            />
          </div>
        </div>
        <jw-pagination
          :items="allCustomers"
          @changePage="onChangePage"
        ></jw-pagination>
        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {{ ModalHeading2 }}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="input-id">
                  <label for="customerID">Customer ID:</label>
                  <input
                    type="text"
                    name="customerID"
                    class="form-control"
                    v-model="id"
                  />
                </div>
                <!-- <Input label="ID:" type="text" v-model="customer.id" /> -->
                <label for="createdDate">Created At:</label>
                <datepicker type="text" v-model="createdAt" id="form-date" />
                <Input label="Name:" type="text" v-model="name" />
                <Input label="Address:" type="text" v-model="address" />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-5 w-100">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Created At</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in allCustomers" :key="customer.id">
                <td>{{ customer.id }}</td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.address }}</td>
                <td>{{ customer.createdAt }}</td>
                <td>
                  <button
                    type="button"
                    class="btn"
                    @click="deleteCustomer(customer.id)"
                  >
                    <span class="icons">
                      <fa icon="trash" />
                    </span>
                  </button>
                  <button
                    type="button"
                    class="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="editCustomer(customer)"
                  >
                    <span class="icons">
                      <fa icon="edit" />
                    </span>
                  </button>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import datepicker from "vue2-datepicker";
//import Pagination from "v-pagination-3";

//import components.
import SideNavigation from "@/components/SidebarNavigation.vue";
import Menu from "@/components/Humburger.vue";
import Heading from "@/components/Heading.vue";
import Search from "@/components/Search.vue";
import AddButton from "@/components/AddButton.vue";

//import form element components.
import Input from "@/components/form-elements/BaseInput.vue";

export default {
  name: "Customer",
  components: {
    SideNavigation,
    Menu,
    Heading,
    Search,
    AddButton,
    Input,
    datepicker,
  },
  data() {
    const picked = new Date();
    return {
      navOpen: true,
      ModalHeading: "Add a Customer",
      ModalHeading2: "Update Customer Data",
      id: "",
      createdAt: picked,
      name: "",
      address: "",
      pageOfItems: [],
    };
  },
  created() {
    this.$store.dispatch("fetchAllCustomers");
  },
  methods: {
    ...mapActions([
      "fetchAllCustomers",
      "addCustomer",
      "deleteCustomer",
      "updateTodo",
      "getCustomer",
    ]),
    onSubmit(e) {
      e.preventDefault();
      this.addCustomer(this.id, this.createdAt, this.name, this.address);
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    customerObject() {
      const customerObj = {
        id: this.id,
        createdAt: this.createdAt,
        name: this.name,
        address: this.address,
      };

      return customerObj;
    },
    editCustomer(customer) {
      this.customerObj = customer;
    },
  },
  computed: {
    ...mapGetters(["allCustomers"]),
  },
};
</script>

<style scoped>
.container {
  max-width: 98vw;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  position: relative;
  background-color: #f5f5f5;
}
section {
  height: 100vh;
}
.container-left {
  width: 15vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #f4f4f4;
  color: white;
  margin-left: 5px;
}

.container-right {
  margin-left: 16vw;
  width: 80vw;
}
.menu {
  margin-left: 15%;
}

.my-container {
  background-color: #f5f5f5;
}

.top-row {
  position: relative;
  padding-top: 10px;
  margin-left: 15%;
}

.search-input {
  width: 50%;
  border: 0px;
}

.btnAdd {
  position: absolute;
  right: 0px;
  bottom: 90px;
}

.pagination {
  float: right;
  position: absolute;
  right: -10px;
  top: 105px;
}

.card {
  max-width: 85%;
  max-height: auto;
  margin-left: 12.5vw;
}

#id {
  max-width: auto;
  border: 0px;
}
</style>
