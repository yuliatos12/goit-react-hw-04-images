import PropTypes from 'prop-types'

export const Searchbar = ({ handleSubmitSearchBar }) => (
  <header>
    <form onSubmit={handleSubmitSearchBar}>
      

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
  handleSubmitSearchBar: PropTypes.func.isRequired,
}