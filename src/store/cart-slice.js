import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
    totalAmount: 0
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },
    addItemsToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      state.totalAmount += newItem.price;
      console.log('total Amount ', state.totalAmount)
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      state.totalAmount -= existingItem.price;
      console.log(state.totalAmount)
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;













// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         items: [],
//         totalQuantity: 0,
//         totalAmount: 0
//     },
//     reducers: {
//         replaceCart(state, action){
//             state.totalQuantity = action.payload.totalQuantity;
//             state.items = action.payload.items;
//             state.totalAmount = action.payload.totalAmount
//         },
//         addItemsToCart(state, action) {

//             const newItem = action.payload;
//             const existingItem = state.items.find(item => item.id === newItem.id);
//             state.totalQuantity++;
//             state.totalAmount += newItem.price;
//             if (!existingItem) {
//                 state.items.push({
//                     id: newItem.id,
//                     price: newItem.price,
//                     quantity: 1,
//                     totalPrice: newItem.price,
//                     name: newItem.title
//                 });
//             } else {
//                 existingItem.quantity++;
//                 existingItem.totalPrice += newItem.price;
//             }
//         },

//         removeItemFromCart(state, action) {
//             const id = action.payload;
//             const existingItem = state.items.find(item => item.id === id);
//             state.totalQuantity--;
//             state.totalAmount += existingItem.price;
//             if (existingItem.quantity === 1) {
//                 state.items = state.items.filter(item => item.id !== id)
//             } else {
//                 existingItem.quantity--;
//                 existingItem.totalPrice -= existingItem.price;
//             }
//         }
//     }
// })



// export const cartActions = cartSlice.actions;
// export default cartSlice.reducer;






// export const fetchCartData = ()=>{
//     return async (dispatch)=>{
//         const fetchData = async()=>{
//             const response = await fetch('https://react-http-68ada-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json')
            
//             if(!response.ok){
//                 throw new Error ('Could not fetch cart data')
//             }
//             const data = await response.json();

//             return data;
//         }
//         try{
//             const data = await fetchData()
//         }catch(error){
//             dispatch(
//                 uiActions.showNotification({
//                     status: 'error',
//                     title: 'Error..',
//                     message: 'Fetching cart data failed!'
//                 })
//             )
//         }
//     }
// }

// export const sendCartData = (cart) => {
//     return async (dispatch) => {
//         dispatch(
//             uiActions.showNotification({
//                 status: 'pending',
//                 title: 'Sending..',
//                 message: 'Sending cart data!'
//             })
//         )
//         const sendRequest = async () => {
//             const response = await fetch('https://react-http-68ada-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
//                 method: 'PUT',
//                 body: JSON.stringify(cart),
//             })
//             if (!response.ok) {
//                 throw new Error('Something went Wrong!')
//             }
//         }
//         try {
//             await sendRequest()
//             //const responseData = await response.json();
//             dispatch(
//                 uiActions.showNotification({
//                     status: 'success',
//                     title: 'Success..',
//                     message: 'Sent cart data!'
//                 })
//             )
//         }
//         catch (error) {
//             dispatch(
//                 uiActions.showNotification({
//                     status: 'error',
//                     title: 'Error..',
//                     message: error.message
//                 })
//             )
//         }
//     }
// }