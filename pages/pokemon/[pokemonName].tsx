import PokemonDisplayEvolutionChain from '@/components/pokemon/pokemonEvolutionChain';
import PokemonImage from '@/components/pokemon/pokemonImage';
import PokemonTag from '@/components/pokemon/pokemonTypeTag';
import {
  Pokemon,
  PokemonFetch,
  PokemonSpeciesFetch,
  evolutionChain,
  PokemonEvolutionChain,
  evolves_to,
} from '@/models/pokemon';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';

const PokemonPage: React.FC<{
  pokemon: Pokemon;
}> = ({ pokemon }) => {
  return (
    <>
      <Head>
        <title>PokéDex - {pokemon.name}</title>
      </Head>
      <div className="padding-x flex w-full flex-col gap-5">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          {/* pokemon image */}
          <PokemonImage
            name={pokemon.name}
            id={pokemon.id}
            color={pokemon.color.name}
          />

          {/* pokemon details */}
          <div className="w-full">
            <div className="mb-2 flex gap-2 border-b-4 border-black pb-2 text-2xl font-bold dark:border-white">
              <i className="text-slate-500">#{pokemon.id}</i>
              {pokemon.name}
              <div className="flex gap-1">
                {pokemon.types.map((type) => (
                  // <PokemonTag type={type.type.name}/>
                  <PokemonTag key={type.type.name} type={type.type.name} />
                ))}
              </div>
            </div>
            <div>
              <table className="w-full border-none">
                <tbody>
                  <tr>
                    <td>height:</td>
                    <td>{pokemon.height / 10}m</td>
                  </tr>
                  <tr>
                    <td>weight:</td>
                    <td>{pokemon.weight / 10}kg</td>
                  </tr>
                  <tr>
                    <td>base experience:</td>
                    <td>{pokemon.base_experience}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-2xl">Stats</h2>
          <table className="w-full border-separate text-center">
            <thead>
              <tr>
                <td className="rounded-md border-2 border-sky-800 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
                  name
                </td>
                <td className="rounded-md border-2 border-sky-800 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
                  base stat
                </td>
                <td className="rounded-md border-2 border-sky-800 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
                  effort
                </td>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map((stat) => (
                <tr key={stat.stat.name}>
                  <td className="rounded-md border-2 border-sky-500 dark:border-slate-700">
                    {stat.stat.name}
                  </td>
                  <td className="rounded-md border-2 border-sky-500 dark:border-slate-700">
                    {stat.base_stat}
                  </td>
                  <td className="rounded-md border-2 border-sky-500 dark:border-slate-700">
                    {stat.effort}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Evoluton Chain */}
        {/* <PokemonDisplayEvolutionChain
          evolution_chain={pokemon.evolution_chain}
        /> */}
      </div>
    </>
  );
};

export default PokemonPage;

const chainFormator = async (
  chainArray: PokemonEvolutionChain,
  evolves_to: evolves_to,
  depth: number
) => {
  evolves_to.map((evolve, index) => {
    const pokemon: PokemonEvolutionChain[0] = {
      depth,
      id: evolve.species?.url.split('/')[6],
      index,
      name: evolve.species.name,
    };
    chainArray.push(pokemon);

    if (evolve.evolves_to !== undefined) {
      chainFormator(chainArray, evolve.evolves_to, depth + 1);
    }
  });
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const name = params?.pokemonName || undefined;
    const pokemonResponse = await axios<PokemonFetch>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemon = pokemonResponse.data;

<<<<<<< HEAD
    const speciesResponse = await axios<PokemonSpeciesFetch>(
      pokemon.species.url
    );
=======
    const speciesResponse = await axios<PokemonSpeciesFetch>(pokemon.species.url);
>>>>>>> 42602add0e04a36b759daa53071081feee0d3e40
    const species = speciesResponse.data;
    // const evolutionurl = speciesResponse.data.evolution_chain.url;

    // const evolutionChainResponse = await axios<evolutionChain>(evolutionurl);
    // const evolutionData = evolutionChainResponse.data;

    // const evolution_chain: PokemonEvolutionChain = [
    //   {
    //     name: evolutionData.chain.species.name,
    //     id: pokemon.id.toString(),
    //     depth: 0,
    //     index: 0,
    //   },
    // ];
    // await chainFormator(evolution_chain, evolutionData.chain.evolves_to, 1);

    return {
      props: {
        pokemon: {
          id: pokemon.id,
          name: pokemon.name,
          base_experience: pokemon.base_experience,
          height: pokemon.height,
          weight: pokemon.weight,
          stats: pokemon.stats,
          types: pokemon.types,

          color: species.color,
          varieties: species.varieties,

          // evolution_chain,
        },
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};
