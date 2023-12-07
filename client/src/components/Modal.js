const Modal = ({loginType, selectedListing, handleIsModal}) => {

  if (loginType === 'user') {
    return (
      <>
        <div className="modal">
          <h1>{selectedListing.product}</h1>
          <div className='modalBar'></div>
          <h3>Quantity: {selectedListing.quantity}</h3>
          <h3>Expiration Date: {selectedListing.expiration_date}</h3>
          <h3>Posted By: {selectedListing.posted_by}</h3>
          <h3>Location: {selectedListing.location}</h3>
          <h3>Additional Notes: {selectedListing.notes}</h3>
          <img className='map' src='https://cdn.serc.carleton.edu/images/sp/library/google_earth/google_maps_hello_world.webp'></img>
          <br/>
          <button className='modalBtn' onClick={handleIsModal}>CLOSE</button>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="modal">
          <h1>EDIT:{selectedListing.product}</h1>
          <button className='modalBtn' onClick={handleIsModal}>CLOSE</button>
        </div>
      </>
    )
  }
}

export default Modal