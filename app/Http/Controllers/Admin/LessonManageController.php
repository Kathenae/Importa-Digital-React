<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Inertia\Inertia;

class LessonManageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Lessons', [
            'lessons' => Lesson::query()->orderBy('created_at')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/LessonCreate');
    }

    public function store()
    {
        request()->validate([
            'title' => 'required|max:255',
            'description' => 'required|min:10|max:3000',
            'video' => 'nullable|mimetypes:video/avi,video/mpeg,video/quicktime,video/mp4',
            'videoUrl' => 'requiredIf:video,null',
        ]);

        $videoUrl = request()->hasFile('video') ? request()->file('video')->store('videos') : request('videoUrl');

        Lesson::create([
            'title' => request('title'),
            'description' => request('description'),
            'videoUrl' => $videoUrl,
        ]);

        return redirect()->route('admin.lessons')->with('success', 'Lesson created.');
    }

    public function edit(Lesson $lesson)
    {
        return Inertia::render('Admin/LessonEdit', [
            'lesson' => $lesson
        ]);
    }

    public function update(Lesson $lesson)
    {
        request()->validate([
            'title' => 'required|max:255',
            'description' => 'required|min:10|max:3000',
            'video' => 'nullable|mimetypes:video/avi,video/mpeg,video/quicktime,video/mp4',
            'videoUrl' => 'requiredIf:video,null',
        ]);

        $videoUrl = request()->hasFile('video') ? request()->file('video')->store('videos') : request('videoUrl');

        $lesson->update([
            'title' => request('title'),
            'description' => request('description'),
            'videoUrl' => $videoUrl,
        ]);

        return redirect()->route('admin.lessons')->with('success', 'Lesson updated.');
    }

    public function destroy(Lesson $lesson)
    {
        $lesson->delete();

        return redirect()->route('admin.lessons')->with('success', 'Lesson deleted.');
    }

    public function destroyMany()
    {
        request()->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);

        $ids = request('ids');
        Lesson::whereIn('id', $ids)->delete();
        return redirect()->route('admin.lessons')->with('success', 'Lessons deleted.');
    }
}
