import { ApolloError } from '@apollo/client';
import toast from 'react-hot-toast';
import { Maybe } from 'src/graphql/api';

export const onCompleted = (response?: Maybe<any>, callback?: (response: Maybe<any>) => void) => {
  if (response?.success) {
    !!callback && callback(response);
    toast.success(response?.message || 'Success', { duration: 3000 });
  }
  if (!response?.success) {
    toast.error(response?.message || 'Error', { duration: 3000 });
  }
};

export const onError = (error: ApolloError, callback?: () => void, setError?: (_1: any, _2: any) => void) => {
  !!callback && callback();

  if (!!setError && error?.graphQLErrors[0]?.extensions?.validation) {
    const validation = (error?.graphQLErrors[0]?.extensions?.validation as object) || {};
    Object.entries(validation).forEach(([key, value]: [any, any]) => {
      setError(key, { message: value?.toString() || 'Invalid' });
    });

    return;
  }
  const errorMessage = process.env.NEXT_PUBLIC_APP_ENV === "local" ? error?.message : 'Something went wrong';
  toast.error(errorMessage);
};
