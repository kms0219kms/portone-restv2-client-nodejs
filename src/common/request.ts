import createClient from 'openapi-fetch';
import type {paths} from '../types/v2'; // generated by openapi-typescript

export function createRequestInstance(
  baseURL: string,
  Authorization?: string,
  withoutAuthorization?: boolean
): ReturnType<typeof createClient<paths>> {
  if (!Authorization && withoutAuthorization) {
    const defaultFunction = () => {
      throw new Error(
        'PortOne SDK is not authorized yet. Please run login function to authorize.'
      );
    };

    return {
      GET: defaultFunction,
      PUT: defaultFunction,
      POST: defaultFunction,
      DELETE: defaultFunction,
      OPTIONS: defaultFunction,
      HEAD: defaultFunction,
      PATCH: defaultFunction,
      TRACE: defaultFunction,
      use: () => {},
      eject: () => {},
    };
  }

  return createClient<paths>({baseUrl: baseURL, headers: {Authorization}});
}

export type RequestInstance = ReturnType<typeof createRequestInstance>;

export default createRequestInstance;
