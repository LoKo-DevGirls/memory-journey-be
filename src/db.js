import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertMemory({ content }) {
  const imageUrl = "";
  const tags = [];
  const sentiments = {
    calliope: 1,
    clio: 0,
    erato: 0,
    euterpe: 0,
    melpomene: 0,
    polyhymnia: 0,
    terpsichore: 0,
    thalia: 0,
    urania: 0,
  };
  const memory = { content, imageUrl, tags, ...sentiments };
  const { data } = await supabase.from("memories").insert(memory).select();
  if (error) {
    console.log(error);
  }
  return data[0];
  // data: [
  //   {
  //     id: 9,
  //     created_at: '2023-06-16T14:14:27.378239+00:00',
  //     content: 'hello',
  //     imageUrl: '',
  //     tags: [],
  //     calliope: 1,
  //     clio: 0,
  //     erato: 0,
  //     euterpe: 0,
  //     melpomene: 0,
  //     polyhymnia: 0,
  //     terpsichore: 0,
  //     thalia: 0,
  //     urania: 0
  //   }
  // ],
}
