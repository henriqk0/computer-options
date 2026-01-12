<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = Auth::login($user);

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => Auth::user(),
        ]);
    }

    public function refresh()
    {
        try {
            $newToken = auth()->refresh();
            return response()->json([
                'status' => 'success',
                'token' => $newToken,
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }

    public function logout()
    {
        Auth::logout(); // add token to blacklist
        return response()->json(['message' => 'Deslogado com sucesso']);
    }

    public function user()
    {
        return response()->json(Auth::user());
    }

    public function listUsers(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 8);
            $perPage = min($perPage, 80); # limit
            $comps = User::paginate($perPage);

            return response()->json($comps, 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao listar os usuários ",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function patchRole(Request $request, $id)
    {
        try {
            $user = User::find($id);
            $validated = $request->validate(['role' => 'required|string|in:admin,editor,user']);

            $user->update([
                'role' => $validated['role']
            ]);

            return response()->json([
                "message" => "Papel do usuário foi alterado com sucesso",
                "data" => $user
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao alterar o papel do usuário",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteUser($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(["message" => "Usuário não encontrado"], 404);
            }

            $user->delete();

            return response()->json([
                'message' => "Usuário deletado com sucesso.",
                'data' => $user
            ], 200);


        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao deletar o usuário",
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
