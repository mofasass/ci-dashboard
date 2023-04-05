import sqlite3 from "sqlite3";
import { open } from "sqlite";

const instance = open({
  filename: "database.db",
  driver: sqlite3.Database,
});

// Singleton of migrated DB
export const db = (async () => {
  const resolved = await instance;
  console.log("running migrations...");
  await resolved.migrate();
  console.log("migrations applied");
  return resolved;
})();
