import TableList from "@/Components/TableList";
import Layout from "@/Layouts/Layout";
import { Lesson, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

interface LessonProps extends PageProps {
    lessons: Lesson[]
    currentLesson: Lesson | null
}

export default function LessonPage(props: LessonProps) {
    const { lessons, currentLesson } = props
    const [currentLessonIndex, setCurrentLessonIndex] = useState(lessons.findIndex(l => l.id == currentLesson?.id))

    const slicedLessons = () => {
        const size = 10
        let start = Math.max(0, currentLessonIndex - Math.round(size / 2));
        let end = start + size;
        if (end > lessons.length) {
            end = lessons.length;
            start = Math.max(0, end - size);
        }

        return lessons.slice(start, end)
    }

    const handleNext = () => {
        setCurrentLessonIndex(Math.min(lessons.length - 1, currentLessonIndex + 1))
    }

    const handlePrevious = () => {
        setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))
    }

    return (
        <Layout {...props}>
            <Head title={lessons[currentLessonIndex].title} />
            
            <div className="xl:container">
                <div className="flex-1 py-12 md:px-16 lg:px-24">

                    <h1 key={currentLessonIndex} className="text-xl md:text-4xl font-bold mb-4 text-primary-500">Aula {currentLessonIndex + 1}/{lessons.length} - {lessons[currentLessonIndex]?.title}</h1>

                    {/* Video player */}
                    <div className="aspect-video">
                        <video key={currentLessonIndex} className="w-full h-full" controls controlsList="nodownload">
                            <source src={route('video.stream', lessons[currentLessonIndex].id)} type="video/mp4" />
                        </video>
                    </div>

                    {/* Horizontal lessons list */}
                    <div className="flex flex-row space-x-4 items-center justify-between mt-8">
                        <div className="hidden lg:block">
                            {/* Lessons dots within current lesson to 10 ahead */}
                            <div className="flex flex-row items-center space-x-4">
                                {slicedLessons().map((lesson, index) => (
                                    <div key={index} onClick={() => setCurrentLessonIndex(lessons.findIndex(l => l.id == lesson.id))} className={`w-4 h-4 rounded-full transition ${currentLessonIndex == lessons.findIndex(l => l.id == lesson.id) ? 'bg-primary-500 w-6 h-6' : 'bg-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                            <button onClick={handlePrevious} className="bg-primary-500 text-white py-2 px-4 rounded-md font-bold">Anterior</button>
                            <button onClick={handleNext} className="bg-primary-500 text-white py-2 px-4 rounded-md font-bold">Próxima</button>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col px-0 sm:px-12 xl:px-0 sm:flex-row" key={currentLessonIndex}>
                    <div className="flex-1 bg-white rounded-t-3xl shadow-xl py-4 md:py-12 px-6 md:x-16 md:min-h-[400px]">
                        <h1 className="text-xl md:text-4xl font-bold mb-8 text-primary-500">Aula {currentLessonIndex + 1}/{lessons.length} - {lessons[currentLessonIndex]?.title}</h1>
                        <p className="text-lg text-gray-500">{lessons[currentLessonIndex]?.description}</p>
                        
                        {lessons[currentLessonIndex].files &&
                            <div className="mt-12">
                                <h4 className="text-base md:text-4xl font-bold mb-4 text-primary-500">Conteudo Extra</h4>
                                <ul className="list-disc list-inside">
                                    {lessons[currentLessonIndex].files?.map((file) => (
                                        <li key={file.id}><Link className="text-primary-600 hover:text-primary-500" href={file.full_url}>{file.filename}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
