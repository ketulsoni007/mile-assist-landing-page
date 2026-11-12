import fs from "fs";
import path from "path";

/**
 * Tiny parser for the legal pages in content/legal/*.md (kept as plain text so the policy wording can be
 * pasted in verbatim). Supports: front matter, ## / ### headings, "- " and "1. " lists, "> " quotes,
 * paragraphs, and **bold**. Runs at build time only (pages are statically prerendered).
 */

export type Block =
  | { type: "h2" | "h3"; text: string; id: string }
  | { type: "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] };

export type LegalDoc = {
  meta: { title: string; updated?: string; summary?: string; eyebrow?: string };
  blocks: Block[];
  toc: { id: string; text: string }[];
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

export function parseLegal(raw: string, idPrefix = ""): LegalDoc {
  let body = raw.replace(/\r\n/g, "\n");
  const meta: LegalDoc["meta"] = { title: "" };
  const fm = body.match(/^---\n([\s\S]*?)\n---\n/);
  if (fm) {
    for (const line of fm[1].split("\n")) {
      const m = line.match(/^(\w+):\s*(.*)$/);
      if (m) (meta as Record<string, string>)[m[1]] = m[2].trim();
    }
    body = body.slice(fm[0].length);
  }

  const blocks: Block[] = [];
  const toc: LegalDoc["toc"] = [];
  const used = new Map<string, number>();
  const uid = (t: string) => {
    const base = idPrefix + slug(t);
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return n ? `${base}-${n}` : base;
  };

  let para: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  const flush = () => {
    if (para.length) blocks.push({ type: "p", text: para.join(" ") });
    if (list) blocks.push(list);
    para = [];
    list = null;
  };

  for (const rawLine of body.split("\n")) {
    const line = rawLine.trim();
    if (!line) {
      flush();
      continue;
    }
    let m;
    if ((m = line.match(/^(##|###)\s+(.*)$/))) {
      flush();
      const type = m[1] === "##" ? "h2" : "h3";
      const id = uid(m[2]);
      blocks.push({ type, text: m[2], id });
      if (type === "h2") toc.push({ id, text: m[2] });
    } else if ((m = line.match(/^-\s+(.*)$/))) {
      if (para.length) flush();
      if (!list || list.type !== "ul") {
        flush();
        list = { type: "ul", items: [] };
      }
      list.items.push(m[1]);
    } else if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      if (para.length) flush();
      if (!list || list.type !== "ol") {
        flush();
        list = { type: "ol", items: [] };
      }
      list.items.push(m[1]);
    } else if ((m = line.match(/^>\s*(.*)$/))) {
      flush();
      blocks.push({ type: "quote", text: m[1] });
    } else {
      if (list) flush();
      para.push(line);
    }
  }
  flush();
  return { meta, blocks, toc };
}

export function loadLegal(file: string, idPrefix = ""): LegalDoc {
  return parseLegal(fs.readFileSync(path.join(process.cwd(), "content", "legal", `${file}.md`), "utf8"), idPrefix);
}

export const legalPages = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/cancellation-policy", label: "Cancellation Policy" },
  { href: "/partner-agreement", label: "Partner Agreement" },
];
