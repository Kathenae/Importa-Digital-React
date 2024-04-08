<?php

namespace App\Http\Controllers;

use App\Mail\SubscritionRequest;
use App\Models\Course;
use Inertia\Inertia;

class CourseController extends Controller
{

   public function index()
   {
      return Inertia::render('Courses', [
         'courses' => Course::all()->loadCount('lessons')
      ]);
   }

   public function show(Course $course)
   {
      return Inertia::render('CourseDetail', [
         'course' => $course->load('subjects')
      ]);
   }

   public function subscribe()
   {
      $data = request()->validate([
         'name' => 'required|string|max:255',
         'email' => 'required|email',
         'phone_number' => 'required|string',
         'course' => 'required|exists:courses,id'
      ]);

      // send email to admin with form data
      \Mail::to(env('MAIL_ADMIN_ADDRESS'))->send(new SubscritionRequest([
            'name' => request('name'),
            'phone_number' => request('phone_number'),
            'email' => request('email'),
            'course_name' => Course::find(request('course'))->name,
         ]));

      return redirect()->back()->with([
         'popup.type' => 'alert',
         'popup.message' => '¡Su solicitud ha sido enviada exitosamente!',
         'popup.variant' => 'success'
      ]);
   }
}