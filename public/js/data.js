// Categoría de celulares y smartphones
const api = `https://api.mercadolibre.com/sites/MPE/search?q=smartphone&condition=new`;

fetch(api)
  .then(function(response) {
    console.log(response);
    return response.json();
  }).then(function(data) {
    // Todas las marcas de celulares y smartphones
    console.log(data['results']);
    const phones = data['results'];

    phones.forEach((phone) => {
      const phonesInThisCategory = phone['title'];
      console.log(phonesInThisCategory);  
    });
  });