import { useState } from 'react';
import Layout from "@/Layouts/Layout";
import { Course, PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

import Mark from '@img/mark.png';
import bg from '@img/bg-4.png';
import Bg1 from '@img/bg-1.png';

const course = {
   title: "TÉCNICO SUPERIOR EN SEGURIDAD LABORAL Y SALUD OCUPACIONAL",
   description: "Dirigida a egresados de colegios secundarios que desean tener una profesión de nivel superior, de fácil acceso laboral y buena remuneración.",
   type: "Tecnicatura",
   durationYears: 2,
   schedule: "Sábado 08:00 a 17:00 hs.",
   headquarters: "Ciudad del Este y Fernando de la Mora.",
   subjects: [
      { name: "Lengua castellana", year: 1 },
      { name: "Matemática aplicada", year: 1 },
      { name: "Competencias digitales (tic)", year: 1 },
      { name: "Contabilidad básica", year: 1 },
      { name: "Competencias socioemocionales", year: 1 },
      { name: "Innovación aplicada y emprendimiento", year: 1 },
      { name: "Gestión de la prevención", year: 1 },
      { name: "Riesgos derivados de las condiciones de seguridad", year: 1 },
      { name: "Riesgos físicos ambientales", year: 1 },
      { name: "Ingles técnico", year: 2 },
      { name: "Lengua guaraní", year: 2 },
      { name: "Ética profesional y relaciones en el entorno de trabajo", year: 2 },
      { name: "Proyecto de metodología de trabajo intelectual", year: 2 },
      { name: "Riesgos químicos y biológicos ambientales", year: 2 },
      { name: "Prevención de riesgos derivados de la organización y la carga de trabajo", year: 2 },
      { name: "Gestión de proyectos en seguridad laboral", year: 2 },
      { name: "Evaluación de impacto ambiental", year: 2 },
      { name: "Salud mental en el trabajo", year: 2 },
      { name: "Tecnologías emergentes en seguridad laboral", year: 2 },
   ],
   candidateProfile: `El egresado de TÉCNICO SUPERIOR EN SEGURIDAD LABORAL será capaz de:

   • Gestionar planes de Higiene Ocupacional y Seguridad Laboral para empresas.
   • Observar, analizar, evaluar, prevenir y corregir situaciones de riesgos laborales.
   • Responder ante situaciones de Emergencia dentro del ámbito laboral.
   • Asesorar Auditorias en Gestión de Riesgos para una empresa o industria.
   • Aplicar Leyes, Normas y Reglamentos de Seguridad Laboral en una empresa o industria.`
}

const years = course.subjects.reduce((acc, subject) => {
   if (acc instanceof Array) {
      if (acc.includes(subject.year) === false) {
         acc.push(subject.year)
      }
   }
   return acc;
}, [] as number[])

export default function CourseDetailPage(props: PageProps & { course: Course }) {
   // const { course } = props;
   const [activeTab, setActiveTab] = useState(0)
   const [activeYear, setActiveYear] = useState(years[0])

   return (
      <Layout {...props}>
         <Head title={course.title} />

         <div className="container mx-auto py-12">
            <h1 className="text-6xl font-extrabold text-[#f3b00b] text-center">{course.type}</h1>
            <div className="relative">
               <img className='mt-8' src={bg} />
               <h3 className='text-lg lg:text-2xl font-medium absolute bottom-0 left-0 pb-4 px-4 text-white lg:w-[500px]'>{course.title}</h3>
            </div>

            <div className='w-full bg-gray-200 p-6 mt-24'>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div>
                     <h1 className='font-bold px-2 bg-[#ecaf4f] text-xl mb-6 w-fit'>Info de la carrera</h1>
                     <p className='text-gray-500 font-medium'>{course.description}</p>
                  </div>
                  <div className='grid grid-cols-2'>
                     <div className='flex flex-col'>
                        <span className='font-bold'>Duracion</span>
                        <span className='text-gray-500 font-medium'>{course.durationYears} años</span>
                     </div>
                     <div className='flex flex-col'>
                        <span className='font-bold'>Sede</span>
                        <span className='text-gray-500 font-medium'>{course.headquarters}</span>
                     </div>
                     <div className='flex flex-col'>
                        <span className='font-bold'>Horario de clases</span>
                        <span className='text-gray-500 font-medium'>{course.schedule}</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className='mt-12'>
               <div className='flex space-x-2 lg:px-12'>
                  <div role='button' onClick={() => setActiveTab(0)} className={`px-4 py-1 transition font-medium rounded-t-xl line-clamp-1 text-lg lg:w-56 text-center hover:text-white hover:bg-secondary-base hover:cursor-pointer ${activeTab === 0 ? 'bg-secondary-base text-white w-full' : 'bg-gray-200 text-gray-600 w-32'}`} >
                     Perfil del engresado
                  </div>
                  <div role='button' onClick={() => setActiveTab(1)} className={`px-4 py-1 transition font-medium rounded-t-xl line-clamp-1 text-lg lg:w-56 text-center hover:text-white hover:bg-secondary-base hover:cursor-pointer ${activeTab === 1 ? 'bg-secondary-base text-white w-full' : 'bg-gray-200 text-gray-600 w-32'}`} >
                     Malla Curricular
                  </div>
               </div>
               <div className='rounded-lg routed-t border border-gray-500 p-6'>
                  {activeTab === 0 &&
                     <>
                        <div className='lg:grid grid-cols-3 gap-10 hidden'>
                           <div>
                              {years.map((year, i) => (
                                 <div key={i} role='button' onClick={() => setActiveYear(year)} className='h-48 transition-all flex items-center justify-end relative mb-4 cursor-pointer hover:bg-gray-100'>
                                    <span className='text-lg font-bold text-gray-500 mr-2'>{year} Curso</span>
                                    {activeYear === year && <div className='w-1.5 h-full rounded-xl bg-[#ecaf4f]' />}
                                 </div>
                              ))}
                           </div>
                           <div className='col-span-2'>
                              <ul>
                                 {course.subjects.filter(subject => subject.year === activeYear).map((subject, i) => (
                                    <li key={i} className={`p-2 text-gray-500 font-medium ${i % 2 ? 'bg-gray-200' : 'bg-gray-100'}`}>{subject.name}</li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                        <div className='lg:hidden'>
                           {years.map((year, i) => (
                              <div className='mt-2 mb-6' key={i}>
                                 <h4 className='text-lg font-bold text-gray-500 border-b-4 mb-4'>{year} curso</h4>
                                 <ul>
                                    {course.subjects.filter(subject => subject.year === year).map((subject, i) => (
                                       <li key={i} className={`p-2 text-gray-500 font-medium ${i % 2 ? 'bg-gray-200' : 'bg-gray-100'}`}>{subject.name}</li>
                                    ))}
                                 </ul>
                              </div>
                           ))}
                        </div>
                     </>
                  }
                  {activeTab === 1 &&
                     <div>
                        <p className='whitespace-pre-wrap text-gray-500 font-medium'>{course.candidateProfile}</p>
                     </div>
                  }
               </div>
            </div>
         </div>


         <div className="w-full bg-gray-200 py-12 hidden lg:block">
            <div className='container mx-auto flex mt-12 gap-x-4'>
               <video controls className='object-cover aspect-video w-full bg-gray-500 rounded-xl' />
            </div>
         </div>

         <div className="container mx-auto bg-white py-12">
            <div className='w-full flex flex-col items-center justify-center'>
               <h1 className='uppercase text-center font-extrabold text-2xl lg:text-6xl text-secondary-base'>Requisitos</h1>
               <img className='ml-[100px] lg:ml-[230px]' width={54} src={Mark} />
            </div>
            <ul className='uppercase font-medium text-gray-500 text-center list-disc list-inside mt-4'>
               <li>certificado de estudio original visado por el mec.</li>
               <li>certificado de nacimiento original.</li>
               <li>2 foto tipo carnet actualizado.</li>
               <li>2 copias de cédula auténticada por escribanía.</li>
            </ul>
         </div>
         <div className={`w-full relative hidden lg:block mt-4 mb-32`} style={{ backgroundImage: `url('${Bg1}')` }}>
            <div className='top-0 left-0 w-full h-full text-center py-12 flex flex-col justify-center items-center bg-secondary-base bg-opacity-70'>
               <h3 className='text-5xl font-extrabold text-white'>¡Iniciamos en marzo!</h3>
               <p className='uppercase text-lg text-primary-base font-bold line-clamp-2 lg:w-96 mt-4'>Descuento 10% para funcionarios de ande y socios de cecoel</p>
               <a className='text-lg lg:text-3xl rounded-full font-bold px-14 py-1 from-primary-base to-primary-accent bg-gradient-to-br text-secondary-base hover:text-white transition mt-6 uppercase' href="">¡Inscribite ya!</a>
            </div>
         </div>
      </Layout>
   )
}