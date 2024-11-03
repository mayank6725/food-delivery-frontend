import { gql } from '@apollo/client';

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      id
      name
      address {
        street
        city
      }
      rating
      menuItems {
        name
        price
      }
    }
  }
`;

export const SEARCH_RESTAURANTS_BY_NAME = gql`
  query SearchRestaurantsByName($name: String!) {
    searchRestaurantsByName(name: $name) {
      id
      name
      address {
        street
        city
        state
        pincode
      }
      phone
      email
      rating
    }
  }
`;

export const GET_RESTAURANT_BY_ID = gql`
  query GetRestaurantByID($id: ID!) {
    restaurant(id: $id) {
      id
      name
      address {
        street
        city
        state
        pincode
      }
      menuItems{
        id
        name
        description
        price
        imageUrl
      }
      phone
      email
      rating
    }
  }
`

export const GET_USER = gql`
  query getUser {
    me {
      id
      username
      role
    }
  }
`

export const GET_ORDERS = gql`
  query GetOrders($userId: ID!) {
    orders(userId: $userId) {
      customer
      restaurant
      orderItems {
        name
        quantity
        price
      }
      totalPrice
      deliveryAddress {
        street
        city
        state
        pincode
      }
      status
    }
  }
`;