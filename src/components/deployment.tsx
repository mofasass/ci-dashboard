import styled from "styled-components";
import randomColor from "randomcolor";
import { useMemo } from "react";

const Deploy = styled.div<{ color: string }>`
  padding: 0.5rem;
  background: ${(props) => props.color};
`;

const Label = styled.label`
  padding: 0.5rem;
  margin: 1rem;
  border-radius: 0.5rem;
  background: #00000020;
`;

const Labels = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

type Props = {
  user: string;
  branch: string;
  commit_sha: string;
  environment: string;
  app: string;
  time: string;
};

export const Deployment = ({ user, branch, commit_sha, app, time }: Props) => {
  const color = useMemo(() => {
    return randomColor({ luminosity: "light", seed: commit_sha });
  }, [commit_sha]);

  return (
    <Deploy color={color}>
      <h2>{app}</h2>
      <h4>{time}</h4>
      <Labels>
        <Label>
          <strong>User:</strong> {user}
        </Label>
        <Label>
          <strong>Branch:</strong> {branch}
        </Label>
        <Label>
          <strong>Commit:</strong> {commit_sha}
        </Label>
      </Labels>
    </Deploy>
  );
};
