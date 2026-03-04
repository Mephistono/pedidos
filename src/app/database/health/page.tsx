import { testSupabaseConnection } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function maskAnonKey(key: string | undefined) {
  if (!key) return "NO DEFINIDA";
  if (key.length <= 8) return "********";
  const visible = key.slice(-4);
  return `************${visible}`;
}

export default async function DatabaseHealthPage() {
  const status = await testSupabaseConnection();
  const normalized = status.toLowerCase();
  const isHealthy =
    normalized.startsWith("conexión a supabase correcta") ||
    normalized.startsWith("no configurado");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "NO DEFINIDA";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Database Health</h1>
      <p>Página de diagnóstico de conexión con Supabase.</p>

      <section
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          background: "var(--background)",
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Estado de la conexión
        </h2>
        <p style={{ margin: 0 }}>
          <strong>
            {isHealthy ? "OK" : "ERROR"}
          </strong>{" "}
          – {status}
        </p>
      </section>

      <section
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          background: "var(--background)",
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Valores de conexión
        </h2>
        <p style={{ margin: 0 }}>
          <strong>URL:</strong> {supabaseUrl}
        </p>
        <p style={{ margin: "0.5rem 0 0" }}>
          <strong>Anon key:</strong> {maskAnonKey(supabaseAnonKey)}
        </p>
      </section>
    </main>
  );
}

