import { uiActions } from './ui-slice';

export const sendCartData = cart => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'sending',
            message: 'Sending cart data!'
        }));

        const sendRequest = async () => {
            const response = await fetch(
                'https://react-book-cart-cc9ce-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'POST',
                    body: JSON.stringify(cart)
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed');
            }
        };

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'success',
                message: 'Sent cart data successfully!'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'error',
                message: 'Sending cart data failed'
            }));
        }
    };
};