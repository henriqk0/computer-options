<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReviewController extends Controller
{
    public function createReview(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'user_id' => [
                    'required',
                    'exists:users,id',
                    Rule::unique('reviews')->where(function ($query) use ($request) {
                        return $query->where('anycomponent_id', $request->anycomponent_id);
                    }),
                ],
                'anycomponent_id' => 'required|exists:tbl_anycomponent,anycomponent_id',
                'rating' => 'required|integer|min:0|max:10',
            ]);

            $review = Review::create($request->all());

            return response()->json([
                'message' => 'Review criada com sucesso',
                'data' => $review,
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao registrar a review',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateReview(Request $request)
    {
        $id = $request->input('review_id');

        if (empty($id)) {
            return response()->json(["message" => "ID do Review não fornecido"], 400);
        }

        try {
            $review = Review::find($id);

            if ($review && $review->user_id !== auth()->id()) {
                return response()->json(["message" => "Acesso negado"], 403);
            }

            if (!$review) {
                return response()->json(["message" => "Review não encontrada"], 404);
            }

            $validatedData = $request->validate(
                [
                    'title' => 'required|string|max:255',
                    'content' => 'required|string',
                    'user_id' => [
                        'required',
                        'exists:users,id',
                        Rule::unique('reviews')
                            ->where(fn($query) => $query->where('anycomponent_id', $request->anycomponent_id))
                            ->ignore($review->id)
                    ],
                    'anycomponent_id' => 'required|exists:tbl_anycomponent,anycomponent_id',
                    'rating' => 'required|integer|min:0|max:10',
                ]
            );

            $review->update($validatedData);

            return response()->json([
                'message' => 'Review atualizada com sucesso',
                'data' => $review
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao editar a review",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteReview($id)
    {
        try {
            $review = Review::find($id);

            if ($review && $review->user_id !== auth()->id()) {
                return response()->json(["message" => "Acesso negado"], 403);
            }

            if (!$review) {
                return response()->json(["message" => "Review não encontrada"], 404);
            }

            $review->delete();

            return response()->json([
                'message' => "Review deletada com sucesso.",
                'data' => $review
            ], 200);


        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao deletar a review",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function showReview($id)
    {
        try {
            $review = Review::find($id);

            if (!$review) {
                return response()->json(["message" => "Review não encontrada"], 404);
            }

            return response()->json([
                'data' => $review,
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao buscar a review",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // the best reviews from a component
    public function listBestReview($componentId)
    {
        try {
            $reviews = Review::where('anycomponent_id', $componentId)->with('user:id,name')->take(3)->get();
            return response()->json($reviews, 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao listar as reviews",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // all reviews from a component
    public function listAllReview($componentId)
    {
        try {
            $reviews = Review::where('anycomponent_id', $componentId)->with('user:id,name')->get();
            // before ->get(), if add a comment attr and you want to see the avg review rating:
            //  ->withCount('comment')
            //  ->withAvg('comment', 'rating')

            return response()->json($reviews, 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao listar as reviews",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function listMyReview()
    {
        try {
            $reviews = Review::where('user_id', auth()->id())->with('anycomponent:anycomponent_id,nameComponent')->cursorPaginate(10);
            return response()->json($reviews, 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao listar as reviews",
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
