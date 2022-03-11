import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Loader from "../common/Loader";

function Pokemons(props) {
  const { pokemons = [], isLoading } = props;
  const [pokemonArrays, setPokemonArrays] = useState([]);
  const [pagination, setPagination] = useState(0);

  useEffect(() => {
    if (pokemons) {
      let splittedPokemons = pokemons.reduce((acc, el, index) => {
        const chunk = Math.floor(index / 20);

        if (!acc[chunk]) acc[chunk] = [];
        acc[chunk].push(el);

        return acc;
      }, []);
      setPokemonArrays(splittedPokemons);
    }
    setPagination(0);
  }, [pokemons]);

  const handleSetPage = (page = 0) => {
    setPagination(page);
  };

  const renderUI = () => {
    return (
      <Fragment>
        {isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="poke-container-80 flex justify-center flex-wrap">
              {!!pokemons.length ? pokemonArrays[pagination]?.map((pokemon) => (
                <div key={pokemon.name} className="poke-card">
                  <div className="poke-card__image">
                    <img src={pokemon.sprites.front_default} alt="" />
                  </div>
                  <h1 className="text-header">{pokemon.name}</h1>
                </div>
              )) : (
                <h1 className="text-header">Oops! There are no pokemons here. 🤔</h1>
              )}
            </div>
            <div className="flex justify-center align-center">
              {pokemonArrays?.map((page, index) => (
                <button
                  key={index}
                  className={`poke-button mt-50 mb-50 ${pagination === index && "active"}`}
                  onClick={() => handleSetPage(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };

  return renderUI();
}

const mapStateToProps = (state) => ({
  pokemons: state.pokedex.pokemons,
  isLoading: state.interface.isLoading,
});

export default connect(mapStateToProps)(Pokemons);