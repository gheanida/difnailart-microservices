<?php

namespace Database\Seeders;

use App\Models\NailArtService;
use Illuminate\Database\Seeder;

class NailArtServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Basic Manicure',
                'description' => 'Pembersihan, pemotongan, dan pewarnaan kuku dasar',
                'price' => 75000,
                'duration_minutes' => 45,
            ],
            [
                'name' => 'Gel Nail Polish',
                'description' => 'Poles kuku gel dengan tahan lama',
                'price' => 150000,
                'duration_minutes' => 60,
            ],
            [
                'name' => 'Nail Art Design',
                'description' => 'Desain nail art dengan pola kreatif',
                'price' => 200000,
                'duration_minutes' => 90,
            ],
            [
                'name' => 'Acrylic Nails',
                'description' => 'Pemasangan kuku akrilik dengan berbagai bentuk',
                'price' => 250000,
                'duration_minutes' => 120,
            ],
            [
                'name' => 'Nail Extension',
                'description' => 'Ekstensi kuku dengan berbagai pilihan bahan',
                'price' => 300000,
                'duration_minutes' => 150,
            ],
        ];

        foreach ($services as $service) {
            NailArtService::create($service);
        }
    }
}