# Pedidos

Aplicación Next.js (App Router) para gestión de pedidos. Pensada para ejecutarse **solo con Docker** (sin instalar Node.js en tu equipo) y desplegarse en Vercel.

## Requisitos

- **Docker Desktop** instalado y en ejecución.
- No hace falta Node.js, npm, pnpm ni yarn en tu computadora.

## Cómo levantar el proyecto

1. **Clona o abre el proyecto** en tu carpeta de trabajo.

2. **Crea el archivo de variables de entorno** (necesario para que el contenedor arranque):
   ```bash
   copy .env.local.example .env.local
   ```
   (En PowerShell; en Git Bash/Linux/Mac: `cp .env.local.example .env.local`)

3. **Configura Supabase** (opcional para el primer arranque):
   - Crea un proyecto en [Supabase](https://supabase.com) (plan gratuito).
   - En **Settings → API** copia **Project URL** y **anon public**.
   - Edita `.env.local` y sustituye los valores de `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Si no configuras Supabase aún, la página principal mostrará un mensaje indicando que faltan las variables.

4. **Construye y levanta el contenedor**:
   ```bash
   docker compose up --build
   ```

5. Abre el navegador en **http://localhost:3000**.

- **Hot reload**: los cambios que hagas en el código (por ejemplo en `src/`) se reflejan automáticamente; no hace falta reconstruir la imagen.
- **Detener**: `Ctrl+C` en la terminal. Para bajar los contenedores: `docker compose down`.

## Variables de entorno

| Variable | Descripción |
|--------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto en Supabase (Settings → API). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública anónima (anon public) del mismo proyecto. |

- Usa `.env.local` en desarrollo (no se sube a git).
- En el código hay comentarios con prefijo **TODO:** donde debes ajustar configuración (por ejemplo en `src/lib/supabase.ts`).

## Estructura del proyecto

```
├── src/
│   ├── app/              # App Router (layout, página principal, estilos)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── lib/              # Cliente y helpers de Supabase
│       └── supabase.ts
├── public/
├── .env.local.example    # Plantilla para variables de entorno
├── Dockerfile            # Imagen para desarrollo (y producción si se desea)
├── docker-compose.yml    # Orquestación y hot reload
├── next.config.mjs
├── package.json
└── tsconfig.json
```

## Desplegar en Vercel

1. Sube el repositorio a GitHub (o GitLab/Bitbucket).

2. En [Vercel](https://vercel.com): **Add New Project** y conecta el repo.

3. **Configuración del proyecto**:
   - Framework: **Next.js** (detectado automáticamente).
   - Root Directory: dejar por defecto (raíz).
   - Build Command: `npm run build` (por defecto).
   - Output Directory: por defecto (`.next`).

4. **Variables de entorno en Vercel**:
   - En el proyecto → **Settings → Environment Variables**.
   - Añade:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Con los mismos valores que en tu `.env.local` (o los de producción de Supabase).

5. **Deploy**: haz **Deploy**. Los siguientes pushes a la rama principal desplegarán automáticamente si tienes integración con Git.

**Nota:** En Vercel no se usa Docker para el build; Vercel ejecuta `npm run build` en su entorno. Este proyecto está preparado para que ese build funcione sin cambios.

## Comandos útiles (dentro del contenedor)

Si necesitas ejecutar algo con Node/npm dentro del mismo entorno:

```bash
docker compose run --rm app npm run lint
docker compose run --rm app npm run build
```

## Próximos pasos

- Añadir vistas y flujos de pedidos (marcas, productos, totales, tarimas/packs).
- Configurar tablas y políticas RLS en Supabase según necesites.
- Revisar los **TODO:** en `src/lib/supabase.ts` para ajustar la configuración de Supabase.
