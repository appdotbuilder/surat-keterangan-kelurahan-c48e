import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CertificateType {
    id: number;
    name: string;
    code: string;
    template: string;
}

interface Certificate {
    id: number;
    certificate_number: string;
    applicant_name: string;
    place_of_birth: string;
    date_of_birth: string;
    address: string;
    nik: string;
    purpose: string;
    status: 'pending' | 'approved' | 'rejected';
    issued_at?: string;
    created_at: string;
    certificate_type: CertificateType;
    creator: {
        name: string;
    };
}

interface Props {
    certificate: Certificate;
    [key: string]: unknown;
}

export default function CertificatesShow({ certificate }: Props) {
    const getStatusBadge = (status: string) => {
        const variants = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };

        const labels = {
            pending: '⏳ Menunggu Persetujuan',
            approved: '✅ Disetujui',
            rejected: '❌ Ditolak',
        };

        return (
            <Badge className={variants[status as keyof typeof variants]}>
                {labels[status as keyof typeof labels]}
            </Badge>
        );
    };

    const handleApprove = () => {
        if (confirm('Apakah Anda yakin ingin menyetujui surat keterangan ini?')) {
            router.patch(route('certificates.update', certificate.id), {
                status: 'approved',
                issued_at: new Date().toISOString(),
            });
        }
    };

    const handleReject = () => {
        if (confirm('Apakah Anda yakin ingin menolak surat keterangan ini?')) {
            router.patch(route('certificates.update', certificate.id), {
                status: 'rejected',
            });
        }
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus surat keterangan ini? Tindakan ini tidak dapat dibatalkan.')) {
            router.delete(route('certificates.destroy', certificate.id));
        }
    };

    const renderCertificateTemplate = () => {
        let template = certificate.certificate_type.template;
        
        // Replace placeholders with actual data
        template = template.replace('{certificate_number}', certificate.certificate_number);
        template = template.replace('{applicant_name}', certificate.applicant_name);
        template = template.replace('{place_of_birth}', certificate.place_of_birth);
        template = template.replace('{date_of_birth}', new Date(certificate.date_of_birth).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }));
        template = template.replace('{nik}', certificate.nik);
        template = template.replace('{address}', certificate.address);
        template = template.replace('{purpose}', certificate.purpose);
        template = template.replace('{issued_date}', certificate.issued_at ? 
            new Date(certificate.issued_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }) : 
            new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        );

        return template;
    };

    return (
        <AppLayout>
            <Head title={`Surat Keterangan - ${certificate.certificate_number}`} />
            
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            📄 Surat Keterangan {certificate.certificate_type.name}
                        </h1>
                        <p className="text-gray-600">Nomor: {certificate.certificate_number}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        {getStatusBadge(certificate.status)}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Certificate Information */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Basic Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Surat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Jenis Surat</label>
                                    <p className="text-gray-900">{certificate.certificate_type.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Kode</label>
                                    <p className="text-gray-900">{certificate.certificate_type.code}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Status</label>
                                    <div className="mt-1">
                                        {getStatusBadge(certificate.status)}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Dibuat Tanggal</label>
                                    <p className="text-gray-900">
                                        {new Date(certificate.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                                {certificate.issued_at && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Tanggal Disetujui</label>
                                        <p className="text-gray-900">
                                            {new Date(certificate.issued_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Dibuat oleh</label>
                                    <p className="text-gray-900">{certificate.creator.name}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Personal Data */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Pemohon</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Nama Lengkap</label>
                                    <p className="text-gray-900">{certificate.applicant_name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Tempat/Tanggal Lahir</label>
                                    <p className="text-gray-900">
                                        {certificate.place_of_birth}, {new Date(certificate.date_of_birth).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">NIK</label>
                                    <p className="text-gray-900">{certificate.nik}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Alamat</label>
                                    <p className="text-gray-900">{certificate.address}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Keperluan</label>
                                    <p className="text-gray-900">{certificate.purpose}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tindakan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {certificate.status === 'pending' && (
                                    <>
                                        <Button 
                                            onClick={handleApprove}
                                            className="w-full bg-green-600 hover:bg-green-700"
                                        >
                                            ✅ Setujui Surat
                                        </Button>
                                        <Button 
                                            onClick={handleReject}
                                            variant="destructive"
                                            className="w-full"
                                        >
                                            ❌ Tolak Surat
                                        </Button>
                                    </>
                                )}
                                
                                {certificate.status === 'approved' && (
                                    <>
                                        <Button className="w-full">
                                            🖨️ Cetak Surat
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            📄 Unduh PDF
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            📤 Ekspor
                                        </Button>
                                    </>
                                )}
                                
                                <div className="border-t pt-3 space-y-2">
                                    <Link href={route('certificates.edit', certificate.id)}>
                                        <Button variant="outline" className="w-full">
                                            ✏️ Edit Surat
                                        </Button>
                                    </Link>
                                    <Button 
                                        onClick={handleDelete}
                                        variant="destructive"
                                        className="w-full"
                                    >
                                        🗑️ Hapus Surat
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Certificate Preview */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pratinjau Surat Keterangan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-white border-2 border-gray-300 rounded-lg p-8 min-h-[600px]">
                                    <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            PEMERINTAH KABUPATEN/KOTA [NAMA_KABUPATEN]
                                        </h2>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            KECAMATAN [NAMA_KECAMATAN]
                                        </h3>
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            KELURAHAN [NAMA_KELURAHAN]
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Alamat: [ALAMAT_KELURAHAN] Telp: [NO_TELP]
                                        </p>
                                    </div>
                                    
                                    <div className="whitespace-pre-line text-sm leading-relaxed text-gray-900">
                                        {renderCertificateTemplate()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}