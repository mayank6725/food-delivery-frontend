import { gql } from '@apollo/client';
export const LOGIN_MUTATION = gql`
    mutation($username: String!, $password: String!, $role: String!) {
        login(username: $username, password: $password, role: $role) {
            value
        }
    }
`;

export const CREATE_ORDER = gql`
mutation CreateOrder($userId: ID!, $restaurantId: ID!, $items: [OrderItemInput!]!, $deliveryAddress: AddressInput!, $paymentMethod: PaymentMethod!) {
  createOrder(userId: $userId, restaurantId: $restaurantId, items: $items, deliveryAddress: $deliveryAddress, paymentMethod: $paymentMethod) {
    status
    totalPrice
  }
}
`;

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!, $role: String!) {
    register(username: $username, password: $password, role: $role) {
      id
      username
      role
    }
  }
`;