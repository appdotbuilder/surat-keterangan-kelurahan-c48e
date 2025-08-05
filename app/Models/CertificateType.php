<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\CertificateType
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string|null $description
 * @property string $template
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Certificate> $certificates
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType query()
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType whereTemplate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateType active()
 * @method static \Database\Factories\CertificateTypeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class CertificateType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'description',
        'template',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the certificates for the certificate type.
     */
    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class);
    }

    /**
     * Scope a query to only include active certificate types.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}