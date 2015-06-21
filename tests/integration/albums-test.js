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
          title: "Revolver",
        }
      },
      {
        id: "2",
        type: "albums",
        attributes: {
          artist: "Alvvays",
          title: "Alvvays",
        }
      },
      {
        id: "3",
        type: "albums",
        attributes: {
          artist: "The Beatles",
          title: "Abbey Road",
        }
      },
    ];

    server = new Pretender(function() {
      this.get("/api/albums", function(request) {
        return [
          200,
          {"Content-Type": "application/json"},
          JSON.stringify({ data: albums })
        ];
      });

      this.post("/api/albums", function(request) {
        const response = {
          data: {
            id: "6",
            type: "albums",
            attributes: JSON.parse(request.requestBody)["data"]["attributes"]
          }
        };
        return [201, {}, JSON.stringify(response)];
      });
    });
  },
  afterEach: function() {
    Ember.run(App, "destroy");
    server.shutdown();
  }
});

test("Can be navigated to from landing page", function(assert) {
  visit("/");
  click("a:contains('My Albums')").then(function() {
    assert.equal(find("a:contains('Abbey Road')").length, 1);
  });
});

test("Shows links to albums by artist, then title", function(assert) {
  visit("/albums").then(function() {
    const albumNamesInOrder = find("a.album").map(function() {
      return this.text.trim();
    });
    assert.equal(albumNamesInOrder[0], "Alvvays - Alvvays");
    assert.equal(albumNamesInOrder[1], "The Beatles - Abbey Road");
    assert.equal(albumNamesInOrder[2], "The Beatles - Revolver");
  });
});

test("Adding a new album to the list", function(assert) {
  visit("/albums");

  fillIn("input.artist", "Weezer");
  fillIn("input.title", "Pinkerton");
  fillIn("input.released-on", "1996-09-24");
  click("button.submit");

  andThen(function() {
    assert.equal(find("a.album")[3].text.trim(), "Weezer - Pinkerton");
  });
});
