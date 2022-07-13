//Created by NG. Study lesson completly different
//
//my pk
var stripe = Stripe('pk_test_51LGe7YGUvmt8rPeQGIdTgAWEjHZkvRtZmggh90wpzWqLy0XKW0fNv7xDuwS2KOFdGn9zjR0JsdKbAg6G0P2yevqR00wCqpiygk');
  //  var elements = stripe.elements();
  var $form = $('#checkout-form');

  $form.submit(function(event){
          $form.find('button').prop('disabled',true); //Disable submission
          var cardElement=
          {number:'374245455400126',
          cvc:'100',
          exp_month:'12',
          exp_year:'2033'
          }
          var cardElement2=
          {number:$('#card-number').val(),
          cvc:$('#card-cvc').val(),
          exp_month:$('#card-expiry-month').val(),
          exp_year:$('#card-expiry-year').val()
          }
      console.log(cardElement)

      const elements = stripe.elements();
      const card = elements.create('card');
     // console.log(card)
      //card.mount('374245455400126');
    
        stripe.createToken(cardElement).then(function(result) {
          console.log(result)
          });

        return false;
  });


