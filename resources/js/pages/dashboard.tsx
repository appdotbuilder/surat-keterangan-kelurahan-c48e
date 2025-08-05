import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
    stats?: {
        total_certificates: number;
        pending_certificates: number;
        approved_certificates: number;
        rejected_certificates: number;
    };
    [key: string]: unknown;
}

export default function Dashboard({ stats }: Props) {
    const defaultStats = {
        total_certificates: 0,
        pending_certificates: 0,
        approved_certificates: 0,
        rejected_certificates: 0,
    };

    const certificateStats = stats || defaultStats;

    return (
        <AppLayout>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        🏛️ Selamat Datang di Sistem Surat Keterangan Kelurahan
                    </h1>
                    <p className="text-blue-100">
                        Kelola dan buat surat keterangan dengan mudah dan efisien
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">
                                Total Surat
                            </CardTitle>
                            <div className="text-2xl text-blue-600">📊</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900">
                                {certificateStats.total_certificates}
                            </div>
                            <p className="text-xs text-blue-600">
                                Semua surat keterangan
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-yellow-800">
                                Menunggu Persetujuan
                            </CardTitle>
                            <div className="text-2xl text-yellow-600">⏳</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-900">
                                {certificateStats.pending_certificates}
                            </div>
                            <p className="text-xs text-yellow-600">
                                Perlu ditinjau
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-800">
                                Disetujui
                            </CardTitle>
                            <div className="text-2xl text-green-600">✅</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900">
                                {certificateStats.approved_certificates}
                            </div>
                            <p className="text-xs text-green-600">
                                Siap dicetak
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-red-800">
                                Ditolak
                            </CardTitle>
                            <div className="text-2xl text-red-600">❌</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-900">
                                {certificateStats.rejected_certificates}
                            </div>
                            <p className="text-xs text-red-600">
                                Perlu perbaikan
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>🚀 Aksi Cepat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link href={route('certificates.create')}>
                                <Button className="w-full h-20 flex-col space-y-2">
                                    <div className="text-2xl">📝</div>
                                    <span>Buat Surat Baru</span>
                                </Button>
                            </Link>
                            
                            <Link href={route('certificates.index')}>
                                <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                                    <div className="text-2xl">📋</div>
                                    <span>Lihat Semua Surat</span>
                                </Button>
                            </Link>
                            
                            <Link href={route('certificates.index', { status: 'pending' })}>
                                <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                                    <div className="text-2xl">⏳</div>
                                    <span>Surat Menunggu</span>
                                </Button>
                            </Link>
                            
                            <Link href={route('certificates.index', { status: 'approved' })}>
                                <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                                    <div className="text-2xl">✅</div>
                                    <span>Surat Disetujui</span>
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Certificate Types */}
                <Card>
                    <CardHeader>
                        <CardTitle>📄 Jenis Surat Keterangan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                <div className="text-3xl mb-2">📄</div>
                                <h3 className="font-semibold text-blue-900 mb-1">SKTM</h3>
                                <p className="text-sm text-blue-700">Surat Keterangan Tidak Mampu</p>
                            </div>
                            
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                                <div className="text-3xl mb-2">💒</div>
                                <h3 className="font-semibold text-purple-900 mb-1">SKBM</h3>
                                <p className="text-sm text-purple-700">Surat Keterangan Belum Menikah</p>
                            </div>
                            
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                <div className="text-3xl mb-2">🏠</div>
                                <h3 className="font-semibold text-green-900 mb-1">SKBMR</h3>
                                <p className="text-sm text-green-700">Surat Keterangan Belum Memiliki Rumah</p>
                            </div>
                            
                            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 text-center">
                                <div className="text-3xl mb-2">💍</div>
                                <h3 className="font-semibold text-pink-900 mb-1">SPN</h3>
                                <p className="text-sm text-pink-700">Surat Pengantar Nikah</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tips & Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>💡 Tips Penggunaan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start space-x-2">
                                <span className="text-blue-600 mt-1">✓</span>
                                <p className="text-sm text-gray-700">
                                    Pastikan data pemohon sesuai dengan KTP
                                </p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span className="text-blue-600 mt-1">✓</span>
                                <p className="text-sm text-gray-700">
                                    Jelaskan keperluan dengan detail dan jelas
                                </p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span className="text-blue-600 mt-1">✓</span>
                                <p className="text-sm text-gray-700">
                                    Periksa kembali sebelum menyimpan surat
                                </p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span className="text-blue-600 mt-1">✓</span>
                                <p className="text-sm text-gray-700">
                                    Gunakan fitur pencarian untuk menemukan surat dengan cepat
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>📞 Informasi Kontak</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <span className="text-blue-600">📧</span>
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm text-gray-600">admin@kelurahan.go.id</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-blue-600">📱</span>
                                <div>
                                    <p className="text-sm font-medium">Telepon</p>
                                    <p className="text-sm text-gray-600">(021) 1234-5678</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-blue-600">🕒</span>
                                <div>
                                    <p className="text-sm font-medium">Jam Operasional</p>
                                    <p className="text-sm text-gray-600">Senin - Jumat, 08:00 - 16:00</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}