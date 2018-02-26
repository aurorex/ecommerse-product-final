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

    phones.forEach(function(phone, index) {
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
              
              /* CREAR CAJA INFORMATIVA DE LOS SMARTPHONES */
              let box = `<div class="container">
                          <div class="row">
                            </div><div class="col s3"> 
                              <div class="card hoverable" data-id="${phone.id}">
                                <div class="card-image waves-effect waves-block">
                                  <img class="activator" src="${phoneBigImg}">
                                </div>
                              <div class="card-content">
                                <span class="activator grey-text text-darken-4 bg-front-text">${phoneTitlesInThisCategory}<i class="material-icons right">more_vert</i></span>
                                <p class="indigo-text darken-4-text bg-price">${realCurrency + ' '+ phonesPrices}</p>
                                <p class="">${'Disponibles: ' + phonesAvailableQuantity}</p>
                                <p class="">${'Vendidos: ' + phonesSoldQuantity}</p>
                              </div>
                              <div class="card-reveal blue lighten-4">
                                <span class="card-title bg-text">${phoneTitlesInThisCategory}<i class="material-icons right">close</i></span>
                                <div class="card-image">
                                  <img class="activator" src="${recurso.pictures[1]['secure_url']}">
                                  <a class="btn btn-floating  halfway-fab btn-large cyan pulse right deep-purple darken-4"><i class="material-icons">add_shopping_cart</i></a>
                                </div>
                                <div>
                                <p>Puedes comprarlo en cuotas.</p>
                                <p class="">${'Cuotas de: ' + phonesInstallmentsquantity}</p>
                                <p class="">${'Montos de: ' + realCurrency + ' ' + phonesInstallmentsAmout}</p>
                                <p class="indigo-text darken-4-text bg-price">${'Total ' + realCurrency + ' ' + phonesPrices}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`
              $('#products').append(box);
              // $('.reference').find('#productos').append(box);
            });
        });
    });      
  });
