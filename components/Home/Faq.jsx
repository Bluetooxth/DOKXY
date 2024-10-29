import React from 'react';

const FAQ = () => {

    const faqs = [
        {
            question: 'How do I book an appointment?',
            answer: 'To book an appointment, simply log in to your account, select your preferred doctor or service, choose an available time slot, and confirm your booking.'
        },
        {
            question: 'Can I cancel or reschedule my appointment?',
            answer: 'Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time through the platform. After that, cancellation policies may apply.'
        },
        {
            question: 'Are virtual consultations available?',
            answer: 'No, currently we do not offer virtual consultations. However, you can book in-person appointments with doctors and specialists.'
        },
        {
            question: 'How do I know which doctor to choose?',
            answer: 'You can browse through doctor profiles on our platform, and check their specialties and experience to find the right doctor for your needs.'
        },
        {
            question: 'What should I bring to my appointment?',
            answer: 'For in-person appointments, bring any relevant medical records, your ID, and insurance information. For virtual consultations, ensure you have a stable internet connection and a quiet place.'
        },
    ];

    return (
        <section className='flex justify-center items-center w-full'>
            <div className="flex flex-col justify-start items-start lg:container w-[95vw] gap-5 px-5 ">
                <h2 className='text-3xl md:text-4xl font-medium'>Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 items-stretch justify-start gap-5 w-full">
                    {faqs.map((faq, index) => (
                        <div key={index} className='flex flex-col justify-start items-start gap-2 rounded-md overflow-hidden cursor-pointer w-full servicecard'>
                            <details className='p-5 w-full'>
                                <summary className='text-lg md:text-xl font-normal cursor-pointer'>{faq.question}</summary>
                                <p className='text-sm md:text-lg mt-2'>{faq.answer}</p>
                            </details>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;