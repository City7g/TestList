<template>
  <div class="app">
    <Header @showBag="showBag" />
    <main class="content">
      <Catalog @showBag="showBag" />
    </main>
    <transition name="opacity">
      <div v-if="isBag" class="app__wrap" @click="hideBag"></div>
    </transition>
    <transition name="translate-full">
      <Bag v-if="isBag" @hideBag="hideBag" />
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Catalog from "@/components/Catalog";
import Bag from "@/components/Bag";
import { mapActions } from "vuex";

export default {
  name: "Index",
  data() {
    return {
      isBag: false,
    };
  },
  components: {
    Header,
    Catalog,
    Bag,
  },
  methods: {
    ...mapActions(["loadItems", "loadCategory", "getCartInStorage"]),
    showBag() {
      this.isBag = true;
    },
    hideBag() {
      this.isBag = false;
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
