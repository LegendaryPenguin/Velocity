import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Velocity Portal</h1>

      <div style={{ marginTop: "40px" }}>
        <button
          onClick={() => navigate("/site1")}
          style={buttonStyle}
        >
          Doctor View
        </button>

        <button
          onClick={() => navigate("/site2")}
          style={buttonStyle}
        >
          Clearinghouse View
        </button>

        <button
          onClick={() => navigate("/site3")}
          style={buttonStyle}
        >
          Patient View
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  display: "block",
  width: "250px",
  margin: "20px auto",
  padding: "15px",
  fontSize: "18px",
  cursor: "pointer",
};

export default Home;
