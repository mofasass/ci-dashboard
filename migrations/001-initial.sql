--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE deploy (
  branch        TEXT      NOT NULL,
  time          DATETIME  DEFAULT CURRENT_TIMESTAMP,
  user          TEXT      NOT NULL,
  commit_sha    TEXT      NOT NULL,
  environment   TEXT      NOT NULL,
  app           TEXT      NOT NULL
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX deploy;