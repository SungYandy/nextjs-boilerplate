"use client";

import { useMemo, useState } from "react";

const personas = [
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

const quoteNoteTemplates = [
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

const primaryPackages = [
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

const addOnBundles = [
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
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6">
        <header className="flex flex-col gap-3 text-center sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Persona-driven Quote Builder
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Quickly assemble tailored quotes by pairing a core package with curated add-ons and client-ready copy.
          </p>
        </header>

        <section className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900 dark:shadow-none md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold">Persona</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Choose the profile that most closely matches your prospect to surface tailored insights.
            </p>
            <label className="mt-4 block text-sm font-medium" htmlFor="persona-select">
              Persona
            </label>
            <select
              id="persona-select"
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
              value={selectedPersonaId}
              onChange={(event) => setSelectedPersonaId(event.target.value)}
            >
              {personas.map((persona) => (
                <option key={persona.id} value={persona.id}>
                  {persona.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <div className="flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
              <div>
                <h3 className="text-lg font-semibold">{selectedPersona.label}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {selectedPersona.description}
                </p>
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

        <section className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900 dark:shadow-none md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium" htmlFor="quote-template-select">
                Quote note template
              </label>
              <select
                id="quote-template-select"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
                value={selectedQuoteTemplateId}
                onChange={(event) => setSelectedQuoteTemplateId(event.target.value)}
              >
                {quoteNoteTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.label}
                  </option>
                ))}
              </select>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {selectedQuoteTemplate.summary}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="primary-package-select">
                Primary package
              </label>
              <select
                id="primary-package-select"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
                value={selectedPrimaryPackageId}
                onChange={(event) => setSelectedPrimaryPackageId(event.target.value)}
              >
                {primaryPackages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.label}
                  </option>
                ))}
              </select>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {selectedPrimaryPackage.details}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="add-on-bundle-select">
                Add-on bundle
              </label>
              <select
                id="add-on-bundle-select"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
                value={selectedAddOnBundleId}
                onChange={(event) => setSelectedAddOnBundleId(event.target.value)}
              >
                {addOnBundles.map((bundle) => (
                  <option key={bundle.id} value={bundle.id}>
                    {bundle.label}
                  </option>
                ))}
              </select>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {selectedAddOnBundle.details}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-2xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
            <h3 className="text-lg font-semibold">Shareable quote summary</h3>
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
