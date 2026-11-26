# Montar o produto na Kiwify

Tudo que está aqui é para **copiar e colar**. Os números e os preços foram
tirados do próprio código (`lib/numeros.ts` e `lib/precos.ts`) na data abaixo,
então eles batem com o que o site mostra. Se mudar o preço, mude em
`lib/precos.ts` — as telas leem de lá — e volte aqui.

Conferido em 26 de novembro de 2026: 18 módulos, 39 lições, 273 frases,
195 exercícios, 6 conversas, 40 músicas.

O endereço do site é **lingua-kit.com.br** (sem www — o www redireciona para
ele). O antigo `linguakit.vercel.app` continua funcionando, mas é o novo que
vai em todo lugar daqui para a frente.

---

## 1. Três coisas que quebram tudo se forem feitas errado

**a) O produto tem que ser ASSINATURA (recorrente), não pagamento único.**
Se o anual for cadastrado como pagamento único, a Kiwify não manda o objeto
`Subscription` no aviso, e o site não tem como saber até quando o acesso vale.
R$ 149 viram curso para sempre.

**b) NÃO ative período de teste grátis.**
A página de vendas diz, com todas as letras: *"não é um teste de 7 dias que
vira cobrança"*. Ligar um trial transforma essa frase em mentira. O que é
grátis no LinguaKit é grátis para sempre e não pede cartão — é outro modelo.

**c) O webhook precisa estar configurado ANTES da primeira venda.**
Sem ele, o dinheiro entra e o acesso não abre. Está no passo 6.

---

## 2. Nome do produto

```text
LinguaKit — Inglês para morar fora e viajar
```

Esse nome aparece no checkout e na fatura do cartão. Se a Kiwify pedir um
nome curto para a fatura, use:

```text
LINGUAKIT
```

Nome que a pessoa não reconhece na fatura é o principal motivo de chargeback
em produto digital. Vale a pena conferir onde esse texto aparece.

---

## 3. Descrição

### Curta (uma ou duas linhas, para o checkout)

```text
Curso de inglês organizado pelo motivo de quem estuda: imigração, aluguel, entrevista de emprego, cozinha, obra e mercado. Com áudio, sotaque escolhível e conversas para treinar negociação.
```

### Longa (para a página do produto na Kiwify)

```text
O LinguaKit é um curso de inglês organizado pelo MOTIVO de quem estuda, e não
pelo capítulo de gramática.

Quem vai morar fora não precisa primeiro do present perfect: precisa das cinco
perguntas da imigração, do vocabulário do contrato de aluguel, do que dizer
numa entrevista e de como pedir desconto sem ofender. É isso que está aqui.

O que o plano abre:

• 18 módulos em duas trilhas — Inglês de Viagem (8 módulos) e Morar e
  Trabalhar Fora (10 módulos), com 39 lições
• 273 frases em inglês e português, cada uma com a armadilha que ela esconde
• 195 exercícios de ouvir, escrever e gramática
• 6 conversas com personagem — o vendedor do mercado, o taxista sem taxímetro,
  a recepção do hotel, o corretor, o chef na entrevista. Cada escolha muda o
  preço, e no fim você vê quanto economizou.
• 40 músicas com trecho, vocabulário do tema e perguntas
• Kit de bolso: as 50 frases mais importantes da sua trilha num PDF de duas
  páginas, para usar no balcão do aeroporto sem internet

O que é grátis para sempre, sem cartão e sem prazo: o curso completo do A1 ao
C2 com 50 unidades, o teste de nível, a palavra do dia, a revisão dos seus
erros, o primeiro módulo de cada trilha e a primeira música de cada tipo.

Cada frase foi escrita à mão, uma por uma. Nada é gerado por inteligência
artificial na hora, o que significa que a resposta é sempre a mesma, sempre
correta, e funciona com o celular no modo avião.

Quinze minutos por dia. A Trilha Viagem inteira dá três semanas nesse ritmo;
a de morar fora, seis.
```

---

## 4. As duas ofertas

| Oferta | Valor | Frequência | Observação |
|---|---|---|---|
| **Anual** | R$ 149,00 | anual (`annually`) | marque como recomendada |
| **Mensal** | R$ 19,90 | mensal (`monthly`) | |

Os valores precisam ser **exatamente** esses: o site anuncia R$ 149 por ano
(R$ 12,42 por mês, 37% mais barato) e R$ 19,90 por mês. Preço anunciado
diferente do cobrado é publicidade enganosa pelo CDC, art. 37.

Nome das ofertas, se a Kiwify pedir:

```text
Plano anual — 12 meses
```
```text
Plano mensal
```

---

## 5. Links

| Campo na Kiwify | O que colar |
|---|---|
| Página de vendas | `https://lingua-kit.com.br/ingles-para-morar-fora` |
| Página de obrigado / redirecionamento após a compra | `https://lingua-kit.com.br/obrigado` |
| Termos de uso | `https://lingua-kit.com.br/termos` |
| Política de privacidade | `https://lingua-kit.com.br/privacidade` |
| Reembolso e cancelamento | `https://lingua-kit.com.br/reembolso` |
| Contato / suporte | `https://lingua-kit.com.br/contato` |
| Dúvidas respondidas | `https://lingua-kit.com.br/duvidas` |

Essas quatro últimas existem porque a Kiwify, o Google Ads e o Meta conferem
se há política publicada antes de aprovar anúncio e saque.

---

## 5b. Imagem de capa

```text
https://lingua-kit.com.br/ingles-para-morar-fora/opengraph-image
```

Abra esse link e salve a imagem: 1200×630, no mesmo preto e limão do produto,
com os números lidos do conteúdo de verdade. Se a Kiwify pedir um formato
quadrado, corte pelo centro — o título continua legível.

Não use a capa antiga do site (`/opengraph-image`): aquela anuncia o curso
GRÁTIS ("do zero ao avançado, 6 níveis, 50 unidades"), que é a oferta errada
para o checkout de um produto pago.

---

## 6. Webhook

| Campo | Valor |
|---|---|
| URL | `https://lingua-kit.com.br/api/webhook/kiwify` |
| Token | gere com `openssl rand -hex 24` e cole o MESMO valor aqui e na Vercel |

Gatilhos para **marcar**:

- `compra_aprovada`
- `compra_reembolsada`
- `chargeback`
- `subscription_renewed`
- `subscription_canceled`
- `subscription_late`

Gatilhos para **deixar desmarcados**: boleto gerado, pix gerado, compra
recusada, carrinho abandonado. Boleto *gerado* não é boleto *pago* — o código
ignora de propósito, mas não precisa do tráfego.

Depois de criar, use **Testar Webhook** no painel com `compra_aprovada` e me
mande o payload que aparecer em **Ver logs**.

---

## 7. Variáveis na Vercel

Settings → Environment Variables, ambiente **Production**:

| Nome | Valor |
|---|---|
| `KIWIFY_WEBHOOK_SECRET` | o token do passo 6 |
| `KIWIFY_LINK_MENSAL` | link de checkout da oferta mensal |
| `KIWIFY_LINK_ANUAL` | link de checkout da oferta anual |
| `LINGUAKIT_SUPORTE` | o e-mail de suporte, quando o domínio existir |

**Variável nova não entra em deploy que já existe.** Depois de salvar, precisa
de um redeploy.

---

## 8. Garantia

7 dias corridos a partir da compra, como está em `/reembolso`.

Não anuncie isso como diferencial: o direito de arrependimento de 7 dias é
obrigatório por lei em compra online no Brasil (CDC, art. 49). Vender
obrigação legal como bônus é o tipo de coisa que o comprador atento percebe.

---

## 9. O que NÃO ligar

- **Período de teste grátis** — contradiz a página de vendas (ver item 1b)
- **Order bump e upsell** — a página inteira foi construída em cima de ter um
  destino só. Duas ofertas competindo na mesma tela derrubam a conversão.
- **Contador regressivo, "últimas vagas", preço riscado** — não existe nenhum
  no site, de propósito. Vendendo para quem está prestes a mudar de país, a
  confiança é o ativo.

---

## 10. Para conferir depois de criar

- [ ] As duas ofertas são assinatura, não pagamento único
- [ ] Nenhum período de teste ativo
- [ ] R$ 149,00 e R$ 19,90, exatos
- [ ] Página de obrigado apontando para `/obrigado`
- [ ] Webhook criado, com o mesmo token da Vercel
- [ ] Redeploy feito depois de salvar as variáveis
- [ ] "Testar Webhook" disparado e o log conferido
- [ ] Quais formas de pagamento a Kiwify realmente oferece para assinatura
      (ver a nota abaixo)

### A nota sobre formas de pagamento

O FAQ da página de vendas diz *"o pagamento é pela Kiwify, com Pix, boleto ou
cartão parcelado"*. Isso é verdade para produto de pagamento único; para
ASSINATURA, nem toda forma costuma estar disponível — boleto e parcelamento,
em particular. Veja no painel o que a Kiwify oferece de fato para a sua
assinatura e me diga, que eu acerto a frase. É a mesma família do problema da
pausa: promessa na copy que a plataforma não entrega.
