import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createUser(user: UserInput): User!
  }
  type Query {
    getUserById(id: String): User!
    apartments: [Apartment!]!
    vouchers: [Voucher!]!
    bookings: [Booking!]!
    orders: [Order!]!
  }
  type Apartment {
    seller: User!
    name: String!
    description: String!
    image: String!
    _id: ID!
    price: Int!
    roomsCount: Int!
    bookings: [Booking!]!
  }
  type Voucher {
    seller: User!
    name: String!
    description: String!
    image: String!
    _id: ID!
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
    buyer: User!
    dateStart: String!
    dateEnd: String!
  }
  type User {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    role: Role!
  }
  enum Role {
    BUYER
    SELLER
  }
  input UserInput {
    first_name: String!
    last_name: String!
    email: String!
    role: Role!
  }
  type Order {
    _id: ID!
    voucher: Voucher!
    buyer: User!
    quantity: Int!
  }
`;
