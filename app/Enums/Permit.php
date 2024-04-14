<?php

namespace App\Enums;

class Permit
{
    // User CRUD Permissions
    const VIEW_USER = 'view@User';
    const CREATE_USER = 'create@User';
    const EDIT_USER = 'edit@User';
    const DESTROY_USER = 'destroy@User';
    const DESTROY_MANY_USER = 'destroyMany@User';

    // Lesson CRUD Permissions
    const VIEW_LESSON = 'view@Lesson';
    const CREATE_LESSON = 'create@Lesson';
    const EDIT_LESSON = 'edit@Lesson';
    const DESTROY_LESSON = 'destroy@Lesson';
    const DESTROY_MANY_LESSON = 'destroyMany@Lesson';

    // Course CRUD Permissions
    const VIEW_COURSE = 'view@Course';
    const CREATE_COURSE = 'create@Course';
    const EDIT_COURSE = 'edit@Course';
    const DESTROY_COURSE = 'destroy@Course';
    const DESTROY_MANY_COURSE = 'destroyMany@Course';

    // Plan CRUD Permissions
    const VIEW_PLAN = 'view@Plan';
    const CREATE_PLAN = 'create@Plan';
    const EDIT_PLAN = 'edit@Plan';
    const DESTROY_PLAN = 'destroy@Plan';
    const DESTROY_MANY_PLAN = 'destroyMany@Plan';

    // Additional Permissions
    const VIEW_ADMIN_DASHBOARD = 'view@AdminDashboard';
}
