import axios from "axios";

const baseUrl = "https://invoice-app-backend-dfaj.onrender.com/invoice";
// const baseUrl = "http://localhost:8000/invoice";

// create new invoice
const createInvoice = async (invoice) =>
  await axios
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

// read invoice
const readInvoiceById = async (id) =>
  await axios
    .get(`baseUrl/${id}`)
    .then((res) => {
      return JSON.stringify(res.data.invoice);
    })
    .catch((e) => console.log(e));

// update invoice by id
const updateInvoice = async (invoice, id) =>
  await axios
    .put(`${baseUrl}/update/${id}`, invoice)
    .then((data) => console.log(data))
    .catch((e) => console.log(e));

// delete invoice by id
const deleteInvoice = async (id) =>
  await axios
    .delete(`${baseUrl}/remove/${id}`)
    .then((data) => console.log(data))
    .catch((e) => console.log(e));

// mark invoice as paid
const markInvoiceAsPaid = async (id) =>
  await axios
    .put(`${baseUrl}/mark/${id}`)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));

// filter invoice by status
const filterInvoiceByStatus = async (status) =>
  await axios
    .get(`${baseUrl}/filter/${status}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

// crud export
export {
  createInvoice,
  readInvoice,
  readInvoiceById,
  updateInvoice,
  deleteInvoice,
  markInvoiceAsPaid,
  filterInvoiceByStatus
};
