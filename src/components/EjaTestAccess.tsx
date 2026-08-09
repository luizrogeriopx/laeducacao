import { useState } from "react";
import { Copy, Check, KeyRound, ExternalLink } from "lucide-react";

const LOGIN = "alunoeja@laeducacao.com.br";
const SENHA = "12345678";
const PLATAFORMA = "https://laava.simpleacademy.tech/login";

const FULL = `EJA - LA Educação
Login: ${LOGIN}
Senha: ${SENHA}
PLATAFORMA: ${PLATAFORMA}`;

function CopyButton({
  value,
  label,
  actionLabel = "Copiar",
  copiedLabel = "Copiado",
  className = "inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#1a237e] transition hover:bg-neutral-100",
}: {
  value: string;
  label: string;
  actionLabel?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${actionLabel} ${label}`}
      className={className}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? copiedLabel : actionLabel}
    </button>
  );
}

export function EjaTestAccess() {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-[#1a237e]">
          <KeyRound className="h-5 w-5" />
          <h2 className="text-xl sm:text-2xl font-bold">Acesso teste — EJA LA Educação</h2>
        </div>
        <p className="mt-2 text-sm text-neutral-600">
          Experimente a plataforma antes de se matricular usando as credenciais abaixo.
        </p>

        <dl className="mt-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
            <div className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Login</dt>
              <dd className="truncate text-sm font-medium text-neutral-800">{LOGIN}</dd>
            </div>
            <CopyButton value={LOGIN} label="login" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
            <div className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Senha</dt>
              <dd className="truncate text-sm font-medium text-neutral-800">{SENHA}</dd>
            </div>
            <CopyButton value={SENHA} label="senha" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
            <div className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Plataforma</dt>
              <dd className="truncate text-sm font-medium text-neutral-800">{PLATAFORMA}</dd>
            </div>
            <CopyButton value={PLATAFORMA} label="link da plataforma" />
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={PLATAFORMA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1a237e] px-6 py-3 text-sm font-bold text-white shadow transition hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" /> Acessar plataforma
          </a>
          <CopyButton value={FULL} label="todas as informações" />
        </div>
      </div>
    </section>
  );
}
