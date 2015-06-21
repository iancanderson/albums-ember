import Ember from "ember";
import Pretender from "pretender";
import { module, test } from "qunit";
import startApp from "../helpers/start-app";

var App, server;

module("Integration - Albums Page", {
  beforeEach: function() {
    App = startApp();
    var albums = [
      {
        id: "1",
        type: "albums",
        attributes: {
          artist: "The Beatles",
          title: "Abbey Road",
        }
      }
    ];

    server = new Pretender(function() {
      this.get("/api/albums", function(request) {
        return [
          200,
          {"Content-Type": "application/json"},
          JSON.stringify({ data: albums })
        ];
      }); 
    });
  },
  afterEach: function() {
    Ember.run(App, "destroy");
    server.shutdown();
  }
});

test("Can be navigated to from landing page", function(assert) {
  visit("/").then(function() {
    click("a:contains('My Albums')").then(function() {
      assert.equal(find("a:contains('Abbey Road')").length, 1);
    });
  });
});

test("Shows links to albums", function(assert) {
  visit("/albums").then(function() {
    assert.equal(find("a:contains('Abbey Road')").length, 1);
  });
});
