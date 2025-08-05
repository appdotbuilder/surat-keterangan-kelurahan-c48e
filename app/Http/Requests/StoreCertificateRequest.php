<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCertificateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'certificate_type_id' => 'required|exists:certificate_types,id',
            'applicant_name' => 'required|string|max:255',
            'place_of_birth' => 'required|string|max:255',
            'date_of_birth' => 'required|date|before:today',
            'address' => 'required|string',
            'nik' => 'required|string|size:16|regex:/^[0-9]+$/',
            'purpose' => 'required|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'certificate_type_id.required' => 'Jenis surat keterangan harus dipilih.',
            'certificate_type_id.exists' => 'Jenis surat keterangan tidak valid.',
            'applicant_name.required' => 'Nama pemohon harus diisi.',
            'applicant_name.max' => 'Nama pemohon maksimal 255 karakter.',
            'place_of_birth.required' => 'Tempat lahir harus diisi.',
            'place_of_birth.max' => 'Tempat lahir maksimal 255 karakter.',
            'date_of_birth.required' => 'Tanggal lahir harus diisi.',
            'date_of_birth.date' => 'Tanggal lahir harus berupa tanggal yang valid.',
            'date_of_birth.before' => 'Tanggal lahir harus sebelum hari ini.',
            'address.required' => 'Alamat harus diisi.',
            'nik.required' => 'NIK harus diisi.',
            'nik.size' => 'NIK harus 16 digit.',
            'nik.regex' => 'NIK hanya boleh berisi angka.',
            'purpose.required' => 'Keperluan harus diisi.',
        ];
    }
}