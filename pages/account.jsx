import React, { useEffect } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';
import useApi from '../lib/use-api';
import Layout from '../components/layout';

function ProfileForm({ profile, updateProfile }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      bio: profile.bio || ''
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit(updateProfile)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('firstName')} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input {...register('lastName')} />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea {...register('bio')} rows="4" cols="50"></textarea>
        </div>
        <button type="submit">Update</button>
      </form>

      <style jsx>{`
        form {
          width: 100%;
        }
        input,
        textarea {
          width: 20rem;
          font-size: 1rem;
          margin-bottom: 1.2rem;
        }
        label {
          display: block;
        }
      `}</style>
    </div>
  );
}

export default withPageAuthRequired(function Account() {
  const { user } = useUser();
  const { response, error, isLoading, fetchData } = useApi();

  useEffect(() => {
    fetchData('/api/my/profile');
  }, []);

  const updateProfile = (data) => {
    fetchData('/api/my/profile', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <Layout>
      <h1>Account</h1>

      <div>
        <h4>Auth0 User Token</h4>
        <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
      </div>

      {isLoading && <p>Loading TakeShape profile...</p>}

      {response && (
        <div>
          <h4>TakeShape Profile</h4>
          <pre>{JSON.stringify(response.profile, null, 2)}</pre>

          <h4>Update TakeShape Profile</h4>
          <ProfileForm profile={response.profile} updateProfile={updateProfile} />
        </div>
      )}

      {error && (
        <>
          <p>Error loading TakeShape profile</p>
          <pre style={{ color: 'red' }}>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
});
