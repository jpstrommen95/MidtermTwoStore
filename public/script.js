var app = new window.Vue({
  el: '#app',

  data: {
    items: [],
    madePurchase: false,
  },

  computed: {

    selectedItems() {
      let retItems = [];

      this.items.forEach(item => {
        if (item.isSelected) {
          retItems.push(item);
          // console.log("pushing item");
          // console.log(item);
        }
      });

      return retItems;
    },

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

    editItems() {
      this.madePurchase = true;
      this.selectedItems.forEach(item => {
        this.editItem(item);
      });
    },

    async editItem(item) {
      // console.log("entered editItem");
      // console.log(item);
      try {
        let response = await window.axios.put("/api/items/" + item._id, {
          quantity: item.quantity + 1,
        });
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },

  },

});
