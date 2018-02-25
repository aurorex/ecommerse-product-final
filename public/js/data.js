// Categoría de celulares y smartphones
const api = 'https://api.mercadolibre.com/sites/MPE/search?q=smartphone&condition=new';

fetch(api)
  .then(function(response) {
    // console.log(response);
    return response.json();
  }).then(function(data) {
    // Todas las marcas de celulares y smartphones
    console.log(data['results']);
    const phones = data['results'];
    const phonesAvailableFiltersPrice = data['available_filters'][4]['name']; // Filtro PRECIO
    const phonesAvailableFiltersPriceRanges = data['available_filters'][4]['values']; // Array Filtro PRECIO RANGOS
    const phonesAvailableFiltersProduct = data['available_filters'][14]['values']; // Array Filtro Nombre de celular
    // console.log(phonesAvailableFiltersPrice);
    // console.log(phonesAvailableFiltersPriceRanges);
    // console.log(phonesAvailableFiltersProduct);

    phones.forEach(function(phone) {
      const phoneTitlesInThisCategory = phone['title'];
      const phonesPrices = phone['price'];
      const phonesAvailableQuantity = phone['available_quantity'];
      const phonesSoldQuantity = phone['sold_quantity'];
      const phonesInstallmentsquantity = phone['installments']['quantity'];
      const phonesInstallmentsAmout = phone['installments']['amount'];
      const targetID = phone['id'];
      const fullInfoPhones = `https://api.mercadolibre.com/items/${targetID}`;

      // console.log('Nombre del cel ' + phoneTitlesInThisCategory);
      // console.log('Precio de cel en S/ ' + phonesPrices);
      // console.log('Cantidad disponible de cels ' + phonesAvailableQuantity);
      // console.log('Cantidad de cels vendidos ' + phonesSoldQuantity);   
      // console.log('Enlace a info completa ' + fullInfoPhones);
      // console.log('Cantidad de fracciones a pagar ' + phonesInstallmentsquantity);
      // console.log('Monto de fracción a pagar en S/ ' + phonesInstallmentsAmout);      
      

      /* FETCH DE PÁGINA CON INFORMACIÓN COMPLETA DE SMARTPHONES */
      fetch(fullInfoPhones)
        .then(function(response) {
          // console.log(response);          
          return response.json();         
        })
        .then(function(recurso) {
          const phoneBigImg = recurso.pictures[0]['secure_url'];
          const phoneWarranty = recurso.warranty; // Garantía diferente para cada producto (6 meses, 1 año, boleta, null)
          // console.log(recurso.pictures[0]['secure_url']);
          // console.log(phoneWarranty);
          
          /* FECTH DE DIVISA */
          const targetCurrency = recurso['currency_id'];
          // console.log(targetCurrency);          
          const currencyLink = `https://api.mercadolibre.com/currencies/${targetCurrency}`;
          // console.log(currencyLink);
          fetch(currencyLink)
            .then(function(answer) {
              return answer.json();
            })
            .then(function(ans) {
              const realCurrency = ans['symbol']; // S/
              const realCurrencyStr = ans['description']; // Soles
              // console.log(realCurrency);  
              // console.log(realCurrencyStr);                          
            });
        });
    });      
  });
