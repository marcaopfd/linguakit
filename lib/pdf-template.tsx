import {
  Document, Page, Text, View, StyleSheet, Font,
} from '@react-pdf/renderer'
import { Module, Unit } from './curriculum'

// ── Styles ──────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#1a1814', backgroundColor: '#faf8f3', padding: '2cm 2cm 1.5cm' },
  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, paddingBottom: 10, borderBottomWidth: 1.5, borderBottomColor: '#1a1814' },
  headerTitle: { fontFamily: 'Helvetica-Bold', fontSize: 20, letterSpacing: -0.5 },
  headerSub: { fontSize: 9, color: '#8a8578', marginTop: 2 },
  headerBadge: { fontFamily: 'Helvetica-Bold', fontSize: 28, color: '#1a1814' },
  // Section headings
  sectionLabel: { fontFamily: 'Helvetica-Bold', fontSize: 7.5, textTransform: 'uppercase', letterSpacing: 1.2, color: '#8a8578', marginBottom: 6, marginTop: 14 },
  // Vocab
  vocabGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  vocabCard: { width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2ddd4', borderRadius: 5, padding: 7, marginBottom: 5 },
  vocabPt: { fontFamily: 'Helvetica-Bold', fontSize: 12, color: '#1a1814', marginBottom: 1 },
  vocabEn: { fontSize: 8.5, color: '#8a8578', marginBottom: 3 },
  vocabEx: { fontSize: 8, color: '#3d3a34', fontStyle: 'italic' },
  vocabExEn: { fontSize: 7.5, color: '#8a8578' },
  // Grammar
  grammarBox: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2ddd4', borderRadius: 6, overflow: 'hidden', marginBottom: 4 },
  grammarHeader: { backgroundColor: '#1a1814', padding: '8 10', marginBottom: 0 },
  grammarHeaderTitle: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#faf8f3', marginBottom: 2 },
  grammarHeaderSub: { fontSize: 8.5, color: 'rgba(250,248,243,0.65)' },
  grammarBody: { padding: '8 10' },
  grammarStructure: { fontFamily: 'Helvetica', fontSize: 9, backgroundColor: '#f3f0e8', borderWidth: 1, borderColor: '#e2ddd4', borderRadius: 4, padding: '4 7', marginBottom: 7, color: '#2d6a4f' },
  grammarExRow: { flexDirection: 'row', paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: '#e2ddd4' },
  grammarExPt: { fontFamily: 'Helvetica-Bold', fontSize: 9, flex: 1 },
  grammarExEn: { fontSize: 9, color: '#8a8578', flex: 1 },
  // Mistakes
  mistakeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 5, backgroundColor: '#fdecea', borderRadius: 5, padding: '5 8' },
  mistakeWrong: { fontSize: 9, color: '#c0392b', fontFamily: 'Helvetica-Bold', textDecoration: 'line-through', flex: 1 },
  mistakeCorrect: { fontSize: 9, color: '#2d6a4f', fontFamily: 'Helvetica-Bold', flex: 1 },
  mistakeNote: { fontSize: 8, color: '#3d3a34', marginTop: 2 },
  // Dialogue
  dialogueLine: { flexDirection: 'row', gap: 7, marginBottom: 6, alignItems: 'flex-start' },
  dialogueAvatar: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#1a1814', flexShrink: 0 },
  dialogueAvatarB: { backgroundColor: '#c9a84c' },
  dialoguePt: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, marginBottom: 1 },
  dialogueEn: { fontSize: 8.5, color: '#8a8578' },
  // Exercises
  exBlock: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2ddd4', borderRadius: 5, padding: '8 10', marginBottom: 7 },
  exType: { fontFamily: 'Helvetica-Bold', fontSize: 7, textTransform: 'uppercase', letterSpacing: 0.8, color: '#8a8578', marginBottom: 3 },
  exInstruction: { fontSize: 8.5, color: '#3d3a34', marginBottom: 6 },
  exItem: { fontSize: 9.5, marginBottom: 4 },
  exBlank: { color: '#8a8578', borderBottomWidth: 1, borderBottomColor: '#8a8578' },
  exOptRow: { flexDirection: 'row', gap: 10, marginTop: 2, flexWrap: 'wrap' },
  exOpt: { fontSize: 8.5, borderWidth: 1, borderColor: '#e2ddd4', borderRadius: 4, padding: '2 6', backgroundColor: '#fff' },
  // Culture
  cultureBox: { backgroundColor: '#fdf3dc', borderWidth: 1, borderColor: '#e8d48a', borderRadius: 6, padding: '8 10' },
  cultureTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#1a1814', marginBottom: 5 },
  cultureText: { fontSize: 9, color: '#6b4f0d', lineHeight: 1.6 },
  // Teacher tip
  tipBox: { backgroundColor: '#edf7ed', borderWidth: 1, borderColor: '#b7e4c7', borderRadius: 5, padding: '6 9', marginTop: 8 },
  tipLabel: { fontFamily: 'Helvetica-Bold', fontSize: 7, textTransform: 'uppercase', letterSpacing: 0.8, color: '#2d6a4f', marginBottom: 3 },
  tipText: { fontSize: 8.5, color: '#1f6b2e', lineHeight: 1.5 },
  // Footer
  footer: { position: 'absolute', bottom: '1cm', left: '2cm', right: '2cm', flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 0.5, borderTopColor: '#e2ddd4', paddingTop: 5 },
  footerText: { fontSize: 7.5, color: '#8a8578' },
})

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  mod: Module
  unit: Unit
  unitIndex: number
}

export function UnitPDF({ mod, unit, unitIndex }: Props) {
  return (
    <Document title={`LinguaKit — ${mod.label} Unit ${unitIndex + 1}: ${unit.title}`} author="LinguaKit by Marcos">

      {/* ── PAGE 1: Vocab + Grammar + Mistakes ── */}
      <Page size="A4" style={S.page}>
        {/* Header */}
        <View style={S.header}>
          <View>
            <Text style={S.headerTitle}>🇧🇷 LinguaKit</Text>
            <Text style={S.headerSub}>{mod.label} · {mod.name} · Unit {unitIndex + 1} of {mod.units.length}</Text>
            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 14, marginTop: 4 }}>{unit.emoji} {unit.title}</Text>
            <Text style={{ fontSize: 9, color: '#8a8578', marginTop: 2 }}>{unit.sub} · {unit.duration}</Text>
          </View>
          <Text style={S.headerBadge}>{mod.label}</Text>
        </View>

        {/* Objectives */}
        <Text style={S.sectionLabel}>🎯 Learning Objectives</Text>
        <View style={{ backgroundColor: '#d8f3dc', borderRadius: 5, padding: '6 10', marginBottom: 4 }}>
          {unit.objectives.map((obj, i) => (
            <Text key={i} style={{ fontSize: 9, color: '#2d6a4f', marginBottom: 2 }}>✓  {obj}</Text>
          ))}
        </View>

        {/* Vocabulary */}
        <Text style={S.sectionLabel}>📖 Vocabulary</Text>
        <View style={S.vocabGrid}>
          {unit.vocabulary.map((v, i) => (
            <View key={i} style={S.vocabCard}>
              <Text style={S.vocabPt}>{v.pt}</Text>
              <Text style={S.vocabEn}>{v.en}</Text>
              <Text style={S.vocabEx}>{v.ex}</Text>
              <Text style={S.vocabExEn}>{v.exEn}</Text>
            </View>
          ))}
          {unit.extraVocab?.map((v, i) => (
            <View key={`ex-${i}`} style={[S.vocabCard, { borderStyle: 'dashed', borderColor: '#c9a84c' }]}>
              <Text style={S.vocabPt}>{v.pt}</Text>
              <Text style={S.vocabEn}>{v.en}</Text>
              <Text style={S.vocabEx}>{v.ex}</Text>
              <Text style={S.vocabExEn}>{v.exEn}</Text>
            </View>
          ))}
        </View>

        {/* Grammar */}
        <Text style={S.sectionLabel}>⚙️ Grammar — {unit.grammar.title}</Text>
        <View style={S.grammarBox}>
          <View style={S.grammarHeader}>
            <Text style={S.grammarHeaderTitle}>{unit.grammar.title}</Text>
            <Text style={S.grammarHeaderSub}>{unit.grammar.explain}</Text>
          </View>
          <View style={S.grammarBody}>
            <Text style={S.grammarStructure}>{unit.grammar.structure}</Text>
            {[...unit.grammar.examples, ...(unit.grammar.extendedExamples ?? [])].map((ex, i) => (
              <View key={i} style={[S.grammarExRow, i === unit.grammar.examples.length + (unit.grammar.extendedExamples?.length ?? 0) - 1 ? { borderBottomWidth: 0 } : {}]}>
                <Text style={S.grammarExPt}>{ex.pt}</Text>
                <Text style={S.grammarExEn}>{ex.en}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Common mistakes */}
        {unit.commonMistakes && unit.commonMistakes.length > 0 && (
          <>
            <Text style={S.sectionLabel}>⚠️ Common Mistakes</Text>
            {unit.commonMistakes.map((m, i) => (
              <View key={i} style={S.mistakeRow}>
                <View style={{ flex: 1 }}>
                  <Text style={S.mistakeWrong}>✗  {m.wrong}</Text>
                  <Text style={S.mistakeCorrect}>✓  {m.correct}</Text>
                  {(m.note || m.en) && <Text style={S.mistakeNote}>{m.note ?? m.en}</Text>}
                </View>
              </View>
            ))}
          </>
        )}

        <View style={S.footer} fixed>
          <Text style={S.footerText}>LinguaKit — {mod.label} · {unit.title} (p. 1)</Text>
          <Text style={S.footerText}>by Marcos · linguakit.vercel.app</Text>
        </View>
      </Page>

      {/* ── PAGE 2: Dialogue + Exercises + Culture ── */}
      <Page size="A4" style={S.page}>
        <View style={S.header}>
          <View>
            <Text style={S.headerTitle}>🇧🇷 LinguaKit</Text>
            <Text style={S.headerSub}>{mod.label} · {unit.title} — Dialogue & Exercises</Text>
          </View>
          <Text style={S.headerBadge}>{mod.label}</Text>
        </View>

        {/* Dialogue */}
        <Text style={S.sectionLabel}>💬 Dialogue — {unit.dialogue.scene}</Text>
        <View style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2ddd4', borderRadius: 6, padding: '8 10', marginBottom: 4 }}>
          <Text style={{ fontSize: 8, color: '#8a8578', fontStyle: 'italic', marginBottom: 7 }}>📍 {unit.dialogue.scene}</Text>
          {unit.dialogue.lines.map((line, i) => (
            <View key={i} style={S.dialogueLine}>
              <View style={[S.dialogueAvatar, line.sp === 'b' ? S.dialogueAvatarB : {}]} />
              <View style={{ flex: 1 }}>
                <Text style={S.dialoguePt}>{line.pt}</Text>
                <Text style={S.dialogueEn}>{line.en}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Exercises */}
        <Text style={S.sectionLabel}>✏️ Exercises</Text>
        {[...unit.exercises, ...(unit.extraExercises ?? [])].map((ex, ei) => (
          <View key={ei} style={S.exBlock}>
            <Text style={S.exType}>{ex.type}</Text>
            <Text style={S.exInstruction}>{ex.instruction}</Text>
            {ex.items.map((item, ii) => (
              <View key={ii} style={{ marginBottom: 5 }}>
                <Text style={S.exItem}>{ii + 1}.  {item.q}</Text>
                {item.opts ? (
                  <View style={S.exOptRow}>
                    {item.opts.map((opt, oi) => (
                      <Text key={oi} style={S.exOpt}>{opt}</Text>
                    ))}
                  </View>
                ) : (
                  <Text style={{ fontSize: 9, color: '#8a8578', marginLeft: 14, marginTop: 2 }}>
                    Answer: _______________________________________________
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}

        {/* Cultural note */}
        <Text style={S.sectionLabel}>🇧🇷 Cultural Note</Text>
        <View style={S.cultureBox}>
          <Text style={S.cultureTitle}>{unit.culture.title}</Text>
          <Text style={S.cultureText}>{unit.culture.text}</Text>
        </View>

        {/* Teacher tip */}
        {unit.teacherTip && (
          <View style={S.tipBox}>
            <Text style={S.tipLabel}>📋 Teacher Tip</Text>
            <Text style={S.tipText}>{unit.teacherTip}</Text>
          </View>
        )}

        <View style={S.footer} fixed>
          <Text style={S.footerText}>LinguaKit — {mod.label} · {unit.title} (p. 2)</Text>
          <Text style={S.footerText}>by Marcos · linguakit.vercel.app</Text>
        </View>
      </Page>

    </Document>
  )
}
