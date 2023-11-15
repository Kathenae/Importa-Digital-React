<?php

namespace App\Http\Middleware;

use App\Models\UserPermission;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class Authorize
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $action): Response
    {
        // Custom database permissions based authorization
        try {
            // Try to get the permission from cache first
            $userId = auth()->id();
            $cacheKey = "allow_user_{$userId}_to_{$action}";

            $permission = Cache::remember($cacheKey, 60, function () use ($userId, $action) {
                return UserPermission::query()
                    ->where('user_id', $userId)
                    ->where('action', $action)
                    ->first();
            });
        } catch (\Exception $e) {
            // Log the error and abort the request
            Log::error("Failed to check user permission: {$e->getMessage()}");
            abort(500, 'An error occurred while checking user permissions.');
        }

        if (!isset($permission)) {
            abort(403, 'You do not have permission to perform this action.');
        }

        return $next($request);
    }
}
