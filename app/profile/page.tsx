"use client";

// Mirrors Views/Profile — lightweight: followed-story management for a demo
// (the real app's account/settings screens aren't relevant to this build).

import Link from "next/link";
import { useStore } from "../lib/store";
import { STORIES } from "../lib/data";

export default function ProfilePage() {
  const { isFollowing, follow, unfollow } = useStore();
  const published = STORIES.filter((s) => s.status === "published");

  return (
    <div className="pt-3">
      <div className="px-4 pb-2">
        <h1 className="font-serif-editorial text-[22px] text-text-primary">
          Anthony DeRosa
        </h1>
        <p className="text-[13px] text-text-secondary">Demo reader account</p>
      </div>

      <div className="px-4 pt-4">
        <h2 className="pb-2 text-[12px] font-semibold uppercase tracking-wide text-text-secondary">
          Manage following
        </h2>
        <div className="flex flex-col gap-2">
          {published.map((s) => {
            const following = isFollowing(s.id);
            return (
              <div
                key={s.id}
                className="editorial-card flex items-center justify-between p-3"
              >
                <Link href={`/story/${s.id}`} className="text-[13px] text-text-primary">
                  {s.title}
                </Link>
                <button
                  onClick={() => (following ? unfollow(s.id) : follow(s.id))}
                  className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-medium ${
                    following
                      ? "border border-border text-text-secondary"
                      : "bg-primary-blue text-white"
                  }`}
                >
                  {following ? "Following" : "Follow"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
