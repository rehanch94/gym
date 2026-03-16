import { sqlite } from "https://esm.town/v/std/sqlite";

export default async function (req: Request): Promise<Response> {
  // CORS Headers applied to all responses to allow GitHub Pages frontend access
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  // Handle pre-flight CORS requests from browsers
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create the database table if it doesn't exist yet
  await sqlite.execute(`
    CREATE TABLE IF NOT EXISTS gym_tracker_data (
      id TEXT PRIMARY KEY,
      data_json TEXT
    )
  `);

  if (req.method === "POST") {
    try {
      // The frontend sends the entire DB state as a JSON body payload
      const payload = await req.json();
      
      // Upsert the data into SQLite
      await sqlite.execute(
        `INSERT INTO gym_tracker_data (id, data_json) VALUES (?, ?) 
         ON CONFLICT(id) DO UPDATE SET data_json=excluded.data_json`,
        ["main_user_data", JSON.stringify(payload)]
      );
      
      return new Response(JSON.stringify({ success: true, message: "Sync Push Complete" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
  } 
  else if (req.method === "GET") {
    try {
      const result = await sqlite.execute(`SELECT data_json FROM gym_tracker_data WHERE id = ?`, ["main_user_data"]);
      
      if (result.rows.length === 0) {
        // First ever load: return empty db skeleton
        const emptyDb = { workouts: [], workoutRoutines: [], stretchRoutines: [], stretchLog: {} };
        return new Response(JSON.stringify(emptyDb), { 
          status: 200, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        });
      }
      
      // Return the saved stringified data exactly as stored
      return new Response(result.rows[0][0], { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      });
    } catch(e) {
        return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
  }

  return new Response("Method not allowed", { status: 405 });
}
