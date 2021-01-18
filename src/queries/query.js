import { gql } from "@apollo/client";

const Fields = gql`
  fragment getAllFields on Items {
    name
    brand
    colors
    category
    id
    size
    descriptions
    price
    discount
    bestseller
    specs
    instock
    imagesCollection {
      items {
        url
      }
    }
  }
`;

const GET_ITEMS = gql`
  query {
    allItems: itemsCollection {
      items {
        ...getAllFields
      }
    }
    smartphoneandwatch: itemsCollection(
      where: { category: "smartphoneandwatch" }
    ) {
      items {
        ...getAllFields
      }
    }
    tv: itemsCollection(where: { category: "smarttv" }) {
      items {
        ...getAllFields
      }
    }
    accessories: itemsCollection(where: { category: "accessories" }) {
      items {
        ...getAllFields
      }
    }
    electronics: itemsCollection(where: { category: "electronics" }) {
      items {
        ...getAllFields
      }
    }
  }
  ${Fields}
`;

const GET_SEARCH_ITEMS = gql`
  query {
    allItems: itemsCollection {
      items {
        ...getAllFields
      }
    }
  }
  ${Fields}
`;

const GET_ITEM = gql`
  query($itemId: String!) {
    items(id: $itemId) {
      ...getAllFields
    }
  }
  ${Fields}
`;

const GET_SPECIFIC_ITEMS = gql`
  query($items: String!) {
    itemsCollection(where: { category: $items }) {
      items {
        ...getAllFields
      }
    }
  }
  ${Fields}
`;

const GET_DISCOUNT_ITEMS = gql`
  query {
    itemsCollection(where: { discount_exists: true }) {
      items {
        ...getAllFields
      }
    }
  }
  ${Fields}
`;
const GET_BESTSELLERS_ITEMS = gql`
  query {
    itemsCollection(where: { bestseller_exists: true }) {
      items {
        ...getAllFields
      }
    }
  }
  ${Fields}
`;

export {
  GET_ITEMS,
  GET_SPECIFIC_ITEMS,
  GET_ITEM,
  GET_DISCOUNT_ITEMS,
  GET_BESTSELLERS_ITEMS,
  GET_SEARCH_ITEMS,
};
