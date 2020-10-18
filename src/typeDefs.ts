import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createUser(user: UserInput!): UserOutput!
    editUser(id: String!, user: UserOptionalInput!): User!
    removeUser(id: String!): User!

    createVoucher(voucher: VoucherInput!): Voucher!
    editVoucher(id: String!, voucher: VoucherOptionalInput!): Voucher!
    removeVoucher(id: String!): Voucher!

    createApartment(apartment: ApartmentInput!): Apartment!
    editApartment(id: String!, apartment: ApartmentOptionalInput!): Apartment!
    removeApartment(id: String!): Apartment!

    createOrder(order: OrderInput!): Order!
    editOrder(id: String!, order: OrderOptionalInput!): Order!
    removeOrder(id: String!): Order!
    
    createBooking(booking: BookingInput!): Booking!
    editBooking(id: String!, booking: BookingOptionalInput!): Booking!
    removeBooking(id: String!): Booking!
  }
  type Query {
    loginUser(email: String!, password: String!): UserOutput!
    getUserById(id: String): User!
    getAllUsers: [User!]!

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
    _id: String!
    seller: User!
    name: String!
    description: String!
    image: String!
    price: Int!
    roomsCount: Int!
    bookings: [Booking]!
  }
  input ApartmentInput {
    name: String!
    description: String!
    image: String!
    price: Int!
    roomsCount: Int!
    seller: String!
  }
  input ApartmentOptionalInput {
    name: String
    description: String
    image: String
    price: Int
    roomsCount: Int
    seller: String
  }

  type Voucher {
    _id: String
    seller: User!
    name: String!
    description: String!
    image: String!
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
  input VoucherOptionalInput {
    seller: String
    name: String
    description: String
    image: String
    price: Int
    variant: Variant
    quantity: Int
  }
  enum Variant {
    RESTAURANT
    CLUB
    MUSEUM
    CINEMA
  }

  type Booking {
    _id: String!
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
  input BookingOptionalInput {
    apartment: String
    buyer: String
    dateStart: String
    dateEnd: String
  }

  type User {
    _id: String!
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
    role: Role!,
    password: String!
  }
  input UserOptionalInput {
    first_name: String
    last_name: String
    email: String
    role: Role,
    password: String
  }
  type UserOutput {
    token: String!
    user: User!
  }
  
  type Order {
    _id: String!
    voucher: Voucher!
    buyer: User!
    quantity: Int!
  }
  input OrderInput {
    voucher: String!
    buyer: String!
    quantity: Int!
  }
  input OrderOptionalInput {
    voucher: String
    buyer: String
    quantity: Int
  }
`;
