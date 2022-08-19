import React, { useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from 'react-redux'
//import { sendCartData } from './store/cart-slice';
import {sendCartData, fetchCartData} from './store/cart-actions'
  
import Notification from './components/UI/Notification'
let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const toggleCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification)
  //it will override the cart at the time of app start
  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])
 useEffect(()=> {
     if(isInitial){
        isInitial = false;
        return;  
      }
     
      //console.log('cart hange : '+ cart.changed)
      if(cart.changed){
        dispatch(sendCartData(cart))
      }
  },[cart, dispatch])
  return (
    <React.Fragment>
     {notification && <Notification
                        status = {notification.status}
                        title  ={notification.title}
                        message = {notification.message}/>}
      <Layout>
        {toggleCart&& <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;






















// useEffect(()=> {
//   const sendCartData = async()=>{
//     dispatch(uiActions.showNotification({
//       status: 'pending',
//       title: 'Sending..',
//       message: 'Sending cart data!'
//     }))
//     const response = await fetch('https://react-http-68ada-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',{
//       method :'PUT',
//       body : JSON.stringify(cart),
//     })
//     if(!response.ok){
//       throw new Error('Something went Wrong!')
//     }
//     //const responseData = await response.json();
//     dispatch(uiActions.showNotification({
//       status: 'success',
//       title: 'Success..',
//       message: 'Sent cart data!'
//     }))
    
//   }
//   if(isInitial){
//     isInitial = false;
//     return;
//   }
//   sendCartData()
//   .catch((error)=>{
//     dispatch(uiActions.showNotification({
//       status: 'error',
//       title: 'Error..',
//       message: error.message
//     })
//     )
//   })
// },[cart, dispatch])
