<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index()
    {
        return $this->show_lesson(0);
    }

    public function show(int $lesson)
    {
        return $this->show_lesson($lesson);
    }

    private function show_lesson(int $lesson)
    {
        if(request()->user()->plan == null)
        {
            return redirect()->route('home')->with('error', 'No plan');
        }
        
        $lessons = request()->user()->plan->lessons;

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
