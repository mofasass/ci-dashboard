import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";

type Data = {
  name: string;
};

const insertDeploy = async (
  user: string,
  branch: string,
  commit: string,
  environment: string,
  app: string
) => {
  const dbClient = await db;

  return dbClient.run(
    "INSERT INTO deploy (user, branch, commit_sha, environment, app) VALUES (?, ?, ?, ?, ?)",
    user,
    branch,
    commit,
    environment,
    app
  );
};

// Gets the 5 latest deployments per environment
export const getDeploys = async () => {
  const dbClient = await db;

  // Get all environments
  const environments = await dbClient.all(
    "SELECT environment FROM deploy GROUP BY environment"
  );

  // Get all deploymemnts per env
  const deployments = await Promise.all(
    environments.map(
      async (env) =>
        await dbClient.all(
          "SELECT * FROM deploy WHERE environment = ? ORDER BY time DESC LIMIT 5",
          env.environment
        )
    )
  );

  // Crate an object with the env as key and the deployments as value
  return environments.reduce((acc, env, i) => {
    acc[env.environment] = deployments[i];
    return acc;
  }, {});
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const user = req.body.user;
    const branch = req.body.branch;
    const commit = req.body.commit;
    const environment = req.body.environment;
    const app = req.body.app;

    await insertDeploy(user, branch, commit, environment, app);
    res.status(201).end();
  } else if (req.method === "GET") {
    const deploys = await getDeploys();
    res.status(200).json(deploys);
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
