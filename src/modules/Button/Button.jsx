import PropTypes from 'prop-types';

import styles from './button.module.css';

const Button = ({ loadMore }) => {
  return (
    <button className={styles.button} onClick={loadMore}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
