import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CaseRegistrationForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (let key in data) {
      if (key === 'proofFiles') {
        for (let file of data.proofFiles) {
          formData.append('proofFiles', file);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      await axios.post('http://localhost:5000/api/register-case', formData);
      alert('Case registered successfully!');
      reset();
    } catch (error) {
      console.error(error);
      alert('Error registering case');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <h2>Register a Case</h2>

      <label>Case Type</label>
      <select {...register('caseType')} required>
        <option value="Family">Family</option>
        <option value="Business">Business</option>
        <option value="Criminal">Criminal</option>
      </select>

      <label>Issue Description</label>
      <textarea {...register('issueDescription')} required />

      <label>Opposite Party Name</label>
      <input type="text" {...register('oppositeName')} required />

      <label>Opposite Party Contact</label>
      <input type="text" {...register('oppositeContact')} required />

      <label>Opposite Party Address</label>
      <input type="text" {...register('oppositeAddress')} required />

      <label>Case Number</label>
      <input type="text" {...register('caseNumber')} />

      <label>FIR Number</label>
      <input type="text" {...register('firNumber')} />

      <label>Court/Police Station Name</label>
      <input type="text" {...register('authority')} />

      <label>Upload Proof</label>
      <input type="file" {...register('proofFiles')} multiple />

      <button type="submit">Submit Case</button>
    </form>
  );
};

export default CaseRegistrationForm;
