# Estructura de DATOS (CRM / Aerolínea)

## 1. Tabla de Usuarios (Equipo de Ventas / Agentes)
{
  "id": "string (UUID)",
  "full_name": "string (Nombre completo)",
  "email": "string (Correo corporativo)",
  "role": "string ('admin', 'manager', 'sales_rep')",
  "avatar_url": "string (URL de imagen)",
  "quota_amount": "decimal (Objetivo mensual asignado)",
  "status": "string ('active', 'inactive')"
}

## 2. Tabla de Etapas (Pipeline Stages / Reservas)
{
  "id": "string (UUID)",
  "name": "string ('Prospect', 'Lead', 'Negotiation', 'Closed Won', 'Closed Lost')",
  "display_order": "integer (1, 2, 3...)",
  "win_probability": "integer (Porcentaje estimado de cierre)"
}

## 3. Tabla de Clientes (Pasajeros / Empresas)
{
  "id": "string (UUID)",
  "company_name": "string (Nombre de empresa o cliente)",
  "industry": "string (Sector o categoría)",
  "contact_person": "string (Contacto principal)",
  "email": "string (Email)",
  "phone": "string (Teléfono)",
  "created_at": "datetime"
}

## 4. Tabla de Oportunidades (Deals / Reservas de Vuelos)
{
  "id": "string (UUID)",
  "title": "string (Ej: 'Reserva Grupo - Ruta MDE-BOG')",
  "customer_id": "string (Foreign Key -> Clientes)",
  "owner_id": "string (Foreign Key -> Usuarios)",
  "stage_id": "string (Foreign Key -> Etapas)",
  "amount": "decimal (Valor monetario de la reserva/deal)",
  "currency": "string ('USD', 'COP', 'EUR')",
  "status": "string ('open', 'won', 'lost')",
  "created_at": "datetime",
  "expected_close_date": "date",
  "closed_at": "datetime",
  "loss_reason": "string (Opcional)"
}