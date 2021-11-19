/** @jsxImportSource theme-ui */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { Label, Input, Textarea, Grid, Box, Progress, Avatar, Themed, Flex } from 'theme-ui';
import { post, upload } from 'lib/utils/fetcher';
import { buildImageUrl } from 'lib/utils/images';
import { SubmitButton } from './buttons';

const updateCustomer = async (data) => {
  await post('/api/my/customer', data);
  await mutate('/api/my/customer');
};

const updateProfile = async (data) => {
  await post('/api/my/profile', data);
  await mutate('/api/my/profile');
};

export const CustomerForm = ({ customer }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      id: customer?.id || '',
      name: customer?.name || '',
      description: customer?.description || ''
    }
  });

  return (
    <>
      <Box as="form" onSubmit={handleSubmit(updateCustomer)}>
        <Box mb={4}>
          <Label variant="disabledLabel" htmlFor="id">
            ID
          </Label>
          <Input {...register('id')} mb={3} readOnly />
          <Label htmlFor="name">Name</Label>
          <Input {...register('name')} mb={3} />
          <Label htmlFor="description">Description</Label>
          <Textarea {...register('description')} rows="4" cols="50"></Textarea>
        </Box>

        <SubmitButton text="Update" isSubmitting={isSubmitting} type="submit" />
      </Box>
    </>
  );
};

const ProfileAvatarUploadForm = ({ profile }) => {
  const [progress, setProgress] = useState(null);

  const updateAvatar = async (e) => {
    const file = e.target.files[0];
    setProgress(0);
    const { uploadUrl, asset } = await post('/api/my/avatar', { name: file.name, type: file.type });
    await upload(uploadUrl, file, ({ progress }) => {
      setProgress(progress);
    });
    await updateProfile({ avatarId: asset._id });
    setTimeout(() => setProgress(null), 1000);
  };

  return (
    <Flex sx={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Themed.h4>Avatar</Themed.h4>
      <Box sx={{ textAlign: 'center' }}>
        {profile?.avatar ? (
          <Avatar src={buildImageUrl(profile.avatar, { h: 400, w: 400 })} sx={{ objectFit: 'cover' }} />
        ) : (
          <Box variant="images.avatar"></Box>
        )}
      </Box>
      <form>
        <Label htmlFor="avatar">Upload Avatar</Label>
        {progress === null ? null : (
          <div>
            <strong>Uploading</strong>
            <Progress max={1} value={progress}>
              {progress * 100}%
            </Progress>
          </div>
        )}
        <Input onChange={updateAvatar} type="file" />
      </form>
    </Flex>
  );
};

const ProfileTextForm = ({ profile }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      id: profile?.id || '',
      email: profile?.email || '',
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      bio: profile?.bio || ''
    }
  });

  return (
    <Box as="form" onSubmit={handleSubmit(updateProfile)}>
      <Box mb={4}>
        <Label variant="disabledLabel" htmlFor="id">
          Auth0 ID
        </Label>
        <Input {...register('id')} mb={3} readOnly />
        <Label variant="disabledLabel" htmlFor="email">
          Email
        </Label>
        <Input {...register('email')} mb={3} readOnly />
        <Label htmlFor="firstName">First Name</Label>
        <Input {...register('firstName')} mb={3} />
        <Label htmlFor="lastName">Last Name</Label>
        <Input {...register('lastName')} mb={3} />
        <Label htmlFor="bio">Bio</Label>
        <Textarea {...register('bio')} rows="4" cols="50"></Textarea>
      </Box>

      <SubmitButton type="submit" isSubmitting={isSubmitting} text="Update" />
    </Box>
  );
};

export const ProfileForm = ({ profile }) => {
  return (
    <Grid
      sx={{
        gridGap: 4,
        gridTemplateColumns: `repeat(auto-fit, minmax(350px, 1fr))`
      }}
    >
      <Box>
        <ProfileTextForm profile={profile} />
      </Box>

      <Box>
        <ProfileAvatarUploadForm profile={profile} />
      </Box>
    </Grid>
  );
};

export default ProfileForm;
