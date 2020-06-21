
export const userByIdQuery = (id: string) => `
{
  users_by_pk (id: "${id}") {
    id
    role
    name
    email
  }
}
`;

export const insertUserMutation = ({ email = '', id = '', name = '', role = '' }) => `
mutation {
  insert_users_one(object: {email: "${email}", id: "${id}", name: "${name}", role: "${role}" }) {
    id
    email
    name
    role
  }
}
`