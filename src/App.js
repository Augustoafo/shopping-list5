import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  // HINT: each "item" in our list names a name,
  // a boolean to tell if its been completed, and a quantity
  const [items, setItems] = useState([
    { itemName: "item 1", price: 20, quantity: 1, isSelected: false },
    { itemName: "item 2", price: 30, quantity: 3, isSelected: true },
    { itemName: "item 3", price: 40, quantity: 2, isSelected: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(6);
  const [totalPriceCount, setTotalPriceCount] = useState(190);

  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      price: inputPrice,
      quantity: 0,
      isSelected: false,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue("");
    setInputPrice("");
    calculateTotal();
    calculateTotalPrice();
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
    calculateTotal();
    calculateTotalPrice();
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity--;

    setItems(newItems);
    calculateTotal();
    calculateTotalPrice();
  };

  const toggleComplete = (index) => {
    const newItems = [...items];

    newItems[index].isSelected = !newItems[index].isSelected;

    setItems(newItems);
  };

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  };

  const calculateTotalPrice = () => {
    const totalPriceCount = items.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price;
    }, 0);

    setTotalPriceCount(totalPriceCount);
  };
  let startBudget = 250;
  let availableAfterShopping = startBudget - totalPriceCount;

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <form>
            <input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="add-item-input"
              placeholder="Add an item"
            />

            <input
              value={inputPrice}
              onChange={(event) => setInputPrice(event.target.value)}
              className="add-price-input"
              placeholder="Add price"
            />

            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => handleAddButtonClick()}
            />
          </form>
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name" onClick={() => toggleComplete(index)}>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className="price">
                <span>price= {item.price} </span>
              </div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => handleQuantityDecrease(index)}
                  />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleQuantityIncrease(index)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total">Total: {totalItemCount}</div>
        <div className="totalPrice">Total Price: {totalPriceCount}</div>
        <div className="startBudget">Start Budget: {startBudget}</div>
        <div className="available">
          Available after Shopping: {availableAfterShopping}
        </div>
      </div>
    </div>
  );
};

export default App;
