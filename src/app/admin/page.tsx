"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, Shield, Trash2, X } from "lucide-react";

interface WateringLog {
  id: number;
  plant_slug: string;
  watered_at: string;
  notes: string | null;
  ip: string | null;
  user_agent: string | null;
}

interface IpStat {
  ip: string;
  count: number;
}

const ALLOWED_HOST = "plants.skg.gg";

export default function AdminPage() {
  const [logs, setLogs] = useState<WateringLog[]>([]);
  const [ipStats, setIpStats] = useState<IpStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hostname !== ALLOWED_HOST) {
      setBlocked(true);
      setLoading(false);
    }
  }, []);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/logs");
      if (!res.ok) {
        setError(`${res.status} ${res.statusText}`);
        return;
      }
      const data = (await res.json()) as {
        logs: WateringLog[];
        ip_stats: IpStat[];
        total: number;
      };
      setLogs(data.logs);
      setIpStats(data.ip_stats);
    } catch {
      setError("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const deleteBy = async (
    key: "id" | "ip" | "user_agent",
    value: string | number
  ) => {
    const label =
      key === "id"
        ? `log #${value}`
        : key === "ip"
          ? `all logs from IP ${value}`
          : `all logs from this user agent`;

    if (!confirm(`Delete ${label}?`)) return;

    setDeleting(`${key}:${value}`);
    try {
      const res = await fetch("/api/admin/logs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      if (res.ok) {
        const data = (await res.json()) as { deleted: number };
        alert(`Deleted ${data.deleted} log(s)`);
        await fetchLogs();
      }
    } catch {
      alert("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-ink-light" />
      </div>
    );
  }

  if (blocked) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="border border-danger/30 bg-danger/5 px-4 py-3">
          <p className="font-mono text-[11px] text-danger">
            Admin is only accessible on the primary domain.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="border border-danger/30 bg-danger/5 px-4 py-3">
          <p className="font-mono text-[11px] text-danger">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="h-4 w-4 text-ink-light" />
        <h1 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-light">
          Admin - Watering Logs
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="border border-ink/10">
            <div className="border-b border-ink/10 bg-paper-dark px-4 py-2">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-light">
                Recent Logs ({logs.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-ink/10 bg-paper-dark/50">
                    <th className="px-3 py-2 text-left font-mono uppercase tracking-wider text-ink-light">
                      ID
                    </th>
                    <th className="px-3 py-2 text-left font-mono uppercase tracking-wider text-ink-light">
                      Plant
                    </th>
                    <th className="px-3 py-2 text-left font-mono uppercase tracking-wider text-ink-light">
                      Time
                    </th>
                    <th className="px-3 py-2 text-left font-mono uppercase tracking-wider text-ink-light">
                      IP
                    </th>
                    <th className="px-3 py-2 text-left font-mono uppercase tracking-wider text-ink-light">
                      User Agent
                    </th>
                    <th className="px-3 py-2 w-8" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {logs.map((log) => (
                    <tr key={log.id} className="group hover:bg-paper-dark/30">
                      <td className="px-3 py-2 font-mono text-ink-light">
                        {log.id}
                      </td>
                      <td className="px-3 py-2 font-mono text-ink">
                        {log.plant_slug}
                      </td>
                      <td className="px-3 py-2 font-mono text-ink-light whitespace-nowrap">
                        {new Date(log.watered_at + "Z").toLocaleString()}
                      </td>
                      <td className="px-3 py-2 font-mono text-ink-light">
                        {log.ip ? (
                          <span className="inline-flex items-center gap-1">
                            {log.ip}
                            <button
                              onClick={() => deleteBy("ip", log.ip!)}
                              disabled={deleting === `ip:${log.ip}`}
                              className="opacity-0 group-hover:opacity-100 text-danger/50 hover:text-danger transition-opacity cursor-pointer"
                              title={`Delete all from ${log.ip}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-3 py-2 font-mono text-ink-light max-w-[200px]">
                        {log.user_agent ? (
                          <span className="inline-flex items-center gap-1">
                            <span className="truncate">
                              {log.user_agent}
                            </span>
                            <button
                              onClick={() =>
                                deleteBy("user_agent", log.user_agent!)
                              }
                              disabled={
                                deleting === `user_agent:${log.user_agent}`
                              }
                              className="shrink-0 opacity-0 group-hover:opacity-100 text-danger/50 hover:text-danger transition-opacity cursor-pointer"
                              title="Delete all from this user agent"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-3 py-2">
                        <button
                          onClick={() => deleteBy("id", log.id)}
                          disabled={deleting === `id:${log.id}`}
                          className="opacity-0 group-hover:opacity-100 text-danger/50 hover:text-danger transition-opacity cursor-pointer"
                          title="Delete this log"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="border border-ink/10">
            <div className="border-b border-ink/10 bg-paper-dark px-4 py-2">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-light">
                Requests by IP
              </h2>
            </div>
            <div className="divide-y divide-ink/5">
              {ipStats.map((stat) => (
                <div
                  key={stat.ip}
                  className="group flex items-center justify-between px-3 py-2"
                >
                  <span className="font-mono text-[11px] text-ink">
                    {stat.ip || "null"}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-ink-light">
                      {stat.count}x
                    </span>
                    {stat.ip && (
                      <button
                        onClick={() => deleteBy("ip", stat.ip)}
                        disabled={deleting === `ip:${stat.ip}`}
                        className="opacity-0 group-hover:opacity-100 text-danger/50 hover:text-danger transition-opacity cursor-pointer"
                        title={`Delete all ${stat.count} logs from ${stat.ip}`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </span>
                </div>
              ))}
              {ipStats.length === 0 && (
                <p className="px-3 py-2 font-mono text-[11px] text-ink-light">
                  No data yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
