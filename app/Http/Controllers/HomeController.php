<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render("Home", [
            'courses' => Course::select(['id', 'name'])->get(),
        ]);
    }

    public function contact()
    {
        $data = request()->validate([
            'name' => 'required|max:255',
            'email' => 'required|email',
            'message' => 'required|max:600'
        ]);

        \Mail::to(env('MAIL_ADMIN_ADDRESS'))->send(
            (new ContactMail($data))
                ->replyTo(request('email'))
        );

        return redirect()->back()->with([
            'popup.type' => 'alert',
            'popup.message' => 'Su mensaje ha sido enviado.',
            'popup.variant' => 'info'
        ]);
    }
}
