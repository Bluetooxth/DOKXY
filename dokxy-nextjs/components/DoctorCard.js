import React from 'react';

const DoctorCard = ({ name, imageURL, specialization, yearsOfExperience }) => {
  return (
    <div className='flex flex-col justify-start items-start gap-3 rounded-xl overflow-hidden w-full cursor-pointer card'>
      <img src={imageURL} alt={name} className='w-full h-[200px] object-cover object-top' />
      <div className='flex flex-col justify-start items-start gap-2 px-5 pb-5 mt-3 w-full'>
        <h3 className='text-2xl font-medium'>{name}</h3>
        <p className='text-xl font-medium'>{specialization}</p>
        <p className='text-xl'>{yearsOfExperience} of experience</p>
        <button className='px-5 py-2 rounded-lg text-xl font-medium w-full btn'>
            View Profile
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;