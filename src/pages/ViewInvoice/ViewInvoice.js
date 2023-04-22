import React from "react";
import { useLocation } from "react-router-dom";

const ViewInvoice = () => {
  const { state } = useLocation();
  return <>
    <div>{state.id}</div>
  </>;
};

export default ViewInvoice; 
