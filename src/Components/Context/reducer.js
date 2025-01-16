

export function getbaskettotal(basket){
            let total = basket.reduce((acc,curr)=>{
                return acc + (curr.price * curr.quantity);
            },0)
            return total;
    
        }

export const initialstate = {
    basket:[],
    user:null,
};
export const reducer = (state = initialstate, action) => {
    switch (action.type) {
      case "USER_FOUND":
        return {
            ...state,user:action.user
        }

        case "Add_TO_CART":

        ////////////////////////  add product to cart 

          const existingItem = state.basket.find((item) => item.id === action.item.id);

          if(existingItem){
            let basketquantity = state.basket.map((item)=>{
              if(item.id === action.item.id){
                return {
                  ...item,quantity:item.quantity +1
                }
              }else{
                return{
                  ...item
                }
              }
            })
          
                return{
                  ...state,
                  basket:basketquantity
                }

           

          }else{
            return{
              ...state,
              basket:[...state.basket,{...action.item,quantity:1}]
            }
          }
    
        case "EMPTY_BASKET":
          return {
            ...state,basket:[]
          }
        case "Remove_From_CART":
          let data = state.basket.filter((item)=>item.id !== action.id)
        return {
          ...state,basket:[...data]
        }
       
       
      default:
        return state;
    }
  };