import PropTypes from 'prop-types'
import css from "./Button.module.css"

export const Button = ({ handleClickRender }) => (
    <div className={css.btn}>
        <button type="button" onClick={handleClickRender}>
            Load more
        </button>
    </div>
);

Button.propTypes = {
    handleClickRender: PropTypes.func.isRequired,
}