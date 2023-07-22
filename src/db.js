import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function _insertTags({ tags, memoryId }) {
  const tagList = [];
  const tag = tags.map((value) => ({ tag: value, memory_id: memoryId }));
  tagList.push(...tag);

  const { data, error } = await supabase.from("tags").insert(tagList).select();

  if (error) {
    console.log(error);
    throw new Error();
  }
  return data;
}

export async function insertMemory({
  content,
  imageUrl,
  consciousness,
  time,
  feeling,
  tags,
}) {
  const memory = { content, imageUrl, consciousness, time, feeling, tags };
  const { data, error } = await supabase
    .from("memories")
    .insert(memory)
    .select();
  if (error) {
    console.log(error);
    throw new Error();
  }

  return { ...data[0], tags };
}

export async function getMemory({ id }) {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .eq("id", id);
  if (error) {
    console.log(error);
    throw new Error();
  }
  return data[0];
}

export async function getAllMemory() {
  let query = supabase.from("memories").select("*");

  // SELECT 쿼리 실행
  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error();
  }

  return data;
}

export async function getMemoryByTag({ tag }) {
  // TODO
}


