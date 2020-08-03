import {
  conformityQueryFieldDefs,
  conformityQueryFields
} from 'modules/conformity/graphql/queries';

const carFields = `
  _id
  createdAt
  modifiedAt
  ownerId
  mergedIds
  description
  doNotDisturb
  customFieldsData
  plateNumber
  vinNumber
  colorCode
  manufactureBrand
  bodyType
  fuelType
  modelsName
  series
  gearBox
  vintageYear
  importYear
  customFieldsData
  tagIds
  getTags {
    _id
    name
    colorCode
  }
`;

const listParamsDef = `
  $page: Int
  $perPage: Int
  $segment: String
  $tag: String
  $ids: [String]
  $searchValue: String
  $brand: String
  $sortField: String
  $sortDirection: Int
  ${conformityQueryFields}
`;

const listParamsValue = `
  page: $page
  perPage: $perPage
  segment: $segment
  tag: $tag
  ids: $ids
  searchValue: $searchValue
  brand: $brand
  sortField: $sortField
  sortDirection: $sortDirection
  ${conformityQueryFieldDefs}
`;

export const cars = `
  query cars(${listParamsDef}) {
    cars(${listParamsValue}) {
      ${carFields}
    }
  }
`;

export const carsMain = `
  query carsMain(${listParamsDef}) {
    carsMain(${listParamsValue}) {
      list {
        ${carFields}
      }

      totalCount
    }
  }
`;

export const carCounts = `
  query carCounts(${listParamsDef}, $only: String) {
    carCounts(${listParamsValue}, only: $only)
  }
`;

export const carDetail = `
  query carDetail($_id: String!) {
    carDetail(_id: $_id) {
      ${carFields}
      customers {
        _id
        firstName
        lastName
        primaryEmail
        primaryPhone
      }
      companies {
        _id
        primaryName
        website
      }
    }
  }
`;

const tags = `
  query tags($type: String) {
    tags(type: $type) {
      _id
      name
      colorCode
    }
  }
`;

export const carsListConfig = `
  query {
    fieldsDefaultColumnsConfig(contentType: "car") {
      name
      label
      order
    }
  }
`;

const carsExport = `
  query carsExport(${listParamsDef}) {
    carsExport(${listParamsValue})
  }
`;

export default {
  cars,
  carsMain,
  carCounts,
  carDetail,
  tags,
  carsListConfig,
  carsExport
};
