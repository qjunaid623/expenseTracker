import React, { useContext, useState } from "react"
import ".././App.css"
import { TransactionContext } from "../context/TransactionContext"
import coins from ".././images/coins.svg"

function Child() {
  // Use context to get transactions array
  let { transactions, addTransaction } = useContext(TransactionContext)

  // Add states for inputs
  var [newAmount, setAmount] = useState("")
  const [newText, setText] = useState("")

  // Transaction addition handler function
  const additionHandler = () => {
    // If 0 is entered
    if (Number(newAmount) === 0) {
      alert("Please give an amount !")
      return false
    }

    addTransaction({
      amount: Number(newAmount),
      text: newText,
    })

    setText("")
    setAmount("")
  }

  // Function to calculate total income
  const getIncome = () => {
    let income = 0
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].amount > 0) income += transactions[i].amount
    }
    return income
  }

  // Function to calculate total income
  const getExpense = () => {
    let expense = 0
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].amount < 0) expense += transactions[i].amount
    }
    return expense
  }

  const expenseHandler = (event) => {
    event.preventDefault()
    if (newAmount < 0) {
      alert("You can't enter negative value")
      setAmount("")
      setText("")
      return false
    }
    newAmount *= -1
    setAmount(newAmount)
    additionHandler()
  }

  const incomeHandler = (event) => {
    event.preventDefault()
    if (newAmount < 0) {
      alert("You can't enter negative value")
      setAmount("")
      setText("")
      return false
    }
    setAmount(newAmount)
    additionHandler()
  }

  return (
    <div className="container">
      {/* Heading */}
      <header>
        <h1 className="text-center main-heading">
          <img className="icon" src={coins} alt="Coin" />
          <br /> Expense Tracker
        </h1>
        <hr />
      </header>

      {/* Balance, income and expense */}
      <section>
        <h3 className="balance-heading">
          YOUR BALANCE <br />{" "}
          <span className="balance">${getIncome() + getExpense()}</span>
        </h3>

        <div className="income-expense-container">
          <h4>
            INCOME <br /> <span className="income">${getIncome()}</span>{" "}
          </h4>
          <h4>
            EXPENSE <br /> <span className="expense">${getExpense()}</span>{" "}
          </h4>
        </div>
      </section>

      <br />

      {/* History */}
      <section>
        <h3>History</h3>
        <hr />
        <ul className="history-list">
          {/* Include values from transactions array from context*/}
          {transactions.map((transaction, index) => (
            <li key={index}>
              <span>{transaction.text}</span>
              <span>${transaction.amount}</span>
            </li>
          ))}
        </ul>
      </section>

      <br />

      {/* Add Transaction */}
      <section>
        <h3>Add New Transaction</h3>
        <hr />

        {/* FORM */}
        <form className="transaction-form">
          <label>
            <span className="label">Text</span>
            <br />
            <input
              onChange={(event) => setText(event.target.value)}
              required
              value={newText}
              type="text"
              placeholder="Enter text..."
            />
          </label>

          <br />
          <br />

          <label>
            <span className="label">Amount</span>
            <br />
            <input
              onChange={(event) => setAmount(event.target.value)}
              required
              value={newAmount}
              type="number"
              placeholder="Enter amount..."
            />
          </label>

          <br />
          <div className="buttons-section">
            <button
              className="submit-btn"
              type="submit"
              onClick={incomeHandler}
            >
              Add Income
            </button>
            <button
              className="submit-btn"
              type="submit"
              onClick={expenseHandler}
            >
              Add Expense
            </button>
          </div>
        </form>
      </section>
      <footer>
        <hr />
        <span className="signature">
          {" "}
          Developed By{" "}
          <a
            href="https://github.com/qjunaid623/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Junaid Qureshi
          </a>
        </span>
      </footer>
    </div>
  )
}

export default Child
