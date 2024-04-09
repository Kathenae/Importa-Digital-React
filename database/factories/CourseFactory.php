<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(rand(4, 8)),
            "description" => "Dirigida a egresados de colegios secundarios que desean tener una profesión de nivel superior, de fácil acceso laboral y buena remuneración.",
            "type" => "Tecnicatura",
            "duration_years" => 2,
            "schedule" => "Sábado 08:00 a 17:00 hs.",
            "headquarters" => "Ciudad del Este y Fernando de la Mora.",
            "candidate_profile" => "El egresado será capaz de:

            • Gestionar planes de Higiene Ocupacional y Seguridad Laboral para empresas.
            • Observar, analizar, evaluar, prevenir y corregir situaciones de riesgos laborales.
            • Responder ante situaciones de Emergencia dentro del ámbito laboral.
            • Asesorar Auditorias en Gestión de Riesgos para una empresa o industria.
            • Aplicar Leyes, Normas y Reglamentos de Seguridad Laboral en una empresa o industria.",
            "cover_url" => "/capa-".rand(1, 9).".png",
            "banner_url" => "/bg-4.png",
            "video_url" => "/Tyto.mp4",
        ];
    }
}
