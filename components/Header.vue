<template>
  <header class="header">
    <div class="header__wrap">
      <div class="header__name">TestList</div>
      <div class="header__cart" @click="showCart">
        <img src="~/assets/img/cart.svg" class="header__cart-img" alt="cart" />
        <div class="header__cart-count">
          <span class="header__cart-count-text" ref="counter">0</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters(["getCounCart"]),
  },
  methods: {
    showCart() {
      this.$emit('showCart')
    }
  },
  watch: {
    getCounCart(newValue) {
      this.$refs.counter.classList.add('active')
      setTimeout(() => {
        this.$refs.counter.textContent = newValue
      }, 300);
      setTimeout(() => {
        this.$refs.counter.classList.remove('active')
      }, 600);
    }
  }
};
</script>

<style>
.header {
  position: sticky;
  z-index: 3;
  top: 0px;

  background-color: #fff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 8px 8px;
}

.header__wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1240px;
  padding: 20px 20px;
  margin: 0 auto;
}

.header__name {
  font-family: "PT Sans";
  font-size: 22px;
  line-height: 28px;
  font-weight: bold;
  color: #59606d;
}

.header__cart {
  position: relative;
  cursor: pointer;
}

.header__cart-count {
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: -4px;
  right: -6px;
  width: 12px;
  height: 12px;

  background-color: #959dad;
  border-radius: 50%;
  overflow: hidden;
}

.header__cart-count-text {
  color: #fff;
  font-size: 8px;
  line-height: 8px;
  font-weight: 700;
}

.header__cart-count-text.active {
  animation: animation-text 0.6s;
}

@keyframes animation-text {
  0% {
    transform: translateY(0);
  }

  49% {
    transform: translateY(15px);
  }

  50% {
    transform: translateY(-15px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
