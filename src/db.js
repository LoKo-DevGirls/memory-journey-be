import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

export async function getAll() {
  let query = supabase
    .from("memories")
    .select("*");

  // SELECT 쿼리 실행
  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error();
  }

  return data;
}

export async function getTagList() {
  let query = supabase
    .from("memories")
    .select("tags");

  // SELECT 쿼리 실행
  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error();
  }

  return data;
}

export async function updateMemory(id, {
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
    .update(memory)
    .eq('id', id)
    .select();
  if (error) {
    console.log(error);
    throw new Error();
  }
  return data[0];
}

export async function deleteMemory(id) {
  const { data, error } = await supabase
    .from("memories")
    .delete()
    .eq('id', id);
  if (error) {
    console.log(error);
    throw new Error();
  }
  return data[0];
}
