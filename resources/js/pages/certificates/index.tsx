import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface CertificateType {
    id: number;
    name: string;
    code: string;
}

interface Certificate {
    id: number;
    certificate_number: string;
    applicant_name: string;
    nik: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    certificate_type: CertificateType;
    creator: {
        name: string;
    };
}

interface Props {
    certificates: {
        data: Certificate[];
        links: Array<{
        url?: string;
        label: string;
        active: boolean;
    }>;
        total: number;
    };
    certificateTypes: CertificateType[];
    filters: {
        search?: string;
        status?: string;
        certificate_type?: string;
    };
    [key: string]: unknown;
}

export default function CertificatesIndex({ certificates, certificateTypes, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const status = formData.get('status') as string;
        const certificate_type = formData.get('certificate_type') as string;

        router.get(route('certificates.index'), {
            search: search || undefined,
            status: status || undefined,
            certificate_type: certificate_type || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };

        const labels = {
            pending: 'Menunggu',
            approved: 'Disetujui',
            rejected: 'Ditolak',
        };

        return (
            <Badge className={variants[status as keyof typeof variants]}>
                {labels[status as keyof typeof labels]}
            </Badge>
        );
    };

    return (
        <AppLayout>
            <Head title="Surat Keterangan" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📋 Surat Keterangan</h1>
                        <p className="text-gray-600">Kelola semua surat keterangan kelurahan</p>
                    </div>
                    <Link href={route('certificates.create')}>
                        <Button>
                            ➕ Buat Surat Baru
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pencarian
                                </label>
                                <Input
                                    name="search"
                                    placeholder="Nama, NIK, atau nomor surat..."
                                    defaultValue={filters.search || ''}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <Select name="status" defaultValue={filters.status || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Status</SelectItem>
                                        <SelectItem value="pending">Menunggu</SelectItem>
                                        <SelectItem value="approved">Disetujui</SelectItem>
                                        <SelectItem value="rejected">Ditolak</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jenis Surat
                                </label>
                                <Select name="certificate_type" defaultValue={filters.certificate_type || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Jenis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Jenis</SelectItem>
                                        {certificateTypes.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="flex items-end">
                                <Button type="submit" className="w-full">
                                    🔍 Cari
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Certificate List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Daftar Surat Keterangan ({certificates.total})
                        </h2>
                    </div>
                    
                    {certificates.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nomor Surat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Pemohon
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jenis Surat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {certificates.data.map((certificate) => (
                                            <tr key={certificate.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {certificate.certificate_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {certificate.applicant_name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            NIK: {certificate.nik}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {certificate.certificate_type.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(certificate.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(certificate.created_at).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <Link
                                                        href={route('certificates.show', certificate.id)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        👁️ Lihat
                                                    </Link>
                                                    <Link
                                                        href={route('certificates.edit', certificate.id)}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        ✏️ Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination would go here */}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📄</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada surat keterangan</h3>
                            <p className="text-gray-500 mb-6">Mulai dengan membuat surat keterangan pertama</p>
                            <Link href={route('certificates.create')}>
                                <Button>
                                    ➕ Buat Surat Pertama
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}