import { gql } from '@apollo/client';

const typeDefs = gql`
    type Message {
            id: ID!
            user: String!
            text: String!
    }
    `;

export {
    typeDefs,

  };