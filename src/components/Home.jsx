import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Velocity Portal</h1>

      <div style={{ marginTop: 40 }}>
        <button onClick={() => navigate("/site1")} style={btn}>Doctor View</button>
        <button onClick={() => navigate("/site2")} style={btn}>Clearinghouse View</button>
        <button onClick={() => navigate("/site3")} style={btn}>Patient View</button>
      </div>
    </div>
  );
}

const btn = {
  display: "block",
  width: 260,
  margin: "16px auto",
  padding: "14px 16px",
  fontSize: 18,
  cursor: "pointer",
};
