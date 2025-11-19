export async function fetchUserSessions(userId: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/sessions/${userId}`);
    const json = await res.json();
    return json.sessions || [];
  } catch (err) {
    console.error("Failed to fetch sessions:", err);
    return [];
  }
}
