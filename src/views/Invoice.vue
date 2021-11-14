<template>
  <div class="container">
    <div class="container-left">
      <SideNavigation :open="navOpen" />
    </div>
    <div class="container-right ms-5">
      <section class="my-container">
        <Menu class="menu" @toggleNav="navOpen = !navOpen" /><br />
        <div class="top-row">
          <Heading
            heading="Invoice Data"
            subHeading="Invoice Data  is available on this page"
          />

          <hr class="mt-3 w-100" />
          <div class="form-items">
            <Search class="mt-4" />

            <AddButton
              title="Add Customer"
              class="btnAdd"
              data-bs-toggle="modal"
              data-bs-target="#addModal"
            />
            <CustomerModal></CustomerModal>
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
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in pageOfItems" :key="customer.id">
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
                  >
                    <span class="icons">
                      <fa icon="edit" />
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
            <jw-pagination
              :pageSize="20"
              :items="allCustomers"
              @changePage="onChangePage"
              :styles="customStyles"
              class="
                position-absolute
                bottom-0
                start-50
                translate-middle-x
                mt-5
              "
            ></jw-pagination>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

//import components.
import SideNavigation from "@/components/SidebarNavigation.vue";
import Menu from "@/components/Humburger.vue";
import Heading from "@/components/Heading.vue";
import Search from "@/components/Search.vue";
import AddButton from "@/components/AddButton.vue";
import CustomerModal from "../components/ModalForms/CustomerModal.vue";

export default {
  name: "Customer",
  components: {
    SideNavigation,
    Menu,
    Heading,
    Search,
    AddButton,
    CustomerModal,
    //Input,
    //datepicker,
  },
  data() {
    // const picked = new Date();
    return {
      navOpen: true,
      pageOfItems: [],
      customStyles,
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
    onSubmit() {
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

//JW Pagination Customised styles

const customStyles = {
  a: {
    color: "green",
    cursor: "pointer",
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
  margin-left: 5vw;
  width: 100vw;
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
  margin-top: 5%;
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
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
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
