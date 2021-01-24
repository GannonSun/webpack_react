import React, {FC} from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

const Hello: FC<{ title: string }> = ({title}) => {
  return <h1>{title}</h1>;
};

Hello.propTypes = {
  title: PropTypes.string,
};

ReactDom.render(
    <Hello title="Hello, typescript + react + webpack + eslint." />,
    document.querySelector('#root'),
);
