import React from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "../../assets";
import "./InvoiceCard.css";

const InvoiceCard = ({ invoice }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/view-invoice", { state: invoice });
  };
  return (
    <>
      <div className="invoice-card" onClick={handleClick}>
        <h5 className="invoice-text">
          #<span className="invoice-id">{invoice.id}</span>
        </h5>
        <p className="invoice-text">{invoice.paymentDue}</p>
        <p className="invoice-text">{invoice.clientName}</p>
        <p className="invoice-total">£{invoice.total}</p>
        <div
          className="invoice-status"
          style={
            invoice.status.toLowerCase().trim() === "paid"
              ? { background: "#33D69F11", color: "#33D69F" }
              : invoice.status.toLowerCase().trim() === "pending"
              ? { background: "#FF8F0011", color: "#FF8F00" }
              : { background: "#373B5311", color: "#373B53" }
          }
        >
          {invoice.status}
        </div>
        <img src={IconArrowRight} />
      </div>
    </>
  );
};

export default InvoiceCard;
