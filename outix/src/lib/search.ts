// Lowercase and strip accents so "é" matches "e"
function normalize(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

export function matchesSearch(search: string, ...fields: string[]) {
  return normalize(fields.join(" ")).includes(normalize(search.trim()))
}