import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SideNav,
  StatusButton,
  Button,
  Modal,
  AddItemModal,
} from "../../components";
import "./ViewInvoice.css";
import { IconArrowLeft, IconDelete } from "../../assets";
import {
  deleteInvoice,
  markInvoiceAsPaid,
  readInvoiceById,
  updateInvoice,
} from "../../services/crud";

const ViewInvoice = () => {
  // handling passed data
  const data = useLocation();

  // currect state of the invoice details
  const [state, setState] = React.useState(data.state);

  // currently selected invoice id
  const id = localStorage.getItem("id");

  // localStorage.set(state);

  // useState hooks
  const [showModal, setShowModal] = React.useState(false);
  const [showSideModal, setShowSideModal] = React.useState(false);

  // handling opening of delete modal
  const openModal = () => {
    setShowModal(true);
  };

  // handling closing of delete modal
  const closeModal = () => {
    setShowModal(false);
  };

  // handling opening of edit modal
  const openSideModal = () => {
    setShowSideModal(true);
  };

  // handling closing of edit modal
  const closeSideModal = () => {
    setShowSideModal(false);
  };

  // activating the useNavigate function
  const navigate = useNavigate();

  // handling page navigation
  const handleClick = () => {
    navigate("/");
  };

  // delete invoice
  const removeInvoice = async () => {
    console.log(`id: ${state?.id}`);
    await deleteInvoice(state?.id);
    closeModal();
    navigate("/");
  };

  // Senders Address Controllers
  const [sendersStreet, setSendersStreet] = React
    .useState
    // state?.sendersaddress.street
    ();
  const [sendersCity, setSendersCity] = React
    .useState
    // state?.sendersaddress.city
    ();
  const [sendersPostCode, setSendersPostCode] = React
    .useState
    // state?.sendersaddress.postCode
    ();
  const [sendersCountry, setSendersCountry] = React
    .useState
    // state?.sendersaddress.country
    ();

  // Senders Address Controllers
  const [clientName, setClientName] = React
    .useState
    // state?.clientname
    ();
  const [clientEmail, setClientEmail] = React
    .useState
    // state?.clientemail
    ();

  // Invoice Information
  const [paymentDue, setPaymentDue] = React
    .useState
    // state?.createdat.substring(0, 10)
    ();
  const [paymentTerms, setPaymentTerms] = React
    .useState
    // state?.paymentterms
    ();
  const [description, setDescription] = React
    .useState
    // state?.description
    ();
  const [items, setItems] = React
    .useState
    // state?.items
    ();
  const [status, setStatus] = React.useState();

  // Client Address Controllers
  const [clientStreet, setClientStreet] = React
    .useState
    // state?.clientaddress.street
    ();
  const [clientCity, setClientCity] = React
    .useState
    // state?.clientaddress.city
    ();
  const [clientPostCode, setClientPostCode] = React
    .useState
    // state?.clientaddress.postCode
    ();
  const [clientCountry, setClientCountry] = React
    .useState
    // state?.clientaddress.country
    ();

  // const handleShowModal = () => setShowItemModal(true);
  // const handleCloseModal = () => setShowItemModal(false);

  // edit invoice
  const editInvoice = async () => {
    await updateInvoice(
      {
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
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0), // computing the total of all the added items
      },
      state?.id
    );
    window.location.reload();
    closeSideModal();
  };

  // reading invoice data
  useEffect(() => {
    const readData = async () => {
      const invoice = await readInvoiceById(id);
      setState(JSON.parse(invoice)[0]);
      // setIsLoading(false);
    };
    readData();
  }, []);

  useEffect(() => {
    setSendersStreet(state?.sendersaddress.street);
    setSendersCity(state?.sendersaddress.city);
    setSendersPostCode(state?.sendersaddress.postCode);
    setSendersCountry(state?.sendersaddress.country);
    setClientName(state?.clientname);
    setClientEmail(state?.clientemail);
    setPaymentDue(state?.createdat.substring(0, 10));
    setPaymentTerms(state?.paymentterms);
    setDescription(state?.description);
    setClientStreet(state?.clientaddress.street);
    setClientCity(state?.clientaddress.city);
    setClientPostCode(state?.clientaddress.postCode);
    setClientCountry(state?.clientaddress.country);
    setStatus(state?.status);
    setItems(state?.items);
  }, [state]);

  // marking pending invoices as paid
  const markAsPaid = async () => {
    await markInvoiceAsPaid(`${state?.id}`);
    setStatus("Paid");
    window.location.reload();
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

  // rendering the UI elements
  return (
    <div className="view-invoice-wrapper">
      <div className="back-button" onClick={handleClick}>
        <img src={IconArrowLeft} alt="go back" />
        <p>Go back</p>
      </div>
      <SideNav />
      <ViewInvoiceHeader
        key={state?.id}
        status={state?.status}
        openModal={openModal}
        openSideModal={openSideModal}
        markInvoiceAsPaid={markAsPaid}
      />
      <ViewInvoiceContent key={state?.id} state={state} />
      <DeleteModal
        key={state?.id}
        showModal={showModal}
        closeModal={closeModal}
        id={state?.id}
        deleteInvoice={removeInvoice}
      />
      <Modal show={showSideModal} handleClose={closeSideModal}>
        <div className="create-invoice-wrapper">
          <div className="back-btn" onClick={() => closeSideModal()}>
            <img src={IconArrowLeft} alt="go back" />
            <p>Go back</p>
          </div>

          <h5>Edit #{state?.id}</h5>
          <form>
            <div className="bill-from">
              <p>Bill From</p>
              <div>
                <label>Street Address</label>
                <br />
                <input
                  type="text"
                  className="input-boxes fill"
                  value={sendersStreet}
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
                    value={sendersCity}
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
                    value={sendersPostCode}
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
                    value={sendersCountry}
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
                  value={clientName}
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
                  value={clientEmail}
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
                  value={clientStreet}
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
                    value={clientCity}
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
                    value={clientPostCode}
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
                    value={clientCountry}
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
                    value={paymentDue}
                    onChange={(e) => setPaymentDue(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Payment Terms</label>
                  <select
                    onChange={(e) =>
                      setPaymentTerms(
                        parseInt(e.target.value.substring(3, 6).trim())
                      )
                    }
                    value={paymentTerms}
                    required
                  >
                    <option>Net 1 Day</option>
                    <option>Net 7 Day</option>
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
                  value={description}
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
                    : null}
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
              {/* <AddItemModal
                showItemModal={showItemModal}
                handleCloseModal={handleCloseModal}
              /> */}
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
                  // handleAddItem();
                }}
              >
                + Add New Items
              </div>
              <div className="action-container action-btn-wrapper">
                <div className="action-btn">
                  <div>
                    <Button
                      color="var(--primary-color)"
                      handleAction={(e) => {
                        e.preventDefault();
                        closeSideModal();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      hover_color="var(--mark-hover)"
                      color="var(--mark-color)"
                      handleAction={(e) => {
                        e.preventDefault()
                        editInvoice();
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
              <div className="responsive-action-btn-wrapper">
                <div className="responsive-action-btn">
                  <span>
                    <div>
                      <Button
                        color="var(--primary-color)"
                        handleAction={(e) => {
                          e.preventDefault();
                          closeSideModal();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="var(--mark-color)"
                        handleAction={(e) => {
                          e.preventDefault()
                          editInvoice();
                        }}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <div className="responsive-action">
        <span>
          <Button
            color="var(--edit-color)"
            txt="#7E88C3"
            handleAction={openSideModal}
            disabled={state?.status?.toLowerCase() === "paid"}
          >
            Edit
          </Button>
          <Button color="var(--delete-color)" handleAction={openModal}>
            Delete
          </Button>
          <Button
            color="var(--mark-color)"
            handleAction={markAsPaid}
            disabled={
              state?.status?.toLowerCase() === "paid" ||
              state?.status?.toLowerCase() === "draft"
            }
          >
            Mark as Paid
          </Button>
        </span>
      </div>
    </div>
  );
};

// header component for view invoice
const ViewInvoiceHeader = ({
  status,
  openModal,
  openSideModal,
  markInvoiceAsPaid,
}) => (
  <div className="view-invoice-header">
    <div className="header-wrapper">
      <div className="status-btn">
        <p>Status</p>
        <span>
          <StatusButton status={status} />
        </span>
      </div>
      <div className="action-hide">
        <div className="action-btn">
          <Button
            hover_color="var(--edit-hover)"
            color="var(--edit-color)"
            txt="#7E88C3"
            handleAction={openSideModal}
            disabled={status?.toLowerCase() === "paid"}
          >
            Edit
          </Button>
          <Button
            hover_color="var(--delete-hover)"
            color="var(--delete-color)"
            handleAction={openModal}
          >
            Delete
          </Button>
          <Button
            hover_color="var(--mark-hover)"
            color="var(--mark-color)"
            handleAction={markInvoiceAsPaid}
            disabled={
              status?.toLowerCase() === "paid" ||
              status?.toLowerCase() === "draft"
            }
          >
            Mark as Paid
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// content component for view invoice
const ViewInvoiceContent = ({ state }) => (
  <>
    <div className="view-invoice-content">
      <div className="head">
        <div className="title">
          <h5>#{state?.id}</h5>
          <p>{state?.description}</p>
        </div>
        <div className="view-invoice-address">
          <p>{state?.sendersaddress.street}</p>
          <p>{state?.sendersaddress.city}</p>
          <p>{state?.sendersaddress.postcode}</p>
          <p>{state?.sendersaddress.country}</p>
        </div>
      </div>
      <div className="view-invoice-details">
        <div className="address-1">
          <div>
            <div>
              <p>Invoice Date</p>
              <h5>{state?.createdat.substring(0, 10)}</h5>
            </div>
            <div>
              <p>Payment Due</p>
              <h5>{state?.paymentdue.substring(0, 10)}</h5>
            </div>
          </div>
          <div>
            <p>Bill To</p>
            <h5>{state?.clientname}</h5>
            <div>
              <p>{state?.clientaddress.street}</p>
              <p>{state?.clientaddress.city}</p>
              <p>{state?.clientaddress.postcode}</p>
              <p>{state?.clientaddress.country}</p>
            </div>
          </div>
          <div></div>
        </div>
        <div>
          <p>Sent To</p>
          <h5>{state?.clientemail}</h5>
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
            {state?.items?.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.quantity}</td>
                <td>£ {e.price.toFixed(2)}</td>
                <td>£ {e.total}</td>
              </tr>
            ))}
          </table>
        </div>
        <div className="total-tag">
          <p>Amount Due</p>
          <h5>£ {state?.total.substring(1)}</h5>
        </div>
        <div className="spacer"></div>
      </div>
    </div>
  </>
);

// delete component for view invoice
const DeleteModal = ({ closeModal, showModal, id, deleteInvoice }) => {
  return (
    <div>
      {showModal && (
        <div className="modal-background">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete invoice #{id}? This action cannot
              be undone.
            </p>
            <div>
              <Button
                color="var(--edit-color)"
                txt="#7E88C3"
                handleAction={closeModal}
              >
                Cancel
              </Button>
              <Button color="var(--delete-color)" handleAction={deleteInvoice}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInvoice;
