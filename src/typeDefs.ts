const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    hello: String
    apartment: String
    apartments: [Apartment!]!
    vouchers: [Voucher!]!
    bookings: [Booking!]!
    orders: [Order!]!
  }
  type Apartment {
    hello: String
    name: String!
    description: String!
    image: String!
    id: ID!
    price: Int!
    roomsCount: Int!
    bookedDates: [String!]!
  }
  type Voucher {
    name: String!
    description: String!
    image: String!
    id: ID!
    price: Int!
    variant: Variant!
    quantity: Int!
  }
  enum Variant {
    RESTAURANT
    CLUB
    MUSEUM
    CINEMA
  }
  type Booking {
    apartment: Apartment!
    buyer: Buyer!
    dateRange: String!
  }
  type Buyer {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
  }
  type Order {
    id: ID!
    voucher: Voucher!
    buyer: Buyer!
  }
`;
