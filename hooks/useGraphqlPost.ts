import {
  normalizeGraphqlPost,
  POST_QUERY,
} from "@/api/graphqlPost";
import { useQuery } from "@apollo/client/react";

export function useGraphqlPost(id: number) {
  const queryResult = useQuery(POST_QUERY, {
    variables: { id },
    skip: !id,
  });

  return {
    ...queryResult,
    data: normalizeGraphqlPost(queryResult.data?.post),
    isLoading: queryResult.loading,
  };
}
