<?php

namespace Database\Seeders;

use App\Models\CertificateType;
use Illuminate\Database\Seeder;

class CertificateTypeSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $certificateTypes = [
            [
                'name' => 'Surat Keterangan Tidak Mampu',
                'code' => 'SKTM',
                'description' => 'Surat keterangan yang menyatakan bahwa seseorang tidak mampu secara ekonomi',
                'template' => $this->getSKTMTemplate(),
            ],
            [
                'name' => 'Surat Keterangan Belum Menikah',
                'code' => 'SKBM',
                'description' => 'Surat keterangan yang menyatakan bahwa seseorang belum pernah menikah',
                'template' => $this->getSKBMTemplate(),
            ],
            [
                'name' => 'Surat Keterangan Belum Memiliki Rumah',
                'code' => 'SKBMR',
                'description' => 'Surat keterangan yang menyatakan bahwa seseorang belum memiliki rumah',
                'template' => $this->getSKBMRTemplate(),
            ],
            [
                'name' => 'Surat Pengantar Nikah',
                'code' => 'SPN',
                'description' => 'Surat pengantar untuk keperluan pernikahan',
                'template' => $this->getSPNTemplate(),
            ],
        ];

        foreach ($certificateTypes as $type) {
            CertificateType::create($type);
        }
    }

    /**
     * Get SKTM template.
     */
    protected function getSKTMTemplate(): string
    {
        return '
SURAT KETERANGAN TIDAK MAMPU
Nomor: {certificate_number}

Yang bertanda tangan di bawah ini, Kepala Kelurahan [NAMA_KELURAHAN], Kecamatan [NAMA_KECAMATAN], Kabupaten/Kota [NAMA_KABUPATEN], dengan ini menerangkan bahwa:

Nama                : {applicant_name}
Tempat/Tanggal Lahir: {place_of_birth}, {date_of_birth}
NIK                 : {nik}
Alamat              : {address}

Bahwa orang tersebut di atas adalah benar-benar penduduk Kelurahan [NAMA_KELURAHAN] dan berdasarkan pengamatan serta keterangan yang dapat dipercaya, yang bersangkutan termasuk keluarga tidak mampu.

Surat keterangan ini dibuat untuk keperluan: {purpose}

Demikian surat keterangan ini dibuat dengan sebenarnya dan dapat dipergunakan sebagaimana mestinya.

[TEMPAT], {issued_date}
Kepala Kelurahan [NAMA_KELURAHAN]


[NAMA_KEPALA_KELURAHAN]
NIP. [NIP_KEPALA_KELURAHAN]
        ';
    }

    /**
     * Get SKBM template.
     */
    protected function getSKBMTemplate(): string
    {
        return '
SURAT KETERANGAN BELUM MENIKAH
Nomor: {certificate_number}

Yang bertanda tangan di bawah ini, Kepala Kelurahan [NAMA_KELURAHAN], Kecamatan [NAMA_KECAMATAN], Kabupaten/Kota [NAMA_KABUPATEN], dengan ini menerangkan bahwa:

Nama                : {applicant_name}
Tempat/Tanggal Lahir: {place_of_birth}, {date_of_birth}
NIK                 : {nik}
Alamat              : {address}

Bahwa orang tersebut di atas adalah benar-benar penduduk Kelurahan [NAMA_KELURAHAN] dan sampai dengan dikeluarkannya surat keterangan ini, yang bersangkutan BELUM PERNAH MENIKAH.

Surat keterangan ini dibuat untuk keperluan: {purpose}

Demikian surat keterangan ini dibuat dengan sebenarnya dan dapat dipergunakan sebagaimana mestinya.

[TEMPAT], {issued_date}
Kepala Kelurahan [NAMA_KELURAHAN]


[NAMA_KEPALA_KELURAHAN]
NIP. [NIP_KEPALA_KELURAHAN]
        ';
    }

    /**
     * Get SKBMR template.
     */
    protected function getSKBMRTemplate(): string
    {
        return '
SURAT KETERANGAN BELUM MEMILIKI RUMAH
Nomor: {certificate_number}

Yang bertanda tangan di bawah ini, Kepala Kelurahan [NAMA_KELURAHAN], Kecamatan [NAMA_KECAMATAN], Kabupaten/Kota [NAMA_KABUPATEN], dengan ini menerangkan bahwa:

Nama                : {applicant_name}
Tempat/Tanggal Lahir: {place_of_birth}, {date_of_birth}
NIK                 : {nik}
Alamat              : {address}

Bahwa orang tersebut di atas adalah benar-benar penduduk Kelurahan [NAMA_KELURAHAN] dan sampai dengan dikeluarkannya surat keterangan ini, yang bersangkutan BELUM MEMILIKI RUMAH.

Surat keterangan ini dibuat untuk keperluan: {purpose}

Demikian surat keterangan ini dibuat dengan sebenarnya dan dapat dipergunakan sebagaimana mestinya.

[TEMPAT], {issued_date}
Kepala Kelurahan [NAMA_KELURAHAN]


[NAMA_KEPALA_KELURAHAN]
NIP. [NIP_KEPALA_KELURAHAN]
        ';
    }

    /**
     * Get SPN template.
     */
    protected function getSPNTemplate(): string
    {
        return '
SURAT PENGANTAR NIKAH
Nomor: {certificate_number}

Yang bertanda tangan di bawah ini, Kepala Kelurahan [NAMA_KELURAHAN], Kecamatan [NAMA_KECAMATAN], Kabupaten/Kota [NAMA_KABUPATEN], dengan ini menerangkan bahwa:

Nama                : {applicant_name}
Tempat/Tanggal Lahir: {place_of_birth}, {date_of_birth}
NIK                 : {nik}
Alamat              : {address}

Bahwa orang tersebut di atas adalah benar-benar penduduk Kelurahan [NAMA_KELURAHAN] dan bermaksud untuk melangsungkan pernikahan.

Surat pengantar ini dibuat untuk keperluan: {purpose}

Demikian surat pengantar ini dibuat dengan sebenarnya dan dapat dipergunakan sebagaimana mestinya.

[TEMPAT], {issued_date}
Kepala Kelurahan [NAMA_KELURAHAN]


[NAMA_KEPALA_KELURAHAN]
NIP. [NIP_KEPALA_KELURAHAN]
        ';
    }
}