<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        Course::factory()->afterCreating(function($course, $faker) {
            $lessons = Lesson::factory(rand(1, 10))->create();
            $course->lessons()->attach($lessons);
        })->createMany([
            [
                "name" => "técnico superior en electromecánica",
                "type" => "tecnicatura",
                "cover_url" => "/capa-1.png",
            ],
            [
                "name" => "Técnico Superior electricista en redes y lineas de distribución",
                "type" => "tecnicatura",
                "cover_url" => "/capa-2.png",
            ],
            [
                "name" => "Técnico superior seguridad laboral y salud ocupacional",
                "type" => "tecnicatura",
                "cover_url" => "/capa-3.png",
            ],
            [
                "name" => "Curso gestión de contratos de la ande",
                "type" => "capacitacione",
                "cover_url" => "/capa-4.png",
            ],
            [
                "name" => "Capacitación electricista de distribución mt/bt",
                "type" => "capacitacione",
                "cover_url" => "/capa-5.png",
            ],
            [
                "name" => "Operador de grúa e Hidroelevador con énfasis en el sector eléctrico",
                "type" => "capacitacione",
                "cover_url" => "/capa-6.png",
            ],
            [
                "name" => "Distribución Eléctrica Subterránea",
                "type" => "capacitacione",
                "cover_url" => "/capa-7.png",
            ],
            [
                "name" => "Seguridad en instalaciones eléctricas",
                "type" => "capacitacione",
                "cover_url" => "/capa-8.png",
            ],
            [
                "name" => "Construcción y mantenimiento de líneas protegidas de 23KV",
                "type" => "capacitacione",
                "cover_url" => "/capa-9.png",
            ],
        ]);
    }
}
