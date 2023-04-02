import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddUserResponse = User | UserExists;

export type DeleteProjectResponse = ProjectDeleteMessage | ProjectNotFound;

export type DeleteUserResponse = UserDeleteMessage | UserNotFound;

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createUser: AddUserResponse;
  deleteProject: DeleteProjectResponse;
  deleteUser: DeleteUserResponse;
  updateProject: UpdateProjectResponse;
  updateUser: UpdateUserResponse;
};


export type MutationCreateProjectArgs = {
  companyLocation: Scalars['String'];
  companyName: Scalars['String'];
  postDates: Scalars['String'];
  projectDesc: Scalars['String'];
  projectExpLvl: Scalars['String'];
  projectName: Scalars['String'];
  projectReq: Scalars['String'];
  projectSalary: Scalars['String'];
  projectSkills: Scalars['String'];
  projectTypes: Scalars['String'];
};


export type MutationCreateUserArgs = {
  password: Scalars['String'];
  userEmail: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateProjectArgs = {
  companyLocation?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  postDates?: InputMaybe<Scalars['String']>;
  projectDesc?: InputMaybe<Scalars['String']>;
  projectExpLvl?: InputMaybe<Scalars['String']>;
  projectId: Scalars['Int'];
  projectName?: InputMaybe<Scalars['String']>;
  projectReq?: InputMaybe<Scalars['String']>;
  projectSalary?: InputMaybe<Scalars['String']>;
  projectSkills?: InputMaybe<Scalars['String']>;
  projectTypes?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  userEmail?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type Project = {
  __typename?: 'Project';
  companyLocation: Scalars['String'];
  companyName: Scalars['String'];
  postDates: Scalars['String'];
  projectDesc: Scalars['String'];
  projectExpLvl: Scalars['String'];
  projectId: Scalars['ID'];
  projectName: Scalars['String'];
  projectReq: Scalars['String'];
  projectSalary: Scalars['String'];
  projectSkills: Scalars['String'];
  projectTypes: Scalars['String'];
};

export type ProjectDeleteMessage = {
  __typename?: 'ProjectDeleteMessage';
  message: Scalars['String'];
};

export type ProjectNotFound = {
  __typename?: 'ProjectNotFound';
  message: Scalars['String'];
};

export type ProjectUpdateMessage = {
  __typename?: 'ProjectUpdateMessage';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  projectDetail?: Maybe<Project>;
  projectListing: Array<Project>;
  userDetail?: Maybe<User>;
  userListing: Array<User>;
};


export type QueryProjectDetailArgs = {
  projectId: Scalars['Int'];
};


export type QueryUserDetailArgs = {
  id: Scalars['Int'];
};

export type UpdateProjectResponse = ProjectNotFound | ProjectUpdateMessage;

export type UpdateUserResponse = UserNotFound | UserUpdateMessage;

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  password: Scalars['String'];
  userEmail: Scalars['String'];
  userName: Scalars['String'];
};

export type UserDeleteMessage = {
  __typename?: 'UserDeleteMessage';
  message: Scalars['String'];
};

export type UserExists = {
  __typename?: 'UserExists';
  message: Scalars['String'];
};

export type UserNotFound = {
  __typename?: 'UserNotFound';
  message: Scalars['String'];
};

export type UserUpdateMessage = {
  __typename?: 'UserUpdateMessage';
  message: Scalars['String'];
};

export type ProjectListingQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectListingQuery = { __typename?: 'Query', projectListing: Array<{ __typename?: 'Project', projectId: string, projectName: string, companyName: string }> };


export const ProjectListingDocument = gql`
    query projectListing {
  projectListing {
    projectId
    projectName
    companyName
  }
}
    `;

/**
 * __useProjectListingQuery__
 *
 * To run a query within a React component, call `useProjectListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectListingQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectListingQuery(baseOptions?: Apollo.QueryHookOptions<ProjectListingQuery, ProjectListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectListingQuery, ProjectListingQueryVariables>(ProjectListingDocument, options);
      }
export function useProjectListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectListingQuery, ProjectListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectListingQuery, ProjectListingQueryVariables>(ProjectListingDocument, options);
        }
export type ProjectListingQueryHookResult = ReturnType<typeof useProjectListingQuery>;
export type ProjectListingLazyQueryHookResult = ReturnType<typeof useProjectListingLazyQuery>;
export type ProjectListingQueryResult = Apollo.QueryResult<ProjectListingQuery, ProjectListingQueryVariables>;