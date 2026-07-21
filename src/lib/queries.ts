import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Shared query options for the public CMS tables. */

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const diseasesQuery = queryOptions({
  queryKey: ["diseases"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("diseases")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const toolsQuery = queryOptions({
  queryKey: ["tools"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const teamQuery = queryOptions({
  queryKey: ["team"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const faqsQuery = queryOptions({
  queryKey: ["faqs"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const timelineQuery = queryOptions({
  queryKey: ["timeline"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("timeline_events")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const statsQuery = queryOptions({
  queryKey: ["stats"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});
