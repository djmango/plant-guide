"use client";

import { useState } from "react";
import Link from "next/link";
import {
  shoppingItems,
  shoppingCategories,
  totalEstimate,
} from "@/data/shopping";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Droplets,
  Flower2,
  Layers,
  Wrench,
  ArrowLeft,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  droplets: <Droplets className="h-4 w-4" />,
  flower: <Flower2 className="h-4 w-4" />,
  layers: <Layers className="h-4 w-4" />,
  wrench: <Wrench className="h-4 w-4" />,
};

export default function ShoppingPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const totalCount = shoppingItems.length;

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
        Parts List
      </div>
      <h1 className="text-3xl font-light tracking-tight text-ink">
        Shopping List
      </h1>
      <p className="mt-2 text-sm text-ink-light">
        Everything you need for repotting day. Check items off as you buy them.
      </p>

      {/* Progress */}
      <div className="mt-6 border border-ink/10 px-4 py-3 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
          Progress
        </span>
        <div className="flex items-center gap-3">
          <div className="w-32 h-1.5 bg-ink/10">
            <div
              className="h-full bg-botanical transition-all duration-300"
              style={{
                width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%`,
              }}
            />
          </div>
          <span className="font-mono text-[11px] text-ink-light">
            {checkedCount}/{totalCount}
          </span>
        </div>
      </div>

      <Separator className="my-8 bg-ink/10" />

      {shoppingCategories.map((category) => {
        const items = shoppingItems.filter(
          (item) => item.category === category.id
        );
        if (items.length === 0) return null;

        return (
          <div key={category.id} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-ink-light">
                {categoryIcons[category.icon]}
              </span>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
                {category.label}
              </h2>
            </div>

            <div className="border border-ink/10 divide-y divide-ink/10">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-3 items-start transition-colors ${
                    checked[item.id] ? "bg-botanical/5" : ""
                  }`}
                >
                  <Checkbox
                    checked={checked[item.id] || false}
                    onCheckedChange={() => toggle(item.id)}
                    className="mt-0.5 rounded-none border-ink/30"
                  />
                  <div>
                    <p
                      className={`text-sm ${
                        checked[item.id]
                          ? "line-through text-ink-light"
                          : "text-ink"
                      }`}
                    >
                      {item.quantity > 1 && (
                        <span className="font-mono text-[11px] text-botanical mr-1.5">
                          x{item.quantity}
                        </span>
                      )}
                      {item.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-ink-light">
                      {item.forPlants.join(" · ")}
                    </p>
                    {item.note && (
                      <p className="mt-0.5 font-mono text-[10px] text-ink-light italic">
                        {item.note}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-[11px] text-ink-light whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Total */}
      <div className="border-2 border-ink px-5 py-4 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
          Estimated Total
        </span>
        <span className="font-mono text-lg text-ink">{totalEstimate}</span>
      </div>
    </div>
  );
}
