<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Certificate
 *
 * @property int $id
 * @property int $certificate_type_id
 * @property string $certificate_number
 * @property string $applicant_name
 * @property string $place_of_birth
 * @property \Illuminate\Support\Carbon $date_of_birth
 * @property string $address
 * @property string $nik
 * @property string $purpose
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $issued_at
 * @property int $created_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CertificateType $certificateType
 * @property-read \App\Models\User $creator
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereApplicantName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereCertificateNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereCertificateTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereDateOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereIssuedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereNik($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate wherePlaceOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate wherePurpose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereUpdatedAt($value)
 * @method static \Database\Factories\CertificateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Certificate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'certificate_type_id',
        'certificate_number',
        'applicant_name',
        'place_of_birth',
        'date_of_birth',
        'address',
        'nik',
        'purpose',
        'status',
        'issued_at',
        'created_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'issued_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the certificate type that owns the certificate.
     */
    public function certificateType(): BelongsTo
    {
        return $this->belongsTo(CertificateType::class);
    }

    /**
     * Get the user who created the certificate.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Generate the next certificate number.
     *
     * @param int $certificateTypeId
     * @return string
     */
    public static function generateCertificateNumber(int $certificateTypeId): string
    {
        $certificateType = CertificateType::findOrFail($certificateTypeId);
        $year = date('Y');
        $month = date('m');
        
        $lastCertificate = self::where('certificate_type_id', $certificateTypeId)
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->latest()
            ->first();
        
        $sequence = $lastCertificate ? 
            (int) substr($lastCertificate->certificate_number, -3) + 1 : 
            1;
        
        return sprintf('%s/%03d/%s/%s', $certificateType->code, $sequence, $month, $year);
    }
}