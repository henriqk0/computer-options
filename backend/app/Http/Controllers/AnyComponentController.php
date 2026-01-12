<?php

namespace App\Http\Controllers;

use Exception;
use DB;
use Illuminate\Http\Request;
use App\Models\AnyComponent;
use App\Models\Review;

class AnyComponentController extends Controller
{
    public function listAnyComponent(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 8);
            $perPage = min($perPage, 80); # limit

            $search = $request->string('search')->trim();

            $comps = AnyComponent::query()
                ->when($search, function ($query, $search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('nameComponent', 'like', "%{$search}%");
                    });
                })
                ->paginate($perPage);

            return response()->json($comps, 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao listar os componentes",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function searchAnyComponent(Request $request, string $toSearch)
    {
        try {
            $query = AnyComponent::where('nameComponent', 'LIKE', "%{$toSearch}%");

            ($request->has('all') && $request->boolean('all')) ?
                $comps = $query->get()
                :
                $comps = $query->take(10)->get();

            return response()->json($comps, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao buscar componentes",
                'error' => $e->getMessage()
            ]);
        }
    }

    public function displayFeatured()
    {
        // display first top 3
        try {
            $m = 20;
            $C = Review::avg('rating');

            // base query with aliases
            $base = AnyComponent::query()
                ->withCount('relatedReviews')
                ->withAvg('relatedReviews', 'rating');

            // extern subquery
            $comps = DB::query()
                ->fromSub($base, 'x')
                ->select('x.*')
                ->selectRaw("
                    (
                        (related_reviews_count / (related_reviews_count + :m1)) * related_reviews_avg_rating
                        +
                        (:m2 / (related_reviews_count + :m3)) * :C
                    ) as weighted_rating
                ", [
                    'm1' => $m,
                    'm2' => $m,
                    'm3' => $m,
                    'C' => $C,
                ])
                ->orderByDesc('weighted_rating')
                ->limit(3)
                ->get();

            return response()->json($comps, 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao buscar melhores componentes",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function createAnyComponent(Request $request)
    {
        try {
            $request->validate(
                [
                    'nameComponent' => ['required', 'string', 'max:50'],
                    'categoryLevel' => ['required', 'string', 'max:15'],
                    'bestPrice' => ['required', 'numeric', 'between:0,99999999.99'],
                    'urlPrice' => ['nullable', 'string', 'max:170', 'url'],
                    'datePrice' => ['required', 'date'],
                    'about' => ['nullable', 'string', 'max:600'],
                ]
            );

            $anyComponent = AnyComponent::create($request->all());

            return response()->json([
                'message' => 'Componente cadastrado com sucesso',
                'data' => $anyComponent
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao cadastar o componente",
                'error' => $e->getMessage()
            ], 500);
        }

    }
    public function updateAnyComponent(Request $request)
    {
        $id = $request->input('anycomponent_id');

        if (empty($id)) {
            return response()->json(["message" => "ID do componente não fornecido"], 400);
        }

        try {
            $anyComponent = AnyComponent::find($id);

            if (!$anyComponent) {
                return response()->json(["message" => "Componente não encontrado"], 404);
            }

            $validatedData = $request->validate(
                [
                    'nameComponent' => ['required', 'string', 'max:50'],
                    'categoryLevel' => ['required', 'string', 'max:15'],
                    'bestPrice' => ['required', 'numeric', 'between:0,99999999.99'],
                    'urlPrice' => ['nullable', 'string', 'max:170', 'url'],
                    'datePrice' => ['required', 'date'],
                    'about' => ['nullable', 'string', 'max:600'],
                ]
            );

            $anyComponent->update($validatedData);

            return response()->json([
                'message' => 'Componente atualizado com sucesso',
                'data' => $anyComponent
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao editar o componente",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteAnyComponent($id)
    {
        try {
            $anyComponent = AnyComponent::find($id);

            if (!$anyComponent) {
                return response()->json(["message" => "Componente não encontrado"], 404);
            }

            $anyComponent->delete();

            return response()->json([
                'message' => "Componente deletado com sucesso.",
                'data' => $anyComponent
            ], 200);


        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao deletar o componente",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function showAnyComponent($id)
    {
        try {
            $anyComponent = AnyComponent::find($id);
            $total = $anyComponent->relatedReviews()->count();
            $avg = $anyComponent->relatedReviews()->avg('rating');

            if (!$anyComponent) {
                return response()->json(["message" => "Componente não encontrado"], 404);
            }

            return response()->json([
                'data' => $anyComponent,
                'total' => $total,
                'avgRating' => round($avg, 1)
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao buscar o componente",
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
