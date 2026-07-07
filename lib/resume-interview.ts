export function canGenerateResumeInterview({
  resumeText,
  resumeFile,
}: {
  resumeText: string;
  resumeFile: File | null;
}) {
  if (resumeFile) {
    return true;
  }

  return resumeText.trim().length >= 80;
}
