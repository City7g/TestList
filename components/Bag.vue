<template>
  <div class="bag" ref="bag">
    <h4 class="bag__title">Корзина</h4>
    <template v-if="!formSubmit">
      <!-- Корзина пуста -->
      <template v-if="!getListCart.length">
        <p class="bag__description">
          Пока что вы ничего не добавили в корзину.
        </p>
        <a href="#" class="bag__link" @click.prevent="hideBag">
          Перейти к выбору
        </a>
      </template>
      <!-- Карзина с товарами -->
      <template v-else>
        <p class="bag__description--grey">Товары в корзине</p>
        <div v-for="item in getListCart" :key="item.id" class="bag__item">
          <img
            :src="'https://frontend-test.idaproject.com' + item.photo"
            alt=""
            class="bag__item-img"
          />
          <h3 class="bag__item-name">{{ item.name }}</h3>
          <p class="bag__item-price">
            {{ fixPrice(item.price) }}
          </p>
          <span class="bag__item-rating">
            <img src="~assets/img/rating.svg" alt="" />
            {{ item.rating }}
          </span>
          <img
            @click="delFromCart(item.id)"
            src="~/assets/img/bag-del.svg"
            class="bag__item-del"
            alt="del"
          />
        </div>
        <div class="bag__form">
          <h4 class="bag__form-title">Оформить заказ</h4>
          <form class="bag__form-form" @submit.prevent="orderProducts">
            <input
              v-model="name"
              type="text"
              placeholder="Ваше имя"
              class="bag__form-input"
            />
            <input
              v-model="phone"
              type="tel"
              placeholder="Телефон"
              class="bag__form-input"
            />
            <input
              v-model="address"
              type="text"
              placeholder="Адрес"
              class="bag__form-input"
            />
            <button type="submit" class="bag__form-btn">Отправить</button>
          </form>
          <transition name="translate-full">
            <p class="bag__form-error" v-if="errorForm">
              <img src="~assets/img/error.svg" alt="error" />
              Все поля обязательные.<br />После удачной отправки формы
              содержимое корзины очищается
            </p>
          </transition>
        </div>
      </template>
    </template>
    <!-- Заявка отправлена -->
    <template v-else>
      <div class="bag__ok">
        <img class="bag__ok-img" src="~assets/img/ok.png" alt="OK" />
        <h4 class="bag__ok-title">Заявка успешно отправлена</h4>
        <p class="bag__ok-description">Вскоре наш менеджер свяжется с Вами</p>
      </div>
    </template>
    <div class="bag__close" @click="hideBag"></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Catalog",
  data() {
    return {
      name: "",
      phone: "",
      address: "",
      errorForm: false,
      formSubmit: false,
    };
  },
  computed: {
    ...mapGetters(["getListCart"]),
  },
  methods: {
    ...mapMutations(["delFromCart", "delAllFromCart"]),
    hideBag() {
      this.$emit("hideBag");
    },
    orderProducts() {
      if (this.name == "" || this.tel == "" || this.address == "") {
        this.errorForm = true;
        setTimeout(() => {
          this.$refs.bag.scrollBy({
            top: 1000,
            behavior: "smooth",
          });
        }, 50);
        setTimeout(() => {
          this.errorForm = false;
        }, 3000);
      } else {
        const formData = {
          name: this.name,
          phone: this.phone,
          address: this.address,
        };
        console.log("submit", formData, this.getListCart);
        this.delAllFromCart();
        this.name = "";
        this.phone = "";
        this.address = "";
        this.formSubmit = true;
        setTimeout(() => {
          this.formSubmit = false;
        }, 3000);
      }
    },
    fixPrice(value) {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
      }).format(value);
    },
  },
  mounted() {
    document.querySelectorAll(".bag__form-input").forEach((i) => {
      i.addEventListener("input", (e) => {
        var x = e.target.value
          .replace(/\D/g, "")
          .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2]
          ? x[1]
          : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      });
    });
    // this.$refs.phone.addEventListener("input", function (e) {
    //   var x = e.target.value
    //     .replace(/\D/g, "")
    //     .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    //   e.target.value = !x[2]
    //     ? x[1]
    //     : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    // });
  },
};
</script>

<style lang="scss">
.bag {
  position: fixed;
  z-index: 10;
  top: 0px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
  scrollbar-width: none;

  width: 460px;
  max-width: 100%;
  min-height: 100vh;
  padding: 50px;

  background: #ffffff;
  box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px 0px 0px 8px;

  @media (max-width: 768px) {
    padding: 30px;
  }

  &__title {
    margin-bottom: 24px;

    color: #000000;
    font-size: 32px;
    line-height: 41px;
    font-weight: 700;
  }

  &__description {
    margin-bottom: 24px;

    color: #000000;
    font-size: 22px;
    line-height: 28px;
    font-weight: 400;

    &--grey {
      margin-bottom: 16px;

      color: #59606d;
      font-size: 18px;
      line-height: 23px;
      font-weight: 400;
    }
  }

  &__link {
    display: block;
    padding: 14px 20px;

    color: #fff;
    background: #1f1f1f;
    text-align: center;
    font-size: 16px;
    line-height: 21px;
    font-weight: 400;
    border-radius: 8px;
  }

  &__close {
    position: absolute;
    top: 50px;
    right: 50px;
    cursor: pointer;
    width: 24px;
    height: 24px;

    @media (max-width: 768px) {
      top: 30px;
      right: 30px;
    }

    &:after,
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;

      width: 19px;
      height: 2px;

      background-color: #000;
      border-radius: 2px;
      transform: translate(-50%, -50%);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  &__item {
    display: grid;
    grid-template-columns: 70px 1fr 20px;
    grid-template-rows: repeat(3, auto);
    gap: 6px 20px;

    padding: 12px 25px;
    margin-bottom: 12px;

    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;

    &-img {
      grid-row: 1 / -1;
      grid-column: 1 / 2;
      align-self: center;
    }

    &-name {
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
      color: #59606d;
    }

    &-price {
      margin-bottom: 10px;

      font-size: 14px;
      line-height: 18px;
      font-weight: 700;
      color: #1f1f1f;
    }

    &-rating {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      color: #f2c94c;
      font-size: 10px;
      line-height: 13px;
      font-weight: 700;

      & img {
        margin-right: 2px;
      }
    }

    &-del {
      grid-row: 1 / -1;
      grid-column: 3 / 4;
      align-self: center;

      cursor: pointer;
    }
  }

  &__form {
    margin-top: 32px;

    &-title {
      margin-bottom: 16px;

      color: #59606d;
      font-size: 18px;
      line-height: 23px;
      font-weight: 400;
    }

    &-form {
      display: flex;
      flex-direction: column;
    }

    &-input {
      padding: 14px;
      margin-bottom: 16px;

      background: #f8f8f8;
      color: #1f1f1f;
      font-size: 16px;
      line-height: 21px;
      font-weight: 400;
      border-radius: 8px;

      &::placeholder {
        opacity: 1;
        color: #959dad;
      }
    }

    &-btn {
      padding: 14px;

      color: #fff;
      background-color: #1f1f1f;
      font-size: 16px;
      line-height: 21px;
      font-weight: 400;
      border-radius: 8px;
      cursor: pointer;

      &:focus,
      &:active {
        background: #59606d;
      }
    }

    &-error {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      margin-top: 32px;
      margin-bottom: 20px;

      font-size: 16px;
      line-height: 21px;
      color: #000000;

      & img {
        margin-right: 8px;
        margin-top: 6px;
      }
    }
  }

  &__ok {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: calc(100% - 70px);

    &-img {
      margin-bottom: 24px;
    }

    &-title {
      margin-bottom: 2px;

      color: #000000;
      font-size: 24px;
      line-height: 31px;
      font-weight: 700;
    }

    &-description {
      color: #59606d;
      font-size: 16px;
      line-height: 21px;
      font-weight: 400;
    }
  }
}
</style>
