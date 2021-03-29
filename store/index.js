export const state = () => ({
  cart: [],
  allItems: [],
  items: [],
  category: []
})

export const mutations = {
  saveItems(state, items) {
    state.items = items
    state.allItems = items
  },
  saveCategory(state, items) {
    state.category = items
  },
  saveCartFromLocal(state, cart) {
    state.cart = cart
  },
  pushToCart(state, id) {
    const idx = state.cart.findIndex(c => c == id)
    if (idx == -1) {
      state.cart.push(id)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  delFromCart(state, id) {
    state.cart = state.cart.filter(c => c !== id)
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  delAllFromCart(state) {
    state.cart = []
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  filterByCategory(state, categoryID) {
    state.items = state.allItems.filter(c => c.category == categoryID)
  },
  sortByPrice(state) {
    state.items.sort((a, b) => a.price < b.price ? 1 : -1);
  },
  sortByRating(state) {
    state.items.sort((a, b) => a.rating < b.rating ? 1 : -1);
  }
}

export const actions = {
  async loadItems({ commit }) {
    try {
      const items = await this.$axios.$get('https://frontend-test.idaproject.com/api/product')
      commit('saveItems', items)
    } catch (error) {
      commit('saveItems', 'Товары не удалось загрузить')
    }
  },
  async loadCategory({ commit }) {
    const items = await this.$axios.$get('https://frontend-test.idaproject.com/api/product-category')
    commit('saveCategory', items)
  },
  addToCart({ commit }, id) {
    commit('pushToCart', id)
  },
  getCartInStorage({ commit }) {
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'))
      commit('saveCartFromLocal', cart);
    }
  }
}

export const getters = {
  getItems(state) {
    return state.items.slice(0, 12)
  },
  getCategory(state) {
    return state.category
  },
  getCounCart(state) {
    return state.cart.length;
  },
  getListCart(state) {
    return state.cart.map((id) => {
      const product = state.allItems.find(c => c.id == id)
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        photo: product.photo,
        category: product.category,
        rating: product.rating
      };
    })
  },
  getListIdInCart(state) {
    return state.cart
  }
};
