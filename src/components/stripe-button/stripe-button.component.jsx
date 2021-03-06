import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_Z5Y3jseNEPACAnZ8aYMxW2wP00fInVvPJr';

    const onToken = token => {
        console.log(token);
        alert('Payment sucssesfull');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your totoal is $${price}`}
            amount={priceForStripe}
            panel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
