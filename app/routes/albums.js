import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
    return this.get("store").findAll("album");
  },

  actions: {
    createAlbum: function(attributes) {
      this.get("store").createRecord("album", attributes).save();
    },
    deleteAlbum: function(album) {
      album.destroyRecord();
    }
  }
});
