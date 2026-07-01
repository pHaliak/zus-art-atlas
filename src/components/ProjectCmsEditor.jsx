import { useEffect, useState } from "react";

function toMultiline(value) {
  if (Array.isArray(value)) return value.join("\n");
  return value || "";
}

function fromMultiline(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function Field({ label, children }) {
  return (
    <label className="cms-field">
      <span>{label}</span>
      {children}
    </label>
  );
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
          <p>Úpravy sa uložia lokálne v tejto aplikácii. Fotografie a galéria sa nemenia.</p>
        </div>
        <button type="button" className="secondary" onClick={onCancel}>Zrušiť</button>
      </div>

      <div className="cms-grid">
        <Field label="Názov projektu">
          <input value={form.title} onChange={(event) => update("title", event.target.value)} />
        </Field>

        <Field label="Téma">
          <input value={form.themeCategory} onChange={(event) => update("themeCategory", event.target.value)} />
        </Field>

        <Field label="Ročník">
          <input value={form.grade} onChange={(event) => update("grade", event.target.value)} />
        </Field>

        <Field label="Mesiac">
          <input value={form.month} onChange={(event) => update("month", event.target.value)} />
        </Field>

        <Field label="Technika">
          <input value={form.technique} onChange={(event) => update("technique", event.target.value)} />
        </Field>

        <Field label="Čas">
          <input value={form.duration} onChange={(event) => update("duration", event.target.value)} />
        </Field>

        <Field label="Náročnosť">
          <input value={form.difficulty} onChange={(event) => update("difficulty", event.target.value)} />
        </Field>

        <Field label="Kľúčové slová">
          <input value={form.keywords} onChange={(event) => update("keywords", event.target.value)} />
        </Field>
      </div>

      <Field label="Krátky popis">
        <textarea rows="3" value={form.shortDescription} onChange={(event) => update("shortDescription", event.target.value)} />
      </Field>

      <Field label="Cieľ hodiny">
        <textarea rows="3" value={form.goal} onChange={(event) => update("goal", event.target.value)} />
      </Field>

      <Field label="Pomôcky – každá položka na nový riadok">
        <textarea rows="6" value={form.materialsText} onChange={(event) => update("materialsText", event.target.value)} />
      </Field>

      <Field label="Postup – každý krok na nový riadok">
        <textarea rows="7" value={form.procedureText} onChange={(event) => update("procedureText", event.target.value)} />
      </Field>

      <Field label="Metodické poznámky">
        <textarea rows="4" value={form.teacherNotes} onChange={(event) => update("teacherNotes", event.target.value)} />
      </Field>

      <div className="cms-actions">
        <button type="submit">Uložiť úpravy</button>
        <button type="button" className="secondary" onClick={onCancel}>Zrušiť</button>
        <button type="button" className="danger-secondary" onClick={onReset}>Vrátiť pôvodné údaje</button>
      </div>
    </form>
  );
}
