"use client";

import { useMemo, useState } from "react";

type Persona = {
  id: string;
  label: string;
  description: string;
  topGoals: string[];
  painPoints: string[];
};

type QuoteNoteTemplate = {
  id: string;
  label: string;
  summary: string;
};

type PackageOption = {
  id: string;
  label: string;
  details: string;
};

const personas: Persona[] = [
  {
    id: "event-emma",
    label: "Event Planner Emma",
    description:
      "Coordinates large corporate events and needs reliable vendor partners with turnkey solutions.",
    topGoals: [
      "Find bundled services that simplify planning",
      "Deliver memorable experiences for clients",
      "Keep proposals professional and on-brand",
    ],
    painPoints: [
      "Juggling multiple vendor conversations",
      "Tight deadlines for quote delivery",
      "Need for consistent client communication",
    ],
  },
  {
    id: "startup-sam",
    label: "Startup Founder Sam",
    description:
      "Scaling a new product launch and evaluating marketing partners who can move fast with flexible pricing.",
    topGoals: [
      "Launch campaigns in under two weeks",
      "Track ROI with clear deliverables",
      "Build trust with investors and early adopters",
    ],
    painPoints: [
      "Limited internal resources",
      "Need agile packaging options",
      "Requires data-backed recommendations",
    ],
  },
  {
    id: "retail-riley",
    label: "Retail Director Riley",
    description:
      "Oversees regional retail stores and seeks scalable programs that boost recurring revenue and loyalty.",
    topGoals: [
      "Deliver consistent in-store activations",
      "Upskill store teams quickly",
      "Increase repeat customer engagement",
    ],
    painPoints: [
      "Hard to localize messaging",
      "Multiple approval layers",
      "Needs turnkey training content",
    ],
  },
];

const quoteNoteTemplates: QuoteNoteTemplate[] = [
  {
    id: "warm-intro",
    label: "Warm introduction",
    summary:
      "Friendly opener acknowledging their current momentum and positioning your team as collaborative partners.",
  },
  {
    id: "roi-focused",
    label: "ROI-focused",
    summary:
      "Direct messaging that highlights efficiency, measurable outcomes, and speedy implementation milestones.",
  },
  {
    id: "concierge",
    label: "Concierge-style",
    summary:
      "High-touch service tone that emphasizes white-glove support and dedicated point-of-contact.",
  },
];

const primaryPackages: PackageOption[] = [
  {
    id: "starter-kit",
    label: "Starter kit",
    details: "Discovery workshop, implementation roadmap, and pilot activation support.",
  },
  {
    id: "growth-accelerator",
    label: "Growth accelerator",
    details: "Full-funnel campaign management with creative production and analytics reporting.",
  },
  {
    id: "enterprise-retainer",
    label: "Enterprise retainer",
    details: "Dedicated cross-functional squad with quarterly strategy reviews and on-site enablement.",
  },
];

const addOnBundles: PackageOption[] = [
  {
    id: "analytics-upgrade",
    label: "Analytics upgrade",
    details: "Advanced dashboards, conversion tracking, and monthly optimization labs.",
  },
  {
    id: "workshop-series",
    label: "Workshop series",
    details: "Modular training for internal teams with hands-on playbooks and certification.",
  },
  {
    id: "vip-experience",
    label: "VIP experience",
    details: "Executive briefings, invite-only events, and branded concierge touchpoints.",
  },
];

function MenuOption({
  isActive,
  label,
  description,
  onSelect,
}: {
  isActive: boolean;
  label: string;
  description: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-400 ${
        isActive
          ? "border-zinc-900 bg-zinc-900 text-zinc-50 shadow-sm dark:border-zinc-100"
          : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-500"
      }`}
    >
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{description}</p>
    </button>
  );
}

function PackageMenuOption({
  isActive,
  label,
  details,
  onSelect,
}: {
  isActive: boolean;
  label: string;
  details: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-400 ${
        isActive
          ? "border-zinc-900 bg-zinc-900 text-zinc-50 shadow-sm dark:border-zinc-100"
          : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-500"
      }`}
    >
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{details}</p>
    </button>
  );
}

export default function Home() {
  const [selectedPersonaId, setSelectedPersonaId] = useState(personas[0]?.id ?? "");
  const [selectedQuoteTemplateId, setSelectedQuoteTemplateId] = useState(
    quoteNoteTemplates[0]?.id ?? "",
  );
  const [selectedPrimaryPackageId, setSelectedPrimaryPackageId] = useState(
    primaryPackages[0]?.id ?? "",
  );
  const [selectedAddOnBundleId, setSelectedAddOnBundleId] = useState(
    addOnBundles[0]?.id ?? "",
  );

  const selectedPersona = useMemo(
    () => personas.find((persona) => persona.id === selectedPersonaId) ?? personas[0],
    [selectedPersonaId],
  );

  const selectedQuoteTemplate = useMemo(
    () =>
      quoteNoteTemplates.find((template) => template.id === selectedQuoteTemplateId) ??
      quoteNoteTemplates[0],
    [selectedQuoteTemplateId],
  );

  const selectedPrimaryPackage = useMemo(
    () =>
      primaryPackages.find((pkg) => pkg.id === selectedPrimaryPackageId) ?? primaryPackages[0],
    [selectedPrimaryPackageId],
  );

  const selectedAddOnBundle = useMemo(
    () => addOnBundles.find((bundle) => bundle.id === selectedAddOnBundleId) ?? addOnBundles[0],
    [selectedAddOnBundleId],
  );

  return (
    <div className="min-h-screen bg-zinc-50 py-16 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <header className="flex flex-col gap-3 text-center sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            TheSystem© Quote Launcher
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Build an on-brand package in seconds. Pick a persona, blend in the right assets, and ship a polished deck
            without leaving this screen.
          </p>
        </header>

        <section className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900 dark:shadow-none lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold">Persona menu</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Re-embed each buyer profile into your flow by choosing from the curated menu below.
            </p>
            <nav className="mt-6 space-y-3" aria-label="Persona menu">
              {personas.map((persona) => (
                <MenuOption
                  key={persona.id}
                  isActive={persona.id === selectedPersonaId}
                  label={persona.label}
                  description={persona.description}
                  onSelect={() => setSelectedPersonaId(persona.id)}
                />
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
              <div>
                <h3 className="text-lg font-semibold">{selectedPersona.label}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{selectedPersona.description}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Top Goals
                  </h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                    {selectedPersona.topGoals.map((goal) => (
                      <li key={goal}>{goal}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Pain Points
                  </h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                    {selectedPersona.painPoints.map((painPoint) => (
                      <li key={painPoint}>{painPoint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900 dark:shadow-none lg:grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold">Quote builder menu</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Switch any tile to remix the tone, primary coverage, or the experiential add-ons before you deploy.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Quote note templates
                </h3>
                <nav className="mt-3 space-y-3" aria-label="Quote note templates">
                  {quoteNoteTemplates.map((template) => (
                    <MenuOption
                      key={template.id}
                      isActive={template.id === selectedQuoteTemplateId}
                      label={template.label}
                      description={template.summary}
                      onSelect={() => setSelectedQuoteTemplateId(template.id)}
                    />
                  ))}
                </nav>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Primary packages
                </h3>
                <nav className="mt-3 space-y-3" aria-label="Primary packages">
                  {primaryPackages.map((pkg) => (
                    <PackageMenuOption
                      key={pkg.id}
                      isActive={pkg.id === selectedPrimaryPackageId}
                      label={pkg.label}
                      details={pkg.details}
                      onSelect={() => setSelectedPrimaryPackageId(pkg.id)}
                    />
                  ))}
                </nav>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Add-on bundles
                </h3>
                <nav className="mt-3 space-y-3" aria-label="Add-on bundles">
                  {addOnBundles.map((bundle) => (
                    <PackageMenuOption
                      key={bundle.id}
                      isActive={bundle.id === selectedAddOnBundleId}
                      label={bundle.label}
                      details={bundle.details}
                      onSelect={() => setSelectedAddOnBundleId(bundle.id)}
                    />
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-2xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div>
              <h3 className="text-lg font-semibold">Shareable quote summary</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Deploy this block into your doc or send it straight to a client chat.
              </p>
            </div>
            <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Persona</h4>
                <p>{selectedPersona.label}</p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Quote note</h4>
                <p>{selectedQuoteTemplate.summary}</p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Primary package</h4>
                <p>{selectedPrimaryPackage.label}</p>
                <p className="text-zinc-600 dark:text-zinc-400">{selectedPrimaryPackage.details}</p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Add-on bundle</h4>
                <p>{selectedAddOnBundle.label}</p>
                <p className="text-zinc-600 dark:text-zinc-400">{selectedAddOnBundle.details}</p>
              </div>
              <button
                type="button"
                className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                onClick={() => {
                  // simple confirmation for deploy action
                  alert("Quote deployed! TheSystem© is active — powered by Nextplanet Solutions!");
                }}
              >
                Deploy this quote
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
