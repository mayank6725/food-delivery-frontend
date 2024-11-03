import { React } from 'react';
import { GET_USER } from '../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../graphql/mutations';
import PaymentModeCard from './PaymentModeCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';

const PaymentPage = ({triggerNotification}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state)=>state.cart);
  const { loading, error, data } = useQuery(
    GET_USER
  );


  const [createOrder] = useMutation(CREATE_ORDER, {
    onCompleted: (data) => {
      console.log(data);
      dispatch(clearCart());
      triggerNotification('success', 'Payment done successfully!!');
      navigate('/orders');
    },
    onError: (error) => {
      console.log(error.message);
    }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const onProceed = async (paymentMethod) => {
    const variables = {
      userId: data.me.id,
      restaurantId: cartItems.restaurantId,
      items: cartItems.items.map((cartItem)=> {
          return {
            id: cartItem.id,
            name: cartItem.name,
            quantity: cartItem.quantity,
            price: cartItem.price
          }
      }),
      deliveryAddress: {
        street: "3144 Sector 23",
        city: "Gurgaon",
        state: "Haryana",
        pincode: "122017"
      },
      paymentMethod
    }
    console.log(variables);
    await createOrder({ variables });
  }
  return (
  <>
    <PaymentModeCard onProceed={onProceed}/>
  </>
  );
};

export default PaymentPage;
