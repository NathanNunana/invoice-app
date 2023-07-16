import React, { useEffect } from "react";
import {
  InvoiceCard,
  InvoiceButton,
  SideNav,
  Modal,
  Button,
  LoadingAnimation,
} from "../../components";
import {
  IllustrationEmpty,
  IconArrowDown,
  IconArrowUp,
  IconCheck,
  IconArrowLeft,
  IconDelete,
} from "../../assets";
import {
  readInvoice,
  createInvoice,
  filterInvoiceByStatus,
} from "../../services/crud";
import "./Invoices.css";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  // useState hooks
  const [invoices, setInvoices] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [showItemModal, setShowItemModal] = React.useState(false);

  // New Invoice Controllers
  // Senders Address Controllers
  const [sendersStreet, setSendersStreet] = React.useState("");
  const [sendersCity, setSendersCity] = React.useState("");
  const [sendersPostCode, setSendersPostCode] = React.useState("");
  const [sendersCountry, setSendersCountry] = React.useState("");

  // Senders Address Controllers
  const [clientName, setClientName] = React.useState("");
  const [clientEmail, setClientEmail] = React.useState("");

  // Invoice Information
  const [paymentDue, setPaymentDue] = React.useState(formattedDate);
  const [paymentTerms, setPaymentTerms] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [status, setStatus] = React.useState("");

  // Client Address Controllers
  const [clientStreet, setClientStreet] = React.useState("");
  const [clientCity, setClientCity] = React.useState("");
  const [clientPostCode, setClientPostCode] = React.useState("");
  const [clientCountry, setClientCountry] = React.useState("");

  // filter drop-down
  const [isOpen, setIsOpen] = React.useState(false);

  // filter selected option
  const [selectedOption, setSelectedOption] = React.useState("");

  // loading state
  const [isLoading, setIsLoading] = React.useState(true);

  // navigator
  const navigate = useNavigate();

  // handling filter feature
  const handleOptionChange = async (event) => {
    setSelectedOption(event.target.value);
    const filteredInvoice = await filterInvoiceByStatus(event.target.value);
    setInvoices(filteredInvoice.invoice);
  };

  // reading invoice data
  useEffect(() => {
    const readData = async () => {
      const invoice = await readInvoice();
      setInvoices(JSON.parse(invoice));
      setIsLoading(false);
    };
    readData();
  }, []);

  // handling opening of side modal
  const handleModalOpen = () => {
    setShowModal(true);
  };

  // handling closing of side modal
  const handleModalClose = () => {
    setShowModal(false);
  };

  // handling closing of side modal
  const handleClick = () => {
    handleModalClose();
  };

  // saving invoice
  const saveInvoice = async (status) => {
    const invoice = {
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
      items: items,
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
    await createInvoice(invoice);
    setStatus(status);
    // window.location.reload();
  };

  // items state
  const [itemName, setItemName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [newItem, setNewItem] = React.useState(false);

  const handleAddItem = () => {
    const newItem = {
      name: itemName,
      quantity: parseInt(quantity),
      price: parseFloat(amount),
      total: (parseFloat(amount) * parseInt(quantity)).toFixed(2),
    };
    setItems([...items, newItem]);
    setItemName("");
    setQuantity("");
    setAmount("");
    // setNewItem(false);
  };

  const isValidForm = () => {
    return (
      sendersStreet !== "" &&
      sendersCity !== "" &&
      sendersPostCode !== "" &&
      sendersCountry !== "" &&
      clientName !== "" &&
      clientEmail !== "" &&
      description !== "" &&
      clientStreet !== "" &&
      clientCity !== "" &&
      clientPostCode !== "" &&
      clientCountry !== ""
    );
  };

  // render the UI elements
  return (
    <>
      <SideNav show={showModal} handleClose={handleModalClose} />
      <Modal show={showModal} handleClose={handleModalClose}>
        <div className="create-invoice-wrapper">
          <div className="back-btn" onClick={handleClick}>
            <img src={IconArrowLeft} alt="go back" />
            <p>Go back</p>
          </div>
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
                    value={paymentDue}
                    className="input-boxes"
                    onChange={(e) => setPaymentDue(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Payment Terms</label>
                  <br />
                  <select
                    onChange={(e) =>
                      setPaymentTerms(
                        parseInt(e.target.value.substring(3, 6).trim())
                      )
                    }
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
                <br />
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
                <tbody>
                  {!items
                    ? null
                    : items?.length > 0
                    ? items?.map((e, index) => (
                        <tr className="items-row">
                          <td>
                            <input className="input-box" value={e.name} />
                          </td>
                          <td>
                            <input
                              className="input-box"
                              value={e.quantity}
                              style={{ textAlign: "center" }}
                            />
                          </td>
                          <td>
                            <input className="input-box" value={e.price} />
                          </td>
                          <td>{e.total}</td>
                          <td>
                            <img
                              src={IconDelete}
                              alt="delete icon"
                              onClick={() => {
                                const updatedItems = items?.filter(
                                  (e, i) => i !== index
                                );
                                setItems(updatedItems);
                              }}
                            />
                          </td>
                        </tr>
                      ))
                    : null}{" "}
                  {newItem ? (
                    <tr className="items-row">
                      <td>
                        <input
                          className="input-box"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="input-box"
                          value={quantity}
                          type="number"
                          min={1}
                          onChange={(e) => setQuantity(e.target.value)}
                          style={{ textAlign: "center" }}
                        />
                      </td>
                      <td>
                        <input
                          className="input-box"
                          value={amount}
                          min={1}
                          type="number"
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </td>
                      <td>{(amount * quantity).toFixed(2)}</td>
                      <td>
                        <img
                          src={IconDelete}
                          alt="delete icon"
                          onClick={() => setNewItem(false)}
                        />
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>

              <div
                className="item-list-btn"
                onClick={() => {
                  setNewItem(true);
                  if (
                    itemName.length > 0 &&
                    quantity.length > 0 &&
                    amount.length > 0 &&
                    amount >= 1 &&
                    quantity >= 1
                  ) {
                    handleAddItem();
                  }
                }}
              >
                + Add New Items
              </div>

              <div className="action-container action-btn-wrapper">
                <div className="action-btn">
                  <Button
                    color="var(--add-item-button-bg)"
                    txt="var(--add-item-button-color)"
                    handleAction={(e) => {
                      e.preventDefault();
                      window.location.reload();
                    }}
                  >
                    Discard
                  </Button>
                  <div>
                    <Button
                      color="var(--primary-color)"
                      handleAction={(e) => {
                        e.preventDefault();
                          saveInvoice("Draft");
                          window.location.reload();
                      }}
                    >
                      Save as Draft
                    </Button>
                    <Button
                      color="var(--mark-color)"
                      handleAction={() => {
                        if (isValidForm()) {
                          saveInvoice("Pending");
                        }
                      }}
                    >
                      Save & Send
                    </Button>
                  </div>
                </div>
              </div>
              <div className="responsive-action-btn-wrapper">
                <div className="responsive-action-btn">
                  <span>
                    <Button
                      color="var(--add-item-button-bg)"
                      txt="var(--add-item-button-color)"
                      handleAction={(e) => {
                        e.preventDefault();
                        handleModalClose();
                      }}
                    >
                      Discard
                    </Button>
                    <div>
                      <Button
                        color="var(--primary-color)"
                        handleAction={(e) => {
                            e.preventDefault();
                            saveInvoice("Draft");
                            window.location.reload();
                        }}
                      >
                        Save as Draft
                      </Button>
                      <Button
                        color="var(--mark-color)"
                        handleAction={() => {
                          if (isValidForm()) {
                            saveInvoice("Pending");
                            navigate("/");
                          }
                        }}
                      >
                        Save & Send
                      </Button>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <InvoiceHeader
        total={invoices.length}
        handleOpen={handleModalOpen}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleOptionChange={handleOptionChange}
        selectedOption={selectedOption}
      />
      {isLoading ? (
        <LoadingAnimation />
      ) : invoices.length > 0 ? (
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

// invoice header component
const InvoiceHeader = ({
  total,
  handleOpen,
  isOpen,
  setIsOpen,
  handleOptionChange,
  selectedOption,
}) => (
  <>
    <div className="invoice-header">
      <div className="invoice-title">
        <h1>Invoices</h1>
        <p>There are {total} total invoices</p>
      </div>
      <div className="invoice-action">
        <span className="invoice-filter">
          <div className="dropdown-container">
            <div
              className="dropdown-trigger"
              onClick={() => {
                setIsOpen(!isOpen);
                console.log(isOpen);
              }}
            >
              <span className="filter-text">
                Filter <span className="by-status">by status</span>
              </span>
              <img
                src={isOpen ? IconArrowUp : IconArrowDown}
                alt="icon-arrow-down"
              />
            </div>
            {isOpen && (
              <div className="dropdown-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    value="Draft"
                    checked={selectedOption === "Draft"}
                    onChange={handleOptionChange}
                  />
                  <span className="radio-custom">
                    {selectedOption === "Draft" && (
                      <img src={IconCheck} alt="icon-check" />
                    )}
                  </span>
                  Draft
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="Pending"
                    checked={selectedOption === "Pending"}
                    onChange={handleOptionChange}
                  />
                  <span className="radio-custom">
                    {selectedOption === "Pending" && (
                      <img src={IconCheck} alt="icon-check" />
                    )}
                  </span>
                  Pending
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="Paid"
                    checked={selectedOption === "Paid"}
                    onChange={handleOptionChange}
                  />
                  <span className="radio-custom">
                    {selectedOption === "Paid" && (
                      <img src={IconCheck} alt="icon-check" />
                    )}
                  </span>
                  Paid
                </label>
              </div>
            )}
          </div>
        </span>
        <InvoiceButton handleOpen={handleOpen} />
      </div>
    </div>
  </>
);

export default Invoices;
