"use client";

// Mirrors Views/Story/StoryDetailView.swift + StoryHeaderView.swift +
// AtomListView.swift + AtomView.swift:
//   - hero image, category/time meta, serif headline, follow button
//   - "THE FACTS" timeline of atoms, oldest to newest, each numbered
//   - unread atoms get a NEW pill; opening the story marks them all read,
//     which is what drives a story out of Following once nothing's unread
//   - each atom can carry a source attribution and related-story links

import { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useStore } from "../../lib/store";
import { storyById, atomsForStory } from "../../lib/data";

function displayContent(content: string, richContent?: Record<string, string>): string {
  if (content) return content;
  if (richContent?.attribution) return richContent.attribution;
  if (richContent?.caption) return richContent.caption;
  return "";
}

export default function StoryDetailPage() {
  const params = useParams<{ id: string }>();
  const story = storyById(params.id);
  const { isFollowing, follow, unfollow, isAtomRead, markAtomsReadForStory } = useStore();

  useEffect(() => {
    if (story) markAtomsReadForStory(story.id);
    // Viewing a story's facts is what marks them read in the real app —
    // intentionally runs once per story id, matching that behavior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story?.id]);

  if (!story) return notFound();

  const atoms = atomsForStory(story.id);
  const following = isFollowing(story.id);

  return (
    <div>
      {story.imageUrl && (
        <div className="relative h-48 w-full">
          <img src={story.imageUrl} alt={story.title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-text-secondary">
          {story.category && <span>{story.category}</span>}
          <span aria-hidden>·</span>
          <span>Updated {new Date(story.updatedAt).toLocaleDateString()}</span>
        </div>

        <div className="mt-2 flex items-start justify-between gap-3">
          <h1 className="font-serif-editorial text-[24px] leading-snug text-text-primary">
            {story.title}
          </h1>
          <button
            onClick={() => (following ? unfollow(story.id) : follow(story.id))}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium ${
              following
                ? "border border-border text-text-secondary"
                : "bg-primary-blue text-white"
            }`}
          >
            {following ? "Following" : "Follow"}
          </button>
        </div>

        {story.summary && (
          <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">
            {story.summary}
          </p>
        )}
      </div>

      <div className="mt-5 px-4">
        <h2 className="pb-3 text-[12px] font-semibold uppercase tracking-wide text-text-secondary">
          The Facts
        </h2>

        <div className="relative flex flex-col gap-4 border-l border-border pl-4">
          {atoms.map((atom, i) => {
            const unread = !isAtomRead(atom.id);
            return (
              <div key={atom.id} className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary-blue" />
                <div className="flex items-center gap-2 text-[11px] font-semibold text-text-secondary">
                  <span>FACT {i + 1}</span>
                  {unread && (
                    <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] text-white">
                      NEW
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[14px] leading-relaxed text-text-primary">
                  {displayContent(atom.content, atom.richContent)}
                </p>
                {atom.sourceTitle && (
                  <p className="mt-1 text-[11px] text-text-secondary">
                    Source: {atom.sourceTitle}
                  </p>
                )}
                {atom.relatedStories.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {atom.relatedStories.map((r) => (
                      <Link
                        key={r.id}
                        href={`/story/${r.id}`}
                        className="text-[11px] font-medium text-primary-blue"
                      >
                        Related: {r.title} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
