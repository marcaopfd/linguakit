-- O aviso de pagamento, casado ou não com um aluno.
--
-- O webhook da Kiwify só sabia fazer uma coisa: achar o aluno pelo e-mail e
-- atualizar o plano. Quando não achava, respondia 200 e o aviso evaporava.
-- Isso quebrava dois casos reais: comprar antes de criar a conta (no plano
-- anual, a pessoa esperaria a renovação, um ano depois) e pagar com um e-mail
-- diferente do da conta (nunca liberaria, e ninguém saberia).
--
-- Agora todo aviso é gravado. O cadastro procura um pagamento à espera para
-- aquele e-mail e o aplica na hora; o que fica sem dono aparece no painel.
CREATE TABLE "PaymentNotice" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "renewsAt" TIMESTAMP(3),
    "billingRef" TEXT,
    "event" TEXT NOT NULL,
    "studentId" TEXT,
    "appliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentNotice_pkey" PRIMARY KEY ("id")
);

-- O cadastro procura por e-mail; o painel e a exclusão procuram por aluno.
CREATE INDEX "PaymentNotice_email_idx" ON "PaymentNotice"("email");
CREATE INDEX "PaymentNotice_studentId_idx" ON "PaymentNotice"("studentId");
