// Alle Einträge ausgeben
export const fetchEingaenge = async () => {
  try {
    const response = await fetch("http://localhost:3500/api/eintrag", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data.eintrag;
  } catch {
    throw new Error("Fehler beim Ausgeben der Einträge");
  }
};

// Eintrag löschen
export const eintragLoeschen = async (id) => {
  try {
    const response = await fetch(`http://localhost:3500/api/eintrag/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      return id;
    } else {
      throw new Error("Fehler beim Löschen des Eintrags");
    }
  } catch {
    throw new Error("Fehler beim Löschen");
  }
};
