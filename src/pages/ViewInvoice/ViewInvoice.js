import React from "react";
import { useLocation } from "react-router-dom";
import { SideNav, StatusButton, Button } from "../../components";
import "./ViewInvoice.css";

const ViewInvoice = () => {
  const { state } = useLocation();
  return (
    <>
      <SideNav />
      <ViewInvoiceHeader status={state.status} />
      <ViewInvoiceContent state={state} />
    </>
  );
};

const ViewInvoiceHeader = ({ status }) => (
  <div className="view-invoice-header">
    <div>
      <p>Status</p>
      <StatusButton status={status} />
    </div>
    <div>
      <Button color="var(--edit-color)" txt="#7E88C3">
        Edit
      </Button>
      <Button color="var(--delete-color)">Delete</Button>
      <Button color="var(--mark-color)">Mark as Paid</Button>
    </div>
  </div>
);

const ViewInvoiceContent = ({ state }) => (
  <>
    <div className="view-invoice-content">
      <div className="head">
        <div className="title">
          <h5>#{state.id}</h5>
          <p>{state.description}</p>
        </div>
        <div className="view-invoice-address">
          <p>{state.senderAddress.street}</p>
          <p>{state.senderAddress.city}</p>
          <p>{state.senderAddress.postCode}</p>
          <p>{state.senderAddress.country}</p>
        </div>
      </div>
      <div className="view-invoice-details">
        <div>
          <div>
            <p>Invoice Date</p>
            <h5>{state.createdAt}</h5>
          </div>
          <div>
            <p>Payment Due</p>
            <h5>{state.paymentDue}</h5>
          </div>
        </div>
        <div>
          <p>Bill To</p>
          <h5>{state.clientName}</h5>
          <div>
            <p>{state.clientAddress.street}</p>
            <p>{state.clientAddress.city}</p>
            <p>{state.clientAddress.postCode}</p>
            <p>{state.clientAddress.country}</p>
          </div>
        </div>
        <div>
          <p>Sent To</p>
          <h5>{state.clientEmail}</h5>
        </div>
      </div>
      <div className="price-card-wrapper">
        <div className="price-card">
          <table className="invoice-table">
            <tr>
              <th>Item Name</th>
              <th>QTY.</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            {state.items.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.quantity}</td>
                <td>{e.price}</td>
                <td>{e.total}</td>
              </tr>
            ))}
          </table>
        </div>
        <div className="total-tag">
          <p>Amount Due</p>
          <h5>£{state.total}</h5>
        </div>
      </div>
    </div>
  </>
);

export default ViewInvoice;
