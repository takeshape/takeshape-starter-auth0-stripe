import { mutate } from 'swr';
import { post } from '../lib/fetcher';

export const updateProfile = async (update) => {
  await post('/api/my/profile', update);
  mutate('/api/my/profile');
  mutate('/api/everybody');
};
