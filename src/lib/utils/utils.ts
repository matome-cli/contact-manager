export function isValidEmail(email: string): boolean {
  const domains: string[] = ["gmail.com", "outlook.com", "icloud.com"];

  for (const domain of domains) {
    if (email.endsWith(domain)) {
      // get the index of the domain and calculate one less for the @ sign position
      const domainInEmailIndex: number = email.indexOf(domain) - 1;

      if (email.includes("@", domainInEmailIndex)) return true;
    }
  }

  return false;
}

export function resetInputs(inputRef: React.MutableRefObject<HTMLInputElement[]>): void {
  inputRef.current[0].value = "";
  inputRef.current[1].value = "";
}
