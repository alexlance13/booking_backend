import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createUser(user: UserInput): User!
    getUserById(id: String!): User!

    createApartment(apartment: ApartmentInput!): Apartment!
    editApartment(id: String!, apartment: ApartmentInput!): Apartment!
    removeApartment(id: String!): Apartment!

    createVoucher(voucher: VoucherInput!): Voucher!
    editVoucher(id: String!, voucher: VoucherInput!): Voucher!
    removeVoucher(id: String!): Voucher!

    createOrder(order: OrderInput!): Order!
    createBooking(booking: BookingInput!): Booking!
  }
  type Query {
    getUserById(id: String): User!

    getApartmentById(id: String!): Apartment!
    getAllApartments: [Apartment!]!

    getVoucherById(id: String!): Voucher!
    getAllVouchers: [Voucher!]!

    getBookingById(id: String!): Booking!
    getAllBookings: [Booking!]!

    getOrderById(id: String!): Order!
    getAllOrders: [Order!]!
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
  input ApartmentInput {
    name: String!
    description: String!
    image: String!
    price: Int!
    roomsCount: Int!
    seller: String!
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
  input VoucherInput {
    seller: String!
    name: String!
    description: String!
    image: String!
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
  input BookingInput {
    apartment: String!
    buyer: String!
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
  input OrderInput {
    voucher: String!
    buyer: String!
    quantity: Int!
  }
`;
