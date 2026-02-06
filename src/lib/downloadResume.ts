export async function downloadResume() {
  const url =
    "https://portfolio-es.s3.us-east-2.amazonaws.com/portfolio/documents/Emanuel-Sanchez-Resume.pdf";

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = "Emanuel-Sanchez-Resume.pdf";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
}
