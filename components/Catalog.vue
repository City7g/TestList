<template>
  <div class="catalog">
    <div class="catalog__wrap">
      <h1 class="catalog__title">Каталог</h1>
      <div class="catalog__sort">
        <p class="catalog__sort-text" @click="isShowSortList = !isShowSortList">
          Сортировать по:
          <span class="catalog__sort-value">{{ options[sort].short }}</span>
          <img
            src="~assets/img/sort-arr.svg"
            alt=""
            class="catalog__sort-arr"
            :class="{ active: isShowSortList }"
          />
        </p>
        <transition name="opacity">
          <ul class="catalog__sort-list" v-if="isShowSortList">
            <li
              v-for="(item, index) in options"
              :key="item.value"
              @click="sortBy(item.value, index)"
              class="catalog__sort-item"
            >
              {{ item.name }}
            </li>
          </ul>
        </transition>
      </div>
      <div class="catalog__category">
        <a
          v-for="item in getCategory"
          :key="item.id"
          @click.prevent="filterByCategory(item.id)"
          class="catalog__category-item"
          >{{ item.name }}</a
        >
      </div>
      <div class="catalog__list">
        <div v-if="!getItems.length" class="catalog__list-loader">
          <img src="~assets/img/loader.svg" alt="" />
        </div>
        <div
          v-else
          class="catalog__item"
          v-for="item in getItems"
          :key="item.id"
        >
          <img
            :src="'https://frontend-test.idaproject.com' + item.photo"
            class="catalog__item-img"
            alt="item"
          />
          <h3 class="catalog__item-name">{{ item.name }}</h3>
          <p class="catalog__item-price">
            {{ fixPrice(item.price) }}
          </p>
          <span class="catalog__item-rating">
            <img src="~assets/img/rating.svg" alt="" />
            {{ item.rating }}
          </span>
          <img
            src="~/assets/img/bag.svg"
            class="catalog__item-bag"
            :class="{ 'in-bag': isItemInBag(item.id) }"
            alt="item"
            @click="addToCard(item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "Catalog",
  data() {
    return {
      sort: 0,
      isShowSortList: false,
      options: [
        {
          name: "По цене",
          short: "цене",
          value: "price",
        },
        {
          name: "По популярности",
          short: "популярность",
          value: "rating",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getItems", "getListIdInCart", "getCategory"]),
  },
  methods: {
    ...mapActions(["addToCart"]),
    ...mapMutations(["filterByCategory", "sortByPrice", "sortByRating"]),
    addToCard(id) {
      this.addToCart(id);
      // this.$emit("showBag");
    },
    isItemInBag(id) {
      return this.getListIdInCart.indexOf(id) != -1;
    },
    sortBy(value, index) {
      value == "price" ? this.sortByPrice() : this.sortByRating();
      this.sort = index;
      this.isShowSortList = false;
    },
    fixPrice(value) {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
      }).format(value);
    },
  },
};
</script>

<style>
.catalog__wrap {
  width: 100%;
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .catalog__wrap {
    grid-template-columns: 1fr;
  }
}

.catalog__title {
  color: #1f1f1f;
  font-size: 32px;
  line-height: 41px;
  font-weight: 700;
}

.catalog__sort {
  position: relative;
  justify-self: flex-end;
  align-self: center;
}

@media (max-width: 768px) {
  .catalog__sort {
    display: none;
  }
}

.catalog__sort-text {
  display: flex;
  align-items: center;

  color: #1f1f1f;
  font-size: 16px;
  line-height: 21px;
  font-weight: 400;
  cursor: pointer;
}

.catalog__sort-value {
  margin-left: 6px;

  color: #59606d;
  font-size: 16px;
  line-height: 21px;
  font-weight: 400;
}

.catalog__sort-arr {
  margin-left: 4px;
  margin-top: 4px;

  transition: all 0.3s ease;
}

.catalog__sort-arr.active {
  transform: rotate(180deg);
}

.catalog__sort-list {
  position: absolute;
  top: calc(100% + 6px);
  left: 0px;
  width: 100%;
  z-index: 3;

  padding: 8px 0;

  background-color: #fff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  cursor: pointer;
}

.catalog__sort-item {
  padding: 4px 12px;
  color: #959dad;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
}

.catalog__sort-item:hover {
  color: #1f1f1f;
  background: #f8f8f8;
}

@media (max-width: 768px) {
  .catalog__category {
    display: none;
  }
}

.catalog__category-item {
  display: block;
  margin-bottom: 16px;

  color: #1f1f1f;
  font-size: 16px;
  line-height: 21px;
  font-weight: 400;
  cursor: pointer;
  text-decoration: underline;
}

.catalog__category-item:hover {
  text-decoration: none;
}

.catalog__category-item.disabled {
  color: #959dad;
  text-decoration: none;
}

.catalog__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  position: relative;
}

@media (max-width: 768px) {
  .catalog__list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .catalog__list {
    grid-template-columns: 1fr;
  }
}

.catalog__item {
  position: relative;
  padding: 16px;

  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.catalog__item-name {
  margin-bottom: 6px;

  color: #59606d;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
}

.catalog__item-price {
  color: #1f1f1f;
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;
}

.catalog__item-img {
  display: block;
  margin: 0 auto 16px;
}

.catalog__item-rating {
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 16px;
  left: 16px;

  color: #f2c94c;
  font-size: 10px;
  line-height: 13px;
  font-weight: 700;
}

.catalog__item-rating img {
  margin-right: 2px;
}

.catalog__item-bag {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 12px;

  opacity: 0.6;
  cursor: pointer;
  transition: 0.3s all ease;
}

.catalog__item-bag.in-bag,
.catalog__item-bag:hover {
  opacity: 1;
}

.catalog__list-loader {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
