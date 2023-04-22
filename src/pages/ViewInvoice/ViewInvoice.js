import React from "react";
import { useLocation } from "react-router-dom";
import { SideNav } from "../../components";
import "./ViewInvoice.css";
import StatusButton from "../../components/StatusButton/StatusButton";

const ViewInvoice = () => {
  const { state } = useLocation();
  return (
    <>
      <SideNav />
      <div className="view-invoice-header">
        <div>
          <p>Status</p>
          <StatusButton status={state.status} />
        </div>
        <div>
          
        </div>
      </div>
    </>
  );
};

export default ViewInvoice;
