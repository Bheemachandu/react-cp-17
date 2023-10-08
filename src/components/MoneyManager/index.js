import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

console.log(transactionTypeOptions)

class MoneyManager extends Component {
  state = {
    list: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
  }

  titleChange = event => {
    this.setState({title: event.target.value})
  }

  amountChange = event => {
    this.setState({amount: event.target.value})
  }

  typeChange = event => {
    this.setState({type: event.target.value})
  }

  submit = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const typeEl = transactionTypeOptions.find(each => each.optionId === type)
    const {displayText} = typeEl
    const newList = {
      id: uuidv4(),
      title,
      amount,
      type: displayText,
    }
    this.setState(prevState => ({
      list: [...prevState.list, newList],
      title: '',
      amount: '',
      type: 'INCOME',
    }))
  }

  update = id => {
    this.setState(prevState => ({
      list: prevState.list.filter(each => each.id !== id),
    }))
  }

  findExpenses = list => {
    let expen = 0
    list.forEach(each => {
      if (each.type === 'Expenses') {
        expen += parseInt(each.amount)
      }
    })
    return expen
  }

  findIncome = list => {
    let incom = 0
    list.forEach(each => {
      if (each.type === 'Income') {
        incom += parseInt(each.amount)
      }
    })
    return incom
  }

  render() {
    const {list, title, amount, type} = this.state
    const expenses = this.findExpenses(list)
    const income = this.findIncome(list)
    const balance = income - expenses
    return (
      <div className="container1">
        <div className="container2">
          <h1>Hi,Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails income={income} expenses={expenses} balance={balance} />
        <div className="container3">
          <div className="container4">
            <h1>Add Transaction</h1>
            <form onSubmit={this.submit}>
              <label className="label1" htmlFor="title">
                TITLE
              </label>
              <br />
              <input
                onChange={this.titleChange}
                className="inputEl"
                id="title"
                type="text"
                value={title}
              />
              <br />
              <label className="label1" htmlFor="amount">
                AMOUNT
              </label>
              <br />
              <input
                onChange={this.amountChange}
                className="inputEl"
                id="amount"
                type="text"
                value={amount}
              />
              <br />
              <label className="label1" htmlFor="type">
                TYPE
              </label>
              <br />
              <select
                onChange={this.typeChange}
                id="type"
                className="inputEl selectEl"
                value={type}
              >
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit">Add</button>
            </form>
          </div>
          <div className="container5">
            <h1>History</h1>
            <div>
              <ul className="listContainer">
                <li className="container6">
                  <p className="para1">Title</p>
                  <p className="para1">Amount</p>
                  <p className="para1">Type</p>
                </li>
                {list.map(each => (
                  <TransactionItem
                    details={each}
                    update={this.update}
                    key={each.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
