<?php

namespace App\Http\Middleware;

use App\Helpers\Popup;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use URL;

class Handle403Errors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        if($response->getStatusCode() == 403){
            $popup = Popup::error("You cannot perform this action");
            return redirect()->intended()->with($popup);
        }
        return $response;
    }
}
