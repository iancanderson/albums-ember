import DS from "ember-data";

export default DS.Model.extend({
  artist: DS.attr("string"),
  releasedOn: DS.attr("date"),
  title: DS.attr("string"),
});
