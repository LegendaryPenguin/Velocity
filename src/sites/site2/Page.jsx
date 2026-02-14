import { useEffect, useState } from "react";
import PageGate from "../../components/PageGate";
import { useAuth } from "../../auth/AuthProvider";
import { loadViewData, saveViewData } from "../../db/userData";

export default function Site2() {
  const { user } = useAuth();
  const [queueName, setQueueName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await loadViewData(user.uid, "site2");
      if (data?.queueName) setQueueName(data.queueName);
    })();
  }, [user]);

  const onSave = async () => {
    setStatus("Saving...");
    await saveViewData(user.uid, "site2", { queueName });
    setStatus("Saved ✅");
    setTimeout(() => setStatus(""), 1200);
  };

  return (
    <PageGate title="Clearinghouse View">
      <p>Saved per Google account.</p>

      <input
        value={queueName}
        onChange={(e) => setQueueName(e.target.value)}
        placeholder="Clearinghouse queue name..."
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
