import PaginationButton from '@/components/pagination';
import { PokemonList } from '@/models/pokemon';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import axios from 'axios';

const Home: React.FC<{ pokemonList: PokemonList }> = ({ pokemonList }) => {
  return (
    <div className="padding-x">
      <PaginationButton />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {pokemonList.results.map((pokemon) => {
          const id = pokemon.url.split('/')[6];
          return (
            <Link
              href={`/pokemon/${pokemon.name}`}
              key={pokemon.name}
              className="rounded-xl border-4 border-sky-500 hover:border-sky-400 hover:bg-sky-300 dark:border-slate-800 dark:hover:border-sky-700 dark:hover:bg-sky-900"
            >
              <div className="mx-2 pt-2 text-center text-2xl font-semibold">
                #{id} {pokemon.name}
              </div>
              <Image
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                className="aspect-square w-full"
                loading="lazy"
                width="500"
                height="500"
              />
            </Link>
          );
        })}
      </div>
      <PaginationButton />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pageNo = Number(query.pageNo) || 0;

  const response = await axios(
    `https://pokeapi.co/api/v2/pokemon?limit=18&offset=${18 * pageNo}`
  );
  const data = response.data;

  return {
    props: {
      pokemonList: data,
    },
  };
};
