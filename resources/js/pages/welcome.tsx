import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Sistem Surat Keterangan Kelurahan" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        📋 Sistem Surat Keterangan
                                    </h1>
                                </div>
                            </div>
                            <nav className="flex space-x-4">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                            🏛️ Sistem Surat Keterangan
                            <span className="text-blue-600"> Kelurahan</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Platform digital untuk pengelolaan surat keterangan kelurahan dengan sistem yang terintegrasi, mudah, dan efisien.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="mt-16">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                                <div className="text-4xl mb-4">📄</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Surat Keterangan Tidak Mampu
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Untuk keperluan bantuan sosial dan pendidikan
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                                <div className="text-4xl mb-4">💒</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Surat Keterangan Belum Menikah
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Untuk keperluan administrasi pernikahan
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                                <div className="text-4xl mb-4">🏠</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Surat Keterangan Belum Memiliki Rumah
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Untuk keperluan pengajuan kredit perumahan
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                                <div className="text-4xl mb-4">💍</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Surat Pengantar Nikah
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Untuk keperluan pencatatan pernikahan
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Key Features */}
                    <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                            ✨ Fitur Unggulan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">📝</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Pembuatan Mudah</h3>
                                    <p className="text-gray-600 text-sm">Form input yang sederhana dan user-friendly</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">📊</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Dashboard Lengkap</h3>
                                    <p className="text-gray-600 text-sm">Pantau semua surat yang telah dibuat</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">🖨️</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Cetak & Unduh</h3>
                                    <p className="text-gray-600 text-sm">Export ke PDF dan cetak langsung</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">🔍</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Pencarian Cepat</h3>
                                    <p className="text-gray-600 text-sm">Cari surat berdasarkan nama, NIK, atau nomor</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">⚡</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Proses Cepat</h3>
                                    <p className="text-gray-600 text-sm">Nomor surat otomatis dan template siap pakai</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">🔒</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Aman & Terpercaya</h3>
                                    <p className="text-gray-600 text-sm">Data tersimpan dengan sistem keamanan tinggi</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-16 text-center">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
                            <h2 className="text-3xl font-bold mb-4">
                                🚀 Mulai Gunakan Sistem Sekarang
                            </h2>
                            <p className="text-xl mb-6 opacity-90">
                                Daftar sekarang dan kelola surat keterangan dengan mudah dan efisien
                            </p>
                            <div className="space-x-4">
                                {auth?.user ? (
                                    <Link href={route('certificates.index')}>
                                        <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                                            🏠 Menuju Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('register')}>
                                            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                                                📝 Daftar Sekarang
                                            </Button>
                                        </Link>
                                        <Link href={route('login')}>
                                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                                                🔑 Masuk
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-16 bg-gray-50 rounded-xl p-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                📞 Butuh Bantuan?
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Tim kami siap membantu Anda dalam menggunakan sistem ini
                            </p>
                            <div className="flex justify-center space-x-8">
                                <div className="text-center">
                                    <div className="text-2xl mb-2">📧</div>
                                    <p className="text-sm text-gray-600">admin@kelurahan.go.id</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-2">📱</div>
                                    <p className="text-sm text-gray-600">(021) 1234-5678</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🕒</div>
                                    <p className="text-sm text-gray-600">Senin - Jumat, 08:00 - 16:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 text-white mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center">
                            <p className="text-gray-400">
                                © 2024 Sistem Surat Keterangan Kelurahan. Dibuat untuk melayani masyarakat dengan lebih baik.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}