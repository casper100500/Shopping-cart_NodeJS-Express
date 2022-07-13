//Created by NG. Study lesson completly different
//
//my pk
//var stripe = Stripe('pk_test_51LGe7YGUvmt8rPeQGIdTgAWEjHZkvRtZmggh90wpzWqLy0XKW0fNv7xDuwS2KOFdGn9zjR0JsdKbAg6G0P2yevqR00wCqpiygk');
// CardNumber example 374245455400126
// CardNumber example 4242424242424242
// The items the customer wants to buy
// A reference to Stripe.js initialized with a fake API key.
// Sign in to see examples pre-filled with your key.
var stripe = Stripe('pk_test_51LGe7YGUvmt8rPeQGIdTgAWEjHZkvRtZmggh90wpzWqLy0XKW0fNv7xDuwS2KOFdGn9zjR0JsdKbAg6G0P2yevqR00wCqpiygk');

console.log('here...')

// The items the customer wants to buy
var purchase = {
  items: [{ id: "xl-tshirt" }]
};

// Disable the button until we have Stripe set up on the page
document.querySelector("button").disabled = true;
fetch("../checkout/create-payment-intent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(purchase)
})
  .then(function(result) {
    return result.json();
  })
  .then(function(data) {
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

    card.on("change", function (event) {
      // Disable the Pay button if there are no card details in the Element
      document.querySelector("button").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });

    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      // Complete payment when the submit button is clicked
      payWithCard(stripe, card, data.clientSecret);
    });
  });

// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function(stripe, card, clientSecret) {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card
      }
    })
    .then(function(result) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        // The payment succeeded!
        orderComplete(result.paymentIntent.id);
        //NG code*******************************************************************************
        console.log('The payment succeeded!')
        console.log(result)
        //body: "{'data': 'test'}"
        //window.location.pathname = '/shop/successfull_payment'
       //body: JSON.stringify(result)

   
//4242424242424242
    //   var json = JSON.stringify(data);

    //   var xhr = new XMLHttpRequest();
    //   xhr.open("GET", "/shop/successfull_payment");
    //   xhr.setRequestHeader("Content-Type", "application/json");
    //  xhr.send(json);

              fetch("../checkout/successfull_payment", {
              method: "post",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(result)
            })
          
            
//            ,body: JSON.stringify({a: 1, b: 'Textual content'})
            //.then(function(result) {
        //   return result.json();
        // })
//4242424242424242

      }
    });
};

/* ------- UI helpers ------- */

// Shows a success message when the payment is complete
var orderComplete = function(paymentIntentId) {
  loading(false);
  document
    .querySelector(".result-message a")
    .setAttribute(
      "href",
      "https://dashboard.stripe.com/test/payments/" + paymentIntentId
    );
  document.querySelector(".result-message").classList.remove("hidden");
  document.querySelector("button").disabled = true;
  window.location.pathname = '/checkout/successfull_payment'
};

// Show the customer the error from Stripe if their card fails to charge
var showError = function(errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function() {
    errorMsg.textContent = "";
  }, 4000);
};

// Show a spinner on payment submission
var loading = function(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("button").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("button").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};