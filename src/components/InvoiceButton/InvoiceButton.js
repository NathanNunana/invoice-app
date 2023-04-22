import React from "react";
import { IconPlus } from "../../assets";
import "./InvoiceButton.css";

const InvoiceButton = () => {
  const handleClick = () => {
    console.log('Create New Invoice')
  };
  return (
    <>
      <div className="invoice-button" onClick={handleClick}>
        <div>
          <img src={IconPlus} />
        </div>
        New Invoice
      </div>
    </>
  );
};

export default InvoiceButton;
