import gql from 'graphql-tag';

const CATEGORY_QUERY = gql`
{
  categoryList(filters: {ids: {in: ["5017", "5000", "5006"]}}) {
    id,
    level
    name
    path
    url_path
    url_key
  }
}
`;

export default CATEGORY_QUERY;