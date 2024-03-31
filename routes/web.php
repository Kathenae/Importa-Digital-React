<?php

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

Route::get('/chunked-upload', [ChunkedUploadController::class, 'index']);
Route::post('/chunked-upload', [ChunkedUploadController::class, 'post']);


Route::get('/', [HomeController::class,'index'])
    ->name('home');

Route::get('/cursos', [CourseController::class, 'index'])
    ->name('courses');

Route::get('/cursos/{course}', [CourseController::class, 'show'])
    ->name('courses.show');
    
Route::get('/cursos/{course}/aula', [LessonController::class,'index'])
    ->middleware(['auth', 'allow:watch@Lesson'])
    ->name('lessons');

Route::get('/video/stream/{lesson}', [VideoStreamController::class, 'stream'])
    ->middleware(['auth', 'allow:watch@Lesson'])
    ->name('video.stream');

#region Admin dashboard
Route::get('/admin', [DashboardController::class, 'index'])
    ->middleware(['auth', 'allow:view-admin-dashboard'])
    ->name('admin');
#endregion

#region User Management
Route::get('/admin/users', [UserManageController::class, 'index'])
    ->middleware(['auth', 'allow:view@User'])
    ->name('admin.users');

Route::get('/admin/users/create', [UserManageController::class, 'create'])
    ->middleware(['auth', 'allow:create@User'])
    ->name('admin.users.create');

Route::post('/admin/users/create', [UserManageController::class, 'store'])
    ->middleware(['auth', 'allow:create@User'])
    ->name('admin.users.store');

Route::get('/admin/users/{user}/edit', [UserManageController::class, 'edit'])
    ->middleware(['auth', 'allow:edit@User'])
    ->name('admin.users.edit');

Route::post('/admin/users/{user}/edit', [UserManageController::class, 'update'])
    ->middleware(['auth', 'allow:edit@User'])
    ->name('admin.users.update');

Route::patch('/admin/users/approve', [UserManageController::class, 'approve'])
    ->middleware(['auth', 'allow:edit@User'])
    ->name('admin.users.approve');

Route::patch('/admin/users/unapprove', [UserManageController::class, 'unapprove'])
    ->middleware(['auth', 'allow:edit@User'])
    ->name('admin.users.unapprove');

Route::delete('/admin/users/{user}', [UserManageController::class, 'destroy'])
    ->middleware(['auth', 'allow:destroy@User'])
    ->name('admin.users.destroy');

Route::delete('/admin/users/', [UserManageController::class, 'destroyMany'])
    ->middleware(['auth', 'allow:destroyMany@User'])
    ->name('admin.users.destroyMany');
#endregion

#region Lesson Management
Route::get('/admin/lessons', [LessonManageController::class, 'index'])
    ->middleware(['auth', 'allow:view@Lesson'])
    ->name('admin.lessons');

Route::get('/admin/lessons/create', [LessonManageController::class, 'create'])
    ->middleware(['auth', 'allow:create@Lesson'])
    ->name('admin.lessons.create');

Route::post('/admin/lessons/create', [LessonManageController::class, 'store'])
    ->middleware(['auth', 'allow:create@Lesson'])
    ->name('admin.lessons.store');

Route::get('/admin/lessons/{lesson}/edit', [LessonManageController::class, 'edit'])
    ->middleware(['auth', 'allow:edit@Lesson'])
    ->name('admin.lessons.edit');

Route::put('/admin/lessons/{lesson}/edit', [LessonManageController::class, 'update'])
    ->middleware(['auth', 'allow:edit@Lesson'])
    ->name('admin.lessons.update');

Route::delete('/admin/lessons/{lesson}', [LessonManageController::class, 'destroy'])
    ->middleware(['auth', 'allow:destroy@Lesson'])
    ->name('admin.lessons.destroy');

Route::delete('/admin/lessons', [LessonManageController::class, 'destroyMany'])
    ->middleware(['auth', 'allow:destroyMany@Lesson'])
    ->name('admin.lessons.destroyMany');

Route::delete('/admin/lesson_files/{lessonFile}', [LessonManageController::class, 'destroyFile'])
    ->middleware(['auth', 'allow:edit@Lesson'])
    ->name('admin.lessons.destroyFile');
#endregion

#region Plan Management
Route::get('/admin/plans', [PlanManageController::class, 'index'])
    ->middleware(['auth', 'allow:view@Plan'])
    ->name('admin.plans');

Route::get('/admin/plans/create', [PlanManageController::class, 'create'])
    ->middleware(['auth', 'allow:create@Plan'])
    ->name('admin.plans.create');

Route::post('/admin/plans/create', [PlanManageController::class, 'store'])
    ->middleware(['auth', 'allow:create@Plan'])
    ->name('admin.plans.store');

Route::get('/admin/plans/{plan}/edit', [PlanManageController::class, 'edit'])
    ->middleware(['auth', 'allow:edit@Plan'])
    ->name('admin.plans.edit');

Route::post('/admin/plans/{plan}/edit', [PlanManageController::class, 'update'])
    ->middleware(['auth', 'allow:edit@Plan'])
    ->name('admin.plans.update');

Route::delete('/admin/plans/{plan}', [PlanManageController::class, 'destroy'])
    ->middleware(['auth', 'allow:destroy@Plan'])
    ->name('admin.plans.destroy');

Route::delete('/admin/plans', [PlanManageController::class, 'destroyMany'])
    ->middleware(['auth', 'allow:destroyMany@Plan'])
    ->name('admin.plans.destroyMany');
#endregion

#region Course Management
Route::get('/admin/courses', [CourseManageController::class, 'index'])
    ->middleware(['auth', 'allow:view@Course'])
    ->name('admin.courses');

Route::get('/admin/courses/create', [CourseManageController::class, 'create'])
    ->middleware(['auth', 'allow:create@Course'])
    ->name('admin.courses.create');

Route::post('/admin/courses/create', [CourseManageController::class, 'store'])
    ->middleware(['auth', 'allow:create@Course'])
    ->name('admin.courses.store');

Route::get('/admin/courses/{course}/edit', [CourseManageController::class, 'edit'])
    ->middleware(['auth', 'allow:edit@Course'])
    ->name('admin.courses.edit');

Route::post('/admin/courses/{course}/edit', [CourseManageController::class, 'update'])
    ->middleware(['auth', 'allow:edit@Course'])
    ->name('admin.courses.update');

Route::delete('/admin/courses/{course}', [CourseManageController::class, 'destroy'])
    ->middleware(['auth', 'allow:destroy@Course'])
    ->name('admin.courses.destroy');

Route::delete('/admin/courses', [CourseManageController::class, 'destroyMany'])
    ->middleware(['auth', 'allow:destroyMany@Course'])
    ->name('admin.courses.destroyMany');
#endregion

require __DIR__.'/auth.php';
