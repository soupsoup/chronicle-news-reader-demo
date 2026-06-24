// ---------------------------------------------------------------------------
// DEMO BUILD — fictional seed data only.
//
// This is the same fictional Chronicle News universe used in the chronicle-web
// (editorial CMS) demo — same four stories, same atoms, same categories — so
// the two demos read as one consistent product. No real Pluralsight, personal,
// or production data appears anywhere below.
//
// Shape mirrors the real iOS app's Models/Story.swift and Models/Atom.swift
// (snake_case Supabase columns translated to the same camelCase fields the
// app's Codable structs expose), so the components below carry the same
// fields and logic the real SwiftUI views read.
// ---------------------------------------------------------------------------

export type StoryStatus = "draft" | "published" | "archived";

export interface RelatedStory {
  id: string;
  title: string;
}

export interface Atom {
  id: string;
  storyId: string;
  type: "text" | "quote" | "image" | "video";
  content: string;
  richContent?: Record<string, string>;
  sourceUrl?: string;
  sourceTitle?: string;
  position: number;
  createdAt: string;
  relatedStories: RelatedStory[];
}

export interface Story {
  id: string;
  title: string;
  summary?: string;
  category?: string;
  imageUrl?: string;
  status: StoryStatus;
  createdAt: string;
  updatedAt: string;
}

const storyWaterId = "story-water";
const storyTransitId = "story-transit";
const storyAirlinesId = "story-airlines";
const storyRedistrictId = "story-redistrict";

export const STORIES: Story[] = [
  {
    id: storyWaterId,
    title: "Municipal Water Systems Brace for Cyber Threats",
    summary:
      "Three regional water utilities adopted new intrusion-detection requirements after a near-miss at a treatment plant control system.",
    category: "Infrastructure",
    imageUrl:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200&q=60",
    status: "published",
    createdAt: "2026-05-04T13:10:00Z",
    updatedAt: "2026-06-02T16:40:00Z",
  },
  {
    id: storyTransitId,
    title: "Downtown Transit Overhaul Hits Funding Snag",
    summary:
      "The light-rail extension lost its federal matching grant after a procurement audit flagged the lead contractor.",
    category: "Transportation",
    imageUrl:
      "https://images.unsplash.com/photo-1444986230814-eee734f59124?w=1200&q=60",
    status: "published",
    createdAt: "2026-05-21T09:00:00Z",
    updatedAt: "2026-06-10T11:05:00Z",
  },
  {
    id: storyAirlinesId,
    title: "Regional Airlines Consolidate Amid Fuel Cost Spike",
    summary:
      "Two mid-size carriers announced a merger after jet fuel costs rose 18% over the last two quarters.",
    category: "Business",
    imageUrl:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=60",
    status: "published",
    createdAt: "2026-04-12T08:30:00Z",
    updatedAt: "2026-05-29T14:20:00Z",
  },
  {
    id: storyRedistrictId,
    title: "Statehouse Redistricting Fight Heads to Court",
    summary:
      "A state appeals court agreed to hear arguments over whether new district maps dilute minority representation.",
    category: "Politics",
    imageUrl:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=60",
    status: "published",
    createdAt: "2026-03-02T10:00:00Z",
    updatedAt: "2026-03-28T17:50:00Z",
  },
];

export const ATOMS: Atom[] = [
  {
    id: "atom-water-1",
    storyId: storyWaterId,
    type: "text",
    content:
      "Three utilities serving a combined 480,000 residents confirmed they are rolling out new SCADA intrusion-detection rules after a contractor flagged unusual remote-access attempts at a treatment plant in March.",
    sourceUrl: "https://example-news.test/wire/water-utility-grant",
    sourceTitle: "Statehouse Wire",
    position: 0,
    createdAt: "2026-05-04T13:10:00Z",
    relatedStories: [],
  },
  {
    id: "atom-water-2",
    storyId: storyWaterId,
    type: "quote",
    content:
      "We caught this before it touched anything operational, but the margin was thinner than anyone wants to admit.",
    richContent: { attribution: "Utility IT director, speaking on background" },
    position: 1,
    createdAt: "2026-05-05T10:00:00Z",
    relatedStories: [],
  },
  {
    id: "atom-water-3",
    storyId: storyWaterId,
    type: "text",
    content:
      "State regulators are now drafting a rule that would require annual third-party penetration tests for any utility serving more than 50,000 customers.",
    position: 2,
    createdAt: "2026-06-02T16:40:00Z",
    relatedStories: [{ id: storyRedistrictId, title: "Statehouse Redistricting Fight Heads to Court" }],
  },

  {
    id: "atom-transit-1",
    storyId: storyTransitId,
    type: "text",
    content:
      "The federal matching grant for the light-rail extension was pulled after a procurement audit flagged the lead contractor for change-order irregularities totaling an estimated $14M.",
    sourceUrl: "https://example-news.test/wire/transit-board-meeting",
    sourceTitle: "Transit Authority Press Releases",
    position: 0,
    createdAt: "2026-05-21T09:00:00Z",
    relatedStories: [],
  },
  {
    id: "atom-transit-2",
    storyId: storyTransitId,
    type: "image",
    content: "",
    richContent: {
      caption: "Construction at the Fifth Street extension site, paused since early June.",
    },
    position: 1,
    createdAt: "2026-06-05T12:00:00Z",
    relatedStories: [],
  },
  {
    id: "atom-transit-3",
    storyId: storyTransitId,
    type: "text",
    content:
      "City planners confirmed they are studying bus rapid transit as a cheaper, faster-to-build alternative while the light-rail funding gap remains open.",
    sourceUrl: "https://example-news.test/articles/bus-rapid-transit",
    sourceTitle: "Transit Authority Press Releases",
    position: 2,
    createdAt: "2026-06-21T07:15:00Z",
    relatedStories: [],
  },

  {
    id: "atom-airlines-1",
    storyId: storyAirlinesId,
    type: "text",
    content:
      "Two mid-size regional carriers announced plans to merge after jet fuel costs rose 18% over the last two quarters, squeezing margins on short-haul routes.",
    sourceUrl: "https://example-news.test/wire/regional-business",
    sourceTitle: "Regional Business Journal",
    position: 0,
    createdAt: "2026-04-12T08:30:00Z",
    relatedStories: [],
  },
  {
    id: "atom-airlines-2",
    storyId: storyAirlinesId,
    type: "quote",
    content:
      "This is consolidation driven by fuel costs, not demand. The routes are still profitable on their own.",
    richContent: { attribution: "Regional aviation analyst" },
    position: 1,
    createdAt: "2026-05-29T14:20:00Z",
    relatedStories: [],
  },

  {
    id: "atom-redistrict-1",
    storyId: storyRedistrictId,
    type: "text",
    content:
      "A state appeals court agreed to hear arguments on whether the new district maps dilute representation in three majority-minority districts.",
    sourceUrl: "https://example-news.test/articles/redistrict-appeal",
    sourceTitle: "Statehouse Wire",
    position: 0,
    createdAt: "2026-03-02T10:00:00Z",
    relatedStories: [],
  },
  {
    id: "atom-redistrict-2",
    storyId: storyRedistrictId,
    type: "text",
    content:
      "Oral arguments are scheduled for next month; a ruling before the filing deadline for next year's primary is considered unlikely.",
    position: 1,
    createdAt: "2026-03-28T17:50:00Z",
    relatedStories: [],
  },
];

export const CATEGORIES = Array.from(
  new Set(STORIES.filter((s) => s.status === "published").map((s) => s.category!).filter(Boolean))
).sort();

export function atomsForStory(storyId: string): Atom[] {
  return ATOMS.filter((a) => a.storyId === storyId).sort((a, b) => a.position - b.position);
}

export function storyById(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}

// Default demo state: following two of the four stories with a realistic mix
// of read/unread atoms, so Following + Wire aren't empty on first load.
export const DEFAULT_FOLLOWED_IDS = [storyWaterId, storyAirlinesId];
export const DEFAULT_READ_ATOM_IDS = ["atom-water-1", "atom-airlines-1"];
