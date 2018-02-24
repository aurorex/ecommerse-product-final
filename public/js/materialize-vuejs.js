// Remove this instance and all will work
var app = new Vue({
  el: '#app',
  mounted: function() {
    $('.modal').modal();
  }
});