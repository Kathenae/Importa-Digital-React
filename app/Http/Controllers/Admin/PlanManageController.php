<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanManageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Plans', [
            'plans' => Plan::query()
                ->orderBy('created_at')
                ->get()
        ]);
    }
    
    public function create()
    {
        return Inertia::render('Admin/PlanCreate', [
            'users' => User::query()->orderBy('created_at')->get()
        ]);
    }
    
    public function store()
    {
        request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
        ]);
        
        $plan = Plan::query()->create([
            'name' => request('name'),
            'description' => request('description'),
            'subscribers' => 'required|array',
            'subscribers.*' => 'exists:users,id',
        ]);
        $plan->syncSubscribers(request('subscribers'));
        return redirect()->route('admin.plans')->with('flash.success', 'Plan de suscripción creado exitosamente.');
    }
    
    public function edit(Plan $plan)
    {
        return Inertia::render('Admin/PlanEdit', [
            'plan' => $plan->load('subscribers'),
            'users' => User::query()->orderBy('created_at')->get(),
        ]);
    }
    
    public function update(Plan $plan)
    {
        request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
            'subscribers' => 'required|array',
            'subscribers.*' => 'exists:users,id',
        ]);
        
        $plan->update([
            'name' => request('name'),
            'description' => request('description')
        ]);
        $plan->syncSubscribers(request('subscribers'));
        return redirect()->route('admin.plans')->with('flash.success', 'Plan de suscripción actualizado exitosamente.');
    }
    
    public function destroy(Plan $plan)
    {
        $plan->delete();
        return redirect()->route('admin.lessons')->with('flash.success', 'Plan de suscripción eliminado exitosamente.');
    }
    
    public function destroyMany()
    {
        request()->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);

        $ids = request('ids');
        Plan::whereIn('id', $ids)->delete();
        return redirect()->route('admin.plans')->with('flash.success', 'Todos los planes de suscripción seleccionados han sido eliminados.');
    }
}
