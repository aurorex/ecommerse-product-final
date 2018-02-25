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

    phones.forEach((phone) => {
      const phoneTitlesInThisCategory = phone['title'];
      const phonesPrices = phone['price'];
      const phonesAvailableQuantity = phone['available_quantity'];
      const phonesSoldQuantity = phone['sold_quantity'];
      const phonesInstallmentsquantity = phone['installments']['quantity'];
      const phonesInstallmentsAmout = phone['installments']['amount'];
      const targetID = phone['id'];
      const fullInfoPhones = `https://api.mercadolibre.com/items/${targetID}`;


      // const fullInfoPhones = phone['id'];
      console.log('Nombre de cel ' + phoneTitlesInThisCategory);
      console.log('Precio de cel en S/ ' + phonesPrices);
      console.log('Cantidad disponible de cels ' + phonesAvailableQuantity);
      console.log('Cantidad de cels vendidos ' + phonesSoldQuantity);   
      console.log('Enlace a info completa ' + fullInfoPhones);
      console.log('Cantidad de fracciones a pagar ' + phonesInstallmentsquantity);
      console.log('Monto de fracción a pagar en S/ ' + phonesInstallmentsAmout);

      fetch(fullInfoPhones)
        .then(function(response) {
          return response.json();         
        })
        .then(function(recurso) {
          const phoneBigImg = recurso.pictures[0]['secure_url'];
          // console.log(recurso.pictures[0]['secure_url']);

          /** ******************************************************* */
          /* FECTH DE DIVISA */
          const targetCurrency = recurso['currency_id'];
          const currencyLink = `https://api.mercadolibre.com/currencies/${targetCurrency}`;
          fetch(currencyLink)
            .then(function(reply) {
              return reply.json();
            })
            .then(function() {
              const currency = reply.id;
              console.log('Esta es la DIVISA' + currency);
            });
        });
    });      
  });
