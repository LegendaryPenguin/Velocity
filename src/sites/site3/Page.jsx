import { useEffect, useState } from "react";
import PageGate from "../../components/PageGate";
import { useAuth } from "../../auth/AuthProvider";
import { loadViewData, saveViewData } from "../../db/userData";

export default function Site3() {
  const { user } = useAuth();
  const [patientMessage, setPatientMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await loadViewData(user.uid, "site3");
      if (data?.patientMessage) setPatientMessage(data.patientMessage);
    })();
  }, [user]);

  const onSave = async () => {
    setStatus("Saving...");
    await saveViewData(user.uid, "site3", { patientMessage });
    setStatus("Saved ✅");
    setTimeout(() => setStatus(""), 1200);
  };

  return (
    <PageGate title="Patient View">
      <p>Saved per Google account.</p>

      <textarea
        value={patientMessage}
        onChange={(e) => setPatientMessage(e.target.value)}
        placeholder="Patient notes..."
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
