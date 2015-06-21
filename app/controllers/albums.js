import Ember from "ember";

export default Ember.Controller.extend({
  sortedAlbums: function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      content: this.get("model"),
      sortAscending: true,
      sortProperties: ["artist", "title"],
    });
  }.property("model"),
});
