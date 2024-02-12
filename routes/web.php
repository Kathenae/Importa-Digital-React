<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LessonManageController;
use App\Http\Controllers\Admin\UserManageController;
use App\Http\Controllers\ChunkedUploadController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VideoStreamController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/leciones', [LessonController::class,'index'])
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

Route::post('/admin/lessons/{lesson}/edit', [LessonManageController::class, 'update'])
    ->middleware(['auth', 'allow:edit@Lesson'])
    ->name('admin.lessons.update');

Route::delete('/admin/lessons/{lesson}', [LessonManageController::class, 'destroy'])
    ->middleware(['auth', 'allow:destroy@Lesson'])
    ->name('admin.lessons.destroy');

Route::delete('/admin/lessons', [LessonManageController::class, 'destroyMany'])
    ->middleware(['auth', 'allow:destroyMany@Lesson'])
    ->name('admin.lessons.destroyMany');
#endregion

require __DIR__.'/auth.php';
