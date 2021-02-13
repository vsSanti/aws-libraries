/**
 * Converte em objeto a string informada.
 * @param stringObject Objeto em string (`JSON.stringify`).
 * @returns Objeto a partir da string.
 */
function objectParser<T>(stringObject: string): T {
  const obj: T = JSON.parse(stringObject || '{}');

  return obj;
}

export default objectParser;
