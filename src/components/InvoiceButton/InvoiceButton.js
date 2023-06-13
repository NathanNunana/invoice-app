import React from "react";
import { IconPlus } from "../../assets";
import "./InvoiceButton.css";

const InvoiceButton = ({handleOpen}) => {
  return (
    <>
      <div className="invoice-button" onClick={handleOpen}>
        <div>
          <img src={IconPlus} />
        </div>
        New<span className="new-invoice">Invoice</span>
      </div>
    </>
  );
};

export default InvoiceButton;
