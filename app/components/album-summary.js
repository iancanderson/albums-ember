import Ember from "ember";

export default Ember.Component.extend({
  actions: {
    clickDelete: function() {
      if (confirm("Delete album?")) {
        this.get("album").destroyRecord();
      }
    }
  }
});
