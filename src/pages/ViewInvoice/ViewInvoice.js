import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SideNav, StatusButton, Button, Modal } from "../../components";
import "./ViewInvoice.css";
import { IconArrowLeft, IconDelete } from "../../assets";

const ViewInvoice = () => {
  // handling passed data
  const { state } = useLocation();

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

  // handling closing of delete modal
  const closeSideModal = () => {
    setShowSideModal(false);
  };

  // activating the useNavigate function
  const navigate = useNavigate();

  // handling page navigation
  const handleClick = () => {
    navigate("/");
  };

  console.log(`state: ${JSON.stringify(state.sendersaddress)}`)

  // rendering the UI elements
  return (
    <>
      <div className="back-button" onClick={handleClick}>
        <img src={IconArrowLeft} alt="go back"/>
        <p>Go back</p>
      </div>
      <SideNav />
      <ViewInvoiceHeader
        key={state.id}
        status={state.status}
        openModal={openModal}
        openSideModal={openSideModal}
      />
      <ViewInvoiceContent key={state.id} state={state} />
      <DeleteModal
        key={state.id}
        showModal={showModal}
        closeModal={closeModal}
        id={state.id}
      />
      <Modal show={showSideModal} handleClose={closeSideModal}>
        <div className="create-invoice-wrapper">
          <h5>Edit #{state.id}</h5>
          <form>
            <div className="bill-from">
              <p>Bill From</p>
              <div>
                <label>Street Address</label>
                <br />
                <input
                  type="text"
                  className="input-boxes fill"
                  value={state.sendersaddress.street}
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
                    value={state.sendersaddress.city}
                    required
                  />
                </div>
                <div>
                  <label>Post Code</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    value={state.sendersaddress.postcode}
                    required
                  />
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    value={state.sendersaddress.country}
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
                  value={state.clientname}
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
                  value={state.clientemail}
                  required
                />
              </div>
              <div>
                <label>Street Address</label>
                <br />
                <input
                  type="text"
                  className="input-boxes fill"
                  value={state.clientaddress.street}
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
                    value={state.clientaddress.city}
                    required
                  />
                </div>
                <div>
                  <label>Post Code</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    value={state.clientaddress.postCode}
                    required
                  />
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    value={state.clientaddress.country}
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
                    value={state.createdat.substring(0, 10)}
                    required
                  />
                </div>
                <div>
                  <label>Payment Terms</label>
                  <select required>
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
                  value={state.description}
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
                  {state.items.map((e) => (
                    <tr className="items-row">
                      <td>{e.name}</td>
                      <td>{e.quantity}</td>
                      <td>{e.price}</td>
                      <td>{e.total}</td>
                      <td>
                        <img src={IconDelete} alt="delete icon" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="item-list-btn">+ Add New Items</div>
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
                      <Button color="var(--mark-color)">Save & Send</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

const ViewInvoiceHeader = ({ status, openModal, openSideModal }) => (
  <div className="view-invoice-header">
    <div>
      <p>Status</p>
      <StatusButton status={status} />
    </div>
    <div>
      <Button
        color="var(--edit-color)"
        txt="#7E88C3"
        modalAction={openSideModal}
      >
        Edit
      </Button>
      <Button color="var(--delete-color)" modalAction={openModal}>
        Delete
      </Button>
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
          <p>{state.sendersaddress.street}</p>
          <p>{state.sendersaddress.city}</p>
          <p>{state.sendersaddress.postcode}</p>
          <p>{state.sendersaddress.country}</p>
        </div>
      </div>
      <div className="view-invoice-details">
        <div>
          <div>
            <p>Invoice Date</p>
            <h5>{state.createdat.substring(0, 10)}</h5>
          </div>
          <div>
            <p>Payment Due</p>
            <h5>{state.paymentdue.substring(0, 10)}</h5>
          </div>
        </div>
        <div>
          <p>Bill To</p>
          <h5>{state.clientname}</h5>
          <div>
            <p>{state.clientaddress.street}</p>
            <p>{state.clientaddress.city}</p>
            <p>{state.clientaddress.postcode}</p>
            <p>{state.clientaddress.country}</p>
          </div>
        </div>
        <div>
          <p>Sent To</p>
          <h5>{state.clientemail}</h5>
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
          <h5>£{state.total.substring(1)}</h5>
        </div>
        <div className="spacer"></div>
      </div>
    </div>
  </>
);

const DeleteModal = ({ closeModal, showModal, id }) => {
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
                modalAction={closeModal}
              >
                Cancel
              </Button>
              <Button color="var(--delete-color)">Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInvoice;
