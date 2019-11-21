var app = new window.Vue({
  el: '#admin',

  data: {
    name: "",
    price: 0,
    quantity: 0,
    url: "",

    items: [],

  },

  computed: {

    sortedProducts() {
      return this.items.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (b.name > a.name) {
          return 1;
        }
        return 0;
      });
    },

  },

  created() {
    this.getItems();
  },

  methods: {

    async addProduct() {
      console.log("Entering addProduct()");
      try {
        // const formData = new FormData();
        // formData.append('photo', this.file, this.file.name);
        // let r1 = await window.axios.post('/api/photos', formData);

        let response = await window.axios.post('/api/items', {
          name: this.name,
          price: this.price,
          quantity: 0, // None have been sold yet
          url: this.url,
        });
        this.getItems();
        console.log("Adding item");
        console.log(response.data);
      }
      catch (error) {
        console.log(error);
      }
    },

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

    // selectItem(item) {
    //   this.findTitle = "";
    //   this.findItem = item;
    // },

    // async editItem(item) {
    //   try {
    //     let response = await window.axios.put("/api/items/" + item._id, {
    //       title: this.findItem.title,
    //       description: this.findItem.description,
    //     });
    //     this.findItem = null;
    //     this.getItems();
    //     return true;
    //   }
    //   catch (error) {
    //     console.log(error);
    //   }
    // },

    async deleteItem(item) {
      try {
        console.log("item to delete:");
        console.log(item._id);
        let response = window.axios.delete("/api/items/" + item._id);
        this.getItems();
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },

  },

});
