<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = request()->user();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('flash.success'),
                'error' => fn() => $request->session()->get('flash.error'),
                'warning' => fn() => $request->session()->get('flash.warning'),
            ],
            'popup' => [
                'message' => fn() => $request->session()->get('popup.message'),
                'type' => fn() => $request->session()->get('popup.type'),
                'variant' => fn() => $request->session()->get('popup.variant'),
            ]
        ];
    }
}
