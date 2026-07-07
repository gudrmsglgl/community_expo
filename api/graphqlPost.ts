import { BASE_URL } from "@/api/axios";
import type { Post } from "@/types";
import { getAccessToken } from "@/utils/secureStore";

type GraphqlError = {
  message: string;
};

type GraphqlResponse<TData> = {
  data?: TData;
  errors?: GraphqlError[];
};

type GraphqlPostDetailResponse = Omit<Post, "userId" | "votes" | "comments"> & {
  votes?: NonNullable<Post["votes"]> | null;
  comments?: NonNullable<Post["comments"]> | null;
};

export type GraphqlPostDetail = Omit<
  GraphqlPostDetailResponse,
  "votes" | "comments"
> &
  Pick<Post, "userId"> & {
    votes: NonNullable<Post["votes"]>;
    comments: NonNullable<Post["comments"]>;
  };

const GRAPHQL_ENDPOINT = `${BASE_URL}/graphql`;

const POST_QUERY = `
  query post($id: Int!) {
    post(id: $id) {
      id
      title
      description
      createdAt
      viewCount
      commentCount
      voteCount
      hasVote
      author { id nickname imageUri }
      imageUris { id uri }
      likes { userId }
      votes {
        id
        title
        options {
          id
          content
          displayPriority
          userVotes { userId }
        }
      }
      comments {
        id
        content
        createdAt
        isDeleted
        user { id nickname imageUri }
        replies {
          id
          content
          createdAt
          isDeleted
          user { id nickname imageUri }
        }
      }
    }
  }
`;

async function requestGraphql<TData>(
  query: string,
  variables: Record<string, unknown>,
): Promise<TData> {
  const accessToken = await getAccessToken();

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = (await response.json()) as GraphqlResponse<TData>;

  if (!response.ok || result.errors?.length) {
    throw new Error(
      result.errors?.map((error) => error.message).join("\n") ||
        `GraphQL request failed: ${response.status}`,
    );
  }

  if (!result.data) {
    throw new Error("GraphQL response did not include data.");
  }

  return result.data;
}

export async function getGraphqlPost(id: number): Promise<GraphqlPostDetail> {
  const data = await requestGraphql<{ post: GraphqlPostDetailResponse }>(
    POST_QUERY,
    {
      id,
    },
  );

  return {
    ...data.post,
    userId: data.post.author.id,
    votes: data.post.votes ?? [],
    comments: data.post.comments ?? [],
  };
}
