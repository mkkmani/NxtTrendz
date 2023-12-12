import CartContext from '../../context/CartContext'
import Payment from '../PaymentCheckout'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
      })

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total}
              /-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>
            <div className="d-sm-none">
              <Payment />
            </div>
          </div>
          <div className="d-lg-none">
            <Payment />
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
