-- O que o aluno escreve nas tarefas das músicas, saindo do navegador.
--
-- Até aqui essas respostas viviam em localStorage, e a tela avisava que
-- ficavam "neste aparelho". Era honesto enquanto não havia conta: mandar para
-- o banco exigia saber de quem era o texto. Agora há conta, e a redação da
-- seção 5 é a única coisa do curso que o aluno escreve do zero — a última
-- coisa que deveria sumir ao abrir o curso em outro aparelho.
--
-- Uma linha por tarefa de cada música, pela chave única. Sem UPDATE em massa
-- e sem crescimento livre: hoje são, no máximo, duas linhas por música.
CREATE TABLE "MusicNote" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "taskIndex" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MusicNote_pkey" PRIMARY KEY ("id")
);

-- A chave do upsert: salvar duas vezes a mesma tarefa reescreve a linha em vez
-- de empilhar versões.
CREATE UNIQUE INDEX "MusicNote_studentId_videoId_taskIndex_key"
    ON "MusicNote"("studentId", "videoId", "taskIndex");

-- A aula pede as respostas de uma música; o backup e a exclusão pedem as do
-- aluno inteiro.
CREATE INDEX "MusicNote_studentId_idx" ON "MusicNote"("studentId");

-- RESTRICT, como as outras tabelas que apontam para Student: apagar um aluno
-- passa por limpar o que é dele, de propósito.
ALTER TABLE "MusicNote" ADD CONSTRAINT "MusicNote_studentId_fkey"
    FOREIGN KEY ("studentId") REFERENCES "Student"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
