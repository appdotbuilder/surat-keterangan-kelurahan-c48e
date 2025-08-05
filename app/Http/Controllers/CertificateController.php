<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCertificateRequest;
use App\Models\Certificate;
use App\Models\CertificateType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $certificates = Certificate::with(['certificateType', 'creator'])
            ->when($request->search, function ($query, $search) {
                $query->where('applicant_name', 'like', "%{$search}%")
                    ->orWhere('certificate_number', 'like', "%{$search}%")
                    ->orWhere('nik', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->certificate_type, function ($query, $type) {
                $query->where('certificate_type_id', $type);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $certificateTypes = CertificateType::active()->get();

        return Inertia::render('certificates/index', [
            'certificates' => $certificates,
            'certificateTypes' => $certificateTypes,
            'filters' => $request->only(['search', 'status', 'certificate_type']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $certificateTypes = CertificateType::active()->get();

        return Inertia::render('certificates/create', [
            'certificateTypes' => $certificateTypes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCertificateRequest $request)
    {
        $certificateNumber = Certificate::generateCertificateNumber($request->certificate_type_id);

        $certificate = Certificate::create([
            ...$request->validated(),
            'certificate_number' => $certificateNumber,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('certificates.show', $certificate)
            ->with('success', 'Surat keterangan berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Certificate $certificate)
    {
        $certificate->load(['certificateType', 'creator']);

        return Inertia::render('certificates/show', [
            'certificate' => $certificate,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Certificate $certificate)
    {
        $certificateTypes = CertificateType::active()->get();

        return Inertia::render('certificates/edit', [
            'certificate' => $certificate,
            'certificateTypes' => $certificateTypes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCertificateRequest $request, Certificate $certificate)
    {
        $updateData = $request->validated();
        
        // If status is being updated (for approval/rejection)
        if ($request->has('status')) {
            $updateData['status'] = $request->status;
            if ($request->status === 'approved' && $request->has('issued_at')) {
                $updateData['issued_at'] = $request->issued_at;
            }
        } else {
            // If other data is being updated, reset status to pending
            $updateData['status'] = 'pending';
            $updateData['issued_at'] = null;
        }

        $certificate->update($updateData);

        return redirect()->route('certificates.show', $certificate)
            ->with('success', 'Surat keterangan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificate $certificate)
    {
        $certificate->delete();

        return redirect()->route('certificates.index')
            ->with('success', 'Surat keterangan berhasil dihapus.');
    }
}