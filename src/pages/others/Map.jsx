import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import logo from '../../assets/images/logo.png'
function Maps() {
  const [show, setShow] = useState(false)
  const Marker = ({ roll }) => (
    <div>
      {roll === 'store' ? (
        <div
          className="flex flex-col items-center mt-8 cursor-pointer"
          onClick={() => {
            setShow(!show)
          }}
        >
          <img
            src={logo}
            alt="marker"
            style={{ height: '40px', width: '40px' }}
          />
        </div>
      ) : (
        <img
          src="https://img.icons8.com/color/48/000000/marker.png"
          alt="marker"
          style={{ height: '30px', width: '30px' }}
        />
      )}
    </div>
  )

  useEffect(() => {
    window.scrollTo(0, 130)
  }, [])

  return (
    <div className="w-full h-full">
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAgG1MiCyb7Ih0FVHDF49z7piCf9iXsLZI' }}
          defaultCenter={{
            lat: 10.8713,
            lng: 106.7918
          }}
          defaultZoom={15.5}
        >
          <Marker lat={10.8713} lng={106.7918} roll={'customer'} />
          <Marker lat={10.87} lng={106.8031} roll={'store'} />
        </GoogleMapReact>
      </div>
      {show && (
        <div className="absolute top-[90%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-lg shadow-lg">
          <div className="flex flex-col h-full p-5">
            <p className=" font-bold text-h5">Medeli Pharmacy</p>
            <p className=" font-bold text-h5">
              Đại chỉ: Khu phố 6, Thủ Đức, Bình Dương, Việt Nam.
            </p>
            <p className=" font-bold text-h5">Khoảng cách: 1,21 Km</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Maps
