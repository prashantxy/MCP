export function detectSecrets(code: string) {

  const patterns = [
    /sk-[A-Za-z0-9]{20,}/g,
    /AKIA[0-9A-Z]{16}/g,
    /api[_-]?key\s*=\s*["'][^"']+/i
  ];

  let findings: string[] = [];

  patterns.forEach((pattern) => {

    const match = code.match(pattern);

    if (match) findings.push(match[0]);

  });

  return findings;
}
