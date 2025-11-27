<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LikeController extends Controller
{
    public function like(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'review_id' => [
                    'required',
                    'exists:reviews,id',
                    Rule::unique('likes')->where(
                        fn ($q) =>
                        $q->where('user_id', request('user_id'))
                    ),
                ],
            ]);

            $like = Like::create($request->all());

            return response()->json([
                'message' => 'Like dado com sucesso',
                'data' => $like,
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao dar like na review',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function undolike($id)
    {
        try {
            $like = Like::find($id);

            if ($like && $like->user_id !== auth()->id()) {
                return response()->json(["message" => "Acesso negado"], 403);
            }

            if (!$like) {
                return response()->json(["message" => "Like não encontrado"], 404);
            }

            $like->delete();

            return response()->json([
                'message' => "Like deletada com sucesso.",
                'data' => $like
            ], 200);


        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao remover o like",
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
