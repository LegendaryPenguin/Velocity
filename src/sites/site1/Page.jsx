import { useEffect, useState } from "react";
import PageGate from "../../components/PageGate";
import { useAuth } from "../../auth/AuthProvider";
import { loadViewData, saveViewData } from "../../db/userData";

export default function Site1() {
  const { user } = useAuth();
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await loadViewData(user.uid, "site1");
      if (data?.notes) setNotes(data.notes);
    })();
  }, [user]);

  const onSave = async () => {
    setStatus("Saving...");
    await saveViewData(user.uid, "site1", { notes });
    setStatus("Saved ✅");
    setTimeout(() => setStatus(""), 1200);
  };

  return (
    <PageGate title="Doctor View">
      <p>This is saved per Google account.</p>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Doctor notes..."
        rows={6}
        style={{ width: "100%", padding: 10 }}
      />

      <div style={{ marginTop: 12 }}>
        <button onClick={onSave} style={{ padding: "10px 14px", cursor: "pointer" }}>
          Save
        </button>
        <span style={{ marginLeft: 12 }}>{status}</span>
      </div>
    </PageGate>
  );
}
