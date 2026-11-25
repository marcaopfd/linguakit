-- O código de recuperação.
--
-- Esquecer a senha, hoje, é perder a conta: não há envio de e-mail, então não
-- há link de "redefinir senha" para mandar. Com plano pago isso deixa de ser
-- um aborrecimento e vira perder o que a pessoa comprou.
--
-- O código é a resposta que não depende de e-mail nenhum: ele é mostrado uma
-- vez, quando a conta nasce, a pessoa guarda, e com ele troca a senha sozinha.
-- Guardado como hash scrypt, igual à senha — quem ler o banco não consegue
-- usar o código de ninguém.
ALTER TABLE "Student" ADD COLUMN "recoveryCode" TEXT;
ALTER TABLE "Student" ADD COLUMN "recoveryCodeAt" TIMESTAMP(3);
