$(document).ready(function() {
  var parseUrl = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  
  const arrRuta = parseUrl.exec(window.location.href);
  console.log(arrRuta[7].split('=')[1]);
  const accessToken = arrRuta[7].split('=')[1];
  
  $.ajax({
	  dataType: 'json',
	  type: 'GET',
	  url: 'https://api.mercadolibre.com/users/me?access_token=' + accessToken,
	  beforeSend: function() {
	  	console.log('enviando....');
	  },
	  success: function(data) {
      console.log(data);
      const username = $('#username');
      const lastname = $('#lastname');
      username.append(data.first_name + '&nbsp;'); 
      lastname.append(data.last_name); 	
	
	  },
	  error: function(error) {
	  	console.log(error);
	  }
  });	

  // función para el routing de el login de Mercado Libre
  // page('/home', login);
  
  // function login() {
  //   var page = document.querySelector('p');
  //   page.innerHTML = 'LOGIN'; 
  // }
});
