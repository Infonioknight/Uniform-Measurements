import {RotateLoader} from 'react-spinners';

const override = {
  display: 'block',
  margin: '10px auto',
};

const Loader = () => {
  return (
    <RotateLoader
      color='crimson'
      cssOverride={override}
      size={15}
      aria-label='Loading Spinner'
    />
  );
};
export default Loader;