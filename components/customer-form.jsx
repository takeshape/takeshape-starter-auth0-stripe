import React from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { post } from '../lib/utils/fetcher';

const updateCustomer = async (data) => {
  await post('/api/my/customer', data);
  mutate('/api/my/customer');
};

function CustomerForm({ customer }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: customer?.name || '',
      description: customer?.description || ''
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit(updateCustomer)}>
        <div>
          <label htmlFor="name">Name</label>
          <input {...register('name')} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input {...register('description')} />
        </div>

        <button type="submit">Update</button>
      </form>

      <hr />

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

export default CustomerForm;
