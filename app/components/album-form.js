import Ember from "ember";

export default Ember.Component.extend({
  artist: "",
  title: "",
  actions: {
    save: function() {
      const attributes = {
        artist: this.get("artist"),
        releasedOn: new Date(this.get("releasedOn")),
        title: this.get("title"),
      };
      this.sendAction("action", attributes);
      this.set("artist", "");
      this.set("title", "");
    }
  }
});
