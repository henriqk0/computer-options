<?php

namespace Database\Seeders;

use App\Models\AnyComponent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnyComponentSeeder extends Seeder
{
    public function run(): void
    {
        $anyComponents = json_decode(file_get_contents(database_path('data/anycomponents.json')), true);
        AnyComponent::insert($anyComponents);
    }
}
