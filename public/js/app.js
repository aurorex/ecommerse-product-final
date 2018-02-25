$(document).ready(function() {
  var parseUrl = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  
  var arrRuta = parseUrl.exec(window.location.href);
  console.log(arrRuta[7].split('=')[1]);
  var accessToken = arrRuta[7].split('=')[1];
  
  $.ajax({
	  dataType: 'json',
	  type: 'GET',
	  url: 'https://api.mercadolibre.com/users/me?access_token=' + accessToken,
	  beforeSend: function() {
	  	console.log('enviando....');
	  },
	  success: function(data) {
	  	console.log(data);	
	  },
	  error: function(error) {
	  	console.log(error);
	  }
  });	

  // función para el routing de el login de Mercado Libre
  // page('https://auth.mercadolibre.com.pe/authorization?response_type=token&client_id=2884929440338550', login);

  // function login() {
  //   var page = document.querySelector('p');
  //   page.innerHTML = 'LOGIN'; 
  // }
});
