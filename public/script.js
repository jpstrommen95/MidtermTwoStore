var app = new window.Vue({
  el: '#app',

  data: {
    items: [],
  },

  created() {
    this.getItems();
  },

  methods: {

    async getItems() {
      try {
        let response = await window.axios.get("/api/items");
        this.items = response.data;
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },

  },

});
