<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
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
            'lessons' => Lesson::query()->orderBy('created_at')->get(),
        ]);
    }
    
    public function store()
    {
        request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
        ]);
        
        $course = Course::query()->create([
            'name' => request('name'),
            'description' => request('description')
        ]);
        
        return redirect()->route('admin.courses')->with('flash.success', 'Curso creado exitosamente.');
    }
    
    public function edit(Course $course)
    {
        return Inertia::render('Admin/CourseEdit', [
            'course' => $course->load('lessons'),
            'lessons' => Lesson::query()->orderBy('created_at')->get(),
        ]);
    }
    
    public function update(Course $course)
    {
        request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
        ]);
        
        $course->update([
            'name' => request('name'),
            'description' => request('description')
        ]);
        
        return redirect()->route('admin.courses')->with('flash.success', 'Curso actualizado exitosamente.');
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
