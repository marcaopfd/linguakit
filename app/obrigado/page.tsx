import { cookies } from 'next/headers'
import { prisma, withDb } from '@/lib/db'
import { aplicarPagamentoPendente } from '@/lib/pagamento'
import { assinaturaValendo } from '@/lib/plano'
import { readStudentIdFromToken, STUDENT_COOKIE } from '@/lib/student-auth'
import { DeVolta } from './view'

/**
 * A volta da Kiwify.
 *
 * O checkout acontece fora — o navegador bloqueia embutir a página da Kiwify,
 * e a API pública dela não cria pedido —, então o mais perto de "comprar
 * dentro do site" é a saída e a volta serem curtas. Esta é a volta: a Kiwify
 * manda o comprador para cá pela página de obrigado, e daqui ele cai dentro
 * do curso, com o plano já valendo.
 *
 * A Kiwify não manda parâmetro nenhum nessa URL, então quem a pessoa é só
 * pode vir do cookie de sessão deste navegador — que é justamente o navegador
 * de onde ela saiu para pagar. Sem sessão, a tela não adivinha: pede para
 * entrar.
 *
 * O aviso do pagamento costuma chegar em segundos, mas pode chegar depois
 * desta página abrir. Por isso ela tenta casar o pagamento guardado na hora,
 * e quando ainda não há nada, oferece conferir de novo em vez de dizer que
 * não deu certo.
 */
export default async function ObrigadoPage() {
  const token = (await cookies()).get(STUDENT_COOKIE)?.value
  const studentId = readStudentIdFromToken(token)

  if (!studentId) return <DeVolta estado="sem-sessao" />

  const student = await withDb(() => prisma.student.findUnique({
    where: { id: studentId },
    select: { id: true, email: true, plan: true, planStatus: true, renewsAt: true },
  }))
  if (!student) return <DeVolta estado="sem-sessao" />

  // Já valendo: o webhook chegou antes da pessoa. É o caso comum.
  if (assinaturaValendo(student)) {
    return <DeVolta estado="liberado" studentId={student.id} />
  }

  // Ainda não: pode haver um aviso guardado esperando este e-mail.
  if (student.email) {
    try {
      const pago = await aplicarPagamentoPendente(student.email, student.id)
      if (pago) return <DeVolta estado="liberado" studentId={student.id} />
    } catch { /* a tela oferece tentar de novo */ }
  }

  return <DeVolta estado="esperando" studentId={student.id} />
}
