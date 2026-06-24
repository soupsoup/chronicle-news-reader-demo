"use client";

// ---------------------------------------------------------------------------
// Client-side state store for the demo.
//
// The real iOS app keeps this in StoryService (an @MainActor ObservableObject
// backed by Supabase). This demo has no backend, so the same rules are
// reproduced in memory via React context:
//
//   - Following only shows stories with unreadCount > 0. A story drops out
//     of Following the instant its last unread atom is marked read.
//   - Wire shows unread atoms across ALL followed stories, newest first.
//     Marking one read removes it from Wire immediately.
//   - Unfollowing removes a story from Following immediately (no refetch
//     needed); following adds it back.
// ---------------------------------------------------------------------------

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import {
  STORIES,
  ATOMS,
  Story,
  Atom,
  atomsForStory,
  DEFAULT_FOLLOWED_IDS,
  DEFAULT_READ_ATOM_IDS,
} from "./data";

interface StoryWithMeta extends Story {
  unreadCount: number;
  isFollowing: boolean;
}

interface StoreValue {
  allStories: Story[];
  followedStories: StoryWithMeta[];
  wireAtoms: (Atom & { story: Story })[];
  isFollowing: (storyId: string) => boolean;
  unreadCountFor: (storyId: string) => number;
  follow: (storyId: string) => void;
  unfollow: (storyId: string) => void;
  isAtomRead: (atomId: string) => boolean;
  markAtomRead: (atomId: string) => void;
  markAtomsReadForStory: (storyId: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [followedIds, setFollowedIds] = useState<Set<string>>(
    new Set(DEFAULT_FOLLOWED_IDS)
  );
  const [readAtomIds, setReadAtomIds] = useState<Set<string>>(
    new Set(DEFAULT_READ_ATOM_IDS)
  );

  const unreadCountFor = (storyId: string) =>
    atomsForStory(storyId).filter((a) => !readAtomIds.has(a.id)).length;

  const isFollowing = (storyId: string) => followedIds.has(storyId);

  const follow = (storyId: string) =>
    setFollowedIds((prev) => new Set(prev).add(storyId));

  const unfollow = (storyId: string) =>
    setFollowedIds((prev) => {
      const next = new Set(prev);
      next.delete(storyId);
      return next;
    });

  const isAtomRead = (atomId: string) => readAtomIds.has(atomId);

  const markAtomRead = (atomId: string) =>
    setReadAtomIds((prev) => new Set(prev).add(atomId));

  const markAtomsReadForStory = (storyId: string) =>
    setReadAtomIds((prev) => {
      const next = new Set(prev);
      atomsForStory(storyId).forEach((a) => next.add(a.id));
      return next;
    });

  const followedStories: StoryWithMeta[] = useMemo(() => {
    return STORIES.filter((s) => s.status === "published")
      .filter((s) => followedIds.has(s.id))
      .map((s) => ({ ...s, unreadCount: unreadCountFor(s.id), isFollowing: true }))
      // Following rule: stories with everything read drop out of the list.
      .filter((s) => s.unreadCount > 0)
      .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
  }, [followedIds, readAtomIds]);

  const wireAtoms = useMemo(() => {
    return ATOMS.filter((a) => followedIds.has(a.storyId) && !readAtomIds.has(a.id))
      .map((a) => ({ ...a, story: STORIES.find((s) => s.id === a.storyId)! }))
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [followedIds, readAtomIds]);

  const value: StoreValue = {
    allStories: STORIES.filter((s) => s.status === "published"),
    followedStories,
    wireAtoms,
    isFollowing,
    unreadCountFor,
    follow,
    unfollow,
    isAtomRead,
    markAtomRead,
    markAtomsReadForStory,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
