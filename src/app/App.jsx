import { connect } from "react-redux";

import Loader from "../components/common/Loader";
import Header from "../components/header/Header";
import PokeTypes from "../components/pokeTypes/PokeTypes";
import Pokemons from "../components/pokemons/Pokemons";
import Footer from "../components/footer/Footer";

function App(props) {
  const { isLoading } = props;
  return (
    <div className="App">
      <Header />
      <div className="poke-container-60">
        <h1 className="text-header text-center" style={{ marginTop: 150 }}>
          Watch all pokemons with the best API for it.
        </h1>
        <PokeTypes />
      </div>
      <div className="poke-container-80 mt-40">
        {isLoading ? <Loader /> : <Pokemons />}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.interface.isLoading,
});

export default connect(mapStateToProps)(App);