import { gql } from "@apollo/client";

export const GET_PRODUCT_FULL = gql`
  query GetProduct($productId: ID!) {
    Product(id: $productId) {
      id
      name
      price
      img_url
      quantity
      power
      description
      brand
      weight
      height
      width
      length
      model_code
      colour
    }
  }
`

export const GET_PRODUCT_FOR_BASKET = gql`
  query Product($productId: ID!) {
    findProductById: Product(id: $productId) {
      name
      price
      img_url
    }
  }
`

export const GET_ALL_PRODUCTS = gql`
  query AllProducts {
    allProducts {
      id
      name
      price
      img_url
      quantity
      power
    }
  }
`

export const GET_PRODUCTS_COUNT = gql`
  query _allProductsMeta {
    _allProductsMeta {
      count
    }
  }
`
