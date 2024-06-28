import { ApolloServer, gql } from 'apollo-server';

const TODOS = [
    {
        id: 1, 
        task: 'todo 1',
        completed: true
    },
    {
        id: 2, 
        task: 'todo 2',
        completed: false
    },
    {
        id: 3, 
        task: 'todo 3',
        completed: true
    }
]

const USERS = [
    {
        id: 1,
        email: 'a@g.com',
        todos: [TODOS[1], TODOS[2]]
    },
    {
        id: 2,
        email: 'b@g.com',
        todos: []
    },
    {
        id: 3,
        email: 'c@g.com',
        todos: [TODOS[0]]
    },
]

const typeDefs = gql`
    type Todo {
        id: ID!,
        task : String!, 
        completed : Boolean!
    }

    type User {
        id: ID!,
        email: String!,
        todos: [Todo]!
    }

    type Query {
        getAllTodos: [Todo],
        getTodo(id : ID!) : Todo!,
        getAllUsers: [User]!
    }
`;

const resolvers = {
    Query : {
        getAllTodos : () => {
            // how the client gets array of todos is defined here
            return TODOS;
        },
        getTodo : (_, params) => {
            console.log(params);
            return TODOS.find(todo => todo.id == params.id);
        },
        getAllUsers : () => {
            return USERS;
        },
    }
}

// create a new apolloserver object using the constructor
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

server.listen().then(() => {
    console.log('GraphQL server is up.');
})