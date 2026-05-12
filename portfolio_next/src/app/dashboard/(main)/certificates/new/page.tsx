import Link from "next/link";
import { CertificateForm } from "../certificate-form";
import { ArrowLeft } from "lucide-react";

export default function NewCertificatePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/certificates"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          <ArrowLeft size={13} />
          Certificates
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-white">New certificate</h1>
        <p className="mt-1 text-sm text-zinc-400">Add a certificate or credential.</p>
      </div>
      <CertificateForm />
    </div>
  );
}
