<?php

namespace App\Http\Controllers;
use App\Models\Course;
use Inertia\Inertia;

class CourseController extends Controller {
   
   public function index(){
      return Inertia::render('Courses', [
         'courses' => Course::all()->loadCount('lessons')
      ]);
   }

   public function show(int $course){
      return Inertia::render('CourseDetail', [
         'course' => $course
      ]);
   }
}