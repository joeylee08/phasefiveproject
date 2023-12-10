import NavBar from './NavBar'
import Header from './Header'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import UserInfo from './UserInfo'

const Profile = () => {
  const { currentUser, loginType } = useContext(UserContext)

  const fsProfile = yup.object().shape({
    product: yup.string().required('Please enter a product name.'),
    quantity: yup.number().required('Please enter a quantity.').min(1),
    expiration_date: yup.string().required("Please enter a username."),
    location: yup.string().required("Please enter a location.").min(5),
    notes: yup.string(),
    vegan_safe: yup.string(),
    non_dairy: yup.string(),
    gluten_free: yup.string(),
    nut_free: yup.string(),
    soy_free: yup.string()
  })

  const formikProfile = useFormik({
    initialValues: {
      product: '',
      quantity: 0,
      expiration_date: '',
      location: '',
      notes: '',
      vegan_safe: false,
      non_dairy: false,
      gluten_free: false,
      nut_free: false,
      soy_free: false
    },
    validationSchema: fsProfile,
    onSubmit: (values) => {
      const submitted = {
        ...values,
        "business_id": currentUser.id,
        "posted_by": currentUser.business_name
      }
      fetch('/listings', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitted, null, 2)
      })
      .then(res => res.json())
      .then(data => {
        formikProfile.resetForm();
        // navigate('/mylistings')
      })
    }
  })

  return (
    <div className='container'>
      <Header title={'My Manna Profile'} />
      <NavBar />
      <div className='content'>
        <UserInfo />
        <div className='profileInfo'>
          <h2>Username: {currentUser.username}</h2>
        </div>
      </div>
      
    </div>
  )
}

export default Profile