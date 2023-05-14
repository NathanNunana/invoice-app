import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SideNav, StatusButton, Button, Modal, AddItemModal } from "../../components";
import "./ViewInvoice.css";
import { IconArrowLeft, IconDelete } from "../../assets";
import {
  deleteInvoice,
  markInvoiceAsPaid,
  updateInvoice,
} from "../../services/crud";

const ViewInvoice = () => {
  // handling passed data
  const { state } = useLocation();

  // localStorage.set(state);

  // useState hooks
  const [showModal, setShowModal] = React.useState(false);
  const [showSideModal, setShowSideModal] = React.useState(false);
  const [showItemModal, setShowItemModal] = React.useState(false);

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

  // New Invoice Controllers
  // Senders Address Controllers
  const [sendersStreet, setSendersStreet] = React.useState(
    state?.sendersaddress.street
  );
  const [sendersCity, setSendersCity] = React.useState(
    state?.sendersaddress.city
  );
  const [sendersPostCode, setSendersPostCode] = React.useState(
    state?.sendersaddress.postCode
  );
  const [sendersCountry, setSendersCountry] = React.useState(
    state?.sendersaddress.country
  );

  // Senders Address Controllers
  const [clientName, setClientName] = React.useState(state?.clientname);
  const [clientEmail, setClientEmail] = React.useState(state?.clientemail);

  // Invoice Information
  const [paymentDue, setPaymentDue] = React.useState(
    state?.createdat.substring(0, 10)
  );
  const [paymentTerms, setPaymentTerms] = React.useState(state?.paymentterms);
  const [description, setDescription] = React.useState(state?.description);
  const [items, setItems] = React.useState(state?.items);
  const [total, setTotal] = React.useState(0.0);
  const [status, setStatus] = React.useState("Pending");

  // Client Address Controllers
  const [clientStreet, setClientStreet] = React.useState(
    state?.clientaddress.street
  );
  const [clientCity, setClientCity] = React.useState(state?.clientaddress.city);
  const [clientPostCode, setClientPostCode] = React.useState(
    state?.clientaddress.postCode
  );
  const [clientCountry, setClientCountry] = React.useState(
    state?.clientaddress.country
  );

  const handleShowModal = () => setShowItemModal(true);
  const handleCloseModal = () => setShowItemModal(false);

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
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      },
      state?.id
    );
  };

  const readInvoice = () => {
    // TODO: read the invoice by id
  };

  const markAsPaid = async () => {
    await markInvoiceAsPaid(`${state?.id}`);
    navigate("/");
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
          <div className="back-btn" onClick={handleClick}>
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
                  {items.length > 0
                    ? items.map((e, index) => (
                        <tr className="items-row">
                          <td>{e.name}</td>
                          <td>{e.quantity}</td>
                          <td>{e.price.toFixed(2)}</td>
                          <td>{e.total.toFixed(2)}</td>
                          <td>
                            <img
                              src={IconDelete}
                              alt="delete icon"
                              onClick={() => {
                                const updatedItems = items.filter(
                                  (e, i) => i !== index
                                );
                                setItems(updatedItems);
                              }}
                            />
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
              <AddItemModal
                showItemModal={showItemModal}
                handleCloseModal={handleCloseModal}
              />
              <div className="item-list-btn" onClick={handleShowModal}>
                + Add New Items
              </div>
              <div className="action-container">
                <div className="action-btn-wrapper">
                  <div className="action-btn">
                    <Button
                      color="var(--add-item-button-bg)"
                      txt="var(--add-item-button-color)"
                    >
                      Discard
                    </Button>
                    <div>
                      <Button color="var(--primary-color)">
                        Save as Draft
                      </Button>
                      <Button
                        color="var(--mark-color)"
                        handleAction={editInvoice}
                      >
                        Save & Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="responsive-action-btn-wrapper">
              <div className="responsive-action-btn">
                <span>
                  <div>
                    <Button
                      color="var(--primary-color)"
                      handleAction={()=>navigate("/")}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="var(--mark-color)"
                      handleAction={editInvoice}
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
          >
            Edit
          </Button>
          <Button color="var(--delete-color)" handleAction={openModal}>
            Delete
          </Button>
          <Button color="var(--mark-color)" handleAction={markInvoiceAsPaid}>
            Mark as Paid
          </Button>
        </span>
      </div>
    </div>
  );
};

const ViewInvoiceHeader = ({
  status,
  openModal,
  openSideModal,
  markInvoiceAsPaid,
}) => (
  <div className="view-invoice-header">
    <div className="status-btn">
      <p>Status</p>
      <span>
        <StatusButton status={status} />
      </span>
    </div>
    <div className="action-hide">
      <div className="action-btn">
        <Button
          color="var(--edit-color)"
          txt="#7E88C3"
          handleAction={openSideModal}
        >
          Edit
        </Button>
        <Button color="var(--delete-color)" handleAction={openModal}>
          Delete
        </Button>
        <Button color="var(--mark-color)" handleAction={markInvoiceAsPaid}>
          Mark as Paid
        </Button>
      </div>
    </div>
  </div>
);

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
            {state?.items.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.quantity}</td>
                <td>£ {" "} {e.price.toFixed(2)}</td>
                <td>£ {" "} {e.total.toFixed(2)}</td>
              </tr>
            ))}
          </table>
        </div>
        <div className="total-tag">
          <p>Amount Due</p>
          <h5>£{" "}{state?.total.substring(1)}</h5>
        </div>
        <div className="spacer"></div>
      </div>
    </div>
  </>
);

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
