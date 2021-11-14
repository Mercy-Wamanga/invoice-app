<template>
  <!-- Modal -->
  <div
    class="modal"
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
        <form @submit.prevent="onSubmit">
          <div class="modal-body">
            <div class="form">
              <Input label="ID:" type="text" v-model="id" />
              <Input label="Date:" type="date" v-model="createdAt" />
              <Input label="Name:" type="text" v-model="name" />
              <Input label="Address:" type="text" v-model="address" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-success">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
//import form element components.
import Input from "@/components/form-elements/BaseInput.vue";
export default {
  data() {
    const picked = new Date();
    return {
      ModalHeading: "Add a Customer",
      id: "",
      createdAt: picked,
      name: "",
      address: "",
    };
  },
  methods: {
    customerObject() {
      const customerObj = {
        id: this.id,
        createdAt: this.createdAt,
        name: this.name,
        address: this.address,
      };

      return customerObj;
    },
    ...mapActions(["addCustomer"]),
    onSubmit() {
      const customer = this.customerObject();
      this.$store.dispatch("addCustomer", customer);
    },
  },

  components: {
    Input,
  },
};
</script>

<style>
.modal {
  max-width: 450px;
  margin-left: 35%;
}
</style>
