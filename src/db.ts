import sqlite3 from "sqlite3";
import { open } from "sqlite";

const instance = open({
  filename: ":memory:",
  driver: sqlite3.Database,
});

// Singleton of migrated DB
export const db = (async () => {
  const resolved = await instance;
  console.log("Setting up table");
  await resolved.run(`
    CREATE TABLE IF NOT EXISTS deploy (
      branch        TEXT      NOT NULL,
      time          DATETIME  DEFAULT CURRENT_TIMESTAMP,
      user          TEXT      NOT NULL,
      commit_sha    TEXT      NOT NULL,
      environment   TEXT      NOT NULL,
      app           TEXT      NOT NULL
    );
  `);

  console.log("Table is up");
  return resolved;
})();
