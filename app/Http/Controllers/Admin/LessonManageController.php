<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\LessonFile;
use Illuminate\Support\Facades\Storage;
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
        $this->validateRequest();
        $videoUrl = request()->hasFile('video') ? request()->file('video')->store('videos') : request('videoUrl');
        $lesson = Lesson::create([
            'title' => request('title'),
            'description' => request('description'),
            'videoUrl' => $videoUrl,
        ]);
        $this->saveLessonFiles($lesson);

        return redirect()->route('admin.lessons.edit', $lesson->id)->with('success', 'Lesson created.');
    }

    public function edit(Lesson $lesson)
    {
        return Inertia::render('Admin/LessonEdit', [
            'lesson' => $lesson->load('files')
        ]);
    }

    public function update(Lesson $lesson)
    {
        $this->validateRequest();
        $data = [
            'title' => request('title'),
            'description' => request('description'),
        ];
        
        if(request()->hasFile('video')){
            $data['videoUrl'] =  request()->file('video')->store('videos');
        }
        
        $lesson->update($data);
        $this->saveLessonFiles($lesson);
        
        return redirect()->back();
    }
    
    private function validateRequest()
    {
        request()->validate([
            'title' => 'required|max:255',
            'description' => 'required|min:10|max:3000',
            'video' => request()->isMethod('POST')? 'required' : 'nullable' . '|mimetypes:video/avi,video/mpeg,video/quicktime,video/mp4',
            'lesson_files' => 'nullable|array',
            'lesson_files.*' => 'file|mimes:pdf,png,docx,jpg,mp4'
        ]);
    }
    
    private function saveLessonFiles(Lesson $lesson)
    {
        $uploadedFiles = request('lesson_files');
        if(!isset($uploadedFiles)){
            return;
        }
        
        $lessonFiles = [];
        foreach($uploadedFiles as $file){
            $path = $file->storePublicly('public');
            $lessonFiles[] = [
                'lesson_id' => $lesson->id,
                'filename' => $file->getClientOriginalName(),
                'path' => $path
            ];
        }
        
        LessonFile::query()->insert($lessonFiles);
    }

    public function destroy(Lesson $lesson)
    {
        $lesson->delete();

        return redirect()->route('admin.lessons')->with('success', 'Lesson deleted.');
    }
    
    public function destroyFile(LessonFile $lessonFile){
        $lessonFile->delete();
        return redirect()->back();
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
