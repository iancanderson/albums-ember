import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span",
  formattedDate: function() {
    return moment.utc(this.get("date")).format("YYYY-M-D");
  }.property("date"),
});
