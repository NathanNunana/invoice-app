import React, { useEffect } from "react";
import { InvoiceCard, InvoiceButton, SideNav } from "../../components";
import { IllustrationEmpty, IconArrowDown } from "../../assets";
import axios from "axios";
import "./Invoices.css";

const Invoices = () => {
  const [invoices, setInvoices] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  useEffect(() => {
    axios
      .get("data.json")
      .then((data) => setInvoices(data))
      .catch((e) => console.log(e));
  }, []);
  const handleModalOpen = () => {
    setShowModal(true);
  }
  const handleModalClose = () => {
    setShowModal(false);
  }
  return (
    <>
      <SideNav show={showModal} handleClose={handleModalClose}/>
      <InvoiceHeader total={invoices.data?.length} handleOpen={handleModalOpen}/>
      {invoices.data?.length > 0 ? (
        invoices.data?.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))
      ) : (
        <div className="empty-invoice-wrapper">
          <div>
            <img
              src={IllustrationEmpty}
              alt="No invoice"
              className="empty-invoice"
            />
            <h3>There is nothing here</h3>
            <p>
              Create an invoice by clicking the <strong>New Invoice</strong> button and get
              started
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const InvoiceHeader = ({ total, handleOpen }) => (
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
        <InvoiceButton handleOpen={handleOpen}/>
      </div>
    </div>
  </>
);

export default Invoices;
