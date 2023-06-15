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
  DateTime: any;
  Upload: any;
};

export type AddUserResponse = User | UserExists;

export type ApplicationResponse = {
  __typename?: 'ApplicationResponse';
  message?: Maybe<Scalars['String']>;
  projectApplicationId?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
};

export type ApplicationType = {
  __typename?: 'ApplicationType';
  applicationDate?: Maybe<Scalars['String']>;
  applicationIsInvited?: Maybe<Scalars['Boolean']>;
  applicationStatus?: Maybe<Scalars['String']>;
  jobSeeker?: Maybe<JobSeekerType>;
  project?: Maybe<ProjectType>;
  projectApplicationId: Scalars['ID'];
  projectId: Scalars['ID'];
  seekerId: Scalars['ID'];
};

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
  companyProfilePic?: Maybe<Scalars['String']>;
  companySize?: Maybe<Scalars['String']>;
  companyState?: Maybe<Scalars['String']>;
  companyStreet?: Maybe<Scalars['String']>;
  projects?: Maybe<Array<ProjectListingType>>;
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
  projectDesc?: InputMaybe<Scalars['String']>;
  projectExpLvl?: InputMaybe<Scalars['String']>;
  projectMaxSalary?: InputMaybe<Scalars['Int']>;
  projectMinSalary?: InputMaybe<Scalars['Int']>;
  projectName: Scalars['String'];
  projectReq?: InputMaybe<Scalars['String']>;
  projectStatus?: InputMaybe<Scalars['Boolean']>;
  projectTypes?: InputMaybe<Scalars['String']>;
  skills: Array<Scalars['Int']>;
};

export type DeleteUserResponse = UserDeleteMessage | UserNotFound;

export type EducationInput = {
  description?: InputMaybe<Scalars['String']>;
  educationId?: InputMaybe<Scalars['ID']>;
  educationInstitution?: InputMaybe<Scalars['String']>;
  educationLevel?: InputMaybe<Scalars['Int']>;
  fieldOfStudy?: InputMaybe<Scalars['Int']>;
  grade?: InputMaybe<Scalars['String']>;
  graduationYear?: InputMaybe<Scalars['Int']>;
};

export type EducationResponse = {
  __typename?: 'EducationResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type EducationType = {
  __typename?: 'EducationType';
  description?: Maybe<Scalars['String']>;
  educationId: Scalars['ID'];
  educationInstitution?: Maybe<Scalars['String']>;
  educationLevel?: Maybe<Scalars['Int']>;
  fieldOfStudy?: Maybe<Scalars['Int']>;
  grade?: Maybe<Scalars['String']>;
  graduationYear?: Maybe<Scalars['Int']>;
};

export type JobSeekerResponse = {
  __typename?: 'JobSeekerResponse';
  jobSeeker?: Maybe<JobSeekerType>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type JobSeekerType = {
  __typename?: 'JobSeekerType';
  educations: Array<EducationType>;
  seekerAbout?: Maybe<Scalars['String']>;
  seekerAge?: Maybe<Scalars['Int']>;
  seekerBirthdate?: Maybe<Scalars['String']>;
  seekerCity?: Maybe<Scalars['String']>;
  seekerGender?: Maybe<Scalars['String']>;
  seekerId: Scalars['ID'];
  seekerIsOpenForWork?: Maybe<Scalars['Boolean']>;
  seekerName?: Maybe<Scalars['String']>;
  seekerPhoneNo?: Maybe<Scalars['Int']>;
  seekerProfilePic?: Maybe<Scalars['String']>;
  seekerResume?: Maybe<Scalars['String']>;
  seekerState?: Maybe<Scalars['String']>;
  seekerStreet?: Maybe<Scalars['String']>;
  skills: Array<SkillType>;
  users?: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createApplication: ApplicationResponse;
  createCompany: CompanyResponse;
  createJobSeeker: JobSeekerResponse;
  createProject: ProjectModifyResponse;
  createUser: AddUserResponse;
  deleteCompany: CompanyResponse;
  deleteEducation: EducationResponse;
  deleteJobSeeker: JobSeekerResponse;
  deleteProject: ProjectModifyResponse;
  deleteUser: DeleteUserResponse;
  login: AuthResponse;
  markNotificationAsRead: NotificationResponse;
  sendNotification: NotificationResponse;
  updateApplication: ApplicationResponse;
  updateCompany: CompanyResponse;
  updateCompanyPassword: CompanyResponse;
  updateJobSeeker: JobSeekerResponse;
  updateJobSeekerPassword: JobSeekerResponse;
  updateProject: ProjectModifyResponse;
  updateUser: UpdateUserResponse;
  uploadCompanyProfilePic: CompanyResponse;
  uploadResume: JobSeekerResponse;
  uploadSeekerProfilePic: JobSeekerResponse;
};


export type MutationCreateApplicationArgs = {
  applicationIsInvited?: InputMaybe<Scalars['Boolean']>;
  projectId: Scalars['Int'];
  userId?: InputMaybe<Scalars['Int']>;
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


export type MutationDeleteEducationArgs = {
  educationId: Scalars['ID'];
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


export type MutationMarkNotificationAsReadArgs = {
  notificationId: Scalars['Int'];
};


export type MutationSendNotificationArgs = {
  input: SendNotificationInput;
};


export type MutationUpdateApplicationArgs = {
  input: UpdateApplicationInput;
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
};


export type MutationUpdateCompanyPasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  userId: Scalars['Int'];
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


export type MutationUploadCompanyProfilePicArgs = {
  profilePic: Scalars['Upload'];
  userId: Scalars['Int'];
};


export type MutationUploadResumeArgs = {
  seekerId: Scalars['Int'];
  seekerResume: Scalars['Upload'];
};


export type MutationUploadSeekerProfilePicArgs = {
  profilePic: Scalars['Upload'];
  userId: Scalars['Int'];
};

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  message?: Maybe<Scalars['String']>;
  notificationId: Scalars['Int'];
  success: Scalars['Boolean'];
};

export type NotificationType = {
  __typename?: 'NotificationType';
  createdAt?: Maybe<Scalars['DateTime']>;
  isRead?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  notificationId: Scalars['ID'];
  receiverId: Scalars['ID'];
  senderId: Scalars['ID'];
};

export type ProjectApplicationType = {
  __typename?: 'ProjectApplicationType';
  applicationIsInvited?: Maybe<Scalars['Boolean']>;
  applicationStatus?: Maybe<Scalars['String']>;
  jobSeeker?: Maybe<JobSeekerType>;
  projectApplicationId: Scalars['ID'];
  projectId: Scalars['ID'];
  seekerId: Scalars['ID'];
};

export type ProjectListingType = {
  __typename?: 'ProjectListingType';
  companyId: Scalars['ID'];
  postDates?: Maybe<Scalars['String']>;
  projectDesc?: Maybe<Scalars['String']>;
  projectExpLvl?: Maybe<Scalars['String']>;
  projectId: Scalars['ID'];
  projectMaxSalary?: Maybe<Scalars['Int']>;
  projectMinSalary?: Maybe<Scalars['Int']>;
  projectName: Scalars['String'];
  projectReq?: Maybe<Scalars['String']>;
  projectStatus: Scalars['String'];
  projectTypes?: Maybe<Scalars['String']>;
  skills: Array<SkillType>;
};

export type ProjectModifyResponse = {
  __typename?: 'ProjectModifyResponse';
  message?: Maybe<Scalars['String']>;
  project?: Maybe<ProjectModifyType>;
  success: Scalars['Boolean'];
};

export type ProjectModifyType = {
  __typename?: 'ProjectModifyType';
  projectId: Scalars['ID'];
};

export type ProjectType = {
  __typename?: 'ProjectType';
  company?: Maybe<CompanyType>;
  companyId: Scalars['ID'];
  postDates?: Maybe<Scalars['String']>;
  projectApplications: Array<ProjectApplicationType>;
  projectDesc?: Maybe<Scalars['String']>;
  projectExpLvl?: Maybe<Scalars['String']>;
  projectId: Scalars['ID'];
  projectMaxSalary?: Maybe<Scalars['Int']>;
  projectMinSalary?: Maybe<Scalars['Int']>;
  projectName: Scalars['String'];
  projectReq?: Maybe<Scalars['String']>;
  projectStatus?: Maybe<Scalars['Boolean']>;
  projectTypes?: Maybe<Scalars['String']>;
  skills: Array<SkillType>;
};

export type Query = {
  __typename?: 'Query';
  companyDetail?: Maybe<CompanyType>;
  companyListing: Array<CompanyType>;
  companyProjectListing: Array<Maybe<ProjectType>>;
  educationListing: Array<EducationType>;
  getJobSeekerApplications: Array<ApplicationType>;
  getProjectApplications: Array<ApplicationType>;
  getUserNotifications: UserNotificationCountType;
  jobSeekerDetail?: Maybe<JobSeekerType>;
  jobSeekerListing: Array<JobSeekerType>;
  me: UserType;
  projectDetail?: Maybe<ProjectType>;
  projectListing: Array<ProjectType>;
  recommendedJobSeekerListing: Array<JobSeekerType>;
  searchJobSeekers: Array<JobSeekerType>;
  searchProjects: Array<ProjectType>;
  skillListing: Array<SkillType>;
  userDetail?: Maybe<User>;
  userListing: Array<User>;
};


export type QueryCompanyDetailArgs = {
  companyId: Scalars['Int'];
};


export type QueryCompanyProjectListingArgs = {
  companyId: Scalars['Int'];
};


export type QueryGetProjectApplicationsArgs = {
  projectId: Scalars['ID'];
};


export type QueryGetUserNotificationsArgs = {
  unreadOnly?: InputMaybe<Scalars['Boolean']>;
};


export type QueryJobSeekerDetailArgs = {
  seekerId: Scalars['Int'];
};


export type QueryProjectDetailArgs = {
  projectId: Scalars['Int'];
};


export type QueryProjectListingArgs = {
  recommendation?: InputMaybe<Scalars['Boolean']>;
};


export type QueryRecommendedJobSeekerListingArgs = {
  projectId: Scalars['Int'];
};


export type QuerySearchJobSeekersArgs = {
  searchKeyword: Scalars['String'];
};


export type QuerySearchProjectsArgs = {
  searchKeyword: Scalars['String'];
};


export type QueryUserDetailArgs = {
  userId: Scalars['Int'];
};

export type SendNotificationInput = {
  message: Scalars['String'];
  receiverId: Scalars['Int'];
  senderId: Scalars['Int'];
};

export type SkillType = {
  __typename?: 'SkillType';
  skillId: Scalars['ID'];
  skillName?: Maybe<Scalars['String']>;
};

export type UpdateApplicationInput = {
  applicationStatus?: InputMaybe<Scalars['String']>;
  projectApplicationId: Scalars['ID'];
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
  educations?: InputMaybe<Array<EducationInput>>;
  password?: InputMaybe<Scalars['String']>;
  seekerAbout?: InputMaybe<Scalars['String']>;
  seekerAge?: InputMaybe<Scalars['Int']>;
  seekerBirthdate?: InputMaybe<Scalars['String']>;
  seekerCity?: InputMaybe<Scalars['String']>;
  seekerGender?: InputMaybe<Scalars['String']>;
  seekerId: Scalars['ID'];
  seekerIsOpenForWork?: InputMaybe<Scalars['Boolean']>;
  seekerName?: InputMaybe<Scalars['String']>;
  seekerPhoneNo?: InputMaybe<Scalars['Int']>;
  seekerResume?: InputMaybe<Scalars['Upload']>;
  seekerState?: InputMaybe<Scalars['String']>;
  seekerStreet?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<Scalars['Int']>>;
  userEmail?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  projectDesc?: InputMaybe<Scalars['String']>;
  projectExpLvl?: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
  projectMaxSalary?: InputMaybe<Scalars['Int']>;
  projectMinSalary?: InputMaybe<Scalars['Int']>;
  projectName?: InputMaybe<Scalars['String']>;
  projectReq?: InputMaybe<Scalars['String']>;
  projectStatus?: InputMaybe<Scalars['Boolean']>;
  projectTypes?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<Scalars['Int']>>;
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

export type UserNotificationCountType = {
  __typename?: 'UserNotificationCountType';
  notifications: Array<NotificationType>;
  unreadCount: Scalars['Int'];
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

export type CreateApplicationMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['Int'];
  applicationIsInvited?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateApplicationMutation = { __typename?: 'Mutation', createApplication: { __typename?: 'ApplicationResponse', success: boolean, projectApplicationId?: number | null, message?: string | null } };

export type UpdateApplicationMutationVariables = Exact<{
  input: UpdateApplicationInput;
}>;


export type UpdateApplicationMutation = { __typename?: 'Mutation', updateApplication: { __typename?: 'ApplicationResponse', success: boolean, projectApplicationId?: number | null, message?: string | null } };

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

export type UpdateCompanyPasswordMutationVariables = Exact<{
  userId: Scalars['Int'];
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdateCompanyPasswordMutation = { __typename?: 'Mutation', updateCompanyPassword: { __typename?: 'CompanyResponse', success: boolean, message?: string | null, company?: { __typename?: 'CompanyType', companyId: string } | null } };

export type UploadCompanyProfilePicMutationVariables = Exact<{
  userId: Scalars['Int'];
  profilePic: Scalars['Upload'];
}>;


export type UploadCompanyProfilePicMutation = { __typename?: 'Mutation', uploadCompanyProfilePic: { __typename?: 'CompanyResponse', success: boolean, message?: string | null, company?: { __typename?: 'CompanyType', companyId: string } | null } };

export type DeleteEducationMutationVariables = Exact<{
  educationId: Scalars['ID'];
}>;


export type DeleteEducationMutation = { __typename?: 'Mutation', deleteEducation: { __typename?: 'EducationResponse', message?: string | null, success: boolean } };

export type SendNotificationMutationVariables = Exact<{
  input: SendNotificationInput;
}>;


export type SendNotificationMutation = { __typename?: 'Mutation', sendNotification: { __typename?: 'NotificationResponse', success: boolean, notificationId: number, message?: string | null } };

export type MarkNotificationAsReadMutationVariables = Exact<{
  notificationId: Scalars['Int'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: { __typename?: 'NotificationResponse', success: boolean, notificationId: number, message?: string | null } };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectModifyResponse', success: boolean, message?: string | null, project?: { __typename?: 'ProjectModifyType', projectId: string } | null } };

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'ProjectModifyResponse', success: boolean, message?: string | null, project?: { __typename?: 'ProjectModifyType', projectId: string } | null } };

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: { __typename?: 'ProjectModifyResponse', success: boolean, message?: string | null } };

export type CreateJobSeekerMutationVariables = Exact<{
  input: CreateJobSeekerInput;
}>;


export type CreateJobSeekerMutation = { __typename?: 'Mutation', createJobSeeker: { __typename?: 'JobSeekerResponse', success: boolean, message?: string | null, jobSeeker?: { __typename?: 'JobSeekerType', seekerId: string, seekerName?: string | null, seekerAge?: number | null, seekerGender?: string | null, seekerBirthdate?: string | null, seekerPhoneNo?: number | null, seekerStreet?: string | null, seekerCity?: string | null, seekerState?: string | null, seekerResume?: string | null } | null } };

export type UpdateJobSeekerMutationVariables = Exact<{
  input: UpdateJobSeekerInput;
}>;


export type UpdateJobSeekerMutation = { __typename?: 'Mutation', updateJobSeeker: { __typename?: 'JobSeekerResponse', success: boolean, message?: string | null, jobSeeker?: { __typename?: 'JobSeekerType', seekerId: string, seekerName?: string | null, seekerAge?: number | null, seekerGender?: string | null, seekerBirthdate?: string | null, seekerPhoneNo?: number | null, seekerStreet?: string | null, seekerCity?: string | null, seekerState?: string | null, seekerResume?: string | null } | null } };

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

export type UploadResumeMutationVariables = Exact<{
  seekerId: Scalars['Int'];
  seekerResume: Scalars['Upload'];
}>;


export type UploadResumeMutation = { __typename?: 'Mutation', uploadResume: { __typename?: 'JobSeekerResponse', success: boolean, message?: string | null, jobSeeker?: { __typename?: 'JobSeekerType', seekerId: string } | null } };

export type UploadSeekerProfilePicMutationVariables = Exact<{
  userId: Scalars['Int'];
  profilePic: Scalars['Upload'];
}>;


export type UploadSeekerProfilePicMutation = { __typename?: 'Mutation', uploadSeekerProfilePic: { __typename?: 'JobSeekerResponse', success: boolean, message?: string | null, jobSeeker?: { __typename?: 'JobSeekerType', seekerId: string } | null } };

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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', success: boolean, token?: string | null, message?: string | null, user?: { __typename?: 'UserType', userId: string, userName: string, userEmail: string, password: string, userType: string } | null } };

export type GetJobSeekerApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJobSeekerApplicationsQuery = { __typename?: 'Query', getJobSeekerApplications: Array<{ __typename?: 'ApplicationType', projectApplicationId: string, seekerId: string, projectId: string, applicationStatus?: string | null, applicationDate?: string | null, applicationIsInvited?: boolean | null, jobSeeker?: { __typename?: 'JobSeekerType', seekerName?: string | null } | null, project?: { __typename?: 'ProjectType', projectId: string, projectName: string, companyId: string, projectTypes?: string | null, postDates?: string | null, projectMinSalary?: number | null, projectMaxSalary?: number | null, projectDesc?: string | null, projectReq?: string | null, projectStatus?: boolean | null, projectExpLvl?: string | null, company?: { __typename?: 'CompanyType', companyId: string, companyName?: string | null, companyFounder?: string | null, companySize?: string | null, companyDesc?: string | null, companyStreet?: string | null, companyCity?: string | null, companyState?: string | null } | null, skills: Array<{ __typename?: 'SkillType', skillId: string, skillName?: string | null }> } | null }> };

export type CompanyListingQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyListingQuery = { __typename?: 'Query', companyListing: Array<{ __typename?: 'CompanyType', companyId: string, companyName?: string | null, companyFounder?: string | null, companySize?: string | null, companyDesc?: string | null, companyStreet?: string | null, companyCity?: string | null, companyState?: string | null }> };

export type CompanyDetailQueryVariables = Exact<{
  companyId: Scalars['Int'];
}>;


export type CompanyDetailQuery = { __typename?: 'Query', companyDetail?: { __typename?: 'CompanyType', companyId: string, companyName?: string | null, companyFounder?: string | null, companySize?: string | null, companyDesc?: string | null, companyStreet?: string | null, companyCity?: string | null, companyState?: string | null, companyProfilePic?: string | null, users?: { __typename?: 'UserType', userId: string, userName: string, userEmail: string, password: string, userType: string } | null, projects?: Array<{ __typename?: 'ProjectListingType', projectId: string, projectName: string, projectTypes?: string | null, postDates?: string | null, projectMinSalary?: number | null, projectMaxSalary?: number | null, projectDesc?: string | null, projectReq?: string | null, projectExpLvl?: string | null, projectStatus: string }> | null } | null };

export type GetUserNotificationsQueryVariables = Exact<{
  unreadOnly: Scalars['Boolean'];
}>;


export type GetUserNotificationsQuery = { __typename?: 'Query', getUserNotifications: { __typename?: 'UserNotificationCountType', unreadCount: number, notifications: Array<{ __typename?: 'NotificationType', notificationId: string, senderId: string, receiverId: string, message?: string | null, isRead?: boolean | null, createdAt?: any | null }> } };

export type ProjectListingQueryVariables = Exact<{
  recommendation: Scalars['Boolean'];
}>;


export type ProjectListingQuery = { __typename?: 'Query', projectListing: Array<{ __typename?: 'ProjectType', projectId: string, projectName: string, companyId: string, projectTypes?: string | null, postDates?: string | null, projectMinSalary?: number | null, projectMaxSalary?: number | null, projectDesc?: string | null, projectReq?: string | null, projectStatus?: boolean | null, projectExpLvl?: string | null, company?: { __typename?: 'CompanyType', companyId: string, companyName?: string | null, companyFounder?: string | null, companySize?: string | null, companyDesc?: string | null, companyStreet?: string | null, companyCity?: string | null, companyState?: string | null, users?: { __typename?: 'UserType', userType: string } | null } | null, skills: Array<{ __typename?: 'SkillType', skillId: string, skillName?: string | null }> }> };

export type ProjectDetailQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type ProjectDetailQuery = { __typename?: 'Query', projectDetail?: { __typename?: 'ProjectType', projectId: string, projectName: string, companyId: string, projectTypes?: string | null, postDates?: string | null, projectMinSalary?: number | null, projectMaxSalary?: number | null, projectDesc?: string | null, projectReq?: string | null, projectStatus?: boolean | null, projectExpLvl?: string | null, company?: { __typename?: 'CompanyType', companyId: string, companyName?: string | null, companyFounder?: string | null, companySize?: string | null, companyDesc?: string | null, companyStreet?: string | null, companyCity?: string | null, companyState?: string | null, users?: { __typename?: 'UserType', userType: string } | null } | null, skills: Array<{ __typename?: 'SkillType', skillId: string, skillName?: string | null }>, projectApplications: Array<{ __typename?: 'ProjectApplicationType', projectApplicationId: string, seekerId: string, projectId: string, applicationStatus?: string | null, applicationIsInvited?: boolean | null, jobSeeker?: { __typename?: 'JobSeekerType', seekerId: string } | null }> } | null };

export type SearchProjectsQueryVariables = Exact<{
  searchKeyword: Scalars['String'];
}>;


export type SearchProjectsQuery = { __typename?: 'Query', searchProjects: Array<{ __typename?: 'ProjectType', projectId: string, projectName: string, companyId: string, projectTypes?: string | null, postDates?: string | null, projectMinSalary?: number | null, projectMaxSalary?: number | null, projectDesc?: string | null, projectReq?: string | null, projectStatus?: boolean | null, projectExpLvl?: string | null, company?: { __typename?: 'CompanyType', companyId: string, companyName?: string | null, companyFounder?: string | null, companySize?: string | null, companyDesc?: string | null, companyStreet?: string | null, companyCity?: string | null, companyState?: string | null, users?: { __typename?: 'UserType', userType: string } | null } | null, skills: Array<{ __typename?: 'SkillType', skillId: string, skillName?: string | null }> }> };

export type CompanyProjectListingQueryVariables = Exact<{
  companyId: Scalars['Int'];
}>;


export type CompanyProjectListingQuery = { __typename?: 'Query', companyProjectListing: Array<{ __typename?: 'ProjectType', projectId: string, projectName: string, companyId: string, projectTypes?: string | null, postDates?: string | null, projectMinSalary?: number | null, projectMaxSalary?: number | null, projectDesc?: string | null, projectReq?: string | null, projectStatus?: boolean | null, projectExpLvl?: string | null, company?: { __typename?: 'CompanyType', companyName?: string | null } | null, skills: Array<{ __typename?: 'SkillType', skillId: string, skillName?: string | null }>, projectApplications: Array<{ __typename?: 'ProjectApplicationType', projectApplicationId: string, seekerId: string, projectId: string, applicationStatus?: string | null, applicationIsInvited?: boolean | null, jobSeeker?: { __typename?: 'JobSeekerType', seekerId: string, seekerName?: string | null } | null }> } | null> };

export type JobSeekerListingQueryVariables = Exact<{ [key: string]: never; }>;


export type JobSeekerListingQuery = { __typename?: 'Query', jobSeekerListing: Array<{ __typename?: 'JobSeekerType', seekerId: string, seekerName?: string | null, seekerAge?: number | null, seekerGender?: string | null, seekerBirthdate?: string | null, seekerPhoneNo?: number | null, seekerStreet?: string | null, seekerCity?: string | null, seekerState?: string | null, seekerResume?: string | null }> };

export type JobSeekerDetailQueryVariables = Exact<{
  seekerId: Scalars['Int'];
}>;


export type JobSeekerDetailQuery = { __typename?: 'Query', jobSeekerDetail?: { __typename?: 'JobSeekerType', seekerId: string, seekerName?: string | null, seekerAge?: number | null, seekerGender?: string | null, seekerBirthdate?: string | null, seekerPhoneNo?: number | null, seekerStreet?: string | null, seekerCity?: string | null, seekerState?: string | null, seekerResume?: string | null, seekerProfilePic?: string | null, seekerAbout?: string | null, seekerIsOpenForWork?: boolean | null, users?: { __typename?: 'UserType', userId: string, userName: string, userEmail: string, password: string, userType: string } | null, skills: Array<{ __typename?: 'SkillType', skillId: string, skillName?: string | null }>, educations: Array<{ __typename?: 'EducationType', educationId: string, educationLevel?: number | null, educationInstitution?: string | null, description?: string | null, fieldOfStudy?: number | null, graduationYear?: number | null, grade?: string | null }> } | null };

export type RecommendedJobSeekerListingQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type RecommendedJobSeekerListingQuery = { __typename?: 'Query', recommendedJobSeekerListing: Array<{ __typename?: 'JobSeekerType', seekerId: string, seekerName?: string | null, seekerAge?: number | null, seekerGender?: string | null, seekerBirthdate?: string | null, seekerPhoneNo?: number | null, seekerStreet?: string | null, seekerCity?: string | null, seekerState?: string | null, seekerResume?: string | null, seekerProfilePic?: string | null, seekerAbout?: string | null, seekerIsOpenForWork?: boolean | null, users?: { __typename?: 'UserType', userName: string, userEmail: string } | null, skills: Array<{ __typename?: 'SkillType', skillId: string, skillName?: string | null }>, educations: Array<{ __typename?: 'EducationType', educationId: string, educationLevel?: number | null, educationInstitution?: string | null, description?: string | null, fieldOfStudy?: number | null, graduationYear?: number | null, grade?: string | null }> }> };

export type SearchJobSeekersQueryVariables = Exact<{
  searchKeyword: Scalars['String'];
}>;


export type SearchJobSeekersQuery = { __typename?: 'Query', searchJobSeekers: Array<{ __typename?: 'JobSeekerType', seekerId: string, seekerName?: string | null, seekerAge?: number | null, seekerGender?: string | null, seekerBirthdate?: string | null, seekerPhoneNo?: number | null, seekerStreet?: string | null, seekerCity?: string | null, seekerState?: string | null, seekerResume?: string | null, seekerProfilePic?: string | null, seekerAbout?: string | null, seekerIsOpenForWork?: boolean | null, users?: { __typename?: 'UserType', userName: string, userEmail: string } | null, skills: Array<{ __typename?: 'SkillType', skillId: string, skillName?: string | null }>, educations: Array<{ __typename?: 'EducationType', educationId: string, educationLevel?: number | null, educationInstitution?: string | null, description?: string | null, fieldOfStudy?: number | null, graduationYear?: number | null, grade?: string | null }> }> };

export type SkillListingQueryVariables = Exact<{ [key: string]: never; }>;


export type SkillListingQuery = { __typename?: 'Query', skillListing: Array<{ __typename?: 'SkillType', skillId: string, skillName?: string | null }> };

export type UserListingQueryVariables = Exact<{ [key: string]: never; }>;


export type UserListingQuery = { __typename?: 'Query', userListing: Array<{ __typename?: 'User', userId: string, userName: string, password: string, userType: string }> };

export type UseDetailQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UseDetailQuery = { __typename?: 'Query', userDetail?: { __typename?: 'User', userId: string, userName: string, userEmail: string, password: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserType', userId: string, userName: string, userEmail: string, userType: string, password: string } };


export const CreateApplicationDocument = gql`
    mutation createApplication($userId: Int, $projectId: Int!, $applicationIsInvited: Boolean) {
  createApplication(
    userId: $userId
    projectId: $projectId
    applicationIsInvited: $applicationIsInvited
  ) {
    ... on ApplicationResponse {
      success
      projectApplicationId
      message
    }
  }
}
    `;
export type CreateApplicationMutationFn = Apollo.MutationFunction<CreateApplicationMutation, CreateApplicationMutationVariables>;

/**
 * __useCreateApplicationMutation__
 *
 * To run a mutation, you first call `useCreateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApplicationMutation, { data, loading, error }] = useCreateApplicationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      projectId: // value for 'projectId'
 *      applicationIsInvited: // value for 'applicationIsInvited'
 *   },
 * });
 */
export function useCreateApplicationMutation(baseOptions?: Apollo.MutationHookOptions<CreateApplicationMutation, CreateApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateApplicationMutation, CreateApplicationMutationVariables>(CreateApplicationDocument, options);
      }
export type CreateApplicationMutationHookResult = ReturnType<typeof useCreateApplicationMutation>;
export type CreateApplicationMutationResult = Apollo.MutationResult<CreateApplicationMutation>;
export type CreateApplicationMutationOptions = Apollo.BaseMutationOptions<CreateApplicationMutation, CreateApplicationMutationVariables>;
export const UpdateApplicationDocument = gql`
    mutation updateApplication($input: UpdateApplicationInput!) {
  updateApplication(input: $input) {
    ... on ApplicationResponse {
      success
      projectApplicationId
      message
    }
  }
}
    `;
export type UpdateApplicationMutationFn = Apollo.MutationFunction<UpdateApplicationMutation, UpdateApplicationMutationVariables>;

/**
 * __useUpdateApplicationMutation__
 *
 * To run a mutation, you first call `useUpdateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApplicationMutation, { data, loading, error }] = useUpdateApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateApplicationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateApplicationMutation, UpdateApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateApplicationMutation, UpdateApplicationMutationVariables>(UpdateApplicationDocument, options);
      }
export type UpdateApplicationMutationHookResult = ReturnType<typeof useUpdateApplicationMutation>;
export type UpdateApplicationMutationResult = Apollo.MutationResult<UpdateApplicationMutation>;
export type UpdateApplicationMutationOptions = Apollo.BaseMutationOptions<UpdateApplicationMutation, UpdateApplicationMutationVariables>;
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
export const UpdateCompanyPasswordDocument = gql`
    mutation updateCompanyPassword($userId: Int!, $currentPassword: String!, $newPassword: String!) {
  updateCompanyPassword(
    userId: $userId
    currentPassword: $currentPassword
    newPassword: $newPassword
  ) {
    ... on CompanyResponse {
      success
      company {
        companyId
      }
      message
    }
  }
}
    `;
export type UpdateCompanyPasswordMutationFn = Apollo.MutationFunction<UpdateCompanyPasswordMutation, UpdateCompanyPasswordMutationVariables>;

/**
 * __useUpdateCompanyPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyPasswordMutation, { data, loading, error }] = useUpdateCompanyPasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdateCompanyPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompanyPasswordMutation, UpdateCompanyPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompanyPasswordMutation, UpdateCompanyPasswordMutationVariables>(UpdateCompanyPasswordDocument, options);
      }
export type UpdateCompanyPasswordMutationHookResult = ReturnType<typeof useUpdateCompanyPasswordMutation>;
export type UpdateCompanyPasswordMutationResult = Apollo.MutationResult<UpdateCompanyPasswordMutation>;
export type UpdateCompanyPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateCompanyPasswordMutation, UpdateCompanyPasswordMutationVariables>;
export const UploadCompanyProfilePicDocument = gql`
    mutation uploadCompanyProfilePic($userId: Int!, $profilePic: Upload!) {
  uploadCompanyProfilePic(userId: $userId, profilePic: $profilePic) {
    ... on CompanyResponse {
      success
      company {
        companyId
      }
      message
    }
  }
}
    `;
export type UploadCompanyProfilePicMutationFn = Apollo.MutationFunction<UploadCompanyProfilePicMutation, UploadCompanyProfilePicMutationVariables>;

/**
 * __useUploadCompanyProfilePicMutation__
 *
 * To run a mutation, you first call `useUploadCompanyProfilePicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadCompanyProfilePicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadCompanyProfilePicMutation, { data, loading, error }] = useUploadCompanyProfilePicMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      profilePic: // value for 'profilePic'
 *   },
 * });
 */
export function useUploadCompanyProfilePicMutation(baseOptions?: Apollo.MutationHookOptions<UploadCompanyProfilePicMutation, UploadCompanyProfilePicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadCompanyProfilePicMutation, UploadCompanyProfilePicMutationVariables>(UploadCompanyProfilePicDocument, options);
      }
export type UploadCompanyProfilePicMutationHookResult = ReturnType<typeof useUploadCompanyProfilePicMutation>;
export type UploadCompanyProfilePicMutationResult = Apollo.MutationResult<UploadCompanyProfilePicMutation>;
export type UploadCompanyProfilePicMutationOptions = Apollo.BaseMutationOptions<UploadCompanyProfilePicMutation, UploadCompanyProfilePicMutationVariables>;
export const DeleteEducationDocument = gql`
    mutation deleteEducation($educationId: ID!) {
  deleteEducation(educationId: $educationId) {
    ... on EducationResponse {
      message
      success
    }
  }
}
    `;
export type DeleteEducationMutationFn = Apollo.MutationFunction<DeleteEducationMutation, DeleteEducationMutationVariables>;

/**
 * __useDeleteEducationMutation__
 *
 * To run a mutation, you first call `useDeleteEducationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEducationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEducationMutation, { data, loading, error }] = useDeleteEducationMutation({
 *   variables: {
 *      educationId: // value for 'educationId'
 *   },
 * });
 */
export function useDeleteEducationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEducationMutation, DeleteEducationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEducationMutation, DeleteEducationMutationVariables>(DeleteEducationDocument, options);
      }
export type DeleteEducationMutationHookResult = ReturnType<typeof useDeleteEducationMutation>;
export type DeleteEducationMutationResult = Apollo.MutationResult<DeleteEducationMutation>;
export type DeleteEducationMutationOptions = Apollo.BaseMutationOptions<DeleteEducationMutation, DeleteEducationMutationVariables>;
export const SendNotificationDocument = gql`
    mutation sendNotification($input: SendNotificationInput!) {
  sendNotification(input: $input) {
    ... on NotificationResponse {
      success
      notificationId
      message
    }
  }
}
    `;
export type SendNotificationMutationFn = Apollo.MutationFunction<SendNotificationMutation, SendNotificationMutationVariables>;

/**
 * __useSendNotificationMutation__
 *
 * To run a mutation, you first call `useSendNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNotificationMutation, { data, loading, error }] = useSendNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendNotificationMutation(baseOptions?: Apollo.MutationHookOptions<SendNotificationMutation, SendNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendNotificationMutation, SendNotificationMutationVariables>(SendNotificationDocument, options);
      }
export type SendNotificationMutationHookResult = ReturnType<typeof useSendNotificationMutation>;
export type SendNotificationMutationResult = Apollo.MutationResult<SendNotificationMutation>;
export type SendNotificationMutationOptions = Apollo.BaseMutationOptions<SendNotificationMutation, SendNotificationMutationVariables>;
export const MarkNotificationAsReadDocument = gql`
    mutation markNotificationAsRead($notificationId: Int!) {
  markNotificationAsRead(notificationId: $notificationId) {
    ... on NotificationResponse {
      success
      notificationId
      message
    }
  }
}
    `;
export type MarkNotificationAsReadMutationFn = Apollo.MutationFunction<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;

/**
 * __useMarkNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationAsReadMutation, { data, loading, error }] = useMarkNotificationAsReadMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useMarkNotificationAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, options);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = Apollo.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    ... on ProjectModifyResponse {
      success
      project {
        projectId
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
    ... on ProjectModifyResponse {
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
    ... on ProjectModifyResponse {
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
export const UploadResumeDocument = gql`
    mutation uploadResume($seekerId: Int!, $seekerResume: Upload!) {
  uploadResume(seekerId: $seekerId, seekerResume: $seekerResume) {
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
export type UploadResumeMutationFn = Apollo.MutationFunction<UploadResumeMutation, UploadResumeMutationVariables>;

/**
 * __useUploadResumeMutation__
 *
 * To run a mutation, you first call `useUploadResumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadResumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadResumeMutation, { data, loading, error }] = useUploadResumeMutation({
 *   variables: {
 *      seekerId: // value for 'seekerId'
 *      seekerResume: // value for 'seekerResume'
 *   },
 * });
 */
export function useUploadResumeMutation(baseOptions?: Apollo.MutationHookOptions<UploadResumeMutation, UploadResumeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadResumeMutation, UploadResumeMutationVariables>(UploadResumeDocument, options);
      }
export type UploadResumeMutationHookResult = ReturnType<typeof useUploadResumeMutation>;
export type UploadResumeMutationResult = Apollo.MutationResult<UploadResumeMutation>;
export type UploadResumeMutationOptions = Apollo.BaseMutationOptions<UploadResumeMutation, UploadResumeMutationVariables>;
export const UploadSeekerProfilePicDocument = gql`
    mutation uploadSeekerProfilePic($userId: Int!, $profilePic: Upload!) {
  uploadSeekerProfilePic(userId: $userId, profilePic: $profilePic) {
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
export type UploadSeekerProfilePicMutationFn = Apollo.MutationFunction<UploadSeekerProfilePicMutation, UploadSeekerProfilePicMutationVariables>;

/**
 * __useUploadSeekerProfilePicMutation__
 *
 * To run a mutation, you first call `useUploadSeekerProfilePicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadSeekerProfilePicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadSeekerProfilePicMutation, { data, loading, error }] = useUploadSeekerProfilePicMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      profilePic: // value for 'profilePic'
 *   },
 * });
 */
export function useUploadSeekerProfilePicMutation(baseOptions?: Apollo.MutationHookOptions<UploadSeekerProfilePicMutation, UploadSeekerProfilePicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadSeekerProfilePicMutation, UploadSeekerProfilePicMutationVariables>(UploadSeekerProfilePicDocument, options);
      }
export type UploadSeekerProfilePicMutationHookResult = ReturnType<typeof useUploadSeekerProfilePicMutation>;
export type UploadSeekerProfilePicMutationResult = Apollo.MutationResult<UploadSeekerProfilePicMutation>;
export type UploadSeekerProfilePicMutationOptions = Apollo.BaseMutationOptions<UploadSeekerProfilePicMutation, UploadSeekerProfilePicMutationVariables>;
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
        userType
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
export const GetJobSeekerApplicationsDocument = gql`
    query getJobSeekerApplications {
  getJobSeekerApplications {
    projectApplicationId
    seekerId
    projectId
    applicationStatus
    applicationDate
    applicationIsInvited
    jobSeeker {
      seekerName
    }
    project {
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
      }
      projectTypes
      postDates
      projectMinSalary
      projectMaxSalary
      projectDesc
      projectReq
      projectStatus
      projectExpLvl
      skills {
        skillId
        skillName
      }
    }
  }
}
    `;

/**
 * __useGetJobSeekerApplicationsQuery__
 *
 * To run a query within a React component, call `useGetJobSeekerApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobSeekerApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobSeekerApplicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetJobSeekerApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<GetJobSeekerApplicationsQuery, GetJobSeekerApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJobSeekerApplicationsQuery, GetJobSeekerApplicationsQueryVariables>(GetJobSeekerApplicationsDocument, options);
      }
export function useGetJobSeekerApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJobSeekerApplicationsQuery, GetJobSeekerApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJobSeekerApplicationsQuery, GetJobSeekerApplicationsQueryVariables>(GetJobSeekerApplicationsDocument, options);
        }
export type GetJobSeekerApplicationsQueryHookResult = ReturnType<typeof useGetJobSeekerApplicationsQuery>;
export type GetJobSeekerApplicationsLazyQueryHookResult = ReturnType<typeof useGetJobSeekerApplicationsLazyQuery>;
export type GetJobSeekerApplicationsQueryResult = Apollo.QueryResult<GetJobSeekerApplicationsQuery, GetJobSeekerApplicationsQueryVariables>;
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
    companyProfilePic
    users {
      userId
      userName
      userEmail
      password
      userType
    }
    projects {
      projectId
      projectName
      projectTypes
      postDates
      projectMinSalary
      projectMaxSalary
      projectDesc
      projectReq
      projectExpLvl
      projectStatus
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
export const GetUserNotificationsDocument = gql`
    query getUserNotifications($unreadOnly: Boolean!) {
  getUserNotifications(unreadOnly: $unreadOnly) {
    unreadCount
    notifications {
      notificationId
      senderId
      receiverId
      message
      isRead
      createdAt
    }
  }
}
    `;

/**
 * __useGetUserNotificationsQuery__
 *
 * To run a query within a React component, call `useGetUserNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserNotificationsQuery({
 *   variables: {
 *      unreadOnly: // value for 'unreadOnly'
 *   },
 * });
 */
export function useGetUserNotificationsQuery(baseOptions: Apollo.QueryHookOptions<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>(GetUserNotificationsDocument, options);
      }
export function useGetUserNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>(GetUserNotificationsDocument, options);
        }
export type GetUserNotificationsQueryHookResult = ReturnType<typeof useGetUserNotificationsQuery>;
export type GetUserNotificationsLazyQueryHookResult = ReturnType<typeof useGetUserNotificationsLazyQuery>;
export type GetUserNotificationsQueryResult = Apollo.QueryResult<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>;
export const ProjectListingDocument = gql`
    query projectListing($recommendation: Boolean!) {
  projectListing(recommendation: $recommendation) {
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
    projectMinSalary
    projectMaxSalary
    projectDesc
    projectReq
    projectStatus
    projectExpLvl
    skills {
      skillId
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
 *      recommendation: // value for 'recommendation'
 *   },
 * });
 */
export function useProjectListingQuery(baseOptions: Apollo.QueryHookOptions<ProjectListingQuery, ProjectListingQueryVariables>) {
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
    projectMinSalary
    projectMaxSalary
    projectDesc
    projectReq
    projectStatus
    projectExpLvl
    skills {
      skillId
      skillName
    }
    projectApplications {
      projectApplicationId
      seekerId
      projectId
      applicationStatus
      applicationIsInvited
      jobSeeker {
        seekerId
      }
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
export const SearchProjectsDocument = gql`
    query searchProjects($searchKeyword: String!) {
  searchProjects(searchKeyword: $searchKeyword) {
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
    projectMinSalary
    projectMaxSalary
    projectDesc
    projectReq
    projectStatus
    projectExpLvl
    skills {
      skillId
      skillName
    }
  }
}
    `;

/**
 * __useSearchProjectsQuery__
 *
 * To run a query within a React component, call `useSearchProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProjectsQuery({
 *   variables: {
 *      searchKeyword: // value for 'searchKeyword'
 *   },
 * });
 */
export function useSearchProjectsQuery(baseOptions: Apollo.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
      }
export function useSearchProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
        }
export type SearchProjectsQueryHookResult = ReturnType<typeof useSearchProjectsQuery>;
export type SearchProjectsLazyQueryHookResult = ReturnType<typeof useSearchProjectsLazyQuery>;
export type SearchProjectsQueryResult = Apollo.QueryResult<SearchProjectsQuery, SearchProjectsQueryVariables>;
export const CompanyProjectListingDocument = gql`
    query companyProjectListing($companyId: Int!) {
  companyProjectListing(companyId: $companyId) {
    projectId
    projectName
    companyId
    company {
      companyName
    }
    projectTypes
    postDates
    projectMinSalary
    projectMaxSalary
    projectDesc
    projectReq
    projectStatus
    projectExpLvl
    skills {
      skillId
      skillName
    }
    projectApplications {
      projectApplicationId
      seekerId
      projectId
      applicationStatus
      applicationIsInvited
      jobSeeker {
        seekerId
        seekerName
      }
    }
  }
}
    `;

/**
 * __useCompanyProjectListingQuery__
 *
 * To run a query within a React component, call `useCompanyProjectListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyProjectListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyProjectListingQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useCompanyProjectListingQuery(baseOptions: Apollo.QueryHookOptions<CompanyProjectListingQuery, CompanyProjectListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompanyProjectListingQuery, CompanyProjectListingQueryVariables>(CompanyProjectListingDocument, options);
      }
export function useCompanyProjectListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompanyProjectListingQuery, CompanyProjectListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompanyProjectListingQuery, CompanyProjectListingQueryVariables>(CompanyProjectListingDocument, options);
        }
export type CompanyProjectListingQueryHookResult = ReturnType<typeof useCompanyProjectListingQuery>;
export type CompanyProjectListingLazyQueryHookResult = ReturnType<typeof useCompanyProjectListingLazyQuery>;
export type CompanyProjectListingQueryResult = Apollo.QueryResult<CompanyProjectListingQuery, CompanyProjectListingQueryVariables>;
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
    seekerResume
    seekerProfilePic
    seekerAbout
    seekerIsOpenForWork
    users {
      userId
      userName
      userEmail
      password
      userType
    }
    skills {
      skillId
      skillName
    }
    educations {
      educationId
      educationLevel
      educationInstitution
      description
      fieldOfStudy
      graduationYear
      grade
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
export const RecommendedJobSeekerListingDocument = gql`
    query recommendedJobSeekerListing($projectId: Int!) {
  recommendedJobSeekerListing(projectId: $projectId) {
    seekerId
    seekerName
    seekerAge
    seekerGender
    seekerBirthdate
    seekerPhoneNo
    seekerStreet
    seekerCity
    seekerState
    seekerResume
    seekerProfilePic
    seekerAbout
    seekerIsOpenForWork
    users {
      userName
      userEmail
    }
    skills {
      skillId
      skillName
    }
    educations {
      educationId
      educationLevel
      educationInstitution
      description
      fieldOfStudy
      graduationYear
      grade
    }
  }
}
    `;

/**
 * __useRecommendedJobSeekerListingQuery__
 *
 * To run a query within a React component, call `useRecommendedJobSeekerListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendedJobSeekerListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendedJobSeekerListingQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useRecommendedJobSeekerListingQuery(baseOptions: Apollo.QueryHookOptions<RecommendedJobSeekerListingQuery, RecommendedJobSeekerListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecommendedJobSeekerListingQuery, RecommendedJobSeekerListingQueryVariables>(RecommendedJobSeekerListingDocument, options);
      }
export function useRecommendedJobSeekerListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecommendedJobSeekerListingQuery, RecommendedJobSeekerListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecommendedJobSeekerListingQuery, RecommendedJobSeekerListingQueryVariables>(RecommendedJobSeekerListingDocument, options);
        }
export type RecommendedJobSeekerListingQueryHookResult = ReturnType<typeof useRecommendedJobSeekerListingQuery>;
export type RecommendedJobSeekerListingLazyQueryHookResult = ReturnType<typeof useRecommendedJobSeekerListingLazyQuery>;
export type RecommendedJobSeekerListingQueryResult = Apollo.QueryResult<RecommendedJobSeekerListingQuery, RecommendedJobSeekerListingQueryVariables>;
export const SearchJobSeekersDocument = gql`
    query searchJobSeekers($searchKeyword: String!) {
  searchJobSeekers(searchKeyword: $searchKeyword) {
    seekerId
    seekerName
    seekerAge
    seekerGender
    seekerBirthdate
    seekerPhoneNo
    seekerStreet
    seekerCity
    seekerState
    seekerResume
    seekerProfilePic
    seekerAbout
    seekerIsOpenForWork
    users {
      userName
      userEmail
    }
    skills {
      skillId
      skillName
    }
    educations {
      educationId
      educationLevel
      educationInstitution
      description
      fieldOfStudy
      graduationYear
      grade
    }
  }
}
    `;

/**
 * __useSearchJobSeekersQuery__
 *
 * To run a query within a React component, call `useSearchJobSeekersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchJobSeekersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchJobSeekersQuery({
 *   variables: {
 *      searchKeyword: // value for 'searchKeyword'
 *   },
 * });
 */
export function useSearchJobSeekersQuery(baseOptions: Apollo.QueryHookOptions<SearchJobSeekersQuery, SearchJobSeekersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchJobSeekersQuery, SearchJobSeekersQueryVariables>(SearchJobSeekersDocument, options);
      }
export function useSearchJobSeekersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchJobSeekersQuery, SearchJobSeekersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchJobSeekersQuery, SearchJobSeekersQueryVariables>(SearchJobSeekersDocument, options);
        }
export type SearchJobSeekersQueryHookResult = ReturnType<typeof useSearchJobSeekersQuery>;
export type SearchJobSeekersLazyQueryHookResult = ReturnType<typeof useSearchJobSeekersLazyQuery>;
export type SearchJobSeekersQueryResult = Apollo.QueryResult<SearchJobSeekersQuery, SearchJobSeekersQueryVariables>;
export const SkillListingDocument = gql`
    query skillListing {
  skillListing {
    skillId
    skillName
  }
}
    `;

/**
 * __useSkillListingQuery__
 *
 * To run a query within a React component, call `useSkillListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillListingQuery({
 *   variables: {
 *   },
 * });
 */
export function useSkillListingQuery(baseOptions?: Apollo.QueryHookOptions<SkillListingQuery, SkillListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SkillListingQuery, SkillListingQueryVariables>(SkillListingDocument, options);
      }
export function useSkillListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SkillListingQuery, SkillListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SkillListingQuery, SkillListingQueryVariables>(SkillListingDocument, options);
        }
export type SkillListingQueryHookResult = ReturnType<typeof useSkillListingQuery>;
export type SkillListingLazyQueryHookResult = ReturnType<typeof useSkillListingLazyQuery>;
export type SkillListingQueryResult = Apollo.QueryResult<SkillListingQuery, SkillListingQueryVariables>;
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