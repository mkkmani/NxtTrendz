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

  const onClickCancel = close => {
    setPaymentConfirmed(false)
    close()
  }

  if (orderStatus) {
    return (
      <Popup modal>
        <div className="order-confirm-div">
          <h1 className="confirm-h1">
            Your order has been placed successfully
          </h1>
          <span>
            <FaRegCheckCircle className="confirm-icon" />
          </span>
        </div>
      </Popup>
    )
  }

  return (
    <Popup
      modal
      trigger={
        <div className="checkout-btn-container">
          <button className="confirm-btn checkout-btn" type="button">
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
          <div className="modal-container">
            <div>
              <h1 className="order-total-h1">
                <span className="total-span">Order Total:</span> Rs {total}/-
              </h1>
              <p className="items-length">{cartList.length} Items in cart</p>
              <div className="payment-options">
                <div className="modal-label-input">
                  <label htmlFor="upi">UPI</label>
                  <input type="radio" name="payment" id="upi" disabled />
                </div>
                <div className="modal-label-input">
                  <label htmlFor="cards">Credit/Debit card</label>
                  <input type="radio" name="payment" id="cards" disabled />
                </div>
                <div className="modal-label-input">
                  <label htmlFor="internetBanking">Internet banking</label>
                  <input
                    type="radio"
                    name="payment"
                    id="internetBanking"
                    disabled
                  />
                </div>
                <div className="modal-label-input">
                  <label htmlFor="wallet">Wallet</label>
                  <input type="radio" name="payment" id="wallet" disabled />
                </div>
                <div className="modal-label-input">
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
            <div className="cancel-confirm-btn-container">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => onClickCancel(close)}
              >
                Cancel
              </button>
              <button
                disabled={!paymentConfirmed}
                className={
                  !paymentConfirmed ? 'confirm-btn disabled-btn' : 'confirm-btn'
                }
                type="button"
                onClick={() => {
                  setOrderStatus(true)
                }}
              >
                Confirm Order
              </button>
            </div>
          </div>
        )
      }}
    </Popup>
  )
}

export default Payment
