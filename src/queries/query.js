import { gql } from "@apollo/client";

//  PHONES fragment
const PhonesFields = gql`
  fragment getPhones on Smartphones {
    sys {
      id
    }
    name
    brand {
      name
    }
    descriptions
    colors
    specs
    ram
    rom
    price
    imagesCollection {
      items {
        url
      }
    }
    optionsCollection {
      items {
        name
        ram
        rom
        price
        colors
      }
    }
    bestseller
    instock
    discount
  }
`;
//  Electronics fragment
const ElecFields = gql`
  fragment getElec on Electronics {
    sys {
      id
    }
    name
    brand {
      name
    }
    descriptions
    colors
    specs
    price
    imagesCollection {
      items {
        url
      }
    }
    bestseller
    instock
    discount
  }
`;
//  Watches fragment
const WatchesFields = gql`
  fragment getWatches on Watchesandaccessories {
    sys {
      id
    }
    name
    brand {
      name
    }
    descriptions
    colors
    specs
    price
    imagesCollection {
      items {
        url
      }
    }
    bestseller
    instock
    discount
  }
`;
//  smart tv fragment
const TVFields = gql`
  fragment getTV on Smarttv {
    sys {
      id
    }
    name
    brand {
      name
    }
    descriptions
    colors
    specs
    price
    imagesCollection {
      items {
        url
      }
    }
    bestseller
    instock
    discount
  }
`;

// All category fragment

const Fields = gql`
  fragment getTvFields on Smarttv {
    sys {
      id
    }
    name
    price
    imagesCollection (limit: 4){
      items {
        url
      }
    }
    category {
      name
    }
    bestseller
    discount
  }
  fragment getElecFields on Electronics {
    sys {
      id
    }
    name
    price
    imagesCollection (limit: 4){
      items {
        url
      }
    }
    category {
      name
    }
    bestseller
    discount
  }

  fragment getWatchesFields on Watchesandaccessories {
    sys {
      id
    }
    name
    price
    imagesCollection (limit: 4){
      items {
        url
      }
    }
    category {
      name
    }
    bestseller
    discount
  }

  fragment getPhonesFields on Smartphones {
    sys {
      id
    }
    name
    price
    imagesCollection (limit: 4){
      items {
        url
      }
    }
    category {
      name
    }
    bestseller
    discount
  }
`;

// ================================= Quries all items =================================

const GET_ITEMS = gql`
  query {
    smartphones: smartphonesCollection(limit: 10) {
      items { 
        ...getPhonesFields
      }
    }
    watchesandaccessories: watchesandaccessoriesCollection(limit: 10) {
      items {
        ...getWatchesFields
      }
    }
    electronics: electronicsCollection(limit: 10) {
      items {
         ...getElecFields
      }
    }
    smarttv: smarttvCollection(limit: 10) {
     items {
       ...getTvFields
     }
    }
    homeCollection {
      items {
        heroImagesCollection {
          items {
            url
          }
        }
        heroMobileImage {
          url
        }
        adsImage {
          url
        }
      }
    }
  }
  ${Fields}

`;

// ================================= Quries single item =================================
const GET_SINGLE_SMARTPHONES = gql`
  query($itemId: String!) {
    item: smartphones(id: $itemId) {
      ...getPhones
    }
  }
  ${PhonesFields}
`;
const GET_SINIGLE_ELECTRONICS = gql`
  query($itemId: String!) {
    item: electronics(id: $itemId) {
      ...getElec
    }
  }
  ${ElecFields}
`;
const GET_SINGLE_WATCHES = gql`
  query($itemId: String!) {
    item: watchesandaccessories(id: $itemId) {
      ...getWatches
    }
  }
  ${WatchesFields}
`;
const GET_SINGLE_TV = gql`
  query($itemId: String!) {
    item: smarttv(id: $itemId) {
      ...getTV
    }
  }
  ${TVFields}
`;
// ================================= Quries categorized  items =================================
const GET_SMARTPHONES = gql`
  query Phones ($limit: Int!, $offset: Int!){
    itemsCollection: smartphonesCollection (limit: $limit, skip: $offset) {
      items {
        sys {
        id
      }
      name
      price
      brand {
        name
      }
      imagesCollection (limit: 4){
        items {
          url
        }
      }
      category {
        name
      }
      bestseller
      discount
      }
  }
  }
`;
const GET_ELECTRONICS = gql`
  query {
    itemsCollection: electronicsCollection(limit: 10) {
      items {
         sys {
        id
      }
      name
      brand {
        name
      }
      price
      imagesCollection (limit: 4){
        items {
          url
        }
      }
      category {
        name
      }
      bestseller
      discount
    }
  }
  }
`;
const GET_WATCHES = gql`
  query {
    itemsCollection: watchesandaccessoriesCollection {
      items {
         sys {
        id
      }
      name
      brand {
        name
      }
      price
      imagesCollection (limit: 4){
        items {
          url
        }
      }
      category {
        name
      }
      bestseller
      discount
    }
  }
  }
`;
const GET_TV = gql`
  query {
    itemsCollection: smarttvCollection {
      items {
         sys {
        id
      }
      name
      brand {
        name
      }
      price
      imagesCollection (limit: 4){
        items {
          url
        }
      }
      category {
        name
      }
      bestseller
      discount
    }
  }
  }
`;

// ================================= Discount & Best seller items =================================

const GET_DEAL = gql`
  query {
    watchesandaccessoriesCollection(where: { discount_exists: true }, limit: 10) {
      items {
        sys {
          id
        }
        name
        brand {
          name
        }
        descriptions
        colors
        specs
        price
        imagesCollection {
          items {
            url
          }
        }
        category {
          name
        }
        bestseller
        instock
        discount
      }
    }
    smartphonesCollection(where: { discount_exists: true }, limit: 10) {
      items {
        sys {
          id
        }
        name
        brand {
          name
        }
        descriptions
        colors
        specs
        ram
        rom
        price
        imagesCollection {
          items {
            url
          }
        }
        optionsCollection {
          items {
            name
            ram
            rom
            price
            colors
          }
        }
        category {
          name
        }
        bestseller
        instock
        discount
      }
    }
    electronicsCollection(where: { discount_exists: true }, limit: 10) {
      items {
        sys {
          id
        }
        name
        brand {
          name
        }
        descriptions
        colors
        specs
        price
        imagesCollection {
          items {
            url
          }
        }
        category {
          name
        }
        bestseller
        instock
        discount
      }
    }
    smarttvCollection(where: { discount_exists: true }, limit: 10) {
      items {
        sys {
          id
        }
        name
        brand {
          name
        }
        descriptions
        colors
        specs
        price
        imagesCollection {
          items {
            url
          }
        }
        category {
          name
        }
        bestseller
        instock
        discount
      }
    }
  }
`;
const GET_BESTSELLERS = gql`
  query {
    watchesandaccessoriesCollection(where: { bestseller_exists: true }, limit: 10) {
      items {
        sys {
          id
        }
        name
        brand {
          name
        }
        descriptions
        colors
        specs
        price
        imagesCollection {
          items {
            url
          }
        }
        category {
          name
        }
        bestseller
        instock
        discount
      }
    }
    smartphonesCollection(where: { bestseller_exists: true }, limit: 10) {
      items {
        sys {
          id
        }
        name
        brand {
          name
        }
        descriptions
        colors
        specs
        ram
        rom
        price
        imagesCollection {
          items {
            url
          }
        }
        category {
          name
        }
        optionsCollection {
          items {
            name
            ram
            rom
            price
            colors
          }
        }
        bestseller
        instock
        discount
      }
    }
    electronicsCollection(where: { bestseller_exists: true }, limit: 10) {
      items {
        sys {
          id
        }
        name
        brand {
          name
        }
        descriptions
        colors
        specs
        price
        imagesCollection {
          items {
            url
          }
        }
        category {
          name
        }
        bestseller
        instock
        discount
      }
    }
    smarttvCollection(where: { bestseller_exists: true }, limit: 10) {
      items {
        sys {
          id
        }
        name
        brand {
          name
        }
        descriptions
        colors
        specs
        price
        imagesCollection {
          items {
            url
          }
        }
        category {
          name
        }
        bestseller
        instock
        discount
      }
    }
  }
`;

const GET_HOME = gql`
  query {
    homeCollection {
      items {
        heroImagesCollection {
          items {
            url
          }
        }
        heroMobileImage {
          url
        }
        adsImage {
          url
        }
      }
    }
  }
`;

const GET_FOOTER = gql`
  query {
    footerCollection {
      items {
        title
        messages
        hotlines
      }
    }
  }
`;

/////////// searchbar query /////////////////////////////////
const SEARCH_QUERY = gql`
  query {
    smartphonesCollection {
      items {
        sys {
          id
        }
        descriptions
        category {
          name
        }
      }
    }
    watchesandaccessoriesCollection {
      items {
        sys {
          id
        }
        descriptions
        category {
          name
        }
      }
    }
    electronicsCollection {
      items {
        sys {
          id
        }
        descriptions
        category {
          name
        }
      }
    }
    smarttvCollection {
      items {
        sys {
          id
        }
        descriptions
        category {
          name
        }
      }
    }
  }
`;

export {
  GET_ITEMS,
  GET_HOME,
  GET_FOOTER,
  GET_SMARTPHONES,
  GET_ELECTRONICS,
  GET_TV,
  GET_WATCHES,
  GET_SINGLE_SMARTPHONES,
  GET_SINGLE_WATCHES,
  GET_SINIGLE_ELECTRONICS,
  GET_SINGLE_TV,
  GET_DEAL,
  GET_BESTSELLERS,
  SEARCH_QUERY
};
