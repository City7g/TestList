<template>
  <div class="app">
    <Header @showCart="showCart" />
    <main class="content">
      <Catalog @showCart="showCart" />
    </main>
    <transition name="opacity">
      <div v-if="isCart" class="app__wrap" @click="hideCart"></div>
    </transition>
    <transition name="translate-full">
      <Cart v-if="isCart" @hideCart="hideCart" />
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Catalog from "@/components/Catalog";
import Cart from "@/components/Cart";
import { mapActions } from "vuex";

export default {
  name: "Index",
  data() {
    return {
      isCart: false,
    };
  },
  components: {
    Header,
    Catalog,
    Cart,
  },
  methods: {
    ...mapActions(["loadItems", "loadCategory", "getCartInStorage"]),
    showCart() {
      this.isCart = true;
    },
    hideCart() {
      this.isCart = false;
    },
  },
  mounted() {
    this.loadItems();
    this.loadCategory();
    this.getCartInStorage();
  },
};
</script>

<style lang="scss">
.app {
  font-family: "PT Sans", sans-serif;
}

.app__wrap {
  position: fixed;
  z-index: 8;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  background-color: #fff;
  opacity: 0.8;
}

a {
  display: inline-block;
  text-decoration: none;
}

input {
  border: none;
}

button {
  border: none;
}

img {
  max-width: 100%;
}

ul {
  list-style: none;
}

.content {
  width: 100%;
  max-width: 1240px;
  padding: 20px 20px;
  margin: 0 auto;
}

.translate-full-enter-active,
.translate-full-leave-active {
  transition: all 0.4s;
}
.translate-full-enter,
.translate-full-leave-to {
  transform: translateX(100%);
}

.opacity-enter-active,
.opacity-leave-active {
  transition: all 0.4s;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
</style>
