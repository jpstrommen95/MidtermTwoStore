var app = new window.Vue({
  el: '#admin',

  data: {
    title: "",
    description: "",

    file: null,
    addItem: null,
    items: [],

    findTitle: "",
    findItem: null,
  },

  computed: {
    suggestions() {
      // Added a check so we don't see an ugly list of everything.
      // if (this.findTitle == "") {
      //   return [];
      // }
      // else {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      // }
      //
      // Nevermind, it's hard to remember what I named things.
    }
  },

  created() {
    this.getItems();
  },

  methods: {

    fileChanged(event) {
      this.file = event.target.files[0];
    },

    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        let r1 = await window.axios.post('/api/photos', formData);
        let r2 = await window.axios.post('/api/items', {
          title: this.title,
          description: this.description,
          path: r1.data.path,
        });
        this.addItem = r2.data;
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

    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },

    async editItem(item) {
      try {
        let response = await window.axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },

    async deleteItem(item) {
      try {
        console.log("item to delete:");
        console.log(item._id);
        let response = window.axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },

  },

});
