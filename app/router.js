import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("albums", function() {});
  this.route("album", { path: "/albums/:album_id" });
});

export default Router;
