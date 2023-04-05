import Head from "next/head";
import { getDeploys } from "./api/get-push-data";
import styled from "styled-components";
import { Deployment } from "../components/deployment";

const Main = styled.div`
  display: flex;
  flex-flow: row no-wrap;
`;

const Column = styled.div`
  flex: 1;
  padding: 1rem;
  margin: 1rem;
  border-radius: 1rem;
  background: #eee;
  max-width: 21vw;
`;

type deploy = {
  id: string;
  user: string;
  branch: string;
  time: string;
  commit_sha: string;
  environment: string;
  app: string;
};

type Deploys = {
  [key: string]: Array<deploy>;
};

export default function Home({ deploys }: { deploys: Deploys }) {
  return (
    <>
      <Head>
        <title>EB deploys</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main>
        <div>
          {Object.keys(deploys).map((key) => (
            <>
              <Column>
                <h1 key={key}>{key}</h1>
                {deploys[key].map((deploy) => (
                  <Deployment key={deploy.commit_sha} {...deploy} />
                ))}
              </Column>
            </>
          ))}
        </div>
      </Main>
    </>
  );
}

export async function getServerSideProps() {
  const deploys = await getDeploys();

  return {
    props: { deploys },
  };
}
