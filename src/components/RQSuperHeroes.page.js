import { useQuery } from "@tanstack/react-query";

export const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery({
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
      {data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
