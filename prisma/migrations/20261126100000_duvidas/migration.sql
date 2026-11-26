-- As dúvidas dos alunos, com a resposta escrita à mão.
--
-- A resposta serve duas vezes: para quem perguntou, e para quem tiver a mesma
-- dúvida depois. A pergunta respondida vira página pública — e é a melhor
-- prova que este produto pode dar de que existe gente do outro lado, numa
-- página de vendas que não traz depoimento nenhum, de propósito.
--
-- published nasce FALSO. Conteúdo escrito por terceiro que vai ao ar sozinho
-- é spam no site que vende o produto, e página indexada não se desfaz.
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "context" TEXT,
    "publishedText" TEXT,
    "answer" TEXT,
    "answeredAt" TIMESTAMP(3),
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- O aluno vê as dele; a página pública lista as respondidas e publicadas.
CREATE INDEX "Question_studentId_idx" ON "Question"("studentId");
CREATE INDEX "Question_published_answeredAt_idx" ON "Question"("published", "answeredAt");

-- RESTRICT, como as outras tabelas que apontam para Student: apagar um aluno
-- passa por limpar o que é dele, de propósito.
ALTER TABLE "Question" ADD CONSTRAINT "Question_studentId_fkey"
    FOREIGN KEY ("studentId") REFERENCES "Student"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
