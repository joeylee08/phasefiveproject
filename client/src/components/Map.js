// npm install @googlemaps/js-api-loader


import { Loader } from "@googlemaps/js-api-loader"

const Map = () => {
  const loader = new Loader({
    apiKey: 'AIzaSyDQ_T0IBMGJKmVeSYD8BnHxIgmnkAqPM2E'
  })
  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary('maps');

    const map = new Map(<div className='map'></div>, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });

    return (
      <>
        {map}
      </>
    )
  })
}

export default Map