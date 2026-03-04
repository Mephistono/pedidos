import { testSupabaseConnection } from "@/lib/supabase";

export default async function HomePage() {
  const connectionStatus = await testSupabaseConnection();

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Pedidos</h1>
      <p>Template Next.js con App Router, listo para desarrollo en Docker.</p>
      <section style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--background)", border: "1px solid #e5e5e5", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Estado de Supabase</h2>
        <p style={{ margin: 0 }}>{connectionStatus}</p>
      </section>
    </main>
  );
}
