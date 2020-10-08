import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  activities: Array<Activity>;
  activity: Activity;
  users: Array<User>;
  user: User;
  me?: Maybe<User>;
};


export type QueryActivityArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Activity = {
  __typename?: 'Activity';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  classes?: Maybe<Array<Class>>;
  priceOptions?: Maybe<Array<ActivityPricing>>;
};


export type Class = {
  __typename?: 'Class';
  activityId: Scalars['Float'];
  time: Scalars['String'];
  students: Scalars['Float'];
  maxStudents: Scalars['Float'];
};

export type ActivityPricing = {
  __typename?: 'ActivityPricing';
  activityId: Scalars['Float'];
  activity: Activity;
  type: PricingType;
  payments: Scalars['Float'];
  installment: Scalars['Float'];
};

/** Types of pricing */
export enum PricingType {
  Anual = 'Anual',
  Bianual = 'Bianual',
  Monthly = 'Monthly'
}

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  socialSecurity: Scalars['String'];
  birthDate: Scalars['DateTime'];
  username: Scalars['String'];
  userType: UserType;
  creditCardInfoId?: Maybe<Scalars['Float']>;
};

/** Types of user */
export enum UserType {
  Secretary = 'Secretary',
  Teacher = 'Teacher',
  Doctor = 'Doctor',
  Costumer = 'Costumer'
}

export type Mutation = {
  __typename?: 'Mutation';
  insertActivity: ActivityResponse;
  insertClasses: ActivityResponse;
  insertActivitiesPricing: ActivityResponse;
  insertUser: UserResponse;
  login: LoginResponse;
};


export type MutationInsertActivityArgs = {
  data: ActivityInput;
};


export type MutationInsertClassesArgs = {
  id: Scalars['Int'];
  data: Array<ClassInput>;
};


export type MutationInsertActivitiesPricingArgs = {
  id: Scalars['Int'];
  data: Array<PricingInput>;
};


export type MutationInsertUserArgs = {
  data: UserInput;
};


export type MutationLoginArgs = {
  login: UserLogin;
};

export type ActivityResponse = {
  __typename?: 'ActivityResponse';
  errorMessage?: Maybe<Scalars['String']>;
  activity?: Maybe<Activity>;
};

export type ActivityInput = {
  name?: Maybe<Scalars['String']>;
  classes?: Maybe<Array<ClassInput>>;
  pricings?: Maybe<Array<PricingInput>>;
};

export type ClassInput = {
  maxStudents?: Maybe<Scalars['Float']>;
  classTime?: Maybe<Scalars['String']>;
};

export type PricingInput = {
  type: PricingType;
  payments: Scalars['Float'];
  installment: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errorMessage?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  socialSecurity: Scalars['String'];
  birthDate: Scalars['String'];
  userType: UserType;
  creditCardInfo?: Maybe<CreditCardInfoInput>;
};

export type CreditCardInfoInput = {
  number: Scalars['Float'];
  creditCardType: Scalars['String'];
  owner: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errorMessage?: Maybe<Scalars['String']>;
  accessToken: Scalars['String'];
};

export type UserLogin = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  login: UserLogin;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken' | 'errorMessage'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'username' | 'userType'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($login: UserLogin!) {
  login(login: $login) {
    accessToken
    errorMessage
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
 *      login: // value for 'login'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    username
    userType
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
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;