import { gql } from "@apollo/client";


// ================================= Quries all items =================================

const GET_HOME = gql`
  fragment getFields on Category {
    items(first: 10) {
      id
      name
      images(first: 1) {
        url
      }
      price
      category {
        name
      }
      discount {
        value
      }
    }
  }

  query getHomeData{
    homes {
      slidingImages {
        url
      }
      adsImage {
        url
      }
      heroMobileImage {
        url
      }
    }
    
    discounts(where: { items_some: {discount: { value_gt: 0}}}){
      items(where: { discount: { value_gt: 0}}) {
        id
        discount {
          value
        }
        images(first: 1) {
          url
        }
      }
      
    }
    
    bestsellers {
      items(first: 4) {
        id
        images(first: 1) {
          url
        }
      
      }
    }
    smartphones: category (where: { name: "smartphones"}){
        ...getFields
    }
    
    watchesandaccessories: category (where: { name: "watchesandaccessories"}){
        ...getFields
    }
    
    electronics: category (where: { name: "electronics"}){
        ...getFields
    }
    
    smarttv: category (where: { name: "smarttv"}){
        ...getFields
    }
}
`;
// ================================= Quries single item =================================
const GET_SINGLE_ITEM = gql`
  query getItem($id: ID!){
    item(where: { id: $id}) {
      name
      rom
      ram
      price
      images {
        url
      }
      color {
        hex
      }
      category {
        name
      }
      options
      description
      specs
      discount {
        value
      }
      bestseller {
        isBestseller
      }
    }
}
`;

const GET_SMARTPHONES = gql`
  query getSmartphones($cursor: String) {
     itemsConnection (first: 4, after: $cursor, where: { category: { name: "smartphones"}}){
      edges {
        node {
          id
          name
          brand {
            name
          }
          images(first: 1) {
            url
          }
          price
          category {
            name
          }
          discount {
            value
           }
          }
        } 
        pageInfo {
          endCursor
          hasNextPage
        }
    }
  }
`;
const GET_ELECTRONICS = gql`
  query getElectronics($cursor: String) {
     itemsConnection (first: 4, after: $cursor, where: { category: { name: "electronics"}}){
      edges {
        node {
          id
          name
          brand {
            name
          }
          images(first: 1) {
            url
          }
          price
          category {
            name
          }
          discount {
            value
           }
          }
        } 
        pageInfo {
          endCursor
          hasNextPage
        }
    }
  }
`;
const GET_WATCHES = gql`
   query getWatches($cursor: String) {
     itemsConnection (first: 4, after: $cursor, where: { category: { name: "watchesandaccessories"}}){
      edges {
        node {
          id
          name
          brand {
            name
          }
          images(first: 1) {
            url
          }
          price
          category {
            name
          }
          discount {
            value
           }
          }
        } 
        pageInfo {
          endCursor
          hasNextPage
        }
    }
  }
`;
const GET_TV = gql`
   query getTv($cursor: String) {
     itemsConnection (first: 4, after: $cursor, where: { category: { name: "smarttv"}}){
      edges {
        node {
          id
          name
          brand {
            name
          }
          images(first: 1) {
            url
          }
          price
          category {
            name
          }
          discount {
            value
           }
          }
        } 
        pageInfo {
          endCursor
          hasNextPage
        }
    }
  }
`;



// ================================= Discount & Best seller items =================================

const GET_DISCOUNT_ITEMS = gql`
  query getDiscount ($cursor: String){
     itemsConnection (first: 4, after: $cursor,  where: { discount: { value_gt: 0}}){
      edges {
        node {
          id
          name
          brand {
            name
          }
          images(first: 1) {
            url
          }
          price
          category {
            name
          }
          discount {
            value
           }
          }
        } 
        pageInfo {
          endCursor
          hasNextPage
        }
    }
  }
`;

// ================================= Best Seller =================================
const GET_BESTSELLER_ITEMS = gql`
  query getBestSeller ($cursor: String){
     itemsConnection (first: 4, after: $cursor, where: { bestseller: { isBestseller: true}}){
      edges {
        node {
          id
          name
          brand {
            name
          }
          images(first: 1) {
            url
          }
          price
          category {
            name
          }
          discount {
            value
           }
          }
        } 
        pageInfo {
          endCursor
          hasNextPage
        }
    }
  }
`;



// ================================= GET Footer =================================

const GET_FOOTER = gql`
  query getFooterData{
    footers {
      title
      messages
      hotlines
    }
  }
`;

// ================================= Services =================================

const GET_SERVICE = gql`
  query {
    services {
      title
      intro
      messages
    }
  }
`

/////////// searchbar query /////////////////////////////////
const SEARCH_QUERY = gql`
  query getSearch {
    items {
      id
      description
      category {
        name
      }
    }
  }
`;

export {
  GET_HOME,
  GET_FOOTER,
  GET_SMARTPHONES,
  GET_ELECTRONICS,
  GET_TV,
  GET_WATCHES,
  SEARCH_QUERY,
  GET_SINGLE_ITEM,
  GET_DISCOUNT_ITEMS,
  GET_BESTSELLER_ITEMS,
  GET_SERVICE
};
