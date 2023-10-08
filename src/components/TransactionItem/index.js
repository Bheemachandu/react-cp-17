import './index.css'

const TransactionItem = props => {
  const {details, update} = props
  const {id, title, amount, type} = details
  const deleteItem = () => {
    update(id)
  }
  return (
    <li className="listContainer22">
      <p className="para11">{title}</p>
      <p className="para11">{amount}</p>
      <p className="para11">{type}</p>
      <button className="button111" type="button" onClick={deleteItem}>
        <img
          data-testid="delete"
          className="para11 image111"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        />
      </button>
    </li>
  )
}

export default TransactionItem
