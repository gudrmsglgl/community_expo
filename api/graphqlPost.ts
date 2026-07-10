import type { Post } from "@/types";
import { gql, type TypedDocumentNode } from "@apollo/client";

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

export type GraphqlPostQueryData = {
  post: GraphqlPostDetailResponse;
};

export type GraphqlPostQueryVariables = {
  id: number;
};

export const POST_QUERY: TypedDocumentNode<
  GraphqlPostQueryData,
  GraphqlPostQueryVariables
> = gql`
  query Post($id: Int!) {
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

export function normalizeGraphqlPost(
  post?: GraphqlPostDetailResponse,
): GraphqlPostDetail | undefined {
  if (!post) {
    return undefined;
  }

  return {
    ...post,
    userId: post.author.id,
    votes: post.votes ?? [],
    comments: post.comments ?? [],
  };
}
