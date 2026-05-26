import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import "./style.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const demoMatches = [
  { id: 1, match_no: "M1", stage: "Grupo", team_a: "México", team_b: "TBD", score_a: null, score_b: null },
  { id: 2, match_no: "M2", stage: "Grupo", team_a: "Canadá", team_b: "TBD", score_a: null, score_b: null },
  { id: 3, match_no: "M11", stage: "Grupo", team_a: "TBD", team_b: "TBD", score_a: null, score_b: null },
  { id: 4, match_no: "M70", stage: "Eliminatoria", team_a: "TBD", team_b: "TBD", score_a: null, score_b: null },
];

function App() {
  const [user, setUser] = useState({
    id: "admin-demo",
    email: "admin@quiniela.com",
    username: "Admin",
  });

  const [matches, setMatches] = useState(demoMatches);
  const [picks, setPicks] = useState({});
  const [tab, setTab] = useState("picks");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (supabase) {
      const { data: matchData } = await supabase.from("matches").select("*").order("id");
      if (matchData?.length) setMatches(matchData);

      const { data: pickData } = await supabase
        .from("picks")
        .select("*")
        .eq("user_id", user.id);

      if (pickData?.length) {
        const map = {};
        pickData.forEach((p) => {
          map[p.match_id] = {
            pick_a: p.predicted_home ?? p.pick_a ?? 0,
            pick_b: p.predicted_away ?? p.pick_b ?? 0,
          };
        });
        setPicks(map);
        return;
      }
    }

    const saved = localStorage.getItem("quiniela_picks");
    if (saved) setPicks(JSON.parse(saved));
  }

  function updatePick(matchId, side, value) {
    setPicks((prev) => ({
      ...prev,
      [matchId]: {
        pick_a: prev[matchId]?.pick_a ?? 0,
        pick_b: prev[matchId]?.pick_b ?? 0,
        [side]: Number(value),
      },
    }));
  }

  async function savePick(match) {
    const pick = picks[match.id] || { pick_a: 0, pick_b: 0 };

    localStorage.setItem(
      "quiniela_picks",
      JSON.stringify({
        ...picks,
        [match.id]: pick,
      })
    );

    if (supabase) {
      try {
        await supabase.from("picks").upsert(
          {
            user_id: user.id,
            match_id: match.id,
            predicted_home: pick.pick_a,
            predicted_away: pick.pick_b,
            points_earned: 0,
          },
          { onConflict: "user_id,match_id" }
        );
      } catch (err) {
        console.log("Supabase save failed, saved locally instead", err);
      }
    }

    setMessage(`Pick guardado para ${match.match_no} ✅`);
    setTimeout(() => setMessage(""), 2500);
  }

  function logout() {
    setUser(null);
    setMessage("Sesión cerrada");
  }

  function loginDemo() {
    setUser({
      id: "admin-demo",
      email: "admin@quiniela.com",
      username: "Admin",
    });
  }

  if (!user) {
    return (
      <div className="page center">
        <div className="card login">
          <h1>⚽ Quiniela Laredo 2026</h1>
          <p>Modo demo/admin temporal.</p>
          <button onClick={loginDemo}>Entrar como Admin</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header>
        <div>
          <h1>⚽ Quiniela Laredo 2026</h1>
          <p>Amigos + familia + memes + bragging rights 🏆</p>
        </div>
        <button className="ghost" onClick={logout}>Salir</button>
      </header>

      <section className="stats">
        <div>🏆 <b>0</b> Mis puntos</div>
        <div>👥 <b>2</b> Jugadores</div>
        <div>⭐ <b>{matches.length}</b> Partidos</div>
      </section>

      {message && <div className="notice">{message}</div>}

      <nav>
        <button className={tab === "picks" ? "active" : ""} onClick={() => setTab("picks")}>Picks</button>
        <button className={tab === "tabla" ? "active" : ""} onClick={() => setTab("tabla")}>Tabla</button>
        <button className={tab === "memes" ? "active" : ""} onClick={() => setTab("memes")}>Memes</button>
        <button className={tab === "fame" ? "active" : ""} onClick={() => setTab("fame")}>Hall of Fame</button>
      </nav>

      {tab === "picks" && (
        <div className="grid">
          {matches.map((m) => {
            const pick = picks[m.id] || { pick_a: 0, pick_b: 0 };
            return (
              <div className="card match" key={m.id}>
                <small>{m.match_no} · {m.stage}</small>
                <h2>{m.team_a} vs {m.team_b}</h2>
                <div className="score">
                  <input type="number" value={pick.pick_a} onChange={(e) => updatePick(m.id, "pick_a", e.target.value)} />
                  <span>-</span>
                  <input type="number" value={pick.pick_b} onChange={(e) => updatePick(m.id, "pick_b", e.target.value)} />
                </div>
                <button onClick={() => savePick(m)}>Guardar pick</button>
                <p>Resultado: {m.score_a ?? "—"} - {m.score_b ?? "—"}</p>
                <p>Puntos: 0</p>
              </div>
            );
          })}
        </div>
      )}

{tab === "tabla" && (
  <div className="card">
    <h2>🏆 Tabla de posiciones</h2>

    <div style={{marginTop:"20px", display:"grid", gap:"12px"}}>

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        background:"#f4f4f4",
        padding:"14px",
        borderRadius:"12px"
      }}>
        <span>🥇 Admin</span>
        <b>12 pts</b>
      </div>

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        background:"#f4f4f4",
        padding:"14px",
        borderRadius:"12px"
      }}>
        <span>🥈 Iván</span>
        <b>9 pts</b>
      </div>

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        background:"#f4f4f4",
        padding:"14px",
        borderRadius:"12px"
      }}>
        <span>🥉 Tío Juan</span>
        <b>4 pts</b>
      </div>

    </div>
  </div>
)}

      {tab === "memes" && (
        <div className="card">
          <h2>Memes y reacciones 😂</h2>
          <p>Próximamente: “el que puso 7-0”, “el que nunca le pega”, “la remontada imposible”.</p>
        </div>
      )}

      {tab === "fame" && (
        <div className="card">
          <h2>Hall of Fame 🏆</h2>
          <p>Campeón histórico: pendiente.</p>
          <p>Pick más arriesgado: pendiente.</p>
          <p>Mayor remontada: pendiente.</p>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
