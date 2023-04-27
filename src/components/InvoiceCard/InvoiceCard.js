import React from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "../../assets";
import "./InvoiceCard.css";
import StatusButton from "../StatusButton/StatusButton";

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
        <p className="invoice-text">{invoice.paymentdue.substring(0, 10)}</p>
        <p className="invoice-text">{invoice.clientname}</p>
        <p className="invoice-total">£{invoice.total.substring(1)}</p>
        <StatusButton status={invoice.status}/>
        <img src={IconArrowRight} />
      </div>
    </>
  );
};

export default InvoiceCard;
