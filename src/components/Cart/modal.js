import './modal.css'

function Modal(props) {
  const {openModal} = props

  return (
    <div>
      <div className="modalBackground_open">
        <div className="modalContainer">
          <div className="title">
            <h1>Shipping Address</h1>
          </div>
          <div className="body">
            <input type="text" placeholder="DoorNo." />
            <br />
            <input type="text" placeholder="Street Name" />
            <br />
            <input type="text" placeholder="Mobile Number" />
            <br />
            <input type="text" placeholder="Anything wanna say" />
          </div>
          <div className="footer">
            <button type="button" className="red" onClick={openModal}>
              Cancel
            </button>
            <button type="button" className="green">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
