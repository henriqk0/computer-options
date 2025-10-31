<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Models\AnyComponent;

class AnyComponentController extends Controller
{
    public function listAnyComponent()
    {
        try {
            $comps = AnyComponent::all();
            return response()->json($comps, 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erro ao listar os componentes",
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
}
