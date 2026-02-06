export function downloadResume() {
  const link = document.createElement("a");
  link.href = "/Emanuel-Sanchez-Resume.pdf";
  link.download = "Emanuel-Sanchez-Resume.pdf";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}
