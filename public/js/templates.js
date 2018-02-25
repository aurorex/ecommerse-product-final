$(document).ready(function() {
  let source = $('#first-template').html();
  let template = Handlebars.compile(source);

  let context = {
    title: 'Buy Smart',
    logo: '<p>Compra inteligente</p>',
    mainLink: '<a href="https://www.google.com.pe/?gws_rd=ssl">Aquí</a>'
  };
  let el_html = template(context);

  $('#render_here').html(el_html);
  // $('#render_here_again').html(el_html);
});