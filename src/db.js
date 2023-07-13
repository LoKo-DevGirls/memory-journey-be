import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertMemory({
  content,
  category,
  sentiments,
  imageUrl,
}) {
  const memory = { content, imageUrl, category, ...sentiments };
  const { data, error } = await supabase
    .from("memories")
    .insert(memory)
    .select();
  if (error) {
    console.log(error);
    throw new Error();
  }
  return data[0];
}

export async function insertMuse({ id: memory_id, museContent }) {
  const { data, error } = await supabase
    .from("muse")
    .insert([{ memory_id: memory_id, muse: museContent }])
    .select();
  if (error) {
    console.log(error);
    throw new Error();
  }
  return data[0];
}
