import React, { useEffect } from "react";
import InvoiceButton from "../components/InvoiceButton";
import InvoiceCard from "../components/InvoiceCard";
import axios from "axios";

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
      <InvoiceButton />
      {invoices.data?.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
    </>
  );
};

export default Invoices;
