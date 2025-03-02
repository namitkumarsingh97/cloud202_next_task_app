export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside
      style={{
        width: "16rem",
        backgroundColor: "#f3f4f6",
        height: "100vh",
        padding: "1rem",
      }}
    >
      <h3 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
        Configuration Steps
      </h3>
      <ul style={{ marginTop: "1rem", listStyleType: "none", padding: 0 }}>
        {[
          "Basic Config",
          "RAG",
          "Workflows",
          "Security Overview",
          "Overview",
        ].map((item, index) => (
          <li
            key={index}
            style={{
              padding: "0.5rem",
              borderRadius: "0.375rem",
              // cursor: "pointer",
              transition: "background-color 0.2s",
              textDecoration: "none",
              backgroundColor: activeTab === item ? "#1F2937" : "transparent",
              color: activeTab === item ? "white" : "black",
              fontWeight: activeTab === item ? "bold" : "normal",
            }}
            // onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
            // onMouseLeave={(e) =>
            //   (e.target.style.backgroundColor = "transparent")
            // }
            // onClick={() => setActiveTab(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
