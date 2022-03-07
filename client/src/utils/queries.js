import { gql } from '@apollo/client';

// from typeDefs
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
          authors
          description
          bookId
          image
          link
          title
      }
    }
  }
`;