import PokemonCard from '@/components/pokemonCard';
import { useRouter } from 'next/router';
import { PokemonClient } from 'pokenode-ts';

const getPokemonData = async (page: number = 1) => {
  const api = new PokemonClient();

  const offset = (page - 1) * 24;
  const pokemons = await api.listPokemons(offset, 24);
  return pokemons;
};

const PokemonPage = async ({
  searchParams,
}: {
  searchParams: { page: string | string[] | undefined };
}) => {
  const pokemons = await getPokemonData(Number(searchParams.page));
  return (
    <main className="w-full px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pokemons.results.map((pokemon) => {
          const id = pokemon.url.split('/')[6];
          return <PokemonCard key={id} id={id} name={pokemon.name} />;
        })}
      </div>
    </main>
  );
};

export default PokemonPage;
