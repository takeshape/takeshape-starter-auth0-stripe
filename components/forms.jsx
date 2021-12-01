import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Label, Input, Textarea, Grid, Box, Progress, Avatar, Themed, Flex, Select } from 'theme-ui';
import { buildImageUrl } from 'lib/utils/images';
import useCountries from 'lib/hooks/use-countries';
import { SubmitButton } from './buttons';
import { useMutation, useUpload } from 'lib/hooks/use-takeshape';

export const CustomerForm = ({ customer }) => {
  const [{ isLoading }, setCustomerPayload] = useMutation('UpsertMyCustomer', {
    revalidateQueryName: 'GetMyCustomer'
  });

  const { register, handleSubmit, watch } = useForm({
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
      <Box as="form" onSubmit={handleSubmit(setCustomerPayload)}>
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

        <SubmitButton text="Update" isSubmitting={isLoading} type="submit" />
      </Box>
    </>
  );
};

const ProfileAvatarUploadForm = ({ profile }) => {
  const [{ data: assetsData }, setAssetsPayload] = useMutation('UploadAssets');
  const [{ isLoading: isUpsertingProfile }, setProfilePayload] = useMutation('UpsertMyProfile', {
    revalidateQueryName: 'GetMyProfile'
  });
  const [{ progress }, setUploadUrl, setUploadFile] = useUpload();

  const [file, setFile] = useState(null);
  const [totalProgress, setTotalProgress] = useState(null);
  const [isHandlingFile, setIsHandlingFile] = useState(false);

  useEffect(() => {
    if (file && !isHandlingFile) {
      setIsHandlingFile(true);
      setTotalProgress(0);
      setAssetsPayload({ files: [{ name: file.name, type: file.type }] });
    }
  }, [file, isHandlingFile]);

  useEffect(() => {
    if (file && assetsData?.uploadAssets?.[0]) {
      setUploadUrl(assetsData.uploadAssets[0].uploadUrl);
      setUploadFile(file);
      setTotalProgress(0.25);
    }
  }, [file, assetsData]);

  useEffect(() => {
    if (progress !== null) {
      setTotalProgress(Math.min(progress - 0.25, 0.25));
    }
  }, [progress]);

  useEffect(() => {
    if (progress === 1 && assetsData?.uploadAssets?.[0]) {
      setProfilePayload({ avatarId: assetsData.uploadAssets[0].asset._id });
      setTotalProgress(1);
    }
  }, [progress, assetsData]);

  useEffect(() => {
    if (isUpsertingProfile === false) {
      setFile(null);
      setIsHandlingFile(false);
      setTotalProgress(null);
    }
  }, [isUpsertingProfile]);

  const updateAvatar = async (e) => {
    setFile(e.target.files[0]);
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

        <Input onChange={updateAvatar} type="file" disabled={isHandlingFile} />

        <Progress max={1} value={totalProgress} mt={1}>
          {totalProgress ? `${totalProgress * 100}%` : null}
        </Progress>
      </form>
    </Flex>
  );
};

const ProfileTextForm = ({ profile }) => {
  const [{ isLoading }, setProfilePayload] = useMutation('UpsertMyProfile', {
    revalidateQueryName: 'GetMyProfile'
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: profile?.id || '',
      email: profile?.email || '',
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      bio: profile?.bio || ''
    }
  });

  return (
    <Box as="form" onSubmit={handleSubmit(setProfilePayload)}>
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

      <SubmitButton type="submit" isSubmitting={isLoading} text="Update" />
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
