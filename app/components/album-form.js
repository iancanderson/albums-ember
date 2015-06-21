import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save: function() {
      const attributes = {
        artist: this.get("artist"),
        title: this.get("title")
      };
      this.sendAction("action", attributes);
    }
  }
});
