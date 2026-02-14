import { useAuth } from "../auth/AuthProvider";

export default function PageGate({ title, children }) {
  const { user, loading, loginWithGoogle, logout } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  if (!user) {
    return (
      <div style={{ padding: 24, textAlign: "center", marginTop: 80 }}>
        <h1>{title}</h1>
        <p>Sign in with Google to access this view.</p>
        <button onClick={loginWithGoogle} style={btn}>
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <small>Logged in as: {user.email}</small>
        </div>
        <button onClick={logout} style={btnSecondary}>Log out</button>
      </div>

      <hr style={{ margin: "16px 0" }} />
      {children}
    </div>
  );
}

const btn = { padding: "12px 18px", fontSize: 16, cursor: "pointer" };
const btnSecondary = { padding: "10px 14px", fontSize: 14, cursor: "pointer" };
