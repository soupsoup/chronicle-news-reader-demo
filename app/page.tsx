"use client";

// Mirrors Views/Feed/FeedView.swift — the Following tab. Only stories with
// unreadCount > 0 appear; a story disappears the moment its last atom is
// marked read (handled inside useStore()).

import StoryCard from "./components/StoryCard";
import { useStore } from "./lib/store";
import Link from "next/link";

export default function FollowingPage() {
  const { followedStories } = useStore();

  if (followedStories.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-8 pt-24 text-center">
        <p className="font-serif-editorial text-[20px] text-text-primary">
          You&apos;re all caught up
        </p>
        <p className="text-[13px] text-text-secondary">
          Follow stories from Discover to track new developments here.
        </p>
        <Link
          href="/discover"
          className="mt-3 rounded-full bg-primary-blue px-4 py-2 text-[13px] font-medium text-white"
        >
          Go to Discover
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-2">
      {followedStories.map((story) => (
        <StoryCard key={story.id} story={story} unreadCount={story.unreadCount} />
      ))}
    </div>
  );
}
