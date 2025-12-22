<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class JwtAutoRefresh
{
    public function handle($request, Closure $next)
    {
        try {
            // try authenticating the token
            JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {

            // token expired, then to refresh
            try {
                $newToken = JWTAuth::refresh(JWTAuth::getToken());

                // continue request and attach the new token to the response
                return $next($request)
                    ->header('Authorization', 'Bearer ' . $newToken);

            } catch (\Exception $e) {
                return response()->json(['message' => 'Token cannot be refreshed'], 401);
            }

        } catch (TokenInvalidException $e) {
            return response()->json(['message' => 'Invalid token'], 401);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token missing'], 401);
        }

        return $next($request);
    }
}
