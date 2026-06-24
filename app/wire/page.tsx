"use client";

// Mirrors Views/Wire/WireView.swift — denormalized cross-story unread atoms,
// newest first. Marking one read removes it from the list immediately.

import Link from "next/link";
import { useStore } from "../lib/store";

export default function WirePage() {
  const { wireAtoms, markAtomRead } = useStore();

  return (
    <div className="pt-3">
      <div className="px-4 pb-3">
        <h1 className="font-serif-editorial text-[22px] text-text-primary">
          The Wire
        </h1>
        <p className="text-[13px] text-text-secondary">
          New developments across the stories you follow.
        </p>
      </div>

      {wireAtoms.length === 0 && (
        <p className="px-4 py-10 text-center text-[13px] text-text-secondary">
          You&apos;re caught up. New facts will show up here as they post.
        </p>
      )}

      <div className="flex flex-col gap-2 px-4">
        {wireAtoms.map((atom) => (
          <div key={atom.id} className="editorial-card flex gap-3 p-3">
            {atom.story.imageUrl && (
              <Link href={`/story/${atom.story.id}`} className="shrink-0">
                <img
                  src={atom.story.imageUrl}
                  alt={atom.story.title}
                  className="h-14 w-14 rounded-lg object-cover"
                />
              </Link>
            )}
            <div className="flex-1">
              <Link
                href={`/story/${atom.story.id}`}
                className="text-[11px] font-semibold uppercase tracking-wide text-primary-blue"
              >
                {atom.story.title}
              </Link>
              <p className="mt-1 text-[13px] leading-snug text-text-primary">
                {atom.content || atom.richContent?.caption || atom.richContent?.attribution}
              </p>
              {atom.sourceTitle && (
                <p className="mt-1 text-[11px] text-text-secondary">{atom.sourceTitle}</p>
              )}
            </div>
            <button
              onClick={() => markAtomRead(atom.id)}
              className="self-start shrink-0 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-text-secondary hover:bg-bg-secondary"
            >
              Mark read
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
