import gql from "graphql-tag";

const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      firstName
      lastName
      employer {
        name
        id
      }
    }
  }
`;





const PULL_QUOTES = gql`
query{
  quotes {
    id
    quote
  }
}
`;

const POST_QUOTES = gql`
mutation add_quote($quote: String!)
{
  add_quote(quote: $quote){
    id
    quote
  }
}
`;


const DELETE_QUOTES = gql`
mutation remove_quote($id: String!)
{
  remove_quote(id: $id){
    id
    quote
  }
}
`;

const PATCH_QUOTES = gql`
mutation edit_quote(
$id: String!,
$quote: String!
)
{
  edit_quote(id: $id, quote: $quote){
    id
    quote
  }
}
`;








const GET_EMPLOYERS = gql`
  query {
    employers {
      name
      id
    }
  }
`;

const GET_EMPLOYERS_WITH_EMPLOYEES = gql`
  query {
    employers {
      id
      name
      numOfEmployees
      employees {
        id
        firstName
        lastName
      }
    }
  }
`;

const ADD_EMPLOYEE = gql`
  mutation createEmployee(
    $firstName: String!
    $lastName: String!
    $employerId: Int!
  ) {
    addEmployee(
      firstName: $firstName
      lastName: $lastName
      employerId: $employerId
    ) {
      id
      firstName
      lastName
      employer {
        name
        id
      }
    }
  }
`;

const ADD_EMPLOYER = gql`
  mutation createEmployer($name: String!) {
    addEmployer(name: $name) {
      id
      name
      numOfEmployees
      employees {
        firstName
        lastName
        id
      }
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: String!) {
    removeEmployee(id: $id) {
      id
      firstName
      lastName
      employer {
        name
        id
      }
    }
  }
`;

const EDIT_EMPLOYEE = gql`
  mutation changeEmployee(
    $id: String!
    $firstName: String
    $lastName: String
    $employerId: Int
  ) {
    editEmployee(
      id: $id
      employerId: $employerId
      firstName: $firstName
      lastName: $lastName
    ) {
      id
      firstName
      lastName
      employer {
        id
        name
      }
    }
  }
`;

export default {
  PULL_QUOTES,
  PATCH_QUOTES,
  DELETE_QUOTES,
  POST_QUOTES
};
