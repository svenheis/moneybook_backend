export const eintragErfassen = async (data) => {
  try {
    const response = await fetch("http://localhost:3500/api/eintrag", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return response.status;
  } catch (err) {
    const error = new HttpError("Eintrag hinzufügen misslungen", 500);
    return next(error);
  }
};
