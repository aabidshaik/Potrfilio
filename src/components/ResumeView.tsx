import React from 'react';

interface ResumeViewProps {
  data: any;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white text-slate-900 p-8 md:p-16 shadow-2xl my-8 rounded-sm">
      <header className="border-b-2 border-slate-900 pb-6 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">{data.basics.name}</h1>
        <div className="text-lg font-medium text-slate-700 mb-4">{data.basics.title}</div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
          <span>{data.basics.location}</span>
          <span>•</span>
          <a href={`mailto:${data.basics.email}`} className="hover:text-blue-600">{data.basics.email}</a>
          <span>•</span>
          <a href={`tel:${data.basics.phone}`} className="hover:text-blue-600">{data.basics.phone}</a>
          <span>•</span>
          <a href={data.basics.links[0].url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            {data.basics.links[0].name}
          </a>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-slate-300 pb-2 mb-4 text-slate-800">
          Summary
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
          {data.basics.summary}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-slate-300 pb-2 mb-4 text-slate-800">
          Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((job: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold text-slate-900">{job.company}</h3>
                <span className="text-sm font-medium text-slate-600">{job.dates}</span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <div className="text-md font-medium italic text-slate-700">{job.role}</div>
                <span className="text-sm text-slate-500">{job.location}</span>
              </div>
              {job.bullets.length > 0 && (
                <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-slate-700">
                  {job.bullets.map((bullet: string, i: number) => (
                    <li key={i} className="pl-1 leading-relaxed">{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-slate-300 pb-2 mb-4 text-slate-800">
          Top Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((group: any) => group.items).flat().map((skill: string, i: number) => (
            <span key={i} className="text-sm text-slate-700 bg-slate-100 px-2 py-1 rounded">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-slate-300 pb-2 mb-4 text-slate-800">
          Education
        </h2>
        <div className="space-y-4">
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="flex justify-between items-baseline">
              <div>
                <h3 className="text-md font-bold text-slate-900">{edu.institution}</h3>
                <div className="text-sm text-slate-700">{edu.degree}</div>
              </div>
              <span className="text-sm font-medium text-slate-600">{edu.dates}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-slate-300 pb-2 mb-4 text-slate-800">
          Certifications
        </h2>
        <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-slate-700">
          {data.certifications.map((cert: string, index: number) => (
            <li key={index} className="pl-1">{cert}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};
