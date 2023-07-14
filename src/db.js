import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertMemory({
  content,
  category,
  imageUrl,
  consciousness,
  time,
  feeling,
}) {
  const memory = { content, imageUrl, category, consciousness, time, feeling };
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

export async function get({ id }) {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .eq('id', id);
  if (error) {
    console.log(error);
    throw new Error();
  }
  return data[0];
}

export async function getAll({ category }) {
  let query = supabase
    .from("memories")
    .select("*");

  // category 값이 주어진 경우에만 조건 추가
  if (category !== null && category !== undefined) {
    query = query.eq('category', category);
  }

  // SELECT 쿼리 실행
  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error();
  }

  return data;
}

export async function insertTags({ tags, memoryId }) {
  const tagList = [];
  const tag = tags.map(value => ({ tag: value, memory_id: memoryId }));
  tagList.push(...tag);

  const { data, error } = await supabase
    .from("tags")
    .insert(tagList)
    .select();

  if (error) {
    console.log(error);
    throw new Error();
  }
  return data;
}

