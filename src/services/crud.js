import axios from "axios";

const baseUrl = "http://localhost:3000/invoice";

// create new invoice
const createInvoice = (invoice) =>
  axios
    .post(`${baseUrl}/create`, invoice)
    .then((data) => console.log(data))
    .catch((e) => console.log(e));

// read invoice
const readInvoice = async () =>
  await axios
    .get(baseUrl)
    .then((res) => {
      return JSON.stringify(res.data.invoice);
    })
    .catch((e) => console.log(e));

// update invoice by id
const updateInvoice = (id, invoice) =>
  axios
    .put("data.json", invoice)
    .then((data) => console.log(data))
    .catch((e) => console.log(e));

// delete invoice by id
const deleteInvoice = (id) =>
  axios
    .delete("data.json")
    .then((data) => console.log(data))
    .catch((e) => console.log(e));

// crud export
export { createInvoice, readInvoice, updateInvoice, deleteInvoice };
