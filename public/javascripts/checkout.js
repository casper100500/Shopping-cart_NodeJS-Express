//Created by NG. Study lesson completly different
//
//my pk
var stripe = Stripe('pk_test_51LGe7YGUvmt8rPeQGIdTgAWEjHZkvRtZmggh90wpzWqLy0XKW0fNv7xDuwS2KOFdGn9zjR0JsdKbAg6G0P2yevqR00wCqpiygk');

var elements = stripe.elements();
var style = {
  base: {
    color: "#32325d",
    fontFamily: 'Arial, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#32325d"
    }
  },
  invalid: {
    fontFamily: 'Arial, sans-serif',
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};
console.log('Card here...')
var card = elements.create("card", { style: style });
// Stripe injects an iframe into the DOM
card.mount("#card-element");
  //  var elements = stripe.elements();
  var $form = $('#checkout-form');

  $form.submit(function(event){
          $form.find('button').prop('disabled',true); //Disable submission
          var cardElement=
          {"cardnumber":"374245455400126",
          "exp-date":"12/2033",
          "cvc":"100",
          "postal":"4324324"
          }
          var cardElement2=
          {number:$('#card-number').val(),
          cvc:$('#card-cvc').val(),
          exp_month:$('#card-expiry-month').val(),
          exp_year:$('#card-expiry-year').val()
          }
      console.log(cardElement)
      console.log(cardElement2)
      // const elements = stripe.elements();
      // const card = elements.create('card');
     
     // card.mount(cardElement);
    
        // stripe.createToken(cardElement).then(function(result) {
        //   console.log(result)
        //   });

        return false;
  });


