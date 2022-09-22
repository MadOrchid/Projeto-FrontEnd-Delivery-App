import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import MyContext from './Context';

function Provider({ childern }) {
  const [role, setRole] = useState('');

  const state = useMemo(() => ({
    role, setRole,
  }), [role]);

  return (
    <MyContext.Provider value={ state }>
      {childern}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  childern: PropTypes.node,
}.isRequired;

export default Provider;
