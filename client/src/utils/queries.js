import { gql } from '@apollo/client';

// from typeDefs
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
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