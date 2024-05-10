export const tokenSchutz = async () => {
  try {
    const response = await fetch("/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch {
    throw new Error("Token-Check Fehler");
  }
};
