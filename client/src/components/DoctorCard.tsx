import React from 'react';

interface DoctorCardProps {
  name: string;
  image: string;
  speciality: string;
  experience: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, image, speciality, experience }) => {
  return (
    <div className='flex flex-col justify-start items-start gap-3 rounded-xl overflow-hidden w-full cursor-pointer card'>
      <img src={image} alt={name} className='w-full h-[250px] object-cover object-top' />
      <div className='flex flex-col justify-start items-start gap-2 px-5 pb-5 mt-3'>
        <h3 className='text-2xl font-medium'>{name}</h3>
        <p className='text-xl font-medium'>{speciality}</p>
        <p className='text-xl italic'>{experience} of experience</p>
      </div>
    </div>
  );
};

export default DoctorCard;