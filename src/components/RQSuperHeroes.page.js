import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Important Defaults - https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults

export const RQSuperHeroesPage = () => {
  const [checked, setChecked] = useState(false);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["rq-super-heroes"],
    queryFn: () =>
      fetch("http://localhost:4000/superheroes").then((res) => res.json()),
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      Checked: {checked ? "true" : "false"}{" "}
      <button
        onClick={() => {
          setChecked(!checked);
          refetch();
        }}
      >
        Toggle Checked
      </button>
      {data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
