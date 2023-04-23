import React, { useEffect } from "react";
import {
  InvoiceCard,
  InvoiceButton,
  SideNav,
  Modal,
  Button,
} from "../../components";
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
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <SideNav show={showModal} handleClose={handleModalClose} />
      <Modal show={showModal} handleClose={handleModalClose}>
        <div className="create-invoice-wrapper">
          <h5>New Invoice</h5>
          <form>
            <div className="bill-from">
              <p>Bill From</p>
              <div>
                <label>Street Address</label>
                <br />
                <input type="text" className="input-boxes fill" />
              </div>
              <div className="bill-row">
                <div>
                  <label>City</label>
                  <br />
                  <input type="text" className="input-boxes" />
                </div>
                <div>
                  <label>Post Code</label>
                  <br />
                  <input type="text" className="input-boxes" />
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <input type="text" className="input-boxes" />
                </div>
              </div>
            </div>
            <div className="bill-to">
              <p>Bill To</p>
              <div>
                <label>Client Name</label>
                <br />
                <input type="text" className="input-boxes fill" />
              </div>
              <div>
                <label>Client's Email</label>
                <br />
                <input
                  type="text"
                  className="input-boxes fill"
                  placeholder="e.g email@example.com"
                />
              </div>
              <div>
                <label>Street Address</label>
                <br />
                <input type="text" className="input-boxes fill" />
              </div>
              <div className="bill-row">
                <div>
                  <label>City</label>
                  <br />
                  <input type="text" className="input-boxes" />
                </div>
                <div>
                  <label>Post Code</label>
                  <br />
                  <input type="text" className="input-boxes" />
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <input type="text" className="input-boxes" />
                </div>
              </div>
              <div className="bill-row">
                <div>
                  <label>Invoice Date</label>
                  <input type="date" className="input-boxes" />
                </div>
                <div>
                  <label>Payment Terms</label>
                  <input type="text" className="input-boxes" />
                </div>
              </div>
              <div>
                <label>Project Description</label>
                <input type="text" className="input-boxes fill" />
              </div>
            </div>
            <div className="item-list">
              <h3>Item List</h3>
              <table>
                <thead>
                  <tr>
                    <td>Item Name</td>
                    <td>QTY.</td>
                    <td>Price</td>
                    <td>Total</td>
                  </tr>
                </thead>
              </table>
              <div className="item-list-btn">+ Add New Items</div>
              <div className="action-btn-wrapper">
                <div className="action-btn">
                  <Button
                    color="var(--add-item-button-bg)"
                    txt="var(--add-item-button-color)"
                  >
                    Discard
                  </Button>
                  <div>
                    <Button color="var(--primary-color)">Save as Draft</Button>
                    <Button color="var(--mark-color)">Save & Send</Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <InvoiceHeader
        total={invoices.data?.length}
        handleOpen={handleModalOpen}
      />
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
              Create an invoice by clicking the <strong>New Invoice</strong>{" "}
              button and get started
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
        <InvoiceButton handleOpen={handleOpen} />
      </div>
    </div>
  </>
);

export default Invoices;
