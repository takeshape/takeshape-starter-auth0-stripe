import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { post, upload } from '../lib/fetcher';
import { buildImageUrl } from '../lib/images';

const updateProfile = async (data) => {
  await post('/api/my/profile', data);
  mutate('/api/my/profile');
  mutate('/api/everybody');
};

function ProfileAvatarUploadForm({ profile }) {
  const [progress, setProgress] = useState(null);

  const updateAvatar = async (e) => {
    const file = e.target.files[0];
    const { uploadUrl, asset } = await post('/api/my/avatar', { name: file.name, type: file.type });
    await upload(uploadUrl, file, ({ progress }) => {
      setProgress(progress);
    });
    await updateProfile({ avatarId: asset._id });
    setProgress(null);
  };

  return (
    <div>
      <div>{profile?.avatar && <img src={buildImageUrl(profile.avatar, { h: 400, w: 400 })} />}</div>
      <form>
        <label htmlFor="avatar">Upload Avatar</label>
        <input onChange={updateAvatar} type="file" />
        {progress === null ? null : (
          <div>
            <strong>Uploading</strong>
            <span>{progress}%</span>
          </div>
        )}
      </form>
    </div>
  );
}

function ProfileForm({ profile }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      bio: profile?.bio || ''
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

      <ProfileAvatarUploadForm profile={profile} />

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
