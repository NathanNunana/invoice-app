import React from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "../../assets";
import "./InvoiceCard.css";
import StatusButton from "../StatusButton/StatusButton";

const InvoiceCard = ({ invoice }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/view-invoice", { state: invoice });
    localStorage.setItem('id', invoice.id)
  };
  return (
    <>
      <div className="invoice-card" onClick={handleClick}>
        <span className="responsive-card">
          <h5 className="invoice-text">
            #<span className="invoice-id">{invoice.id}</span>
          </h5>
          <p className="invoice-text">{invoice.paymentdue.substring(0, 10)}</p>
          <p className="invoice-text">{invoice.clientname}</p>
        </span>
        <span className="responsive-card">
          <p className="invoice-total">£{invoice.total.substring(1)}</p>
          <StatusButton status={invoice.status} />
        </span>
        <div className="arrow-right">
          <img src={IconArrowRight} alt="arrow-right" />
        </div>
      </div>
    </>
  );
};

export default InvoiceCard;
