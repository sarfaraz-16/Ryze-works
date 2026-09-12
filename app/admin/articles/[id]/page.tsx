import React from "react";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { ArticleEditorForm } from "../ArticleEditorForm";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const supabase = createAdminClient();

  let article: any = null;
  if (supabase) {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      article = data;
    }
  }

  if (!article) {
    notFound();
  }

  return <ArticleEditorForm initialArticle={article} />;
}
