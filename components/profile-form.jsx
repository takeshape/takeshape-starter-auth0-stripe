import React from 'react';
import { useForm } from 'react-hook-form';

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

export default ProfileForm;
