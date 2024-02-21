<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanManageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Plans', [
            'plans' => Plan::query()
                ->with('lessons')
                ->orderBy('created_at')
                ->get()
        ]);
    }
    
    public function create()
    {
        return Inertia::render('Admin/PlanCreate', [
            'lessons' => Lesson::query()->orderBy('created_at')->get()
        ]);
    }
    
    public function store()
    {
        request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
            'lessons' => 'required|array',
            'lessons.*' => 'exists:lessons,id'
        ]);
        
        $plan = Plan::query()->create([
            'name' => request('name'),
            'description' => request('description')
        ]);
        
        $plan->lessons()->sync(request('lessons'));
        return redirect()->route('admin.plans')->with('success', 'Plan created successfully');
    }
    
    public function edit(Plan $plan)
    {
        return Inertia::render('Admin/PlanEdit', [
            'plan' => $plan->load('lessons'),
            'lessons' => Lesson::query()->orderBy('created_at')->get(),
        ]);
    }
    
    public function update(Plan $plan)
    {
        request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
            'lessons' => 'required|array',
            'lessons.*' => 'exists:lessons,id'
        ]);
        
        $plan->update([
            'name' => request('name'),
            'description' => request('description')
        ]);
        
        $plan->lessons()->sync(request('lessons'));
        return redirect()->route('admin.plans')->with('success', 'Plan updated successfully');
    }
    
    public function destroy(Plan $plan)
    {
        $plan->delete();
        return redirect()->route('admin.lessons')->with('success', 'Plan deleted.');
    }
    
    public function destroyMany()
    {
        request()->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);

        $ids = request('ids');
        Plan::whereIn('id', $ids)->delete();
        return redirect()->route('admin.plans')->with('success', 'Plans deleted.');
    }
}
