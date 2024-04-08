<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CourseManageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Courses', [
            'courses' => Course::query()
                ->with('lessons')
                ->orderBy('created_at')
                ->get()
        ]);
    }
    
    public function create()
    {
        return Inertia::render('Admin/CourseCreate', [
        ]);
    }
    
    public function store()
    {
        $data = $this->validatedWithFiles();
        Course::query()->create($data);
        return redirect()->route('admin.courses')->with('flash.success', 'Curso creado exitosamente.');
    }

    public function edit(Course $course)
    {
        return Inertia::render('Admin/CourseEdit', [
            'course' => $course->load('subjects'),
        ]);
    }

    public function update(Course $course)
    {
        $data = $this->validatedWithFiles($course);
        $course->update($data);
        return redirect()->route('admin.courses')->with('flash.success', 'Curso actualizado exitosamente.');
    }

    private function validatedWithFiles(Course $course = null){
        $validated = request()->validate([
            'name' => $course == null? 'required|' : 'nullable|' . 'string|max:255',
            'description' => $course == null? 'required|' : 'nullable|' . 'string|max:255',
            'type' => $course == null? 'required|' : 'nullable|' . 'string|max:100',
            'schedule' => $course == null? 'required|' : 'nullable|' . 'string|max:255',
            'duration_years' => $course == null? 'required|' : 'nullable|' . 'numeric',
            'headquarters' => $course == null? 'required|' : 'nullable|' . 'string|max:500',
            'candidate_profile' => $course == null? 'required|' : 'nullable|' . 'string',
            'cover_url' => $course == null? 'required|' : 'nullable|' . 'file',
            'banner_url' => $course == null? 'required|' : 'nullable|' . 'file',
            'video_url' => $course == null? 'required|' : 'nullable|' . 'file',
        ]);

        $validated['name'] = request()->has('name')? request('name') : $course->name;
        $validated['description'] = request()->has('description')? request('description') : $course->description;
        $validated['type'] = request()->has('type')? request('type') : $course->type;
        $validated['schedule'] = request()->has('schedule')? request('schedule') : $course->schedule;
        $validated['duration_years'] = request()->has('duration_years')? request('duration_years') : $course->duration_years;
        $validated['headquarters'] = request()->has('headquarters')? request('headquarters') : $course->headquarters;
        $validated['candidate_profile'] = request()->has('candidate_profile')? request('candidate_profile') : $course->candidate_profile;
        $validated['candidate_profile'] = request()->has('candidate_profile')? request('candidate_profile') : $course->candidate_profile;
        $validated['cover_url'] = request()->hasFile('cover_url')?  Storage::url(request()->file('cover_url')->store('public')) : $course->cover_url;
        $validated['banner_url']  = request()->hasFile('banner_url')? Storage::url(request()->file('banner_url')->store('public')) : $course->banner_url;
        $validated['video_url'] = request()->hasFile('video_url')? Storage::url(request()->file('video_url')->store('public')) : $course->video_url;

        return $validated;
    }

    public function createSubject(Course $course){
        $data = request()->validate([
            'name' => 'required|string|max:255',
            'year' => 'required|numeric',
        ]);
        $data['course_id'] = $course->id;
        Subject::create($data);
        return redirect()->route('admin.courses.edit', $course->id)->with('flash.success', 'Topico adicionado com successo');
    }

    public function destroySubject(Course $course){
        request()->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);

        $ids = request('ids');
        Subject::whereIn('id', $ids)->delete();
        return redirect()->route('admin.courses.edit', $course->id)->with('flash.success', 'El topico ha sido eliminado.');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('admin.courses')->with('flash.success', 'El curso ha sido eliminado.');
    }

    public function destroyMany()
    {
        request()->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);

        $ids = request('ids');
        Course::whereIn('id', $ids)->delete();
        return redirect()->route('admin.courses')->with('flash.success', 'Todos los cursos seleccionados han sido eliminados.');
    }
}
