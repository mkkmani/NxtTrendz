import Popup from 'reactjs-popup'
import {useState, useContext} from 'react'
import {FaRegCheckCircle} from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import 'reactjs-popup/dist/index.css'
import './index.css'

const Payment = () => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [orderStatus, setOrderStatus] = useState(false)
  const cartContext = useContext(CartContext)

  if (orderStatus) {
    return (
      <Popup modal>
        <div className="success-message">
          <h1>Your order has been placed successfully</h1>
          <span>
            <FaRegCheckCircle className="check-icon" />
          </span>
        </div>
      </Popup>
    )
  }
  return (
    <Popup
      modal
      trigger={
        <div>
          <button type="button" className="checkout-button d-sm-none">
            Checkout
          </button>
          <button type="button" className="checkout-button d-lg-none">
            Checkout
          </button>
        </div>
      }
    >
      {close => {
        const {cartList} = cartContext
        let total = 0
        cartList.forEach(eachItem => {
          total += eachItem.price * eachItem.quantity
        })

        return (
          <>
            <div>
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
              <div className="payment-options">
                <div className="payment-option">
                  <label htmlFor="upi">UPI</label>
                  <input type="radio" name="payment" id="upi" disabled />
                </div>
                <div className="payment-option">
                  <label htmlFor="cards">Credit/Debit card</label>
                  <input type="radio" name="payment" id="cards" disabled />
                </div>
                <div className="payment-option">
                  <label htmlFor="internetBanking">Internet banking</label>
                  <input
                    type="radio"
                    name="payment"
                    id="internetBanking"
                    disabled
                  />
                </div>
                <div className="payment-option">
                  <label htmlFor="wallet">Wallet</label>
                  <input type="radio" name="payment" id="wallet" disabled />
                </div>
                <div className="payment-option">
                  <label htmlFor="cod">Cash on delivery</label>
                  <input
                    type="radio"
                    name="payment"
                    id="cod"
                    onClick={() => setPaymentConfirmed(true)}
                  />
                </div>
              </div>
            </div>
            <div className="popup-buttons-div">
              <button
                className={
                  paymentConfirmed
                    ? 'cancel-button checkout-button'
                    : 'checkout-button'
                }
                type="button"
                onClick={() => close()}
              >
                Cancel
              </button>
              <button
                className={
                  paymentConfirmed
                    ? 'checkout-button'
                    : 'checkout-button confirm-disabled'
                }
                type="button"
                onClick={() => {
                  setOrderStatus(true)
                }}
              >
                Confirm Order
              </button>
            </div>
          </>
        )
      }}
    </Popup>
  )
}

export default Payment
