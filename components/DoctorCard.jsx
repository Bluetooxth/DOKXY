import React from 'react';
import Link from 'next/link';

const DoctorCard = ({ name, profile_url, username, specialization, yearsOfExperience }) => {
  return (
    <div className='flex flex-col justify-start items-start gap-3 rounded-lg overflow-hidden w-full cursor-pointer card'>
      <img src={profile_url} alt={name} className='w-full h-[200px] object-cover object-top' />
      <div className='flex flex-col justify-start items-start gap-2 px-5 pb-5 mt-3 w-full'>
        <h3 className='text-2xl font-medium'>{name}</h3>
        <p className='text-xl font-medium'>{specialization}</p>
        <p className='text-xl'>{yearsOfExperience} years of experience</p>
        <Link href={`/doctors/${username}`} className='px-5 py-1 md:py-2 text-lg md:text-xl font-medium rounded-md w-full text-center btn'>
            View Profile
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;