const { ApolloServer, gql } = require("apollo-server");
const lodash = require("lodash");
const uuid = require("node-uuid");
//some Mock data


let Todos= [{
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: "false"
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: "false"
  },
  {
    userId: 2,
    id: 3,
    title: "fugiat veniam minus",
    completed: "false"
  },
  {
    userId: 2,
    id: 4,
    title: "et porro tempora",
    completed: "true"
  },
  {
    userId: 3,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: "false"
  },
  {
    userId: 4,
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    completed: "false"
  },
  {
    userId: 5,
    id: 7,
    title: "illo expedita consequatur quia in",
    completed: "false"
  },
  {
    userId: 6,
    id: 8,
    title: "quo adipisci enim quam ut ab",
    completed: "true"
  },
  {
    userId: 7,
    id: 9,
    title: "molestiae perspiciatis ipsa",
    completed: "false"
  },
  {
    userId: 8,
    id: 10,
    title: "illo est ratione doloremque quia maiores aut",
    completed: "true"
  }
];


let Users = [
  {
    id: 1,
    first_name: "Babbie",
    last_name: "Veelers",
    email: "bveelers0@fc2.com",
    gender: "Female",
    department: "Support",
    country: "United States"
  },
  {
    id: 2,
    first_name: "Fairleigh",
    last_name: "Jedras",
    email: "fjedras1@diigo.com",
    gender: "Male",
    department: "Development",
    country: "United Kingdom"
  },
  {
    id: 3,
    first_name: "Lutero",
    last_name: "Symcox",
    email: "lsymcox2@fotki.com",
    gender: "Male",
    department: "Development",
    country: "United States"
  },
  {
    id: 4,
    first_name: "Pyotr",
    last_name: "Kalinsky",
    email: "pkalinsky3@wp.com",
    gender: "Male",
    department: "Support",
    country: "Ireland"
  },
  {
    id: 5,
    first_name: "Consuelo",
    last_name: "Fairey",
    email: "cfairey4@nature.com",
    gender: "Female",
    department: "Legal",
    country: "United Kingdom"
  },
  {
    id: 6,
    first_name: "Jemimah",
    last_name: "Rodwell",
    email: "jrodwell5@arizona.edu",
    gender: "Female",
    department: "Support",
    country: "United States"
  },
  {
    id: 7,
    first_name: "Sonny",
    last_name: "Read",
    email: "sread6@fastcompany.com",
    gender: "Female",
    department: "Support",
    country: "United States"
  },
  {
    id: 8,
    first_name: "Marion",
    last_name: "Janczewski",
    email: "mjanczewski7@hatena.ne.jp",
    gender: "Male",
    department: "Development",
    country: "Ireland"
  }
];

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
    users: [User]
    todos: [Todo]
    user(id: String): User
    todo(id: String): Todo
  }


  type User {
    id: String
    first_name: String
    last_name: String
    email: String
    gender: String
    department: String
    country: String
  }

  type Todo {
    userId: String 
    id: String
    title: String
    completed: String 
  }

  type Mutation {
    addTodo(
      userId: String!
      title: String!
    ): Todo
    removeTodo(id: String!): [Todo]
    editTodo(
      id: String!
      title: String
      userId: String
      completed: String
    ): Todo
  }
`;

///////////////////////////////////////////////////////////////////////////////////////
// const typeDefs = gql`
//   type Query {
//     employers: [Employer]
//     employees: [Employee]
//     employer(id: Int): Employer
//     employee(id: String): Employee
//   }
//
//   type Employer {
//     id: Int
//     name: String
//     employees: [Employee]
//     numOfEmployees: Int
//   }
//
//   type Employee {
//     id: String
//     firstName: String
//     lastName: String
//     employer: Employer
//   }
//
//   type Mutation {
//     addEmployee(
//       firstName: String!
//       lastName: String!
//       employerId: Int!
//     ): Employee
//     removeEmployee(id: String!): [Employee]
//     editEmployee(
//       id: String!
//       firstName: String
//       lastName: String
//       employerId: Int
//     ): Employee
//     addEmployer(name: String!): Employer
//   }
// `;
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
    user: (_, args) => Users.filter(e => e.id === args.id)[0],
    todo: (_, args) => Todos.filter(e => e.id === args.id)[0],
    users: () => Users,
    todos: () => Todos
  },

  // Employee: {
  //   employer: parentValue => {
  //     return employers.filter(e => e.id === parentValue.employerId)[0];
  //   }
  // },
  Mutation: {
    addTodo: (_, args) => {
      const newTodo = {
        id: uuid.v4(),
        title: args.title,
        userId: args.userId,
        completed: args.completed
      };
      Todos.push(newTodo);
      return newTodo;
    },
    removeTodo: (_, args) => {
      return lodash.remove(Todos, e => e.id == args.id);
    },
    editTodo: (_, args) => {
      let newTodo;
      Todos = Todos.map(e => {
        console.log(e.id);
        console.log("args", args.id)
        if (e.id == args.id) {
          console.log("im in");
          e.title = args.title;
            e.completed = args.completed;
            e.userId= args.userId;
          newTodo = e;
          }
        return e;
      });
      return newTodo;
    }
  }
};



// const resolvers = {
//   Query: {
//     employer: (_, args) => employers.filter(e => e.id === args.id)[0],
//     employee: (_, args) => employees.filter(e => e.id === args.id)[0],
//     employers: () => employers,
//     employees: () => employees
//   },
//   Employer: {
//     numOfEmployees: parentValue => {
//       console.log(`parentValue in Employer`, parentValue);
//       return employees.filter(e => e.employerId === parentValue.id).length;
//     },
//     employees: parentValue => {
//       return employees.filter(e => e.employerId === parentValue.id);
//     }
//   },
//   Employee: {
//     employer: parentValue => {
//       return employers.filter(e => e.id === parentValue.employerId)[0];
//     }
//   },
//   Mutation: {
//     addEmployee: (_, args) => {
//       const newEmployee = {
//         id: uuid.v4(),
//         firstName: args.firstName,
//         lastName: args.lastName,
//         employerId: args.employerId
//       };
//       employees.push(newEmployee);
//       return newEmployee;
//     },
//     removeEmployee: (_, args) => {
//       return lodash.remove(employees, e => e.id == args.id);
//     },
//     editEmployee: (_, args) => {
//       let newEmployee;
//       employees = employees.map(e => {
//         if (e.id === args.id) {
//           if (args.firstName) {
//             e.firstName = args.firstName;
//           }
//           if (args.lastName) {
//             e.lastName = args.lastName;
//           }
//           if (args.employerId) {
//             e.employerId = args.employerId;
//           }
//           newEmployee = e;
//           return e;
//         }
//         return e;
//       });
//       return newEmployee;
//     },
//     addEmployer: (_, args) => {
//       const newEmployer = {
//         id: employers.length + 1,
//         name: args.name
//       };
//       employers.push(newEmployer);
//       return newEmployer;
//     }
//   }
// };

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});
