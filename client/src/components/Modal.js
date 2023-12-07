const Modal = ({handleIsModal}) => {
  return (
    <>
      <div className="modal">
        <button onClick={handleIsModal}>CLOSE</button>
      </div>
    </>
  )
}

export default Modal