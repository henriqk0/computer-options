<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role)
    {
        $user = $request->user();

        $hierarchyMapper = [
            'user' => 1,
            'editor' => 2,
            'admin' => 3,
        ];

        if ($hierarchyMapper[$user->role->value] < $hierarchyMapper[$role]) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}
