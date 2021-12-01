import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { useAuth0 } from '@auth0/auth0-react';
import * as queries from 'lib/queries';
import { audience, scope, takeshapeApiKey, takeshapeApiUrl } from 'lib/config';
import { createGraphqlRequest } from 'lib/utils/graphql';

export function useQuery(queryName, { useApiKeyAuthentication } = {}) {
  const { getAccessTokenSilently } = useAuth0();

  const query = queries[queryName];

  if (!query) {
    throw new Error(`Could not find query ${queryName}`);
  }

  const getAccessToken = async () => {
    if (useApiKeyAuthentication) {
      return takeshapeApiKey;
    }

    return getAccessTokenSilently({
      audience,
      scope
    });
  };

  return useSWR(queryName, createGraphqlRequest(takeshapeApiUrl, getAccessToken, query));
}

export function useMutation(queryName, { initialPayload, useApiKeyAuthentication, revalidateQueryName } = {}) {
  const { getAccessTokenSilently } = useAuth0();

  const query = queries[queryName];

  if (!query) {
    throw new Error(`Could not find query ${queryName}`);
  }

  const [payload, setPayload] = useState(initialPayload);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAccessToken = async () => {
    if (useApiKeyAuthentication) {
      return takeshapeApiKey;
    }

    return getAccessTokenSilently({
      audience,
      scope
    });
  };

  useEffect(() => {
    async function doQuery() {
      setIsLoading(true);
      setData(null);
      setError(null);

      try {
        const graphqlRequest = createGraphqlRequest(takeshapeApiUrl, getAccessToken, query, payload);
        const data = await graphqlRequest();

        if (data.errors) {
          throw data.errors;
        }

        setData(data);
        setIsLoading(false);

        if (revalidateQueryName) {
          mutate(revalidateQueryName, data, false);
        } else {
          setData(data);
        }
      } catch (e) {
        setError(Array.isArray(e) ? e : [e]);
      }
    }

    if (payload !== undefined) {
      doQuery();
    }
  }, [payload]);

  return [{ data, error, isLoading }, setPayload];
}

export function useUpload(initialUrl, initialFile) {
  const [url, setUrl] = useState(initialUrl);
  const [file, setFile] = useState(initialFile);

  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function doUpload() {
      setIsLoading(true);
      setError(null);

      const xhr = new XMLHttpRequest();

      setProgress(0);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress(event.loaded / event.total);
        }
      };

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            setProgress(1);
          } else {
            setError(xhr.statusText);
          }

          setUrl(undefined);
          setFile(undefined);
          setIsLoading(false);

          setTimeout(() => setProgress(null), 1000);
        }
      };

      xhr.open('PUT', url);
      xhr.send(file);
    }

    if (url !== undefined && file !== undefined) {
      doUpload();
    }
  }, [url, file]);

  return [{ error, progress, isLoading }, setUrl, setFile];
}

export default useQuery;
