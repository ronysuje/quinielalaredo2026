import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import "./style.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const demoMatches = [
  {
    id: 1,
    match_no: "M1",
    group: "Grupo A",
    stage: "Grupo",
    team_a: "🇲🇽 México",
    team_b: "🇿🇦 South Africa",
    match_date: "11 Jun 2026",
    match_time: "Pendiente CT",
    score_a: 2,
    score_b: 1,
  },
  {
    id: 2,
    match_no: "M2",
    group: "Grupo A",
    stage: "Grupo",
    team_a: "🇰🇷 Corea del Sur",
    team_b: "🇨🇿 Chequia",
    match_date: "12 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 3,
    match_no: "M3",
    group: "Grupo B",
    stage: "Grupo",
    team_a: "🇨🇦 Canada",
    team_b: "🇧🇦 Bosnia",
    match_date: "12 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 4,
    match_no: "M4",
    group: "Grupo D",
    stage: "Grupo",
    team_a: "🇺🇸 USA",
    team_b: "🇵🇾 Paraguay",
    match_date: "13 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 5,
    match_no: "M5",
    group: "Grupo C",
    stage: "Grupo",
    team_a: "🇭🇹 Haiti",
    team_b: "🏴 Escocia",
    match_date: "14 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 6,
    match_no: "M6",
    group: "Grupo D",
    stage: "Grupo",
    team_a: "🇦🇺 Australia",
    team_b: "🇹🇷 Turquía",
    match_date: "14 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 7,
    match_no: "M7",
    group: "Grupo C",
    stage: "Grupo",
    team_a: "🇧🇷 Brasil",
    team_b: "🇲🇦 Marruecos",
    match_date: "14 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 8,
    match_no: "M8",
    group: "Grupo B",
    stage: "Grupo",
    team_a: "🇶🇦 Qatar",
    team_b: "🇨🇭 Suiza",
    match_date: "13 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 9,
    match_no: "M9",
    group: "Grupo E",
    stage: "Grupo",
    team_a: "🇨🇮 Costa Marfil",
    team_b: "🇪🇨 Ecuador",
    match_date: "15 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 10,
    match_no: "M10",
    group: "Grupo E",
    stage: "Grupo",
    team_a: "🇩🇪 Alemania",
    team_b: "🇨🇼 Curazao",
    match_date: "14 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 11,
    match_no: "M11",
    group: "Grupo F",
    stage: "Grupo",
    team_a: "🇳🇱 Holanda",
    team_b: "🇯🇵 Japón",
    match_date: "14 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 12,
    match_no: "M12",
    group: "Grupo F",
    stage: "Grupo",
    team_a: "🇸🇪 Suecia",
    team_b: "🇹🇳 Túnez",
    match_date: "15 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 13,
    match_no: "M13",
    group: "Grupo H",
    stage: "Grupo",
    team_a: "🇸🇦 Arabia Saudita",
    team_b: "🇺🇾 Uruguay",
    match_date: "16 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 14,
    match_no: "M14",
    group: "Grupo H",
    stage: "Grupo",
    team_a: "🇪🇸 España",
    team_b: "🇨🇻 Cabo Verde",
    match_date: "15 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 15,
    match_no: "M15",
    group: "Grupo G",
    stage: "Grupo",
    team_a: "🇮🇷 Iran",
    team_b: "🇳🇿 Nueva Zelanda",
    match_date: "16 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 16,
    match_no: "M16",
    group: "Grupo G",
    stage: "Grupo",
    team_a: "🇧🇪 Bélgica",
    team_b: "🇪🇬 Egipto",
    match_date: "15 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 17,
    match_no: "M17",
    group: "Grupo I",
    stage: "Grupo",
    team_a: "🇫🇷 Francia",
    team_b: "🇸🇳 Senegal",
    match_date: "16 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 18,
    match_no: "M18",
    group: "Grupo I",
    stage: "Grupo",
    team_a: "🇮🇶 Iraq",
    team_b: "🇳🇴 Noruega",
    match_date: "17 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 19,
    match_no: "M19",
    group: "Grupo J",
    stage: "Grupo",
    team_a: "🇦🇷 Argentina",
    team_b: "🇩🇿 Argelia",
    match_date: "17 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 20,
    match_no: "M20",
    group: "Grupo J",
    stage: "Grupo",
    team_a: "🇦🇹 Austria",
    team_b: "🇯🇴 Jordania",
    match_date: "17 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 21,
    match_no: "M21",
    group: "Grupo L",
    stage: "Grupo",
    team_a: "🇬🇭 Ghana",
    team_b: "🇵🇦 Panamá",
    match_date: "18 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 22,
    match_no: "M22",
    group: "Grupo L",
    stage: "Grupo",
    team_a: "🏴 Inglaterra",
    team_b: "🇭🇷 Croacia",
    match_date: "17 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 23,
    match_no: "M23",
    group: "Grupo K",
    stage: "Grupo",
    team_a: "🇵🇹 Portugal",
    team_b: "🇨🇩 Congo",
    match_date: "17 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 24,
    match_no: "M24",
    group: "Grupo K",
    stage: "Grupo",
    team_a: "🇺🇿 Uzbekistán",
    team_b: "🇨🇴 Colombia",
    match_date: "18 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 25,
    match_no: "M25",
    group: "Grupo A",
    stage: "Grupo",
    team_a: "🇨🇿 Chequia",
    team_b: "🇿🇦 South Africa",
    match_date: "18 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 26,
    match_no: "M26",
    group: "Grupo B",
    stage: "Grupo",
    team_a: "🇨🇭 Suiza",
    team_b: "🇧🇦 Bosnia",
    match_date: "18 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 27,
    match_no: "M27",
    group: "Grupo B",
    stage: "Grupo",
    team_a: "🇨🇦 Canada",
    team_b: "🇶🇦 Qatar",
    match_date: "19 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 28,
    match_no: "M28",
    group: "Grupo A",
    stage: "Grupo",
    team_a: "🇲🇽 México",
    team_b: "🇰🇷 Corea del Sur",
    match_date: "19 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 29,
    match_no: "M29",
    group: "Grupo C",
    stage: "Grupo",
    team_a: "🇧🇷 Brasil",
    team_b: "🇭🇹 Haiti",
    match_date: "20 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 30,
    match_no: "M30",
    group: "Grupo C",
    stage: "Grupo",
    team_a: "🏴 Escocia",
    team_b: "🇲🇦 Marruecos",
    match_date: "20 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 31,
    match_no: "M31",
    group: "Grupo D",
    stage: "Grupo",
    team_a: "🇹🇷 Turquía",
    team_b: "🇵🇾 Paraguay",
    match_date: "20 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 32,
    match_no: "M32",
    group: "Grupo D",
    stage: "Grupo",
    team_a: "🇺🇸 USA",
    team_b: "🇦🇺 Australia",
    match_date: "19 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 33,
    match_no: "M33",
    group: "Grupo E",
    stage: "Grupo",
    team_a: "🇩🇪 Alemania",
    team_b: "🇨🇮 Costa Marfil",
    match_date: "20 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 34,
    match_no: "M34",
    group: "Grupo E",
    stage: "Grupo",
    team_a: "🇪🇨 Ecuador",
    team_b: "🇨🇼 Curazao",
    match_date: "21 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 35,
    match_no: "M35",
    group: "Grupo F",
    stage: "Grupo",
    team_a: "🇳🇱 Holanda",
    team_b: "🇸🇪 Suecia",
    match_date: "20 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 36,
    match_no: "M36",
    group: "Grupo F",
    stage: "Grupo",
    team_a: "🇹🇳 Túnez",
    team_b: "🇯🇵 Japón",
    match_date: "21 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 37,
    match_no: "M37",
    group: "Grupo H",
    stage: "Grupo",
    team_a: "🇺🇾 Uruguay",
    team_b: "🇨🇻 Cabo Verde",
    match_date: "22 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 38,
    match_no: "M38",
    group: "Grupo H",
    stage: "Grupo",
    team_a: "🇪🇸 España",
    team_b: "🇸🇦 Arabia Saudita",
    match_date: "21 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 39,
    match_no: "M39",
    group: "Grupo G",
    stage: "Grupo",
    team_a: "🇧🇪 Bélgica",
    team_b: "🇮🇷 Iran",
    match_date: "21 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 40,
    match_no: "M40",
    group: "Grupo G",
    stage: "Grupo",
    team_a: "🇳🇿 Nueva Zelanda",
    team_b: "🇪🇬 Egipto",
    match_date: "22 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 41,
    match_no: "M41",
    group: "Grupo I",
    stage: "Grupo",
    team_a: "🇳🇴 Noruega",
    team_b: "🇸🇳 Senegal",
    match_date: "23 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 42,
    match_no: "M42",
    group: "Grupo I",
    stage: "Grupo",
    team_a: "🇫🇷 Francia",
    team_b: "🇮🇶 Iraq",
    match_date: "22 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 43,
    match_no: "M43",
    group: "Grupo J",
    stage: "Grupo",
    team_a: "🇦🇷 Argentina",
    team_b: "🇦🇹 Austria",
    match_date: "22 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 44,
    match_no: "M44",
    group: "Grupo J",
    stage: "Grupo",
    team_a: "🇯🇴 Jordania",
    team_b: "🇩🇿 Argelia",
    match_date: "23 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 45,
    match_no: "M45",
    group: "Grupo L",
    stage: "Grupo",
    team_a: "🏴 Inglaterra",
    team_b: "🇬🇭 Ghana",
    match_date: "23 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 46,
    match_no: "M46",
    group: "Grupo L",
    stage: "Grupo",
    team_a: "🇵🇦 Panamá",
    team_b: "🇭🇷 Croacia",
    match_date: "24 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 47,
    match_no: "M47",
    group: "Grupo K",
    stage: "Grupo",
    team_a: "🇵🇹 Portugal",
    team_b: "🇺🇿 Uzbekistán",
    match_date: "23 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 48,
    match_no: "M48",
    group: "Grupo K",
    stage: "Grupo",
    team_a: "🇨🇴 Colombia",
    team_b: "🇨🇩 Congo",
    match_date: "24 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 49,
    match_no: "M49",
    group: "Grupo C",
    stage: "Grupo",
    team_a: "🏴 Escocia",
    team_b: "🇧🇷 Brasil",
    match_date: "25 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 50,
    match_no: "M50",
    group: "Grupo C",
    stage: "Grupo",
    team_a: "🇲🇦 Marruecos",
    team_b: "🇭🇹 Haiti",
    match_date: "25 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 51,
    match_no: "M51",
    group: "Grupo B",
    stage: "Grupo",
    team_a: "🇨🇭 Suiza",
    team_b: "🇨🇦 Canada",
    match_date: "24 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 52,
    match_no: "M52",
    group: "Grupo B",
    stage: "Grupo",
    team_a: "🇧🇦 Bosnia",
    team_b: "🇶🇦 Qatar",
    match_date: "24 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 53,
    match_no: "M53",
    group: "Grupo A",
    stage: "Grupo",
    team_a: "🇨🇿 Chequia",
    team_b: "🇲🇽 México",
    match_date: "25 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 54,
    match_no: "M54",
    group: "Grupo A",
    stage: "Grupo",
    team_a: "🇿🇦 South Africa",
    team_b: "🇰🇷 Corea del Sur",
    match_date: "25 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 55,
    match_no: "M55",
    group: "Grupo E",
    stage: "Grupo",
    team_a: "🇨🇼 Curazao",
    team_b: "🇨🇮 Costa Marfil",
    match_date: "25 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 56,
    match_no: "M56",
    group: "Grupo E",
    stage: "Grupo",
    team_a: "🇪🇨 Ecuador",
    team_b: "🇩🇪 Alemania",
    match_date: "25 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 57,
    match_no: "M57",
    group: "Grupo F",
    stage: "Grupo",
    team_a: "🇯🇵 Japón",
    team_b: "🇸🇪 Suecia",
    match_date: "26 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 58,
    match_no: "M58",
    group: "Grupo F",
    stage: "Grupo",
    team_a: "🇹🇳 Túnez",
    team_b: "🇳🇱 Holanda",
    match_date: "26 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 59,
    match_no: "M59",
    group: "Grupo D",
    stage: "Grupo",
    team_a: "🇹🇷 Turquía",
    team_b: "🇺🇸 USA",
    match_date: "26 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 60,
    match_no: "M60",
    group: "Grupo D",
    stage: "Grupo",
    team_a: "🇵🇾 Paraguay",
    team_b: "🇦🇺 Australia",
    match_date: "26 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 61,
    match_no: "M61",
    group: "Grupo I",
    stage: "Grupo",
    team_a: "🇳🇴 Noruega",
    team_b: "🇫🇷 Francia",
    match_date: "26 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 62,
    match_no: "M62",
    group: "Grupo I",
    stage: "Grupo",
    team_a: "🇸🇳 Senegal",
    team_b: "🇮🇶 Iraq",
    match_date: "26 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 63,
    match_no: "M63",
    group: "Grupo G",
    stage: "Grupo",
    team_a: "🇪🇬 Egipto",
    team_b: "🇮🇷 Iran",
    match_date: "27 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 64,
    match_no: "M64",
    group: "Grupo G",
    stage: "Grupo",
    team_a: "🇳🇿 Nueva Zelanda",
    team_b: "🇧🇪 Bélgica",
    match_date: "27 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 65,
    match_no: "M65",
    group: "Grupo H",
    stage: "Grupo",
    team_a: "🇨🇻 Cabo Verde",
    team_b: "🇸🇦 Arabia Saudita",
    match_date: "27 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 66,
    match_no: "M66",
    group: "Grupo H",
    stage: "Grupo",
    team_a: "🇺🇾 Uruguay",
    team_b: "🇪🇸 España",
    match_date: "27 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 67,
    match_no: "M67",
    group: "Grupo L",
    stage: "Grupo",
    team_a: "🇵🇦 Panamá",
    team_b: "🏴 Inglaterra",
    match_date: "27 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 68,
    match_no: "M68",
    group: "Grupo L",
    stage: "Grupo",
    team_a: "🇭🇷 Croacia",
    team_b: "🇬🇭 Ghana",
    match_date: "27 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 69,
    match_no: "M69",
    group: "Grupo J",
    stage: "Grupo",
    team_a: "🇩🇿 Argelia",
    team_b: "🇦🇹 Austria",
    match_date: "28 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 70,
    match_no: "M70",
    group: "Grupo J",
    stage: "Grupo",
    team_a: "🇯🇴 Jordania",
    team_b: "🇦🇷 Argentina",
    match_date: "28 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 71,
    match_no: "M71",
    group: "Grupo K",
    stage: "Grupo",
    team_a: "🇨🇴 Colombia",
    team_b: "🇵🇹 Portugal",
    match_date: "28 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
  {
    id: 72,
    match_no: "M72",
    group: "Grupo K",
    stage: "Grupo",
    team_a: "🇨🇩 Congo",
    team_b: "🇺🇿 Uzbekistán",
    match_date: "28 Jun 2026",
    match_time: "Pendiente CT",
    score_a: null,
    score_b: null,
  },
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
function winner(a,b){
  if(a === b) return "draw";
  return a > b ? "a" : "b";
}

function calcPoints(pick, match){

  if(match.score_a === null || match.score_b === null){
    return 0;
  }

  let pts = 0;

  if(
    winner(pick.pick_a, pick.pick_b) ===
    winner(match.score_a, match.score_b)
  ){
    pts = 3;
  }

  if(
    pick.pick_a === match.score_a &&
    pick.pick_b === match.score_b
  ){
    pts += 1;
  }

  return pts;
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
                <small> {m.match_no} · {m.group} </small>
<p className="match-time">
  {m.match_date} • {m.match_time}
</p>

<h2>{m.team_a} vs {m.team_b}</h2>
                  <div className="score">
                  <input type="number" value={pick.pick_a} onChange={(e) => updatePick(m.id, "pick_a", e.target.value)} />
                  <span>-</span>
                  <input type="number" value={pick.pick_b} onChange={(e) => updatePick(m.id, "pick_b", e.target.value)} />
                </div>
                <button onClick={() => savePick(m)}>Guardar pick</button>
                <p>Resultado: {m.score_a ?? "—"} - {m.score_b ?? "—"}</p>
                <p>Puntos: {calcPoints(pick, m)}</p>
              </div>
            );
          })}
        </div>
      )}

{tab === "tabla" && (
  <div className="card">
    <h2>🏆 Tabla de posiciones</h2>

    {[{
      username: user.username,
      points: Object.values(picks).reduce((acc, p) => {
        return acc + (p.points || 0)
      }, 0)
    }]
      .sort((a,b)=>b.points-a.points)
      .map((u, i) => (
        <p key={i}>
          {i + 1}. {u.username} - {u.points} puntos
        </p>
      ))}
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
