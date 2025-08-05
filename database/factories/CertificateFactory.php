<?php

namespace Database\Factories;

use App\Models\Certificate;
use App\Models\CertificateType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Certificate>
 */
class CertificateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Certificate>
     */
    protected $model = Certificate::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'certificate_type_id' => CertificateType::factory(),
            'certificate_number' => $this->faker->unique()->regexify('[A-Z]{2,4}/[0-9]{3}/[0-9]{2}/[0-9]{4}'),
            'applicant_name' => $this->faker->name(),
            'place_of_birth' => $this->faker->city(),
            'date_of_birth' => $this->faker->date('Y-m-d', '2000-01-01'),
            'address' => $this->faker->address(),
            'nik' => $this->faker->numerify('################'),
            'purpose' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'created_by' => User::factory(),
        ];
    }

    /**
     * Indicate that the certificate is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'issued_at' => null,
        ]);
    }

    /**
     * Indicate that the certificate is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'issued_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * Indicate that the certificate is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
            'issued_at' => null,
        ]);
    }
}