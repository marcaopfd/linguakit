import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { GrupoDoKit } from './trilhas/kit'

/**
 * O Kit de bolso em PDF.
 *
 * A5 de propósito: no celular ocupa a tela inteira sem precisar de zoom, e
 * impresso sai dois por folha A4 para dobrar e levar no bolso. É uma folha de
 * consulta, não uma lição — por isso é denso, sem exercício, sem explicação
 * longa, e cada frase ocupa duas linhas: o inglês e o que ele quer dizer.
 *
 * As cores são as da identidade, cravadas aqui porque o PDF não enxerga as
 * variáveis de CSS da página.
 */

const TINTA = '#14170f'
const CREME = '#f4f4ec'
const PAPEL = '#ffffff'
const BORDA = '#e0e0d3'
const CINZA = '#656b5b'
const LIMAO = '#cbf24d'
const AVISO = '#6d530c'
const AVISO_BG = '#f8efd2'

const S = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 9, color: TINTA, backgroundColor: CREME, padding: '1.2cm 1.1cm 1cm' },

  capa: { backgroundColor: TINTA, borderRadius: 8, padding: '14 14 16', marginBottom: 12 },
  capaSelo: { alignSelf: 'flex-start', backgroundColor: LIMAO, color: TINTA, fontFamily: 'Helvetica-Bold', fontSize: 7, letterSpacing: 1, padding: '3 7', borderRadius: 20, marginBottom: 8 },
  capaTitulo: { fontFamily: 'Helvetica-Bold', fontSize: 19, color: CREME, letterSpacing: -0.4 },
  capaSub: { fontSize: 8.5, color: 'rgba(244,244,236,0.7)', marginTop: 4, lineHeight: 1.4 },

  grupo: { marginTop: 10, marginBottom: 2 },
  grupoTitulo: { fontFamily: 'Helvetica-Bold', fontSize: 8, letterSpacing: 1.1, textTransform: 'uppercase', color: CINZA, marginBottom: 5 },

  frase: { backgroundColor: PAPEL, borderWidth: 1, borderColor: BORDA, borderRadius: 5, padding: '6 8', marginBottom: 4 },
  en: { fontFamily: 'Helvetica-Bold', fontSize: 10.5, color: TINTA },
  pt: { fontSize: 8.5, color: CINZA, marginTop: 1.5 },
  armadilha: { fontSize: 7.5, color: AVISO, backgroundColor: AVISO_BG, borderRadius: 3, padding: '3 5', marginTop: 4, lineHeight: 1.35 },

  rodape: { position: 'absolute', bottom: '0.8cm', left: '1.1cm', right: '1.1cm', flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 0.5, borderTopColor: BORDA, paddingTop: 5 },
  rodapeTexto: { fontSize: 7, color: CINZA },
})

export function KitDeBolsoPDF({ trilha, promessa, grupos }: {
  trilha: string
  promessa: string
  grupos: GrupoDoKit[]
}) {
  const total = grupos.reduce((n, g) => n + g.frases.length, 0)

  return (
    <Document title={`LinguaKit — Kit de bolso: ${trilha}`}>
      <Page size="A5" style={S.page} wrap>
        <View style={S.capa}>
          <Text style={S.capaSelo}>KIT DE BOLSO</Text>
          <Text style={S.capaTitulo}>{trilha}</Text>
          <Text style={S.capaSub}>
            {promessa}{'\n'}
            {total} frases para consultar sem internet — as que mais se erram na hora,
            e as que abrem cada conversa.
          </Text>
        </View>

        {grupos.map(grupo => (
          <View key={grupo.modulo} style={S.grupo} wrap={false}>
            <Text style={S.grupoTitulo}>{grupo.modulo}</Text>
            {grupo.frases.map(frase => (
              <View key={frase.en} style={S.frase} wrap={false}>
                <Text style={S.en}>{frase.en}</Text>
                <Text style={S.pt}>{frase.pt}</Text>
                {frase.armadilha && <Text style={S.armadilha}>{frase.armadilha}</Text>}
              </View>
            ))}
          </View>
        ))}

        <View style={S.rodape} fixed>
          <Text style={S.rodapeTexto}>LinguaKit · linguakit.vercel.app</Text>
          <Text
            style={S.rodapeTexto}
            render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  )
}
