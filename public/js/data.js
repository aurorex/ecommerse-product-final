// Categoría de celulares y smartphones
const api = `https://api.mercadolibre.com/categories/MPE1055`;

fetch(api)
  .then(function(response) {
    console.log(response);
    return response.json();
  }).then(function(data) {
    // Todas las marcas de celulares y smartphones
    console.log(data['children_categories']);
    const phones = data['children_categories'];

    phones.forEach((phone) => {
      const totalPhonesInThisCategory = phone['total_items_in_this_category'];
      console.log(totalPhonesInThisCategory);
      
    });
  });