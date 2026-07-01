import { useEffect, useState } from "react";

function toMultiline(value) {
  return Array.isArray(value) ? value.join("\n") : value || "";
}

function fromMultiline(value) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function Field({ label, children }) {
  return <label className="cms-field"><span>{label}</span>{children}</label>;
}

export function ProjectCmsEditor({ project, onSave, onCancel, onReset }) {
  const [form, setForm] = useState(() => ({
    title: project.title || "",
    shortDescription: project.shortDescription || project.goal || "",
    goal: project.goal || "",
    themeCategory: project.themeCategory || "",
    grade: project.grade || "",
    month: project.month || "",
    technique: project.technique || "",
    duration: project.duration || "",
    difficulty: project.difficulty || "",
    materialsText: toMultiline(project.materials),
    procedureText: toMultiline(project.procedure),
    teacherNotes: project.teacherNotes || "",
    keywords: project.theme || "",
  }));

  useEffect(() => {
    setForm({
      title: project.title || "",
      shortDescription: project.shortDescription || project.goal || "",
      goal: project.goal || "",
      themeCategory: project.themeCategory || "",
      grade: project.grade || "",
      month: project.month || "",
      technique: project.technique || "",
      duration: project.duration || "",
      difficulty: project.difficulty || "",
      materialsText: toMultiline(project.materials),
      procedureText: toMultiline(project.procedure),
      teacherNotes: project.teacherNotes || "",
      keywords: project.theme || "",
    });
  }, [project]);

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event) {
    event.preventDefault();
    onSave({
      title: form.title.trim(),
      shortDescription: form.shortDescription.trim(),
      goal: form.goal.trim(),
      themeCategory: form.themeCategory.trim(),
      grade: form.grade.trim(),
      month: form.month.trim(),
      technique: form.technique.trim(),
      duration: form.duration.trim(),
      difficulty: form.difficulty.trim(),
      materials: fromMultiline(form.materialsText),
      procedure: fromMultiline(form.procedureText),
      teacherNotes: form.teacherNotes.trim(),
      theme: form.keywords.trim(),
    });
  }

  return (
    <form className="cms-editor panel" onSubmit={submit}>
      <div className="cms-editor-header">
        <div>
          <h3>Upraviť údaje témy</h3>
          <p>Upravuješ iba textové údaje. Fotografie sa nemenia.</p>
        </div>
        <button type="button" className="secondary" onClick={onCancel}>Zrušiť</button>
      </div>

      <div className="cms-grid">
        <Field label="Názov projektu"><input value={form.title} onChange={(e) => update("title", e.target.value)} /></Field>
        <Field label="Téma"><input value={form.themeCategory} onChange={(e) => update("themeCategory", e.target.value)} /></Field>
        <Field label="Ročník"><input value={form.grade} onChange={(e) => update("grade", e.target.value)} /></Field>
        <Field label="Mesiac"><input value={form.month} onChange={(e) => update("month", e.target.value)} /></Field>
        <Field label="Technika"><input value={form.technique} onChange={(e) => update("technique", e.target.value)} /></Field>
        <Field label="Čas"><input value={form.duration} onChange={(e) => update("duration", e.target.value)} /></Field>
        <Field label="Náročnosť"><input value={form.difficulty} onChange={(e) => update("difficulty", e.target.value)} /></Field>
        <Field label="Kľúčové slová"><input value={form.keywords} onChange={(e) => update("keywords", e.target.value)} /></Field>
      </div>

      <Field label="Krátky popis"><textarea rows="3" value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} /></Field>
      <Field label="Cieľ hodiny"><textarea rows="3" value={form.goal} onChange={(e) => update("goal", e.target.value)} /></Field>
      <Field label="Pomôcky – každá položka na nový riadok"><textarea rows="6" value={form.materialsText} onChange={(e) => update("materialsText", e.target.value)} /></Field>
      <Field label="Postup – každý krok na nový riadok"><textarea rows="7" value={form.procedureText} onChange={(e) => update("procedureText", e.target.value)} /></Field>
      <Field label="Metodické poznámky"><textarea rows="4" value={form.teacherNotes} onChange={(e) => update("teacherNotes", e.target.value)} /></Field>

      <div className="cms-actions">
        <button type="submit">Uložiť úpravy</button>
        <button type="button" className="secondary" onClick={onCancel}>Zrušiť</button>
        <button type="button" className="danger-secondary" onClick={onReset}>Vrátiť pôvodné údaje</button>
      </div>
    </form>
  );
}
