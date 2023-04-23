import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SideNav, StatusButton, Button, Modal } from "../../components";
import "./ViewInvoice.css";
import { IconArrowLeft, IconDelete } from "../../assets";

const ViewInvoice = () => {
  const { state } = useLocation();
  const [showModal, setShowModal] = React.useState(false);
  const [showSideModal, setShowSideModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openSideModal = () => {
    setShowSideModal(true);
  };

  const closeSideModal = () => {
    setShowSideModal(false);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className="back-button" onClick={handleClick}>
        <img src={IconArrowLeft} />
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
                  value={state.senderAddress.street}
                />
              </div>
              <div className="bill-row">
                <div>
                  <label>City</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    value={state.senderAddress.city}
                  />
                </div>
                <div>
                  <label>Post Code</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    value={state.senderAddress.postCode}
                  />
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    value={state.senderAddress.country}
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
                  value={state.clientName}
                />
              </div>
              <div>
                <label>Client's Email</label>
                <br />
                <input
                  type="text"
                  className="input-boxes fill"
                  placeholder="e.g email@example.com"
                  value={state.clientEmail}
                />
              </div>
              <div>
                <label>Street Address</label>
                <br />
                <input
                  type="text"
                  className="input-boxes fill"
                  value={state.clientAddress.street}
                />
              </div>
              <div className="bill-row">
                <div>
                  <label>City</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    value={state.clientAddress.city}
                  />
                </div>
                <div>
                  <label>Post Code</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    value={state.clientAddress.postCode}
                  />
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <input
                    type="text"
                    className="input-boxes"
                    value={state.clientAddress.country}
                  />
                </div>
              </div>
              <div className="bill-row">
                <div>
                  <label>Invoice Date</label>
                  <input
                    type="date"
                    className="input-boxes"
                    value={state.createdAt}
                  />
                </div>
                <div>
                  <label>Payment Terms</label>
                  <input type="text" className="input-boxes" />
                </div>
              </div>
              <div>
                <label>Project Description</label>
                <input
                  type="text"
                  className="input-boxes fill"
                  value={state.description}
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
                        <img src={IconDelete} />
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
