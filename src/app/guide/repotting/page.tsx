import Link from "next/link";
import { repottingSteps } from "@/data/repotting-steps";
import {
  Droplets,
  FlaskConical,
  Container,
  Hand,
  Scissors,
  ArrowDownToLine,
  Gauge,
  CupSoda,
  MapPin,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  droplets: <Droplets className="h-6 w-6" />,
  beaker: <FlaskConical className="h-6 w-6" />,
  container: <Container className="h-6 w-6" />,
  hand: <Hand className="h-6 w-6" />,
  scissors: <Scissors className="h-6 w-6" />,
  "arrow-down-to-line": <ArrowDownToLine className="h-6 w-6" />,
  gauge: <Gauge className="h-6 w-6" />,
  "cup-soda": <CupSoda className="h-6 w-6" />,
  "map-pin": <MapPin className="h-6 w-6" />,
};

export default function RepottingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light hover:text-ink transition-colors mb-8"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to catalog
      </Link>

      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-light">
        Assembly Instructions
      </div>
      <h1 className="text-3xl font-light tracking-tight text-ink">
        Repotting Guide
      </h1>
      <p className="mt-2 text-sm text-ink-light">
        Follow these steps on repotting day. Read all steps before starting.
      </p>

      {/* Warning callout */}
      <div className="mt-6 border-2 border-danger/40 bg-danger/5 px-5 py-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-danger font-medium">
            Safety Warning
          </p>
          <p className="mt-1 text-sm text-danger/80">
            The Euphorbia Firestick has toxic milky sap that burns skin and
            eyes. Always wear gloves when handling. Keep away from pets and
            children.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="mt-10 space-y-0">
        {repottingSteps.map((step) => (
          <div
            key={step.number}
            className="border border-ink/10 border-b-0 last:border-b"
          >
            <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr]">
              {/* Step number + icon */}
              <div className="flex flex-col items-center justify-center gap-2 border-r border-ink/10 py-6 bg-paper-dark/50">
                <span className="flex items-center justify-center w-10 h-10 border-2 border-ink text-ink font-mono text-lg font-medium">
                  {step.number}
                </span>
                <span className="text-ink-light">
                  {iconMap[step.icon] || null}
                </span>
              </div>

              {/* Content */}
              <div className="px-5 py-5">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink font-medium">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-ink leading-relaxed">
                  {step.instruction}
                </p>

                {step.warning && (
                  <div className="mt-3 flex items-start gap-2 border border-danger/30 bg-danger/5 px-3 py-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-danger shrink-0 mt-0.5" />
                    <p className="font-mono text-[10px] text-danger leading-relaxed">
                      {step.warning}
                    </p>
                  </div>
                )}

                {step.plantNotes && step.plantNotes.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {step.plantNotes.map((note, i) => (
                      <p
                        key={i}
                        className="font-mono text-[10px] text-ink-light leading-relaxed"
                      >
                        <span className="text-botanical mr-1">&#9656;</span>
                        {note}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
