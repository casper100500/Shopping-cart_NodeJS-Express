//Created by NG. Study lesson completly different
//const { response } = require("express");
console.log('createToken....') //browser console !!!

//Secret key. Client key???
var stripe = Stripe('sk_test_51LGe7YGUvmt8rPeQ8q2gvYL4SIP25obw5Oj7IwVkqjs00xWDBOvfIyCh10kur6gMgRMV2rV4DgjGceWL4SXLKLuD00yCXXOQ1P');

var $form = $('#checkout-form');

$form.submit(function(event){
    $form.find('button').prop('disabled',true); //Disable submission

    var cardElement=
    {number:$('#card-number').val(),
    cvc:$('#card-cvc').val(),
    exp_month:$('#card-expiry-month').val(),
    exp_year:$('#card-expiry-year').val()
    }

    stripe.createToken(cardElement).then(function(result) {
        
        if (result.error)
        {
            $form.find('#charge-error').text(response.error.message);
         //   $form.find('#charge-error').removeClass('hidden');
            $form.find('button').prop('disabled',false); //Re-enable submission
        }
        else
        {//Token was created
        var token = result.token
        $form.append($('<input type="input" name="stripeToken" />').val(token));
        $form.get(0).submit

        }

        // Handle result.error or result.token
      });
      return false;
});

