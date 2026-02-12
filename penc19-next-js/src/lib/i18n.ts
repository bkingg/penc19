export const languages = ["en", "fr"];
export const defaultLanguage = "fr";

export function isValidLanguage(language: string) {
  return languages.includes(language);
}
