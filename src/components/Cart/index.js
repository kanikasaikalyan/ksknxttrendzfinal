import {useSelector} from 'react-redux'
import {useState} from 'react'
import Modal from './modal'

import Header from '../Header'
import './index.css'
import CartItem from './cartItem'

const Cart = props => {
  const {history} = props
  const array = useSelector(state => state.array)

  const fetchAmount = () => array.reduce((a, c) => a + c.quantity * c.price, 0)
  const [totalAmount, setTotalAmount] = useState(fetchAmount)
  const [isOpen, setIsOpen] = useState(false)

  const get = () => {
    setTotalAmount(fetchAmount)
  }
  const openModal = () => {
    setIsOpen(pre => !pre)
  }

  if (array.length !== 0) {
    return (
      <div>
        <Header />
        {array.map(each => (
          <CartItem
            key={each.title}
            title={each.title}
            price={each.price}
            quantity={each.quantity}
            imageUrl={each.imageUrl}
            history={history}
            get={get}
          />
        ))}
        <div className="center">
          <button onClick={openModal} className="icons" type="button">
            Order Value : ${totalAmount}
          </button>
          {isOpen && <Modal openModal={openModal} />}
        </div>
      </div>
    )
  }
  return (
    <>
      <Header />
      <div className="cart-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
          alt="cart"
          className="cart-img"
        />
      </div>
    </>
  )
}

export default Cart
