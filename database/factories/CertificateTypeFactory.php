<?php

namespace Database\Factories;

use App\Models\CertificateType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CertificateType>
 */
class CertificateTypeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\CertificateType>
     */
    protected $model = CertificateType::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(4),
            'code' => $this->faker->unique()->regexify('[A-Z]{2,4}'),
            'description' => $this->faker->paragraph(),
            'template' => $this->faker->text(500),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the certificate type is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}