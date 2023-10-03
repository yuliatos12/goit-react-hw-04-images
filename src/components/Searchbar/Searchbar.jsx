import PropTypes from 'prop-types'

export const Searchbar = ({ handleSearchSubmit }) => (
  <header>
    <form onSubmit={handleSearchSubmit}>
      

      <input
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
      />
      <button>
        <span>Search</span>
      </button>
    </form>
  </header>
);

Searchbar.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired,
}