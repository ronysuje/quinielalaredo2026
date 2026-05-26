import React, {useEffect, useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {createClient} from '@supabase/supabase-js';
import {Trophy, Laugh, ShieldCheck, Users, Star, LogOut} from 'lucide-react';
import './style.css';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const demoMatches = [
  {id:1, match_no:'M1', stage:'Grupo', team_a:'Mexico', team_b:'TBD', score_a:null, score_b:null, locked:false},
  {id:2, match_no:'M2', stage:'Grupo', team_a:'Canada', team_b:'TBD', score_a:null, score_b:null, locked:false},
  {id:3, match_no:'M11', stage:'Grupo', team_a:'TBD', team_b:'TBD', score_a:null, score_b:null, locked:false},
  {id:4, match_no:'M70', stage:'Eliminatoria', team_a:'TBD', team_b:'TBD', score_a:null, score_b:null, locked:false},
];

function winner(a,b){ if(a===b) return 'draw'; return a>b?'a':'b'; }
function calcPoints(pick, match){
  if(match.score_a===null || match.score_b===null) return 0;
  let pts=0;
  if(winner(pick.pick_a,pick.pick_b)===winner(match.score_a,match.score_b)) pts+=3;
  if(Math.abs(pick.pick_a-pick.pick_b)===Math.abs(match.score_a-match.score_b)) pts+=1;
  if(pick.pick_a===match.score_a && pick.pick_b===match.score_b) pts+=2;
  return pts;
}

function App(){
  const [session,setSession]=useState({ user: { id: "00000000-0000-0000-0000-000000000001", email: "admin@quiniela.com" } })

  useEffect(()=>{ if(!supabase) return; supabase.auth.getSession().then(({data})=>setSession(data.session)); const {data:{subscription}}=supabase.auth.onAuthStateChange((_e,s)=>setSession(s)); return()=>subscription.unsubscribe();},[]);
  useEffect(()=>{ loadAll(); },[session]);

  async function loadAll(){
    if(!supabase){ setLeaders([{username:'Demo User', points:12},{username:'Tía campeona', points:9}]); return; }
    const {data:m}=await supabase.from('matches').select('*').order('id'); if(m) setMatches(m);
    if(session?.user){
      const {data:prof}=await supabase.from('profiles').select('*').eq('id', session.user.id).maybeSingle();
      if(!prof){ await supabase.from('profiles').insert({id:session.user.id,email:session.user.email,username:session.user.email?.split('@')[0]}); }
      setProfile(prof || {email:session.user.email, approved:false});
      const {data:p}=await supabase.from('picks').select('*').eq('user_id',session.user.id); const map={}; (p||[]).forEach(x=>map[x.match_id]=x); setPicks(map);
    }
    const {data:all}=await supabase.from('picks').select('points,user_id,profiles(username)');
    const sums={}; (all||[]).forEach(p=>{ const name=p.profiles?.username||'Jugador'; sums[name]=(sums[name]||0)+(p.points||0); });
    setLeaders(Object.entries(sums).map(([username,points])=>({username,points})).sort((a,b)=>b.points-a.points));
  }

  async function signIn(e){ e.preventDefault(); setLoading(true); setNotice(''); if(!supabase){ setNotice('Demo: conecta Supabase para activar login real.'); setLoading(false); return; }
    const {error}=await supabase.auth.signInWithOtp({email, options:{emailRedirectTo: window.location.origin}}); setNotice(error?error.message:'Te envié un link a tu email. Revisa inbox/spam.'); setLoading(false);
  }
  async function savePick(match, a, b){
    const pick={user_id:session?.user?.id, match_id:match.id, pick_a:+a, pick_b:+b, points: calcPoints({pick_a:+a,pick_b:+b}, match)};
    setPicks(prev=>({...prev,[match.id]:pick}));
    if(supabase && session?.user && profile?.approved){ await supabase.from('picks').upsert(pick,{onConflict:'user_id,match_id'}); loadAll(); }
  }
  const total=useMemo(()=>Object.values(picks).reduce((s,p)=>s+(p.points||0),0),[picks]);

  if(!session && supabase) return <div className="page center"><div className="card login"><h1>⚽ Quiniela Laredo 2026</h1><p>Predice marcadores, gana puntos y pelea por el pote.</p><form onSubmit={signIn}><input placeholder="Tu email" value={email} onChange={e=>setEmail(e.target.value)} required/><input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/><button disabled={loading}>Entrar con email</button></form><small>{notice}</small></div></div>;

  return <div className="page"><header><div><h1>⚽ Quiniela Laredo 2026</h1><p>Amigos + familia + memes + bragging rights 🏆</p></div><button className="ghost" onClick={()=>supabase?.auth.signOut()}><LogOut size={16}/> Salir</button></header>
    {profile && !profile.approved && <div className="alert"><ShieldCheck/> Tu cuenta está pendiente de aprobación manual. Ya puedes ver la app, pero tus picks reales se guardan cuando te aprueben.</div>}
    <section className="stats"><div className="stat"><Trophy/> <b>{total}</b><span>Mis puntos</span></div><div className="stat"><Users/> <b>{leaders.length}</b><span>Jugadores</span></div><div className="stat"><Star/> <b>{matches.length}</b><span>Partidos</span></div></section>
    <nav><button onClick={()=>setTab('picks')} className={tab==='picks'?'active':''}>Picks</button><button onClick={()=>setTab('tabla')} className={tab==='tabla'?'active':''}>Tabla</button><button onClick={()=>setTab('memes')} className={tab==='memes'?'active':''}>Memes</button><button onClick={()=>setTab('fame')} className={tab==='fame'?'active':''}>Hall of Fame</button></nav>
    {tab==='picks' && <div className="grid">{matches.map(m=><MatchCard key={m.id} match={m} pick={picks[m.id]} savePick={savePick}/>)}</div>}
    {tab==='tabla' && <div className="card"><h2>Tabla de posiciones</h2>{leaders.length?leaders.map((l,i)=><p className="leader" key={l.username}><b>#{i+1} {l.username}</b><span>{l.points} pts</span></p>):<p>Todavía no hay picks.</p>}</div>}
    {tab==='memes' && <div className="card"><h2><Laugh/> Reacciones y memes</h2><div className="memes"><span>😂 “Yo sí sabía que ganaba México”</span><span>😭 “Me arruinó el gol al 90+7”</span><span>🤡 “Mi pick más seguro falló”</span><span>🔥 “Se prendió la quiniela”</span></div></div>}
    {tab==='fame' && <div className="card"><h2>🏆 Hall of Fame</h2><p>2026: pendiente...</p><p>Pick más arriesgado: pendiente...</p><p>Mayor remontada: pendiente...</p></div>}
  </div>;
}
function MatchCard({match,pick,savePick}){ const [a,setA]=useState(pick?.pick_a??0), [b,setB]=useState(pick?.pick_b??0); return <div className="card match"><div className="badge">{match.match_no} · {match.stage}</div><h3>{match.team_a} vs {match.team_b}</h3><div className="score"><input type="number" min="0" value={a} onChange={e=>setA(e.target.value)}/><span>-</span><input type="number" min="0" value={b} onChange={e=>setB(e.target.value)}/></div><button onClick={()=>savePick(match,a,b)}>Guardar pick</button><small>Resultado: {match.score_a ?? '—'} - {match.score_b ?? '—'} · Puntos: {pick?.points||0}</small></div> }

createRoot(document.getElementById('root')).render(<App/>);
