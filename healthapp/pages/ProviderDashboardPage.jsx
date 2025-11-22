import React, { useEffect, useState } from "react";

export default function ProviderDashboardPage() {
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);

  // Load mock patients for now (replace with API later)
  useEffect(() => {
    setPatients([
      {
        id: 1,
        name: "Amita Sharma",
        email: "amita@example.com",
        goals: [{ type: "Steps", value: 8000, target: 10000 }],
        reminders: [{ title: "Annual Blood Test", date: "2024-11-01", completed: false }],
        allergies: "Penicillin",
        medications: "Atorvastatin",
      },
      {
        id: 2,
        name: "Ravi Patel",
        email: "ravi@example.com",
        goals: [{ type: "Steps", value: 12000, target: 10000 }],
        reminders: [{ title: "Cardio Check", date: "2024-10-01", completed: true }],
        allergies: "None",
        medications: "Metformin",
      },
    ]);
  }, []);

  function getCompliance(patient) {
    const missed = patient.reminders.some((r) => !r.completed);
    return missed ? "Missed Preventive Checkup" : "Goal Met";
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Healthcare Provider Dashboard</h1>
      <p>Assigned patients & compliance status</p>

      {/* Patient List */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ width: "40%", border: "1px solid #ddd", padding: "15px" }}>
          <h2>Patients</h2>
          {patients.map((p) => (
            <div
              key={p.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
              onClick={() => setSelected(p)}
            >
              <strong>{p.name}</strong>
              <div style={{ fontSize: "0.9rem", color: "#666" }}>{p.email}</div>
              <div
                style={{
                  marginTop: "5px",
                  fontSize: "0.85rem",
                  color: getCompliance(p) === "Goal Met" ? "green" : "red",
                }}
              >
                {getCompliance(p)}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Patient Details */}
        <div style={{ width: "60%", border: "1px solid #ddd", padding: "15px" }}>
          {!selected ? (
            <p>Select a patient to view details.</p>
          ) : (
            <div>
              <h2>{selected.name}</h2>
              <p style={{ color: "#666" }}>{selected.email}</p>

              <h3>Health Info</h3>
              <p><strong>Allergies:</strong> {selected.allergies}</p>
              <p><strong>Medications:</strong> {selected.medications}</p>

              <h3>Recent Goals</h3>
              {selected.goals.map((g, idx) => (
                <div key={idx}>
                  <strong>{g.type}</strong>: {g.value}/{g.target}
                </div>
              ))}

              <h3>Reminders</h3>
              {selected.reminders.map((r, idx) => (
                <div key={idx}>
                  {r.title} – {r.completed ? "Completed" : "Missed"}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
