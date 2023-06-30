import DataLoadingAnimation from '../assets/carpool-animate.svg';

const Loading = ({loadingItem}) => {
  return (
    <div>
      <h2 style={{ marginLeft: '40px' }}>{loadingItem}</h2>
      <img src={DataLoadingAnimation} className='data-loading' alt="Data Loading..." />
    </div>
  )
}

export default Loading;
