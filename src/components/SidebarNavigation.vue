<template>
  <transition name="show">
    <div class="sidebar" v-if="open">
      <div id="logo">
        <img :src="imageLogo" class="logo" />
      </div>
      <ul class="navbar-nav d-flex flex-column w-">
        <li>
          <router-link to="/customer">Customers</router-link>
        </li>
        <li>
          <router-link to="/invoice">Invoices</router-link>
        </li>
        <li>
          <router-link to="/invoice-item">Invoices-Items</router-link>
        </li>
        <li>
          <router-link to="/product">Products</router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
//Import images
import logo from "@/assets/logo3.jpg";

export default {
  name: "SidebarNavigation",
  data() {
    return {
      imageLogo: logo,
    };
  },
  props: ["open"],
  methods: {},
};
</script>

<style scoped>
/* .sidebar {
  width: 100%;
  height: 100%;
} */

.sidebar {
  width: 15vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #333333;
  color: white;
  margin-left: 5px;
}
.sidebar ul {
  padding-left: 0;
  /* margin-top: 32vh; */
  /* height: 30vh; */
}
.sidebar li {
  list-style-type: none;
  margin-top: 10px;
  text-align: left;
}
a {
  color: #f4f4f4;
  padding-left: 30px;
  text-decoration: none;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 15px;
}
a:hover {
  transform: scale(0.97);
  background-color: #000000;
  color: #f4f4f4;
}

.router-link-active {
  background-color: #000000;
  color: #fff;
}
.logo {
  width: 100%;
  height: 85%;
}
#logo {
  margin-top: 10%;
  background: #000000;
}

.show-enter-from {
  opacity: 0;
}
.show-enter-to {
  opacity: 1;
}
.show-enter-active {
  transition: all 500ms ease;
}
.show-leave-from {
  opacity: 1;
}
.show-leave-to {
  opacity: 0;
}
.show-leave-active {
  transition: all 500ms ease;
}
</style>
