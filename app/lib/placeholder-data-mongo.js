// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

const { toDate } = require("date-fns");

// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    name: "User",
    email: "user@nextmail.com",
    password: "12345612232345234121112312321",
  },
];

const customers = [
  {
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    image_url: "/customers/delba-de-oliveira.png",
  },
  {
    name: "Lee Robinson",
    email: "lee@robinson.com",
    image_url: "/customers/lee-robinson.png",
  },
  {
    name: "Hector Simpson",
    email: "hector@simpson.com",
    image_url: "/customers/hector-simpson.png",
  },
  {
    name: "Steven Tey",
    email: "steven@tey.com",
    image_url: "/customers/steven-tey.png",
  },
  {
    name: "Steph Dietz",
    email: "steph@dietz.com",
    image_url: "/customers/steph-dietz.png",
  },
  {
    name: "Michael Novotny",
    email: "michael@novotny.com",
    image_url: "/customers/michael-novotny.png",
  },
  {
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    image_url: "/customers/evil-rabbit.png",
  },
  {
    name: "Emil Kowalski",
    email: "emil@kowalski.com",
    image_url: "/customers/emil-kowalski.png",
  },
  {
    name: "Amy Burns",
    email: "amy@burns.com",
    image_url: "/customers/amy-burns.png",
  },
  {
    name: "Balazs Orban",
    email: "balazs@orban.com",
    image_url: "/customers/balazs-orban.png",
  },
];

const setUTCDate = (value) => {
  // return new Date(value).valueOf()
  return new Date(value)

}

const getInvoices = (generatedCustomers) => [
  {
    customer_id: generatedCustomers[0].id,
    customer: generatedCustomers[0]._id,
    amount: 15795,
    status: "pending",
    date: setUTCDate("2022-12-06"),
  },
  {
    customer_id: generatedCustomers[1].id,
    customer: generatedCustomers[1]._id,
    amount: 20348,
    status: "pending",
    date: setUTCDate("2022-11-14"),
  },
  {
    customer_id: generatedCustomers[4].id,
    customer: generatedCustomers[4]._id,
    amount: 3040,
    status: "paid",
    date: setUTCDate("2022-10-29"),
  },
  {
    customer_id: generatedCustomers[3].id,
    customer: generatedCustomers[3]._id,
    amount: 44800,
    status: "paid",
    date: setUTCDate("2023-09-10"),
  },
  {
    customer_id: generatedCustomers[5].id,
    customer: generatedCustomers[5]._id,
    amount: 34577,
    status: "pending",
    date: setUTCDate("2023-08-05"),
  },
  {
    customer_id: generatedCustomers[7].id,
    customer: generatedCustomers[7]._id,
    amount: 54246,
    status: "pending",
    date: setUTCDate("2023-07-16"),
  },
  {
    customer_id: generatedCustomers[6].id,
    customer: generatedCustomers[6]._id,
    amount: 666,
    status: "pending",
    date: setUTCDate("2023-06-27"),
  },
  {
    customer_id: generatedCustomers[3].id,
    customer: generatedCustomers[3]._id,
    amount: 32545,
    status: "paid",
    date: setUTCDate("2023-06-09"),
  },
  {
    customer_id: generatedCustomers[4].id,
    customer: generatedCustomers[4]._id,
    amount: 1250,
    status: "paid",
    date: setUTCDate("2023-06-17"),
  },
  {
    customer_id: generatedCustomers[5].id,
    customer: generatedCustomers[5]._id,
    amount: 8546,
    status: "paid",
    date: setUTCDate("2023-06-07"),
  },
  {
    customer_id: generatedCustomers[1].id,
    customer: generatedCustomers[1]._id,
    amount: 500,
    status: "paid",
    date: setUTCDate("2023-08-19"),
  },
  {
    customer_id: generatedCustomers[5].id,
    customer: generatedCustomers[5]._id,
    amount: 8945,
    status: "paid",
    date: setUTCDate("2023-06-03"),
  },
  {
    customer_id: generatedCustomers[2].id,
    customer: generatedCustomers[2]._id,
    amount: 8945,
    status: "paid",
    date: setUTCDate("2023-06-18"),
  },
  {
    customer_id: generatedCustomers[0].id,
    customer: generatedCustomers[0]._id,
    amount: 8945,
    status: "paid",
    date: setUTCDate("2023-10-04"),
  },
  {
    customer_id: generatedCustomers[2].id,
    customer: generatedCustomers[2]._id,
    amount: 1000,
    status: "paid",
    date: setUTCDate("2022-06-05"),
  },
];

const revenue = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2200 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 2300 },
  { month: "Jun", revenue: 3200 },
  { month: "Jul", revenue: 3500 },
  { month: "Aug", revenue: 3700 },
  { month: "Sep", revenue: 2500 },
  { month: "Oct", revenue: 2800 },
  { month: "Nov", revenue: 3000 },
  { month: "Dec", revenue: 4800 },
];

module.exports = {
  users,
  customers,
  getInvoices,
  revenue,
};
