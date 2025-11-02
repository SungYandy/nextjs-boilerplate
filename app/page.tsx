"use client";

import { useMemo, useState } from "react";

type Persona = {
  id: string;
  name: string;
  tone: string;
  description: string;
};

type ConversationMessage = {
  id: string;
  role: "user" | "assistant";
  author: string;
  content: string;
  timestamp: string;
};

const personas: Persona[] = [
  {
    id: "specialist",
    name: "Sales Specialist",
    tone: "Persuasive",
    description: "Keeps pricing tight while highlighting ROI.",
  },
  {
    id: "advisor",
    name: "Solution Advisor",
    tone: "Consultative",
    description: "Balances technical depth with strategic framing.",
  },
  {
    id: "support",
    name: "Customer Success",
    tone: "Reassuring",
    description: "Builds trust and de-risks onboarding conversations.",
  },
];

const defaultMessages: ConversationMessage[] = [
  {
    id: "intro",
    role: "user",
    author: "Prospect",
    content: "Hi! I'm looking for pricing on the enterprise plan.",
    timestamp: "10:12 AM",
  },
  {
    id: "quote",
    role: "assistant",
    author: "Atlas AI",
    content:
      "Absolutely! The enterprise plan starts at $2,499/mo and includes 24/7 support, SSO, and quarterly success reviews.",
    timestamp: "10:13 AM",
  },
  {
    id: "follow-up",
    role: "user",
    author: "Prospect",
    content: "Great. Can we include sentiment analysis in the bundle?",
    timestamp: "10:14 AM",
  },
];

export default function Home() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(personas[0]);
  const [temperature, setTemperature] = useState(0.4);
  const [messages, setMessages] = useState(defaultMessages);
  const [notes, setNotes] = useState(
    "Include sentiment analysis add-on, premium reporting, and 90-day onboarding milestone.",
  );
  const [primaryPackage, setPrimaryPackage] = useState("Enterprise plan · $2,499/mo");
  const [addOns, setAddOns] = useState("Sentiment analysis · $399/mo");
  const [sendToCrm, setSendToCrm] = useState(true);
  const [needsReview, setNeedsReview] = useState(false);

  const insightCards = useMemo(
    () => [
      {
        label: "Lead status",
        value: "Qualified",
        helper: "Last updated 2 minutes ago",
      },
      {
        label: "Persona",
        value: `${selectedPersona.name} · ${selectedPersona.tone}`,
        helper: selectedPersona.description,
      },
      {
        label: "Response quality",
        value: `${Math.round((1 - temperature) * 90 + 10)}% confidence`,
        helper: "Lower temperature yields more precise quotes",
      },
    ],
    [selectedPersona, temperature],
  );

  const handleDraftFollowUp = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((previous) => [
      ...previous,
      {
        id: `draft-${previous.length}`,
        role: "assistant",
        author: "Atlas AI",
        content:
          "I can bundle the enterprise plan with sentiment analysis and include a 90-day pilot. Shall I send the paperwork?",
        timestamp,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">AI quoting desk</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Deal room dashboard</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
              Review the live conversation, adjust the agent persona, and prepare the quote handoff for your prospect.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-600 shadow-sm dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 dark:bg-emerald-300" aria-hidden="true" />
            Live session
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
          <article className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="grid gap-4 sm:grid-cols-3">
              {insightCards.map((insight) => (
                <dl
                  key={insight.label}
                  className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800/70"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{insight.label}</dt>
                  <dd className="text-base font-semibold text-slate-900 dark:text-white">{insight.value}</dd>
                  <dd className="text-xs text-slate-500 dark:text-slate-400">{insight.helper}</dd>
                </dl>
              ))}
            </div>

            <div className="flex flex-1 flex-col rounded-3xl border border-slate-200 bg-white/95 shadow-inner dark:border-slate-800 dark:bg-slate-950/40">
              <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Conversation timeline</h2>
              </div>
              <ol className="flex flex-1 flex-col gap-4 overflow-auto px-6 py-6">
                {messages.map((message) => (
                  <li key={message.id} className="flex items-start gap-4">
                    <div
                      className={`mt-1 h-10 w-10 shrink-0 rounded-full border text-sm font-semibold uppercase tracking-wide ${
                        message.role === "assistant"
                          ? "border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-500/40 dark:bg-indigo-500/20 dark:text-indigo-100"
                          : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900"
                      }`}
                      aria-hidden="true"
                    >
                      <span className="flex h-full w-full items-center justify-center">
                        {message.role === "assistant" ? "AI" : "U"}
                      </span>
                    </div>
                    <div className="flex-1 rounded-2xl border border-dashed border-slate-200 bg-white/85 p-4 dark:border-slate-800 dark:bg-slate-900/70">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{message.author}</p>
                        <time className="text-xs text-slate-400 dark:text-slate-500">{message.timestamp}</time>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{message.content}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="rounded-3xl border border-indigo-200 bg-indigo-50/80 p-6 text-sm text-indigo-900 dark:border-indigo-500/40 dark:bg-indigo-500/10 dark:text-indigo-100">
              <h3 className="text-base font-semibold">AI agent tip</h3>
              <p className="mt-2 leading-6">
                Drop the temperature below 0.3 when the prospect requests precise pricing. Increase it for storytelling follow-ups
                that reinforce value.
              </p>
            </aside>
          </article>

          <aside className="flex flex-col gap-6">
            <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Agent controls</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Choose the voice and calibration for the AI quoting agent before you prepare a response.
              </p>

              <div className="mt-5 flex flex-col gap-4">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Persona</span>
                  <select
                    className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    value={selectedPersona.id}
                    onChange={(event) => {
                      const persona = personas.find((item) => item.id === event.target.value) ?? personas[0];
                      setSelectedPersona(persona);
                    }}
                  >
                    {personas.map((persona) => (
                      <option key={persona.id} value={persona.id}>
                        {persona.name} · {persona.tone}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{selectedPersona.description}</span>
                </label>

                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Temperature</span>
                  <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-inner dark:border-slate-700 dark:bg-slate-900">
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.1}
                      value={temperature}
                      onChange={(event) => setTemperature(Number(event.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-indigo-100 accent-indigo-600 dark:bg-indigo-500/30"
                    />
                    <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Precise</span>
                      <span>Creative</span>
                    </div>
                  </div>
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Quote builder</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Draft the commercial summary that the agent will send to the prospect.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDraftFollowUp}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Draft follow-up
                </button>
              </div>

              <div className="mt-6 grid gap-5 text-sm">
                <label className="flex flex-col gap-2">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Quote notes</span>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Summarize the solution, pricing tiers, and any custom add-ons."
                    className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm leading-6 text-slate-700 shadow-inner focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Primary package</span>
                  <input
                    type="text"
                    value={primaryPackage}
                    onChange={(event) => setPrimaryPackage(event.target.value)}
                    className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Add-ons</span>
                  <input
                    type="text"
                    value={addOns}
                    onChange={(event) => setAddOns(event.target.value)}
                    className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 text-sm">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={sendToCrm}
                    onChange={(event) => setSendToCrm(event.target.checked)}
                    className="h-4 w-4 rounded border border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600"
                  />
                  <span className="text-slate-600 dark:text-slate-300">Push summary to CRM when quote is generated</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={needsReview}
                    onChange={(event) => setNeedsReview(event.target.checked)}
                    className="h-4 w-4 rounded border border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600"
                  />
                  <span className="text-slate-600 dark:text-slate-300">Flag this opportunity for manager review</span>
                </label>
              </div>

              <div className="mt-8 flex flex-wrap justify-end gap-3 text-sm">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white"
                >
                  Preview email
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 font-semibold text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                  Generate quote
                </button>
              </div>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}
