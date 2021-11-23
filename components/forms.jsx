import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { Label, Input, Textarea, Grid, Box, Progress, Avatar, Themed, Flex, Select } from 'theme-ui';
import { post, upload } from 'lib/utils/fetcher';
import { buildImageUrl } from 'lib/utils/images';
import useCountries from 'lib/hooks/use-countries';
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
    formState: { isSubmitting },
    watch
  } = useForm({
    defaultValues: {
      id: customer?.id ?? '',
      name: customer?.name ?? '',
      address: {
        line1: customer?.address?.line1 ?? '',
        line2: customer?.address?.line2 ?? '',
        city: customer?.address?.city ?? '',
        state: customer?.address?.state ?? '',
        postal_code: customer?.address?.postal_code ?? '',
        country: customer?.address?.country ?? ''
      }
    }
  });

  const countries = useCountries();
  const watchCountry = watch('address.country');

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
          <Label htmlFor="address.country">Country</Label>

          {countries?.length ? (
            <Select {...register('address.country')} mb={3} sx={{ width: '50%' }}>
              {countries.map(({ name, iso2, iso3 }) => (
                <option key={iso3} value={iso2}>
                  {name}
                </option>
              ))}
            </Select>
          ) : null}

          <Label htmlFor="address.line1">Address Line 1</Label>
          <Input {...register('address.line1')} mb={3} />
          <Label htmlFor="address.line2">Address Line 2</Label>
          <Input {...register('address.line2')} mb={3} />
          <Grid gap={2} columns={[1, 2]}>
            <Box>
              <Label htmlFor="address.city">City</Label>
              <Input {...register('address.city')} mb={3} />
            </Box>
            <Box>
              <Label htmlFor="address.state">State</Label>
              <Select {...register('address.state')} mb={3}>
                {countries && watchCountry
                  ? countries
                      .find((c) => c.iso2 === watchCountry)
                      .states.map(({ name, state_code }) => (
                        <option key={state_code} value={state_code}>
                          {name}
                        </option>
                      ))
                  : null}
              </Select>
            </Box>
          </Grid>

          <Box>
            <Label htmlFor="address.postal_code">Postal Code</Label>
            <Input {...register('address.postal_code')} mb={3} sx={{ width: '50%' }} />
          </Box>
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
