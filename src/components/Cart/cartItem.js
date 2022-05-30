import {useState} from 'react'

import {useSelector, useDispatch} from 'react-redux'
import './cartItem.css'

const CartItem = props => {
  const {title, price, imageUrl} = props
  const array = useSelector(state => state.array)

  const [u] = array.filter(each => each.title === title)

  const [quantity, setQuantity] = useState(u.quantity)

  const dispatch = useDispatch()

  const addQuantity = () => {
    dispatch({type: 'add', data: {title}})
    setQuantity(u.quantity)
    props.get()
  }
  const removeQuantity = () => {
    const [y] = array.filter(each => each.title === title)
    const t = array.indexOf(y)
    dispatch({type: 'remove', data: {title, index: t}})
    if (u.quantity > 0) {
      setQuantity(u.quantity)
    }
    props.get()
  }
  return (
    <>
      <div className="card">
        <img src={imageUrl} alt={title} className="imgSize" />
        <div>
          <h1>{title}</h1>
          <p>Number of Items : {quantity}</p>
        </div>
        <div>
          <p className="price">price: ${price}</p>
          <span className="butt">
            <button type="button" onClick={addQuantity} className="icons">
              +
            </button>
            <button type="button" className="icons" onClick={removeQuantity}>
              -
            </button>
          </span>
        </div>
      </div>
    </>
  )
}

export default CartItem
