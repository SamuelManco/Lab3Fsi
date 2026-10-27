// ============================================================
// mockData.js — Datos simulados para AeroSales CRM Dashboard
// Basado en estructura_datos.md
// ============================================================

// ── 1. USUARIOS (Equipo de Ventas) ──────────────────────────
export const users = [
  {
    id: "u1",
    full_name: "Laura Martínez",
    email: "l.martinez@aerosales.co",
    role: "manager",
    avatar_url: "https://api.dicebear.com/8.x/avataaars/svg?seed=Laura",
    quota_amount: 500000,
    status: "active",
  },
  {
    id: "u2",
    full_name: "Carlos Ríos",
    email: "c.rios@aerosales.co",
    role: "sales_rep",
    avatar_url: "https://api.dicebear.com/8.x/avataaars/svg?seed=Carlos",
    quota_amount: 120000,
    status: "active",
  },
  {
    id: "u3",
    full_name: "Valentina Torres",
    email: "v.torres@aerosales.co",
    role: "sales_rep",
    avatar_url: "https://api.dicebear.com/8.x/avataaars/svg?seed=Valentina",
    quota_amount: 130000,
    status: "active",
  },
  {
    id: "u4",
    full_name: "Andrés Morales",
    email: "a.morales@aerosales.co",
    role: "sales_rep",
    avatar_url: "https://api.dicebear.com/8.x/avataaars/svg?seed=Andres",
    quota_amount: 110000,
    status: "active",
  },
  {
    id: "u5",
    full_name: "Sofía Peña",
    email: "s.pena@aerosales.co",
    role: "sales_rep",
    avatar_url: "https://api.dicebear.com/8.x/avataaars/svg?seed=Sofia",
    quota_amount: 95000,
    status: "active",
  },
  {
    id: "u6",
    full_name: "Miguel Herrera",
    email: "m.herrera@aerosales.co",
    role: "sales_rep",
    avatar_url: "https://api.dicebear.com/8.x/avataaars/svg?seed=Miguel",
    quota_amount: 90000,
    status: "inactive",
  },
];

// ── 2. ETAPAS DEL PIPELINE ───────────────────────────────────
export const stages = [
  { id: "s1", name: "Prospect",     display_order: 1, win_probability: 10 },
  { id: "s2", name: "Lead",         display_order: 2, win_probability: 30 },
  { id: "s3", name: "Negotiation",  display_order: 3, win_probability: 60 },
  { id: "s4", name: "Closed Won",   display_order: 4, win_probability: 100 },
  { id: "s5", name: "Closed Lost",  display_order: 5, win_probability: 0  },
];

// ── 3. CLIENTES (Empresas / Corporativos) ────────────────────
export const clients = [
  { id: "c1",  company_name: "Grupo Empresarial Andino",  industry: "Minería",        contact_person: "Ricardo Salazar",  email: "r.salazar@andino.co",   phone: "+57 310 111 2233", created_at: "2024-01-10T08:00:00Z" },
  { id: "c2",  company_name: "Petrocol S.A.S",            industry: "Petróleo & Gas", contact_person: "Marcela Díaz",     email: "m.diaz@petrocol.co",    phone: "+57 312 444 5566", created_at: "2024-02-15T09:30:00Z" },
  { id: "c3",  company_name: "TechHub Latam",             industry: "Tecnología",     contact_person: "Jorge Fuentes",    email: "j.fuentes@techhub.io",  phone: "+57 315 777 8899", created_at: "2024-03-01T10:00:00Z" },
  { id: "c4",  company_name: "Inversiones Caribe",        industry: "Turismo",        contact_person: "Patricia Lozano",  email: "p.lozano@caribe.co",    phone: "+57 318 222 3344", created_at: "2024-03-20T11:15:00Z" },
  { id: "c5",  company_name: "Constructora Andes",        industry: "Construcción",   contact_person: "Alberto Reyes",    email: "a.reyes@andes.co",      phone: "+57 321 555 6677", created_at: "2024-04-05T08:45:00Z" },
  { id: "c6",  company_name: "Farmacéutica Nacional",     industry: "Salud",          contact_person: "Carmen Ibáñez",    email: "c.ibanez@farmanac.co",  phone: "+57 314 888 9900", created_at: "2024-04-18T09:00:00Z" },
  { id: "c7",  company_name: "Agro Exportaciones S.A",   industry: "Agro",           contact_person: "Luis Vargas",      email: "l.vargas@agroex.co",    phone: "+57 316 333 4455", created_at: "2024-05-02T10:30:00Z" },
  { id: "c8",  company_name: "LogiTrans Colombia",        industry: "Logística",      contact_person: "Sandra Ospina",    email: "s.ospina@logitrans.co", phone: "+57 320 666 7788", created_at: "2024-05-15T11:00:00Z" },
  { id: "c9",  company_name: "Medios & Eventos Co.",      industry: "Medios",         contact_person: "Felipe Arango",    email: "f.arango@medios.co",    phone: "+57 313 999 0011", created_at: "2024-06-01T08:30:00Z" },
  { id: "c10", company_name: "Banco Meridiano",           industry: "Banca",          contact_person: "Diana Rojas",      email: "d.rojas@meridiano.co",  phone: "+57 317 444 5566", created_at: "2024-06-10T09:15:00Z" },
];

// ── 4. DEALS / OPORTUNIDADES (30 reservas de vuelos) ─────────
// Distribuidas en los últimos 6 meses con realismo
export const deals = [
  // ── MAYO 2025 ── (mes anterior)
  {
    id: "d01", title: "Reserva Grupo Ejecutivo - MDE-BOG x20 PAX",
    customer_id: "c1", owner_id: "u2", stage_id: "s4",
    amount: 28500, currency: "USD", status: "won",
    created_at: "2025-05-03T09:00:00Z", expected_close_date: "2025-05-20",
    closed_at: "2025-05-18T16:00:00Z", loss_reason: null,
  },
  {
    id: "d02", title: "Charter Corporativo - BOG-CTG Ida y Vuelta",
    customer_id: "c2", owner_id: "u3", stage_id: "s4",
    amount: 42000, currency: "USD", status: "won",
    created_at: "2025-05-08T10:30:00Z", expected_close_date: "2025-05-25",
    closed_at: "2025-05-22T14:00:00Z", loss_reason: null,
  },
  {
    id: "d03", title: "Paquete Viajero Frecuente - Eje Cafetero",
    customer_id: "c4", owner_id: "u4", stage_id: "s5",
    amount: 12000, currency: "USD", status: "lost",
    created_at: "2025-05-10T08:00:00Z", expected_close_date: "2025-05-28",
    closed_at: "2025-05-27T11:00:00Z", loss_reason: "Precio no competitivo",
  },
  {
    id: "d04", title: "Reserva Seminario - MDE-BGA x15 PAX",
    customer_id: "c7", owner_id: "u2", stage_id: "s4",
    amount: 19800, currency: "USD", status: "won",
    created_at: "2025-05-12T11:00:00Z", expected_close_date: "2025-05-30",
    closed_at: "2025-05-29T15:00:00Z", loss_reason: null,
  },
  {
    id: "d05", title: "Vuelo Privado - BOG-MAR (Marandúa)",
    customer_id: "c5", owner_id: "u5", stage_id: "s5",
    amount: 9500, currency: "USD", status: "lost",
    created_at: "2025-05-15T09:30:00Z", expected_close_date: "2025-06-01",
    closed_at: "2025-05-31T10:00:00Z", loss_reason: "Cliente eligió competencia",
  },

  // ── JUNIO 2025 ──
  {
    id: "d06", title: "Reserva Grupo - BOG-SMR x30 PAX",
    customer_id: "c9", owner_id: "u3", stage_id: "s4",
    amount: 36000, currency: "USD", status: "won",
    created_at: "2025-06-02T08:00:00Z", expected_close_date: "2025-06-20",
    closed_at: "2025-06-18T13:00:00Z", loss_reason: null,
  },
  {
    id: "d07", title: "Contrato Anual Vuelos Ejecutivos - Petrocol",
    customer_id: "c2", owner_id: "u4", stage_id: "s4",
    amount: 88000, currency: "USD", status: "won",
    created_at: "2025-06-05T10:00:00Z", expected_close_date: "2025-06-28",
    closed_at: "2025-06-25T16:30:00Z", loss_reason: null,
  },
  {
    id: "d08", title: "Ruta MDE-BAQ Ida y Vuelta x10 PAX",
    customer_id: "c6", owner_id: "u5", stage_id: "s5",
    amount: 8400, currency: "USD", status: "lost",
    created_at: "2025-06-10T09:00:00Z", expected_close_date: "2025-06-25",
    closed_at: "2025-06-24T10:00:00Z", loss_reason: "Presupuesto reducido",
  },
  {
    id: "d09", title: "Vuelos de Entrenamiento - Zona Franca",
    customer_id: "c3", owner_id: "u2", stage_id: "s4",
    amount: 15200, currency: "USD", status: "won",
    created_at: "2025-06-12T11:30:00Z", expected_close_date: "2025-06-30",
    closed_at: "2025-06-28T14:00:00Z", loss_reason: null,
  },

  // ── JULIO 2025 ──
  {
    id: "d10", title: "Charter Deportivo - BOG-LET (Fútbol)",
    customer_id: "c9", owner_id: "u4", stage_id: "s4",
    amount: 24500, currency: "USD", status: "won",
    created_at: "2025-07-01T08:30:00Z", expected_close_date: "2025-07-15",
    closed_at: "2025-07-14T15:00:00Z", loss_reason: null,
  },
  {
    id: "d11", title: "Ruta Ejecutiva - MDE-CLO semanal (3 meses)",
    customer_id: "c1", owner_id: "u3", stage_id: "s4",
    amount: 52000, currency: "USD", status: "won",
    created_at: "2025-07-05T10:00:00Z", expected_close_date: "2025-07-28",
    closed_at: "2025-07-26T16:00:00Z", loss_reason: null,
  },
  {
    id: "d12", title: "Reserva Convención - Banco Meridiano",
    customer_id: "c10", owner_id: "u5", stage_id: "s5",
    amount: 31000, currency: "USD", status: "lost",
    created_at: "2025-07-08T09:00:00Z", expected_close_date: "2025-07-30",
    closed_at: "2025-07-29T11:00:00Z", loss_reason: "Evento cancelado",
  },
  {
    id: "d13", title: "Vuelos Inspección - Campos Petrolíferos",
    customer_id: "c2", owner_id: "u2", stage_id: "s4",
    amount: 67000, currency: "USD", status: "won",
    created_at: "2025-07-12T11:00:00Z", expected_close_date: "2025-07-31",
    closed_at: "2025-07-30T14:00:00Z", loss_reason: null,
  },
  {
    id: "d14", title: "Paquete Turístico Grupal - Cartagena",
    customer_id: "c4", owner_id: "u4", stage_id: "s5",
    amount: 11500, currency: "USD", status: "lost",
    created_at: "2025-07-15T08:00:00Z", expected_close_date: "2025-08-05",
    closed_at: "2025-08-04T10:00:00Z", loss_reason: "Precio no competitivo",
  },

  // ── AGOSTO 2025 ──
  {
    id: "d15", title: "Contrato Logística Aérea - Trimestr.",
    customer_id: "c8", owner_id: "u3", stage_id: "s4",
    amount: 73000, currency: "USD", status: "won",
    created_at: "2025-08-02T09:30:00Z", expected_close_date: "2025-08-25",
    closed_at: "2025-08-23T15:00:00Z", loss_reason: null,
  },
  {
    id: "d16", title: "Vuelo Ejecutivo - BOG-VVC x8 PAX",
    customer_id: "c5", owner_id: "u5", stage_id: "s4",
    amount: 18500, currency: "USD", status: "won",
    created_at: "2025-08-06T10:00:00Z", expected_close_date: "2025-08-28",
    closed_at: "2025-08-26T13:00:00Z", loss_reason: null,
  },
  {
    id: "d17", title: "Reserva Académica - MDE-BGA x45 estudiantes",
    customer_id: "c3", owner_id: "u2", stage_id: "s5",
    amount: 16200, currency: "USD", status: "lost",
    created_at: "2025-08-10T08:30:00Z", expected_close_date: "2025-09-01",
    closed_at: "2025-08-31T10:00:00Z", loss_reason: "Sin presupuesto aprobado",
  },
  {
    id: "d18", title: "Charter Médico - BOG-LGT (Urgencias)",
    customer_id: "c6", owner_id: "u4", stage_id: "s4",
    amount: 9800, currency: "USD", status: "won",
    created_at: "2025-08-14T11:00:00Z", expected_close_date: "2025-08-25",
    closed_at: "2025-08-22T16:00:00Z", loss_reason: null,
  },

  // ── SEPTIEMBRE 2025 ──
  {
    id: "d19", title: "Ruta Agro - MDE-PEI x20 PAX (Cosecha)",
    customer_id: "c7", owner_id: "u3", stage_id: "s4",
    amount: 22000, currency: "USD", status: "won",
    created_at: "2025-09-03T09:00:00Z", expected_close_date: "2025-09-22",
    closed_at: "2025-09-20T14:30:00Z", loss_reason: null,
  },
  {
    id: "d20", title: "Eventos Medios - Lanzamiento Producto",
    customer_id: "c9", owner_id: "u5", stage_id: "s4",
    amount: 34500, currency: "USD", status: "won",
    created_at: "2025-09-08T10:00:00Z", expected_close_date: "2025-09-28",
    closed_at: "2025-09-27T15:00:00Z", loss_reason: null,
  },
  {
    id: "d21", title: "Contrato Banca - Vuelos Auditoría Nacional",
    customer_id: "c10", owner_id: "u2", stage_id: "s3",
    amount: 95000, currency: "USD", status: "open",
    created_at: "2025-09-15T11:00:00Z", expected_close_date: "2025-11-10",
    closed_at: null, loss_reason: null,
  },
  {
    id: "d22", title: "Reserva Corporativa - TechHub Summit 2025",
    customer_id: "c3", owner_id: "u3", stage_id: "s2",
    amount: 41000, currency: "USD", status: "open",
    created_at: "2025-09-20T09:30:00Z", expected_close_date: "2025-11-15",
    closed_at: null, loss_reason: null,
  },

  // ── OCTUBRE 2025 (mes actual) ──
  {
    id: "d23", title: "Operación Construcción - MDE-APO x12 PAX",
    customer_id: "c5", owner_id: "u4", stage_id: "s3",
    amount: 28000, currency: "USD", status: "open",
    created_at: "2025-10-01T08:00:00Z", expected_close_date: "2025-11-01",
    closed_at: null, loss_reason: null,
  },
  {
    id: "d24", title: "Charter Petrolero - BOG-VVC Rotación Mensual",
    customer_id: "c2", owner_id: "u5", stage_id: "s3",
    amount: 115000, currency: "USD", status: "open",
    created_at: "2025-10-04T10:00:00Z", expected_close_date: "2025-11-05",
    closed_at: null, loss_reason: null,
  },
  {
    id: "d25", title: "Vuelos Ejecutivos - Grupo Andino Q4",
    customer_id: "c1", owner_id: "u2", stage_id: "s2",
    amount: 58000, currency: "USD", status: "open",
    created_at: "2025-10-07T09:00:00Z", expected_close_date: "2025-11-20",
    closed_at: null, loss_reason: null,
  },
  {
    id: "d26", title: "Reserva Convención Agro - PEI x50 PAX",
    customer_id: "c7", owner_id: "u3", stage_id: "s1",
    amount: 47000, currency: "USD", status: "open",
    created_at: "2025-10-10T11:00:00Z", expected_close_date: "2025-12-01",
    closed_at: null, loss_reason: null,
  },
  {
    id: "d27", title: "Paquete Farmacéutico - Distribución Nacional",
    customer_id: "c6", owner_id: "u4", stage_id: "s2",
    amount: 33500, currency: "USD", status: "open",
    created_at: "2025-10-13T08:30:00Z", expected_close_date: "2025-11-28",
    closed_at: null, loss_reason: null,
  },
  {
    id: "d28", title: "Vuelo Logístico - CTG-BOG Express Carga",
    customer_id: "c8", owner_id: "u5", stage_id: "s1",
    amount: 22000, currency: "USD", status: "open",
    created_at: "2025-10-16T10:00:00Z", expected_close_date: "2025-12-10",
    closed_at: null, loss_reason: null,
  },
  {
    id: "d29", title: "Medios & Prensa - BOG-CTG Fashion Week",
    customer_id: "c9", owner_id: "u2", stage_id: "s3",
    amount: 18500, currency: "USD", status: "open",
    created_at: "2025-10-18T09:00:00Z", expected_close_date: "2025-11-10",
    closed_at: null, loss_reason: null,
  },
  {
    id: "d30", title: "Ruta Premium Banco Meridiano - Q4 2025",
    customer_id: "c10", owner_id: "u3", stage_id: "s2",
    amount: 76000, currency: "USD", status: "open",
    created_at: "2025-10-22T11:00:00Z", expected_close_date: "2025-12-15",
    closed_at: null, loss_reason: null,
  },
];
