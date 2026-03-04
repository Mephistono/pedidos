import { createClient, SupabaseClient } from "@supabase/supabase-js";

// TODO: Configuración de Supabase
// 1. Crea un proyecto en https://supabase.com (plan gratuito).
// 2. En el dashboard: Settings → API copia "Project URL" y "anon public" key.
// 3. Crea el archivo .env.local en la raíz del proyecto (usa .env.local.example como base).
// 4. Asigna NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY con esos valores.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Cliente de Supabase para uso en el navegador y en Server Components.
 * Usar createServerClient o createBrowserClient según el contexto si más adelante
 * necesitas Row Level Security (RLS) y sesión de usuario.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Faltan variables de entorno. Asegúrate de definir NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local"
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Prueba básica de conexión a Supabase (ejemplo).
 * En producción puedes eliminar esta función o sustituirla por un health check real.
 */
export async function testSupabaseConnection(): Promise<string> {
  try {
    // TODO: Si tu proyecto ya tiene tablas, puedes hacer una query de prueba, ej:
    // const { data, error } = await getSupabaseClient().from('tu_tabla').select('id').limit(1);
    if (!supabaseUrl || !supabaseAnonKey) {
      return "No configurado: define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local.";
    }
    const client = getSupabaseClient();
    // Consulta mínima para verificar que la URL y la key son válidas.
    // TODO: Cuando tengas una tabla real, cambia "_dummy_" por el nombre de esa tabla.
    const { error } = await client.from("_dummy_").select("*").limit(1).maybeSingle();
    // PGRST116 = no rows; 42P01 / mensajes de tabla inexistente = proyecto sin tablas aún.
    const isTableMissingError =
      error?.code === "42P01" ||
      (typeof error?.message === "string" &&
        error.message.toLowerCase().includes("could not find the table"));

    if (error && error.code !== "PGRST116" && !isTableMissingError) {
      return `Error de conexión: ${error.message}. Revisa URL y anon key en .env.local.`;
    }
    return "Conexión a Supabase correcta.";
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return `Error: ${message}`;
  }
}
