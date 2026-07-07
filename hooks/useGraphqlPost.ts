import { getGraphqlPost } from "@/api/graphqlPost";
import { queryKey } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export function useGraphqlPost(id: number) {
  return useQuery({
    queryKey: [queryKey.GRAPHQL_POST, queryKey.GRAPHQL_QUERY_POST, id],
    queryFn: () => getGraphqlPost(id),
    enabled: Boolean(id),
  });
}
