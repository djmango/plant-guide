CREATE TABLE IF NOT EXISTS watering_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plant_slug TEXT NOT NULL,
  watered_at TEXT NOT NULL DEFAULT (datetime('now')),
  notes TEXT,
  ip TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_plant_slug ON watering_logs(plant_slug);
