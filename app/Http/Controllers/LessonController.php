<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index(Course $course)
    {
        return $this->show_lesson($course, 0);
    }

    public function show(Course $course, int $lesson)
    {
        return $this->show_lesson($course, $lesson);
    }

    private function show_lesson(Course $course, int $lesson)
    {
        $user = request()->user();
        
        if($course->students()->where('user_id', $user->id)->exists() == false){
            return redirect()->route('courses')->with([
                'popup.type' => 'alert',
                'popup.message' => 'Parece que no estás suscrito a este curso, por favor contáctanos si deseas hacerlo',
                'popup.variant' => 'info'
            ]);
        }
        
        $lessons = $course->lessons->load('files');

        $lesson -= 1; # Since we want lecture 1 to refer to the first element of the array

        # Clamp index
        if ($lesson < 0) {
            $lesson = 0;
        } else if ($lesson >= count($lessons)) {
            $lesson = count($lessons) - 1;
        }

        if (count($lessons) > 0) {
            $currentLesson = $lessons[$lesson];
        } else {
            $currentLesson = null;
        }

        return Inertia::render('Lesson', [
            'lessons' => $lessons,
            'currentLesson' => $currentLesson
        ]);
    }
}
