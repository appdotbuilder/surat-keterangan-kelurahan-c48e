import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';

interface CertificateType {
    id: number;
    name: string;
    code: string;
    description: string;
}

interface Certificate {
    id: number;
    certificate_type_id: number;
    certificate_number: string;
    applicant_name: string;
    place_of_birth: string;
    date_of_birth: string;
    address: string;
    nik: string;
    purpose: string;
    status: string;
    certificate_type: CertificateType;
}

interface Props {
    certificate: Certificate;
    certificateTypes: CertificateType[];
    [key: string]: unknown;
}

export default function CertificatesEdit({ certificate, certificateTypes }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        certificate_type_id: certificate.certificate_type_id.toString(),
        applicant_name: certificate.applicant_name,
        place_of_birth: certificate.place_of_birth,
        date_of_birth: certificate.date_of_birth,
        address: certificate.address,
        nik: certificate.nik,
        purpose: certificate.purpose,
    });

    const [selectedType, setSelectedType] = useState<CertificateType | null>(
        certificate.certificate_type
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('certificates.update', certificate.id));
    };

    const handleTypeChange = (value: string) => {
        setData('certificate_type_id', value);
        const type = certificateTypes.find(t => t.id.toString() === value);
        setSelectedType(type || null);
    };

    return (
        <AppLayout>
            <Head title={`Edit Surat Keterangan - ${certificate.certificate_number}`} />
            
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        ✏️ Edit Surat Keterangan
                    </h1>
                    <p className="text-gray-600">
                        Nomor: {certificate.certificate_number} • Status: {certificate.status}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Certificate Type Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Jenis Surat Keterangan</CardTitle>
                            <CardDescription>
                                Ubah jenis surat keterangan jika diperlukan
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="certificate_type_id">Jenis Surat *</Label>
                                    <Select
                                        value={data.certificate_type_id}
                                        onValueChange={handleTypeChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis surat keterangan..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {certificateTypes.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.name} ({type.code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.certificate_type_id} />
                                </div>

                                {selectedType && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-medium text-blue-900 mb-2">
                                            📄 {selectedType.name}
                                        </h4>
                                        <p className="text-blue-700 text-sm">
                                            {selectedType.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Pemohon</CardTitle>
                            <CardDescription>
                                Perbarui data pemohon surat keterangan
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <Label htmlFor="applicant_name">Nama Lengkap *</Label>
                                    <Input
                                        id="applicant_name"
                                        type="text"
                                        value={data.applicant_name}
                                        onChange={(e) => setData('applicant_name', e.target.value)}
                                        placeholder="Masukkan nama lengkap sesuai KTP"
                                    />
                                    <InputError message={errors.applicant_name} />
                                </div>

                                <div>
                                    <Label htmlFor="place_of_birth">Tempat Lahir *</Label>
                                    <Input
                                        id="place_of_birth"
                                        type="text"
                                        value={data.place_of_birth}
                                        onChange={(e) => setData('place_of_birth', e.target.value)}
                                        placeholder="Contoh: Jakarta"
                                    />
                                    <InputError message={errors.place_of_birth} />
                                </div>

                                <div>
                                    <Label htmlFor="date_of_birth">Tanggal Lahir *</Label>
                                    <Input
                                        id="date_of_birth"
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                    />
                                    <InputError message={errors.date_of_birth} />
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="nik">NIK (Nomor Induk Kependudukan) *</Label>
                                    <Input
                                        id="nik"
                                        type="text"
                                        value={data.nik}
                                        onChange={(e) => setData('nik', e.target.value)}
                                        placeholder="16 digit NIK sesuai KTP"
                                        maxLength={16}
                                    />
                                    <InputError message={errors.nik} />
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="address">Alamat Lengkap *</Label>
                                    <Textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Masukkan alamat lengkap sesuai KTP"
                                        rows={3}
                                    />
                                    <InputError message={errors.address} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Purpose */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Keperluan</CardTitle>
                            <CardDescription>
                                Perbarui keperluan penggunaan surat keterangan ini
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor="purpose">Keperluan *</Label>
                                <Textarea
                                    id="purpose"
                                    value={data.purpose}
                                    onChange={(e) => setData('purpose', e.target.value)}
                                    placeholder="Contoh: Untuk melengkapi berkas pengajuan beasiswa..."
                                    rows={4}
                                />
                                <InputError message={errors.purpose} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Warning */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <span className="text-yellow-600 text-xl">⚠️</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                    Perhatian
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>
                                        Perubahan pada surat keterangan yang sudah disetujui akan mengubah status
                                        menjadi "Menunggu Persetujuan" dan perlu disetujui ulang.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            ❌ Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? '⏳ Menyimpan...' : '💾 Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}