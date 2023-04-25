import axios from "axios";

// create new invoice
const createInvoice = (invoice) =>
  axios
    .post("data.json", invoice)
    .then((data) => console.log(data))
    .catch((e) => console.log(e));

// read invoice
const readInvoice = () =>
  axios
    .get("data.json")
    .then((data) => data)
    .catch((e) => console.log(e));

// update invoice by id
const updateInvoice = (id, invoice) =>
  axios
    .put("data.json", invoice)
    .then((data) => console.log(data))
    .catch((e) => console.log(e));

// delete invoice by id
const deleteInvoice = (id) => axios.delete("data.json").then(data=> console.log(data)).catch((e)=>console.log(e));

export { createInvoice, readInvoice, updateInvoice, deleteInvoice };
