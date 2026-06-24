import Image from "next/image";
import Link from "next/link";
import { Story } from "../lib/data";

// Mirrors Views/Feed/StoryCard.swift: hero image, category + time meta chips,
// serif headline, summary, unread pill.

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(ms / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function StoryCard({
  story,
  unreadCount,
}: {
  story: Story;
  unreadCount?: number;
}) {
  return (
    <Link href={`/story/${story.id}`} className="block px-4 py-2">
      <article className="editorial-card overflow-hidden">
        {story.imageUrl && (
          <div className="relative h-40 w-full">
            <Image
              src={story.imageUrl}
              alt={story.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-text-secondary">
            {story.category && <span>{story.category}</span>}
            <span aria-hidden>·</span>
            <span>{timeAgo(story.updatedAt)}</span>
            {!!unreadCount && unreadCount > 0 && (
              <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
                {unreadCount} new
              </span>
            )}
          </div>
          <h2 className="mt-2 font-serif-editorial text-[19px] leading-snug text-text-primary">
            {story.title}
          </h2>
          {story.summary && (
            <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">
              {story.summary}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
