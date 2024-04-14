<?php

use App\Enums\Permit;
use App\Http\Controllers\Admin\CourseManageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LessonManageController;
use App\Http\Controllers\Admin\UserManageController;
use App\Http\Controllers\Admin\PlanManageController;
use App\Http\Controllers\ChunkedUploadController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\VideoStreamController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class,'index'])
    ->name('home');

Route::post('/contact', [HomeController::class, 'contact'])
    ->name('contact');

Route::get('/cursos', [CourseController::class, 'index'])
    ->name('courses');

Route::post('/cursos/inscribir', [CourseController::class, 'subscribe'])
    ->name('courses.subscribe');

Route::get('/cursos/aulas', [LessonController::class,'index'])
    ->middleware(['auth', 'can:' . Permit::VIEW_LESSON])
    ->name('courses.lessons');

Route::get('/cursos/{course}', [CourseController::class, 'show'])
    ->name('courses.show');

Route::get('/video/stream/{lesson}', [VideoStreamController::class, 'stream'])
    ->middleware(['auth', 'can:' . Permit::VIEW_LESSON])
    ->name('video.stream');

    Route::get('/chunked-upload', [ChunkedUploadController::class, 'index']);
    Route::post('/chunked-upload', [ChunkedUploadController::class, 'post']);

#region Admin dashboard
Route::get('/admin', [DashboardController::class, 'index'])
    ->middleware(['auth', 'can:' . Permit::VIEW_ADMIN_DASHBOARD])
    ->name('admin');
#endregion

#region User Management
Route::get('/admin/users', [UserManageController::class, 'index'])
    ->middleware(['auth', 'can:' . Permit::VIEW_USER])
    ->name('admin.users');

Route::get('/admin/users/create', [UserManageController::class, 'create'])
    ->middleware(['auth', 'can:' . Permit::CREATE_USER])
    ->name('admin.users.create');

Route::post('/admin/users/create', [UserManageController::class, 'store'])
    ->middleware(['auth', 'can:' . Permit::CREATE_USER])
    ->name('admin.users.store');

Route::get('/admin/users/{user}/edit', [UserManageController::class, 'edit'])
    ->middleware(['auth', 'can:' . Permit::EDIT_USER])
    ->name('admin.users.edit');

Route::post('/admin/users/{user}/edit', [UserManageController::class, 'update'])
    ->middleware(['auth', 'can:' . Permit::EDIT_USER])
    ->name('admin.users.update');

Route::patch('/admin/users/approve', [UserManageController::class, 'approve'])
    ->middleware(['auth', 'can:' . Permit::EDIT_USER])
    ->name('admin.users.approve');

Route::patch('/admin/users/unapprove', [UserManageController::class, 'unapprove'])
    ->middleware(['auth', 'can:' . Permit::EDIT_USER])
    ->name('admin.users.unapprove');

Route::delete('/admin/users/{user}', [UserManageController::class, 'destroy'])
    ->middleware(['auth', 'can:' . Permit::DESTROY_USER])
    ->name('admin.users.destroy');

Route::delete('/admin/users/', [UserManageController::class, 'destroyMany'])
    ->middleware(['auth', 'can:' . Permit::DESTROY_MANY_USER])
    ->name('admin.users.destroyMany');
#endregion

#region Lesson Management
Route::get('/admin/lessons', [LessonManageController::class, 'index'])
    ->middleware(['auth', 'can:' . Permit::VIEW_LESSON])
    ->name('admin.lessons');

Route::get('/admin/lessons/create', [LessonManageController::class, 'create'])
    ->middleware(['auth', 'can:' . Permit::CREATE_LESSON])
    ->name('admin.lessons.create');

Route::post('/admin/lessons/create', [LessonManageController::class, 'store'])
    ->middleware(['auth', 'can:' . Permit::CREATE_LESSON])
    ->name('admin.lessons.store');

Route::get('/admin/lessons/{lesson}/edit', [LessonManageController::class, 'edit'])
    ->middleware(['auth', 'can:' . Permit::EDIT_LESSON])
    ->name('admin.lessons.edit');

Route::put('/admin/lessons/{lesson}/edit', [LessonManageController::class, 'update'])
    ->middleware(['auth', 'can:' . Permit::EDIT_LESSON])
    ->name('admin.lessons.update');

Route::delete('/admin/lessons/{lesson}', [LessonManageController::class, 'destroy'])
    ->middleware(['auth', 'can:' . Permit::DESTROY_LESSON])
    ->name('admin.lessons.destroy');

Route::delete('/admin/lessons', [LessonManageController::class, 'destroyMany'])
    ->middleware(['auth', 'can:' . Permit::DESTROY_MANY_LESSON])
    ->name('admin.lessons.destroyMany');

Route::delete('/admin/lesson_files/{lessonFile}', [LessonManageController::class, 'destroyFile'])
    ->middleware(['auth', 'can:' . Permit::EDIT_LESSON])
    ->name('admin.lessons.destroyFile');
#endregion

#region Plan Management
Route::get('/admin/plans', [PlanManageController::class, 'index'])
    ->middleware(['auth', 'can:' . Permit::VIEW_PLAN])
    ->name('admin.plans');

Route::get('/admin/plans/create', [PlanManageController::class, 'create'])
    ->middleware(['auth', 'can:' . Permit::CREATE_PLAN])
    ->name('admin.plans.create');

Route::post('/admin/plans/create', [PlanManageController::class, 'store'])
    ->middleware(['auth', 'can:' . Permit::CREATE_PLAN])
    ->name('admin.plans.store');

Route::get('/admin/plans/{plan}/edit', [PlanManageController::class, 'edit'])
    ->middleware(['auth', 'can:' . Permit::EDIT_PLAN])
    ->name('admin.plans.edit');

Route::post('/admin/plans/{plan}/edit', [PlanManageController::class, 'update'])
    ->middleware(['auth', 'can:' . Permit::EDIT_PLAN])
    ->name('admin.plans.update');

Route::delete('/admin/plans/{plan}', [PlanManageController::class, 'destroy'])
    ->middleware(['auth', 'can:' . Permit::DESTROY_PLAN])
    ->name('admin.plans.destroy');

Route::delete('/admin/plans', [PlanManageController::class, 'destroyMany'])
    ->middleware(['auth', 'can:' . Permit::DESTROY_MANY_PLAN])
    ->name('admin.plans.destroyMany');
#endregion

#region Course Management
Route::get('/admin/courses', [CourseManageController::class, 'index'])
    ->middleware(['auth', 'can:' . Permit::VIEW_COURSE])
    ->name('admin.courses');

Route::get('/admin/courses/create', [CourseManageController::class, 'create'])
    ->middleware(['auth', 'can:' . Permit::CREATE_COURSE])
    ->name('admin.courses.create');

Route::post('/admin/courses/create', [CourseManageController::class, 'store'])
    ->middleware(['auth', 'can:' . Permit::CREATE_COURSE])
    ->name('admin.courses.store');

Route::get('/admin/courses/{course}/edit', [CourseManageController::class, 'edit'])
    ->middleware(['auth', 'can:' . Permit::EDIT_COURSE])
    ->name('admin.courses.edit');

Route::post('/admin/courses/{course}/edit', [CourseManageController::class, 'update'])
    ->middleware(['auth', 'can:' . Permit::EDIT_COURSE])
    ->name('admin.courses.update');

Route::post('admin/courses/{course}/subject', [CourseManageController::class, 'createSubject'])
    ->middleware(['auth', 'can:' . Permit::EDIT_COURSE])
    ->name('admin.courses.createSubject');

Route::delete('admin/courses/{course}/subject', [CourseManageController::class, 'destroySubject'])
    ->middleware(['auth', 'can:' . Permit::EDIT_COURSE])
    ->name('admin.courses.destroySubject');

Route::delete('/admin/courses/{course}', [CourseManageController::class, 'destroy'])
    ->middleware(['auth', 'can:' . Permit::DESTROY_COURSE])
    ->name('admin.courses.destroy');

Route::delete('/admin/courses', [CourseManageController::class, 'destroyMany'])
    ->middleware(['auth', 'can:' . Permit::DESTROY_MANY_COURSE])
    ->name('admin.courses.destroyMany');
#endregion

require __DIR__.'/auth.php';
