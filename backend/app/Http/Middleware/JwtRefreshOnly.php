<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;

class JwtRefreshOnly
{
    public function handle($request, Closure $next)
    {
        try {
            // dont auth, only ensure that the token exists.
            JWTAuth::parseToken();
        } catch (TokenExpiredException $e) {
            // expired token its OK for refreshing.
            return $next($request);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token missing or invalid'], 401);
        }

        // if token is NOT expired, also allow (refresh-before-expiration)
        return $next($request);
    }
}
