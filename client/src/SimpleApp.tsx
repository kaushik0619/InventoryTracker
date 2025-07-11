import { useState } from "react";

export default function SimpleApp() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "#f0f0f0", 
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>InventoryPro - Simple Test</h1>
      <p>If you can see this, React is working!</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Click me: {count}
      </button>
      <div style={{ marginTop: "20px" }}>
        <p>Server Status: Running</p>
        <p>React Status: Working</p>
      </div>
    </div>
  );
}