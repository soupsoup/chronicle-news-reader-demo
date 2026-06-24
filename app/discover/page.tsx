"use client";

// Mirrors Views/Discover/DiscoverView.swift — search field, category chips,
// then the full list of published stories.

import { useMemo, useState } from "react";
import Link from "next/link";
import StoryCard from "../components/StoryCard";
import { useStore } from "../lib/store";
import { CATEGORIES } from "../lib/data";

export default function DiscoverPage() {
  const { allStories } = useStore();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allStories;
    return allStories.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.summary?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q)
    );
  }, [allStories, query]);

  return (
    <div className="pt-3">
      <div className="px-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories"
          className="w-full rounded-full border border-border bg-bg-primary px-4 py-2 text-[14px] text-text-primary placeholder:text-text-secondary focus:outline-none"
        />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/discover/${encodeURIComponent(cat)}`}
            className="shrink-0 rounded-full border border-border bg-bg-primary px-3 py-1.5 text-[12px] font-medium text-text-primary"
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="mt-2">
        {filtered.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
        {filtered.length === 0 && (
          <p className="px-4 py-10 text-center text-[13px] text-text-secondary">
            No stories match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
}
