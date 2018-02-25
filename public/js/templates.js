$(document).ready(function() {
  let source = $('#first-template').html();
  let template = Handlebars.compile(source);

  let context = {
    title: 'All about Handlebars',
    body: '<p>This is a post about tags</p>'
  };
  let el_html = template(context);

  $('#render_here').html(el_html);
  // $('#render_here_again').html(el_html);
});