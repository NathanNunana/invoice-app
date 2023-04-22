import React, { useEffect } from "react";
import InvoiceButton from "../components/InvoiceButton";
import InvoiceCard from "../components/InvoiceCard";
import { IllustrationEmpty, IconArrowDown } from "../assets";
import axios from "axios";
import "./Invoices.css";

const Invoices = () => {
  const [invoices, setInvoices] = React.useState([]);
  useEffect(() => {
    axios
      .get("data.json")
      .then((data) => setInvoices(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <InvoiceHeader total={invoices.data?.length} />
      {invoices.data?.length > 0 ? (
        invoices.data?.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))
      ) : (
        <img src={IllustrationEmpty} alt="No invoice" />
      )}
    </>
  );
};

const InvoiceHeader = ({ total }) => (
  <>
    <div className="invoice-header">
      <div className="invoice-title">
        <h1>Invoices</h1>
        <p>There are {total} total invoices</p>
      </div>
      <div className="invoice-action">
        <span className="invoice-filter">
          Filter by status <img src={IconArrowDown} alt="icon-arrow-down" />
        </span>
        <InvoiceButton />
      </div>
    </div>
  </>
);

export default Invoices;
