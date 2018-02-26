// Categoría de celulares y smartphones
const api = 'https://api.mercadolibre.com/sites/MPE/search?q=smartphone&condition=new';

fetch(api)
  .then(function(response) {
    // console.log(response);
    return response.json();
  }).then(function(data) {
    // Todas las marcas de celulares y smartphones
    // console.log("Resultados ==>",data['results']);
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

      fetch(fullInfoPhones)
        .then(function(response) {         
          return response.json();         
        })
        .then(function(recurso) {
          console.log('Recurso', recurso);
          const phoneBigImg = recurso.pictures[0]['secure_url'];
          const phoneWarranty = recurso.warranty; // Garantía diferente para cada producto (6 meses, 1 año, boleta, null)
          // console.log(recurso.pictures[0]['secure_url']);
          // console.log(phoneWarranty);
          const targetCurrency = recurso['currency_id'];
          // console.log(targetCurrency);          
          const currencyLink = `https://api.mercadolibre.com/currencies/${targetCurrency}`;
          console.log(currencyLink);

          $.ajax({
            type: 'GET',
            url: currencyLink,
            dataType: 'json',
            success: function(ans) {
              console.log(data);
              const realCurrency = ans['symbol']; // S/
              const realCurrencyStr = ans['description'];
              let box = `<div class="container">
                          <div class="row">
                            </div><div class="col s3"> 
                              <div class="card hoverable" data-id="${phone.id}">
                                <div class="card-image waves-effect waves-block">
                                  <img class="activator" src="${phoneBigImg}">
                                </div>
                              <div class="card-content">
                                <span class="activator grey-text text-darken-4 bg-front-text">${phoneTitlesInThisCategory}<i class="material-icons right">more_vert</i></span>
                                <p class="indigo-text darken-4-text bg-price">${realCurrency + ' ' + phonesPrices}</p>
                                <p class="">${'Disponibles: ' + phonesAvailableQuantity}</p>
                                <p class="">${'Vendidos: ' + phonesSoldQuantity}</p>
                              </div>
                              <div class="card-reveal blue lighten-4">
                                <span class="card-title bg-text">${phoneTitlesInThisCategory}<i class="material-icons right">close</i></span>
                                <div class="card-image">
                                  <img class="activator" src="${recurso.pictures[1]['secure_url']}">
                                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                  <input type="hidden" name="cmd" value="_s-xclick">
                                  <input type="hidden" name="hosted_button_id" value="QCG627XNVVVJE">
                                  <button name="submit"  src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_buynowCC_LG.gif" class="btn btn-floating  halfway-fab btn-large cyan pulse right deep-purple darken-4"><i class="material-icons">add_shopping_cart</i></button>
                                  </form>
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
                        </div>`;
              $('#products').append(box);
            },
            error: function(error) {
              console.log(error);
            }
          });	
        });
    });
  });