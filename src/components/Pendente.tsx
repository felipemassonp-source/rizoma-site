/**
 * Aviso de conteúdo que não existe no site atual. Fica visível de propósito,
 * para a Maira completar pelo painel. Remover quando o conteúdo chegar.
 */
export function Pendente({ children }: { children: React.ReactNode }) {
  return (
    <p className="pendente" role="note">
      <span aria-hidden="true">✎</span>
      <span>
        <strong>Conteúdo pendente</strong> — {children}
      </span>
    </p>
  );
}
