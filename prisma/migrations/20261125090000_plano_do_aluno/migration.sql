-- O plano do aluno.
--
-- Três colunas e nada mais: o que ele assinou, em que estado está, e até
-- quando vale. Quem nunca pagou fica em 'free'/'active', que é o padrão, de
-- modo que nenhum aluno existente muda de comportamento com esta migração.
ALTER TABLE "Student" ADD COLUMN "plan" TEXT NOT NULL DEFAULT 'free';
ALTER TABLE "Student" ADD COLUMN "planStatus" TEXT NOT NULL DEFAULT 'active';
ALTER TABLE "Student" ADD COLUMN "renewsAt" TIMESTAMP(3);

-- O identificador da assinatura na Kiwify, para o webhook achar o aluno
-- quando o aviso chegar sem o e-mail.
ALTER TABLE "Student" ADD COLUMN "billingRef" TEXT;
CREATE UNIQUE INDEX "Student_billingRef_key" ON "Student"("billingRef");
