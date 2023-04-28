import React, { useEffect } from "react";
import {
  InvoiceCard,
  InvoiceButton,
  SideNav,
  Modal,
  Button,
} from "../../components";
import { IllustrationEmpty, IconArrowDown } from "../../assets";
import { readInvoice, createInvoice } from "../../services/crud";
import "./Invoices.css";

const Invoices = () => {
  // useState hooks
  const [invoices, setInvoices] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);

  // new invoice controllers
  // TODO: create the controllers to handle creation of new invoice
  // Senders Address Controllers
  const [sendersStreet, setSendersStreet] = React.useState('');
  const [sendersCity, setSendersCity] = React.useState('');
  const [sendersPostCode, setSendersPostCode] = React.useState('');
  const [sendersCountry, setSendersCountry] = React.useState('');

  // Senders Address Controllers
  const [clientName, setClientName] = React.useState('');
  const [clientEmail, setClientEmail] = React.useState('');

  // Invoice Information
  const [paymentDue, setPaymentDue] = React.useState('');
  const [paymentTerms, setPaymentTerms] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0.00);
  const [status, setStatus] = React.useState('Pending');

  // Client Address Controllers
  const [clientStreet, setClientStreet] = React.useState('');
  const [clientCity, setClientCity] = React.useState('');
  const [clientPostCode, setClientPostCode] = React.useState('');
  const [clientCountry, setClientCountry] = React.useState('');

  // reading invoice data
  useEffect(() => {
    const readData = async () => {
      const invoice = await readInvoice();
      console.log(invoice);
      setInvoices(JSON.parse(invoice));
    };
    readData();
  }, []);

  console.log(`invoices:: ${JSON.stringify(invoices[0])}`);
  // handling opening of side modal
  const handleModalOpen = () => {
    setShowModal(true);
  };

  // handling closing of side modal
  const handleModalClose = () => {
    setShowModal(false);
  };

  const saveInvoice = async () => {
    await createInvoice({
      paymentDue: paymentDue,
      description: description,
      paymentTerms: paymentTerms,
      clientName: clientName,
      clientEmail: clientEmail,
      status: status,
      sendersAddress: {
        street: sendersStreet,
        city: sendersCity,
        postCode: sendersPostCode,
        country: sendersCountry,
      },
      clientAddress: {
        street: clientStreet,
        city: clientCity,
        postCode: clientPostCode,
        country: clientCountry,
      },
      items: [
        {
          name: "Logo Re-design",
          quantity: 1,
          price: 3102.04,
          total: 3102.04,
        },
      ],
      total: total,
    });
  };

  // render the UI elements
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
                <input
                  type="text"
                  className="input-boxes fill"
                  onChange={(e) => setSendersStreet(e.target.value)}
                  required
                />
              </div>
              <div className="bill-row">
                <div>
                  <label>City</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    onChange={(e) => setSendersCity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Post Code</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    onChange={(e) => setSendersPostCode(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    onChange={(e) => setSendersCountry(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="bill-to">
              <p>Bill To</p>
              <div>
                <label>Client Name</label>
                <br />
                <input
                  type="text"
                  className="input-boxes fill"
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Client's Email</label>
                <br />
                <input
                  type="text"
                  className="input-boxes fill"
                  placeholder="e.g email@example.com"
                  onChange={(e) => setClientEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Street Address</label>
                <br />
                <input
                  type="text"
                  className="input-boxes fill"
                  onChange={(e) => setClientStreet(e.target.value)}
                  required
                />
              </div>
              <div className="bill-row">
                <div>
                  <label>City</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    onChange={(e) => setClientCity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Post Code</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    onChange={(e) => setClientPostCode(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    onChange={(e) => setClientCountry(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="bill-row">
                <div>
                  <label>Invoice Date</label>
                  <input
                    type="date"
                    className="input-boxes"
                    onChange={(e) => setPaymentDue(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Payment Terms</label>
                  <br />
                  <select
                    onChange={(e) => setPaymentTerms(parseInt(e.target.value.substring(3, 6).trim()))}
                    required
                  >
                    <option>Net 01 Day</option>
                    <option>Net 07 Day</option>
                    <option>Net 14 Day</option>
                    <option>Net 30 Day</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Project Description</label>
                <input
                  type="text"
                  className="input-boxes fill"
                  placeholder="e.g. Graphic Design Service"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
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
                    <Button
                      color="var(--mark-color)"
                      handleAction={saveInvoice}
                    >
                      Save & Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <InvoiceHeader total={invoices.length} handleOpen={handleModalOpen} />
      {invoices.length > 0 ? (
        invoices.map((invoice) => (
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
