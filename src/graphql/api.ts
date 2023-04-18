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
  Upload: any;
};

export type AddUserResponse = User | UserExists;

export type AuthResponse = {
  __typename?: 'AuthResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
  user?: Maybe<UserType>;
};

export type CompanyResponse = {
  __typename?: 'CompanyResponse';
  company?: Maybe<CompanyType>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CompanyType = {
  __typename?: 'CompanyType';
  companyCity?: Maybe<Scalars['String']>;
  companyDesc?: Maybe<Scalars['String']>;
  companyFounder?: Maybe<Scalars['String']>;
  companyId: Scalars['ID'];
  companyName?: Maybe<Scalars['String']>;
  companySize?: Maybe<Scalars['String']>;
  companyState?: Maybe<Scalars['String']>;
  companyStreet?: Maybe<Scalars['String']>;
  users?: Maybe<UserType>;
};

export type CreateCompanyInput = {
  companyCity?: InputMaybe<Scalars['String']>;
  companyDesc?: InputMaybe<Scalars['String']>;
  companyFounder?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  companySize?: InputMaybe<Scalars['String']>;
  companyState?: InputMaybe<Scalars['String']>;
  companyStreet?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  userEmail: Scalars['String'];
  userName: Scalars['String'];
};

export type CreateJobSeekerInput = {
  password: Scalars['String'];
  seekerAbout?: InputMaybe<Scalars['String']>;
  seekerAge?: InputMaybe<Scalars['Int']>;
  seekerBirthdate?: InputMaybe<Scalars['String']>;
  seekerCity?: InputMaybe<Scalars['String']>;
  seekerGender?: InputMaybe<Scalars['String']>;
  seekerHighestEduc?: InputMaybe<Scalars['String']>;
  seekerName?: InputMaybe<Scalars['String']>;
  seekerPhoneNo?: InputMaybe<Scalars['Int']>;
  seekerResume?: InputMaybe<Scalars['Upload']>;
  seekerState?: InputMaybe<Scalars['String']>;
  seekerStreet?: InputMaybe<Scalars['String']>;
  userEmail: Scalars['String'];
  userName: Scalars['String'];
};

export type CreateProjectInput = {
  companyId: Scalars['ID'];
  postDates?: InputMaybe<Scalars['String']>;
  projectDesc?: InputMaybe<Scalars['String']>;
  projectExpLvl?: InputMaybe<Scalars['String']>;
  projectName: Scalars['String'];
  projectReq?: InputMaybe<Scalars['String']>;
  projectSalary?: InputMaybe<Scalars['String']>;
  projectTypes?: InputMaybe<Scalars['String']>;
  skills: Array<Scalars['String']>;
};

export type DeleteUserResponse = UserDeleteMessage | UserNotFound;

export type JobSeekerResponse = {
  __typename?: 'JobSeekerResponse';
  jobSeeker?: Maybe<JobSeekerType>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type JobSeekerType = {
  __typename?: 'JobSeekerType';
  seekerAbout?: Maybe<Scalars['String']>;
  seekerAge?: Maybe<Scalars['Int']>;
  seekerBirthdate?: Maybe<Scalars['String']>;
  seekerCity?: Maybe<Scalars['String']>;
  seekerGender?: Maybe<Scalars['String']>;
  seekerHighestEduc?: Maybe<Scalars['String']>;
  seekerId: Scalars['ID'];
  seekerName?: Maybe<Scalars['String']>;
  seekerPhoneNo?: Maybe<Scalars['Int']>;
  seekerResume?: Maybe<Scalars['Upload']>;
  seekerState?: Maybe<Scalars['String']>;
  seekerStreet?: Maybe<Scalars['String']>;
  users?: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompany: CompanyResponse;
  createJobSeeker: JobSeekerResponse;
  createProject: ProjectResponse;
  createUser: AddUserResponse;
  deleteCompany: CompanyResponse;
  deleteJobSeeker: JobSeekerResponse;
  deleteProject: ProjectResponse;
  deleteUser: DeleteUserResponse;
  login: AuthResponse;
  updateCompany: CompanyResponse;
  updateJobSeeker: JobSeekerResponse;
  updateJobSeekerPassword: JobSeekerResponse;
  updateProject: ProjectResponse;
  updateUser: UpdateUserResponse;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateJobSeekerArgs = {
  input: CreateJobSeekerInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateUserArgs = {
  password: Scalars['String'];
  userEmail: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationDeleteCompanyArgs = {
  companyId: Scalars['Int'];
};


export type MutationDeleteJobSeekerArgs = {
  seekerId: Scalars['Int'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
};


export type MutationUpdateJobSeekerArgs = {
  input: UpdateJobSeekerInput;
};


export type MutationUpdateJobSeekerPasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  userId: Scalars['Int'];
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationUpdateUserArgs = {
  password?: InputMaybe<Scalars['String']>;
  userEmail?: InputMaybe<Scalars['String']>;
  userId: Scalars['Int'];
  userName?: InputMaybe<Scalars['String']>;
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  message?: Maybe<Scalars['String']>;
  project?: Maybe<ProjectType>;
  success: Scalars['Boolean'];
};

export type ProjectType = {
  __typename?: 'ProjectType';
  company?: Maybe<CompanyType>;
  companyId: Scalars['ID'];
  postDates?: Maybe<Scalars['String']>;
  projectDesc?: Maybe<Scalars['String']>;
  projectExpLvl?: Maybe<Scalars['String']>;
  projectId: Scalars['ID'];
  projectName: Scalars['String'];
  projectReq?: Maybe<Scalars['String']>;
  projectSalary?: Maybe<Scalars['String']>;
  projectTypes?: Maybe<Scalars['String']>;
  skills: Array<SkillType>;
};

export type Query = {
  __typename?: 'Query';
  companyDetail?: Maybe<CompanyType>;
  companyListing: Array<CompanyType>;
  jobSeekerDetail?: Maybe<JobSeekerType>;
  jobSeekerListing: Array<JobSeekerType>;
  me: UserType;
  projectDetail?: Maybe<ProjectType>;
  projectListing: Array<ProjectType>;
  userDetail?: Maybe<User>;
  userListing: Array<User>;
};


export type QueryCompanyDetailArgs = {
  companyId: Scalars['Int'];
};


export type QueryJobSeekerDetailArgs = {
  seekerId: Scalars['Int'];
};


export type QueryProjectDetailArgs = {
  projectId: Scalars['Int'];
};


export type QueryUserDetailArgs = {
  userId: Scalars['Int'];
};

export type SkillType = {
  __typename?: 'SkillType';
  skillId: Scalars['ID'];
  skillName?: Maybe<Scalars['String']>;
};

export type UpdateCompanyInput = {
  companyCity?: InputMaybe<Scalars['String']>;
  companyDesc?: InputMaybe<Scalars['String']>;
  companyFounder?: InputMaybe<Scalars['String']>;
  companyId: Scalars['ID'];
  companyName?: InputMaybe<Scalars['String']>;
  companySize?: InputMaybe<Scalars['String']>;
  companyState?: InputMaybe<Scalars['String']>;
  companyStreet?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  userEmail?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type UpdateJobSeekerInput = {
  password?: InputMaybe<Scalars['String']>;
  seekerAbout?: InputMaybe<Scalars['String']>;
  seekerAge?: InputMaybe<Scalars['Int']>;
  seekerBirthdate?: InputMaybe<Scalars['String']>;
  seekerCity?: InputMaybe<Scalars['String']>;
  seekerGender?: InputMaybe<Scalars['String']>;
  seekerHighestEduc?: InputMaybe<Scalars['String']>;
  seekerId: Scalars['ID'];
  seekerName?: InputMaybe<Scalars['String']>;
  seekerPhoneNo?: InputMaybe<Scalars['Int']>;
  seekerResume?: InputMaybe<Scalars['Upload']>;
  seekerState?: InputMaybe<Scalars['String']>;
  seekerStreet?: InputMaybe<Scalars['String']>;
  userEmail?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  projectDesc?: InputMaybe<Scalars['String']>;
  projectExpLvl?: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
  projectName?: InputMaybe<Scalars['String']>;
  projectReq?: InputMaybe<Scalars['String']>;
  projectSalary?: InputMaybe<Scalars['String']>;
  projectTypes?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateUserResponse = UserNotFound | UserUpdateMessage;

export type User = {
  __typename?: 'User';
  password: Scalars['String'];
  userEmail: Scalars['String'];
  userId: Scalars['ID'];
  userName: Scalars['String'];
  userType: Scalars['String'];
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

export type UserType = {
  __typename?: 'UserType';
  password: Scalars['String'];
  userEmail: Scalars['String'];
  userId: Scalars['ID'];
  userName: Scalars['String'];
  userType: Scalars['String'];
};

export type UserUpdateMessage = {
  __typename?: 'UserUpdateMessage';
  message: Scalars['String'];
};

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'CompanyResponse', success: boolean, message?: string | null, company?: { __typename?: 'CompanyType', companyId: string, companyName?: string | null } | null } };

export type UpdateCompanyMutationVariables = Exact<{
  input: UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'CompanyResponse', success: boolean, message?: string | null, company?: { __typename?: 'CompanyType', companyId: string, companyName?: string | null } | null } };

export type DeleteCompanyMutationVariables = Exact<{
  companyId: Scalars['Int'];
}>;


export type DeleteCompanyMutation = { __typename?: 'Mutation', deleteCompany: { __typename?: 'CompanyResponse', success: boolean, message?: string | null } };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectResponse', success: boolean, message?: string | null, project?: { __typename?: 'ProjectType', projectId: string, company?: { __typename?: 'CompanyType', companyId: string, companyName?: string | null } | null } | null } };

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'ProjectResponse', success: boolean, message?: string | null, project?: { __typename?: 'ProjectType', projectId: string } | null } };

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: { __typename?: 'ProjectResponse', success: boolean, message?: string | null } };

export type CreateJobSeekerMutationVariables = Exact<{
  input: CreateJobSeekerInput;
}>;


export type CreateJobSeekerMutation = { __typename?: 'Mutation', createJobSeeker: { __typename?: 'JobSeekerResponse', success: boolean, message?: string | null, jobSeeker?: { __typename?: 'JobSeekerType', seekerId: string, seekerName?: string | null, seekerAge?: number | null, seekerGender?: string | null, seekerBirthdate?: string | null, seekerPhoneNo?: number | null, seekerStreet?: string | null, seekerCity?: string | null, seekerState?: string | null, seekerHighestEduc?: string | null, seekerResume?: any | null } | null } };

export type UpdateJobSeekerMutationVariables = Exact<{
  input: UpdateJobSeekerInput;
}>;


export type UpdateJobSeekerMutation = { __typename?: 'Mutation', updateJobSeeker: { __typename?: 'JobSeekerResponse', success: boolean, message?: string | null, jobSeeker?: { __typename?: 'JobSeekerType', seekerId: string, seekerName?: string | null, seekerAge?: number | null, seekerGender?: string | null, seekerBirthdate?: string | null, seekerPhoneNo?: number | null, seekerStreet?: string | null, seekerCity?: string | null, seekerState?: string | null, seekerHighestEduc?: string | null, seekerResume?: any | null } | null } };

export type DeleteJobSeekerMutationVariables = Exact<{
  seekerId: Scalars['Int'];
}>;


export type DeleteJobSeekerMutation = { __typename?: 'Mutation', deleteJobSeeker: { __typename?: 'JobSeekerResponse', message?: string | null, success: boolean, jobSeeker?: { __typename?: 'JobSeekerType', seekerId: string } | null } };

export type UpdateJobSeekerPasswordMutationVariables = Exact<{
  userId: Scalars['Int'];
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdateJobSeekerPasswordMutation = { __typename?: 'Mutation', updateJobSeekerPassword: { __typename?: 'JobSeekerResponse', success: boolean, message?: string | null, jobSeeker?: { __typename?: 'JobSeekerType', seekerId: string } | null } };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  userEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', userId: string } | { __typename?: 'UserExists', message: string } };

export type LoginMutationVariables = Exact<{
  userName: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', success: boolean, token?: string | null, message?: string | null, user?: { __typename?: 'UserType', userId: string, userName: string, userEmail: string, password: string } | null } };

export type CompanyListingQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyListingQuery = { __typename?: 'Query', companyListing: Array<{ __typename?: 'CompanyType', companyId: string, companyName?: string | null, companyFounder?: string | null, companySize?: string | null, companyDesc?: string | null, companyStreet?: string | null, companyCity?: string | null, companyState?: string | null }> };

export type CompanyDetailQueryVariables = Exact<{
  companyId: Scalars['Int'];
}>;


export type CompanyDetailQuery = { __typename?: 'Query', companyDetail?: { __typename?: 'CompanyType', companyId: string, companyName?: string | null, companyFounder?: string | null, companySize?: string | null, companyDesc?: string | null, companyStreet?: string | null, companyCity?: string | null, companyState?: string | null, users?: { __typename?: 'UserType', userId: string, userName: string, userEmail: string, password: string, userType: string } | null } | null };

export type ProjectListingQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectListingQuery = { __typename?: 'Query', projectListing: Array<{ __typename?: 'ProjectType', projectId: string, projectName: string, companyId: string, projectTypes?: string | null, postDates?: string | null, projectSalary?: string | null, projectDesc?: string | null, projectReq?: string | null, projectExpLvl?: string | null, company?: { __typename?: 'CompanyType', companyId: string, companyName?: string | null, companyFounder?: string | null, companySize?: string | null, companyDesc?: string | null, companyStreet?: string | null, companyCity?: string | null, companyState?: string | null, users?: { __typename?: 'UserType', userType: string } | null } | null, skills: Array<{ __typename?: 'SkillType', skillName?: string | null }> }> };

export type ProjectDetailQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type ProjectDetailQuery = { __typename?: 'Query', projectDetail?: { __typename?: 'ProjectType', projectId: string, projectName: string, companyId: string, projectTypes?: string | null, postDates?: string | null, projectSalary?: string | null, projectDesc?: string | null, projectReq?: string | null, projectExpLvl?: string | null, company?: { __typename?: 'CompanyType', companyId: string, companyName?: string | null, companyFounder?: string | null, companySize?: string | null, companyDesc?: string | null, companyStreet?: string | null, companyCity?: string | null, companyState?: string | null, users?: { __typename?: 'UserType', userType: string } | null } | null, skills: Array<{ __typename?: 'SkillType', skillId: string, skillName?: string | null }> } | null };

export type JobSeekerListingQueryVariables = Exact<{ [key: string]: never; }>;


export type JobSeekerListingQuery = { __typename?: 'Query', jobSeekerListing: Array<{ __typename?: 'JobSeekerType', seekerId: string, seekerName?: string | null, seekerAge?: number | null, seekerGender?: string | null, seekerBirthdate?: string | null, seekerPhoneNo?: number | null, seekerStreet?: string | null, seekerCity?: string | null, seekerState?: string | null, seekerHighestEduc?: string | null, seekerResume?: any | null }> };

export type JobSeekerDetailQueryVariables = Exact<{
  seekerId: Scalars['Int'];
}>;


export type JobSeekerDetailQuery = { __typename?: 'Query', jobSeekerDetail?: { __typename?: 'JobSeekerType', seekerId: string, seekerName?: string | null, seekerAge?: number | null, seekerGender?: string | null, seekerBirthdate?: string | null, seekerPhoneNo?: number | null, seekerStreet?: string | null, seekerCity?: string | null, seekerState?: string | null, seekerHighestEduc?: string | null, seekerResume?: any | null, seekerAbout?: string | null, users?: { __typename?: 'UserType', userId: string, userName: string, userEmail: string, password: string, userType: string } | null } | null };

export type UserListingQueryVariables = Exact<{ [key: string]: never; }>;


export type UserListingQuery = { __typename?: 'Query', userListing: Array<{ __typename?: 'User', userId: string, userName: string, password: string, userType: string }> };

export type UseDetailQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UseDetailQuery = { __typename?: 'Query', userDetail?: { __typename?: 'User', userId: string, userName: string, userEmail: string, password: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserType', userId: string, userName: string, userEmail: string, userType: string, password: string } };


export const CreateCompanyDocument = gql`
    mutation createCompany($input: CreateCompanyInput!) {
  createCompany(input: $input) {
    ... on CompanyResponse {
      success
      company {
        companyId
        companyName
      }
      message
    }
  }
}
    `;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const UpdateCompanyDocument = gql`
    mutation updateCompany($input: UpdateCompanyInput!) {
  updateCompany(input: $input) {
    ... on CompanyResponse {
      success
      company {
        companyId
        companyName
      }
      message
    }
  }
}
    `;
export type UpdateCompanyMutationFn = Apollo.MutationFunction<UpdateCompanyMutation, UpdateCompanyMutationVariables>;

/**
 * __useUpdateCompanyMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyMutation, { data, loading, error }] = useUpdateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompanyMutation, UpdateCompanyMutationVariables>(UpdateCompanyDocument, options);
      }
export type UpdateCompanyMutationHookResult = ReturnType<typeof useUpdateCompanyMutation>;
export type UpdateCompanyMutationResult = Apollo.MutationResult<UpdateCompanyMutation>;
export type UpdateCompanyMutationOptions = Apollo.BaseMutationOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const DeleteCompanyDocument = gql`
    mutation deleteCompany($companyId: Int!) {
  deleteCompany(companyId: $companyId) {
    ... on CompanyResponse {
      success
      message
    }
  }
}
    `;
export type DeleteCompanyMutationFn = Apollo.MutationFunction<DeleteCompanyMutation, DeleteCompanyMutationVariables>;

/**
 * __useDeleteCompanyMutation__
 *
 * To run a mutation, you first call `useDeleteCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCompanyMutation, { data, loading, error }] = useDeleteCompanyMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useDeleteCompanyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCompanyMutation, DeleteCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCompanyMutation, DeleteCompanyMutationVariables>(DeleteCompanyDocument, options);
      }
export type DeleteCompanyMutationHookResult = ReturnType<typeof useDeleteCompanyMutation>;
export type DeleteCompanyMutationResult = Apollo.MutationResult<DeleteCompanyMutation>;
export type DeleteCompanyMutationOptions = Apollo.BaseMutationOptions<DeleteCompanyMutation, DeleteCompanyMutationVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    ... on ProjectResponse {
      success
      project {
        projectId
        company {
          companyId
          companyName
        }
      }
      message
    }
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation updateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
    ... on ProjectResponse {
      success
      project {
        projectId
      }
      message
    }
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($projectId: Int!) {
  deleteProject(projectId: $projectId) {
    ... on ProjectResponse {
      success
      message
    }
  }
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const CreateJobSeekerDocument = gql`
    mutation createJobSeeker($input: CreateJobSeekerInput!) {
  createJobSeeker(input: $input) {
    ... on JobSeekerResponse {
      success
      jobSeeker {
        seekerId
        seekerName
        seekerAge
        seekerGender
        seekerBirthdate
        seekerPhoneNo
        seekerStreet
        seekerCity
        seekerState
        seekerHighestEduc
        seekerResume
      }
      message
    }
  }
}
    `;
export type CreateJobSeekerMutationFn = Apollo.MutationFunction<CreateJobSeekerMutation, CreateJobSeekerMutationVariables>;

/**
 * __useCreateJobSeekerMutation__
 *
 * To run a mutation, you first call `useCreateJobSeekerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobSeekerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobSeekerMutation, { data, loading, error }] = useCreateJobSeekerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJobSeekerMutation(baseOptions?: Apollo.MutationHookOptions<CreateJobSeekerMutation, CreateJobSeekerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJobSeekerMutation, CreateJobSeekerMutationVariables>(CreateJobSeekerDocument, options);
      }
export type CreateJobSeekerMutationHookResult = ReturnType<typeof useCreateJobSeekerMutation>;
export type CreateJobSeekerMutationResult = Apollo.MutationResult<CreateJobSeekerMutation>;
export type CreateJobSeekerMutationOptions = Apollo.BaseMutationOptions<CreateJobSeekerMutation, CreateJobSeekerMutationVariables>;
export const UpdateJobSeekerDocument = gql`
    mutation updateJobSeeker($input: UpdateJobSeekerInput!) {
  updateJobSeeker(input: $input) {
    ... on JobSeekerResponse {
      success
      jobSeeker {
        seekerId
        seekerName
        seekerAge
        seekerGender
        seekerBirthdate
        seekerPhoneNo
        seekerStreet
        seekerCity
        seekerState
        seekerHighestEduc
        seekerResume
      }
      message
    }
  }
}
    `;
export type UpdateJobSeekerMutationFn = Apollo.MutationFunction<UpdateJobSeekerMutation, UpdateJobSeekerMutationVariables>;

/**
 * __useUpdateJobSeekerMutation__
 *
 * To run a mutation, you first call `useUpdateJobSeekerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateJobSeekerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateJobSeekerMutation, { data, loading, error }] = useUpdateJobSeekerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateJobSeekerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateJobSeekerMutation, UpdateJobSeekerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateJobSeekerMutation, UpdateJobSeekerMutationVariables>(UpdateJobSeekerDocument, options);
      }
export type UpdateJobSeekerMutationHookResult = ReturnType<typeof useUpdateJobSeekerMutation>;
export type UpdateJobSeekerMutationResult = Apollo.MutationResult<UpdateJobSeekerMutation>;
export type UpdateJobSeekerMutationOptions = Apollo.BaseMutationOptions<UpdateJobSeekerMutation, UpdateJobSeekerMutationVariables>;
export const DeleteJobSeekerDocument = gql`
    mutation deleteJobSeeker($seekerId: Int!) {
  deleteJobSeeker(seekerId: $seekerId) {
    ... on JobSeekerResponse {
      message
      success
      jobSeeker {
        seekerId
      }
    }
  }
}
    `;
export type DeleteJobSeekerMutationFn = Apollo.MutationFunction<DeleteJobSeekerMutation, DeleteJobSeekerMutationVariables>;

/**
 * __useDeleteJobSeekerMutation__
 *
 * To run a mutation, you first call `useDeleteJobSeekerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJobSeekerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJobSeekerMutation, { data, loading, error }] = useDeleteJobSeekerMutation({
 *   variables: {
 *      seekerId: // value for 'seekerId'
 *   },
 * });
 */
export function useDeleteJobSeekerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteJobSeekerMutation, DeleteJobSeekerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteJobSeekerMutation, DeleteJobSeekerMutationVariables>(DeleteJobSeekerDocument, options);
      }
export type DeleteJobSeekerMutationHookResult = ReturnType<typeof useDeleteJobSeekerMutation>;
export type DeleteJobSeekerMutationResult = Apollo.MutationResult<DeleteJobSeekerMutation>;
export type DeleteJobSeekerMutationOptions = Apollo.BaseMutationOptions<DeleteJobSeekerMutation, DeleteJobSeekerMutationVariables>;
export const UpdateJobSeekerPasswordDocument = gql`
    mutation updateJobSeekerPassword($userId: Int!, $currentPassword: String!, $newPassword: String!) {
  updateJobSeekerPassword(
    userId: $userId
    currentPassword: $currentPassword
    newPassword: $newPassword
  ) {
    ... on JobSeekerResponse {
      success
      jobSeeker {
        seekerId
      }
      message
    }
  }
}
    `;
export type UpdateJobSeekerPasswordMutationFn = Apollo.MutationFunction<UpdateJobSeekerPasswordMutation, UpdateJobSeekerPasswordMutationVariables>;

/**
 * __useUpdateJobSeekerPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateJobSeekerPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateJobSeekerPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateJobSeekerPasswordMutation, { data, loading, error }] = useUpdateJobSeekerPasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdateJobSeekerPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateJobSeekerPasswordMutation, UpdateJobSeekerPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateJobSeekerPasswordMutation, UpdateJobSeekerPasswordMutationVariables>(UpdateJobSeekerPasswordDocument, options);
      }
export type UpdateJobSeekerPasswordMutationHookResult = ReturnType<typeof useUpdateJobSeekerPasswordMutation>;
export type UpdateJobSeekerPasswordMutationResult = Apollo.MutationResult<UpdateJobSeekerPasswordMutation>;
export type UpdateJobSeekerPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateJobSeekerPasswordMutation, UpdateJobSeekerPasswordMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($username: String!, $userEmail: String!, $password: String!) {
  createUser(userName: $username, userEmail: $userEmail, password: $password) {
    ... on User {
      userId
    }
    ... on UserExists {
      message
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      userEmail: // value for 'userEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation login($userName: String!, $password: String!) {
  login(userName: $userName, password: $password) {
    ... on AuthResponse {
      success
      token
      user {
        userId
        userName
        userEmail
        password
      }
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userName: // value for 'userName'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CompanyListingDocument = gql`
    query companyListing {
  companyListing {
    companyId
    companyName
    companyFounder
    companySize
    companyDesc
    companyStreet
    companyCity
    companyState
  }
}
    `;

/**
 * __useCompanyListingQuery__
 *
 * To run a query within a React component, call `useCompanyListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyListingQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompanyListingQuery(baseOptions?: Apollo.QueryHookOptions<CompanyListingQuery, CompanyListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompanyListingQuery, CompanyListingQueryVariables>(CompanyListingDocument, options);
      }
export function useCompanyListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompanyListingQuery, CompanyListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompanyListingQuery, CompanyListingQueryVariables>(CompanyListingDocument, options);
        }
export type CompanyListingQueryHookResult = ReturnType<typeof useCompanyListingQuery>;
export type CompanyListingLazyQueryHookResult = ReturnType<typeof useCompanyListingLazyQuery>;
export type CompanyListingQueryResult = Apollo.QueryResult<CompanyListingQuery, CompanyListingQueryVariables>;
export const CompanyDetailDocument = gql`
    query companyDetail($companyId: Int!) {
  companyDetail(companyId: $companyId) {
    companyId
    companyName
    companyFounder
    companySize
    companyDesc
    companyStreet
    companyCity
    companyState
    users {
      userId
      userName
      userEmail
      password
      userType
    }
  }
}
    `;

/**
 * __useCompanyDetailQuery__
 *
 * To run a query within a React component, call `useCompanyDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyDetailQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useCompanyDetailQuery(baseOptions: Apollo.QueryHookOptions<CompanyDetailQuery, CompanyDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompanyDetailQuery, CompanyDetailQueryVariables>(CompanyDetailDocument, options);
      }
export function useCompanyDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompanyDetailQuery, CompanyDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompanyDetailQuery, CompanyDetailQueryVariables>(CompanyDetailDocument, options);
        }
export type CompanyDetailQueryHookResult = ReturnType<typeof useCompanyDetailQuery>;
export type CompanyDetailLazyQueryHookResult = ReturnType<typeof useCompanyDetailLazyQuery>;
export type CompanyDetailQueryResult = Apollo.QueryResult<CompanyDetailQuery, CompanyDetailQueryVariables>;
export const ProjectListingDocument = gql`
    query projectListing {
  projectListing {
    projectId
    projectName
    companyId
    company {
      companyId
      companyName
      companyFounder
      companySize
      companyDesc
      companyStreet
      companyCity
      companyState
      users {
        userType
      }
    }
    projectTypes
    postDates
    projectSalary
    projectDesc
    projectReq
    projectExpLvl
    skills {
      skillName
    }
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
export const ProjectDetailDocument = gql`
    query projectDetail($projectId: Int!) {
  projectDetail(projectId: $projectId) {
    projectId
    projectName
    companyId
    company {
      companyId
      companyName
      companyFounder
      companySize
      companyDesc
      companyStreet
      companyCity
      companyState
      users {
        userType
      }
    }
    projectTypes
    postDates
    projectSalary
    projectDesc
    projectReq
    projectExpLvl
    skills {
      skillId
      skillName
    }
  }
}
    `;

/**
 * __useProjectDetailQuery__
 *
 * To run a query within a React component, call `useProjectDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDetailQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectDetailQuery(baseOptions: Apollo.QueryHookOptions<ProjectDetailQuery, ProjectDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectDetailQuery, ProjectDetailQueryVariables>(ProjectDetailDocument, options);
      }
export function useProjectDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectDetailQuery, ProjectDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectDetailQuery, ProjectDetailQueryVariables>(ProjectDetailDocument, options);
        }
export type ProjectDetailQueryHookResult = ReturnType<typeof useProjectDetailQuery>;
export type ProjectDetailLazyQueryHookResult = ReturnType<typeof useProjectDetailLazyQuery>;
export type ProjectDetailQueryResult = Apollo.QueryResult<ProjectDetailQuery, ProjectDetailQueryVariables>;
export const JobSeekerListingDocument = gql`
    query jobSeekerListing {
  jobSeekerListing {
    seekerId
    seekerName
    seekerAge
    seekerGender
    seekerBirthdate
    seekerPhoneNo
    seekerStreet
    seekerCity
    seekerState
    seekerHighestEduc
    seekerResume
  }
}
    `;

/**
 * __useJobSeekerListingQuery__
 *
 * To run a query within a React component, call `useJobSeekerListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobSeekerListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobSeekerListingQuery({
 *   variables: {
 *   },
 * });
 */
export function useJobSeekerListingQuery(baseOptions?: Apollo.QueryHookOptions<JobSeekerListingQuery, JobSeekerListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobSeekerListingQuery, JobSeekerListingQueryVariables>(JobSeekerListingDocument, options);
      }
export function useJobSeekerListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobSeekerListingQuery, JobSeekerListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobSeekerListingQuery, JobSeekerListingQueryVariables>(JobSeekerListingDocument, options);
        }
export type JobSeekerListingQueryHookResult = ReturnType<typeof useJobSeekerListingQuery>;
export type JobSeekerListingLazyQueryHookResult = ReturnType<typeof useJobSeekerListingLazyQuery>;
export type JobSeekerListingQueryResult = Apollo.QueryResult<JobSeekerListingQuery, JobSeekerListingQueryVariables>;
export const JobSeekerDetailDocument = gql`
    query jobSeekerDetail($seekerId: Int!) {
  jobSeekerDetail(seekerId: $seekerId) {
    seekerId
    seekerName
    seekerAge
    seekerGender
    seekerBirthdate
    seekerPhoneNo
    seekerStreet
    seekerCity
    seekerState
    seekerHighestEduc
    seekerResume
    seekerAbout
    users {
      userId
      userName
      userEmail
      password
      userType
    }
  }
}
    `;

/**
 * __useJobSeekerDetailQuery__
 *
 * To run a query within a React component, call `useJobSeekerDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobSeekerDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobSeekerDetailQuery({
 *   variables: {
 *      seekerId: // value for 'seekerId'
 *   },
 * });
 */
export function useJobSeekerDetailQuery(baseOptions: Apollo.QueryHookOptions<JobSeekerDetailQuery, JobSeekerDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobSeekerDetailQuery, JobSeekerDetailQueryVariables>(JobSeekerDetailDocument, options);
      }
export function useJobSeekerDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobSeekerDetailQuery, JobSeekerDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobSeekerDetailQuery, JobSeekerDetailQueryVariables>(JobSeekerDetailDocument, options);
        }
export type JobSeekerDetailQueryHookResult = ReturnType<typeof useJobSeekerDetailQuery>;
export type JobSeekerDetailLazyQueryHookResult = ReturnType<typeof useJobSeekerDetailLazyQuery>;
export type JobSeekerDetailQueryResult = Apollo.QueryResult<JobSeekerDetailQuery, JobSeekerDetailQueryVariables>;
export const UserListingDocument = gql`
    query userListing {
  userListing {
    userId
    userName
    password
    userType
  }
}
    `;

/**
 * __useUserListingQuery__
 *
 * To run a query within a React component, call `useUserListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserListingQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserListingQuery(baseOptions?: Apollo.QueryHookOptions<UserListingQuery, UserListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserListingQuery, UserListingQueryVariables>(UserListingDocument, options);
      }
export function useUserListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserListingQuery, UserListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserListingQuery, UserListingQueryVariables>(UserListingDocument, options);
        }
export type UserListingQueryHookResult = ReturnType<typeof useUserListingQuery>;
export type UserListingLazyQueryHookResult = ReturnType<typeof useUserListingLazyQuery>;
export type UserListingQueryResult = Apollo.QueryResult<UserListingQuery, UserListingQueryVariables>;
export const UseDetailDocument = gql`
    query useDetail($userId: Int!) {
  userDetail(userId: $userId) {
    userId
    userName
    userEmail
    password
  }
}
    `;

/**
 * __useUseDetailQuery__
 *
 * To run a query within a React component, call `useUseDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUseDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUseDetailQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUseDetailQuery(baseOptions: Apollo.QueryHookOptions<UseDetailQuery, UseDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UseDetailQuery, UseDetailQueryVariables>(UseDetailDocument, options);
      }
export function useUseDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UseDetailQuery, UseDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UseDetailQuery, UseDetailQueryVariables>(UseDetailDocument, options);
        }
export type UseDetailQueryHookResult = ReturnType<typeof useUseDetailQuery>;
export type UseDetailLazyQueryHookResult = ReturnType<typeof useUseDetailLazyQuery>;
export type UseDetailQueryResult = Apollo.QueryResult<UseDetailQuery, UseDetailQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    userId
    userName
    userEmail
    userType
    password
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;