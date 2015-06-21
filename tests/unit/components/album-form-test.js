import { moduleForComponent, test } from 'ember-qunit';
import Ember from "ember";

moduleForComponent('album-form', 'Unit | Component | album form', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test("clicking button fires action with attributes", function(assert) {
  assert.expect(4);

  const artist = "Queen";
  const title = "A Night at the Opera";
  const component = this.subject();

  this.$();

  Ember.run(function() {
    component.set("artist", artist);
    component.set("title", title);
  });

  const targetObject = {
    externalAction: function(attributes) {
      assert.equal(artist, attributes.artist);
      assert.equal(title, attributes.title);
    }
  };

  component.set("action", "externalAction");
  component.set("targetObject", targetObject);

  this.$().find("button").click();

  assert.equal(component.get("artist"), "");
  assert.equal(component.get("title"), "");
});
