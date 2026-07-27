"use client";

import { useState } from "react";
import { StepProgress } from "./StepProgress";
import { Step1PropertySpecs } from "./Step1PropertySpecs";
import { Step2Describe } from "./Step2Describe";
import { LoadingView } from "./LoadingView";
import { SelectionView } from "./SelectionView";
import { ResultView } from "./ResultView";
import { GeneratedAsset, GeneratorState } from "@/lib/types";
import { getAvailableTones } from "@/lib/toneOptions";

const initialState: GeneratorState = {
  property: "Hillsdale College",
  aspectRatio: "16:9",
  category: "Classroom",
  style: "Candid",
  tone: "Dramatic",
  description: "",
};

interface GeneratorWizardProps {
  onAssetCreated: (asset: GeneratedAsset) => void;
}

type WizardStep = 1 | 2 | "loading" | "select" | "result";

export function GeneratorWizard({ onAssetCreated }: GeneratorWizardProps) {
  const [step, setStep] = useState<WizardStep>(1);
  const [state, setState] = useState<GeneratorState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [candidatePrompt, setCandidatePrompt] = useState<string>("");
  const [result, setResult] = useState<GeneratedAsset | null>(null);

  function patch(update: Partial<GeneratorState>) {
    setState((prev) => ({ ...prev, ...update }));
  }

  async function handleGenerate() {
    if (!state.description.trim()) {
      setError("Describe your image before generating.");
      return;
    }
    setError(null);
    setStep("loading");

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong generating the image.");
      }

      setCandidates(data.images);
      setCandidatePrompt(data.prompt);
      setStep("select");
    } catch (err: any) {
      setError(err?.message || "Something went wrong generating the image.");
      setStep(2);
    }
  }

  function handleSelect(index: number) {
    const asset: GeneratedAsset = {
      id: Date.now(),
      image: candidates[index],
      prompt: candidatePrompt,
      property: state.property,
      category: state.category,
    };
    setResult(asset);
    onAssetCreated(asset);
    setStep("result");
  }

  return (
    <div className="max-w-[700px]">
      <StepProgress step={step === 1 ? 1 : "result"} />

      {step === 1 && (
        <Step1PropertySpecs
          state={state}
          onChange={patch}
          onNext={() => {
            // Each property has its own tone options (see lib/toneOptions.ts).
            // If the currently selected tone isn't valid for the newly chosen
            // property, fall back to that property's first available tone
            // before Step 2 renders, so a tone is always validly selected.
            const tones = getAvailableTones(state.property);
            if (!tones.includes(state.tone)) {
              patch({ tone: tones[0] });
            }
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <Step2Describe
          state={state}
          onChange={patch}
          onBack={() => setStep(1)}
          onGenerate={handleGenerate}
          generating={false}
          error={error}
        />
      )}

      {step === "loading" && <LoadingView />}

      {step === "select" && (
        <SelectionView images={candidates} onSelect={handleSelect} onBack={() => setStep(2)} />
      )}

      {step === "result" && result && (
        <ResultView
          asset={result}
          onEdit={() => setStep(2)}
          onStartOver={() => {
            setState(initialState);
            setCandidates([]);
            setResult(null);
            setStep(1);
          }}
        />
      )}
    </div>
  );
}
