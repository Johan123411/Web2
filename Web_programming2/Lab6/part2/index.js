const { ApolloServer, gql } = require("apollo-server");
const lodash = require("lodash");
const uuid = require("node-uuid");
//some Mock data
let Quotes = [
  {
    id: "454dccf0-9ebc-457b-b9d1-313255a7ddea",
    quote: "When Chuck Norris was born he drove his mom home from the hospital."
  },
  {
    id: "ac2b5539-b036-4aeb-9e62-ace5a95942ab",
    quote: "Chuck Norris has a diary. It's called the Guinness Book of World Records."
  },
  {
    id: "ab648889-f53a-4fdd-9e22-511bcfe45dcc",
    quote: "Chuck Norris threw a grenade and killed 50 people, then it exploded."
  },
  {
    id: "a6cf34b9-c317-450b-bfc0-346599df21a1",
    quote: "Chuck Norris counted to infinity. Twice."
  },
  {
    id: "5a1c7249-c3f4-4321-8b44-4f49707a1c9c",
    quote: "Chuck Norris beat the sun in a staring contest."
  }
];


//
// let employees = [
//   {
//     id: uuid.v4(),
//     firstName: "Patrick",
//     lastName: "Hill",
//     employerId: 1
//   },
//   {
//     id: uuid.v4(),
//     firstName: "Jimi",
//     lastName: "Hendrix",
//     employerId: 1
//   },
//   {
//     id: uuid.v4(),
//     firstName: "Jim",
//     lastName: "Morrison",
//     employerId: 2
//   },
//   {
//     id: uuid.v4(),
//     firstName: "Roger",
//     lastName: "Waters",
//     employerId: 1
//   },
//   {
//     id: uuid.v4(),
//     firstName: "John",
//     lastName: "Smith",
//     employerId: 2
//   }
// ];
//
// let employers = [
//   {
//     id: 1,
//     name: "Stevens Institute of Technology"
//   },
//   {
//     id: 2,
//     name: "Google"
//   },
//   {
//     id: 3,
//     name: "Apple"
//   }
// ];

//Create the type definitions for the query and our data
const typeDefs = gql`
  type Query {
    quote(id: String): Quote
    quotes: [Quote]
  }

  type Quote {
    id: String
    quote: String
  }

  type Mutation {
    add_quote
    (
      quote: String!
    ): Quote
    remove_quote
    (
      id: String!
    ): [Quote]
    edit_quote
    (
      id: String!
      quote: String!
    ): Quote
  }
`;

/* parentValue - References the type def that called it
    so for example when we execute numOfEmployees we can reference
    the parent's properties with the parentValue Paramater
*/

/* args - Used for passing any arguments in from the client
    for example, when we call 
    addEmployee(firstName: String!, lastName: String!, employerId: Int!): Employee
		
*/

const resolvers = {
  Query: {
    quote: (_, args) => Quotes.filter(e => e.id === args.id)[0],
    //employee: (_, args) => employees.filter(e => e.id === args.id)[0],
    quotes: () => Quotes
    //employees: () => employees
  },
  // Employer: {
  //   numOfEmployees: parentValue => {
  //     console.log(`parentValue in Employer`, parentValue);
  //     return employees.filter(e => e.employerId === parentValue.id).length;
  //   },
  //   employees: parentValue => {
  //     return employees.filter(e => e.employerId === parentValue.id);
  //   }
  // },
  // Employee: {
  //   employer: parentValue => {
  //     return employers.filter(e => e.id === parentValue.employerId)[0];
  //   }
  // },
  Mutation: {
    add_quote: (_, args) => {
      const newEmployee = {
        id: uuid.v4(),
        // firstName: args.firstName,
        // lastName: args.lastName,
        // employerId: args.employerId
        quote: args.quote
      };
      Quotes.push(newEmployee);
      return newEmployee;
    },
    remove_quote: (_, args) => {
      return lodash.remove(Quotes, e => e.id === args.id);
    },
    edit_quote: (_, args) => {
      let newEmployee;
      Quotes = Quotes.map(e => {
        if (e.id === args.id) {
          if (args.quote) {
            e.quote = args.quote;
          }
          // if (args.lastName) {
          //   e.lastName = args.lastName;
          // }
          // if (args.employerId) {
          //   e.employerId = args.employerId;
          // }
          newEmployee = e;
          return e;
        }
        return e;
      });
      return newEmployee;
    }
    // addEmployer: (_, args) => {
    //   const newEmployer = {
    //     id: employers.length + 1,
    //     name: args.name
    //   };
    //   employers.push(newEmployer);
    //   return newEmployer;
    // }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});
