"use client";

// Mirrors Views/Discover/CategoryView.swift — stories filtered to one category.

import { useParams } from "next/navigation";
import StoryCard from "../../components/StoryCard";
import { useStore } from "../../lib/store";

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const category = decodeURIComponent(params.category);
  const { allStories } = useStore();
  const stories = allStories.filter((s) => s.category === category);

  return (
    <div className="pt-3">
      <h1 className="px-4 pb-2 font-serif-editorial text-[22px] text-text-primary">
        {category}
      </h1>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
      {stories.length === 0 && (
        <p className="px-4 py-10 text-center text-[13px] text-text-secondary">
          No stories in this category yet.
        </p>
      )}
    </div>
  );
}
