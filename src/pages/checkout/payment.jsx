import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import PaymentForm from '../../components/payment/paymentForm'
import { Button } from '../../components/buttons'
import { setStep } from '../../redux/features/stepper/stepperSlice'
import {
  addPaymen,
  addProducts,
  addShipTo,
  addTotolPrice,
  addUser,
  clearBill,
  createBill,
  selectCreateErrors,
  selectCreateStatus,
  selectShippingMethod,
  setCreateIdle
} from '../../redux/features/bills/billSlice'
import { selectUserUid } from '../../redux/features/userSlice'
import {
  removeAllProductCart,
  selectCartItems
} from '../../redux/features/carts/cartSlice'
import { selectAddressDefault } from '../../redux/features/address/addressSlice'
import { PagePreloader } from '../../components/preloader'

function CheckoutPayment() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //call state
  const userUid = useSelector(selectUserUid)
  const addressDefault = useSelector(selectAddressDefault)
  const cartItems = useSelector(selectCartItems)
  const createStatus = useSelector(selectCreateStatus)
  const createErrors = useSelector(selectCreateErrors)
    const cartSubtotalPrice = +cartItems
    .reduce((a, b) => a + Number(b.cartItem.gia.split(' ')[0]) * b.number, 0)
 

  const cartTotalPrice = cartSubtotalPrice


  //handle when submit
  const onSubmit = (data) => {
    const payment = {
      name: data.payment,
      cartNumber: data.cartNumber,
      cartName: data.cartName,
      expirationDate: data.expirationDate,
      securityCode: data.securityCode
    }

    if (addressDefault === null) {
      alert("you don't have address to checkout")
      return
    }

    dispatch(addPaymen(payment))
    dispatch(addUser(userUid))
    dispatch(addShipTo(addressDefault))
    dispatch(addProducts(cartItems))
    dispatch(addTotolPrice(cartTotalPrice))

    dispatch(createBill())
  }

  useEffect(() => {
    if (createStatus === 'success') {
      dispatch(clearBill())
      dispatch(removeAllProductCart(userUid))
      dispatch(setStep(1))
      dispatch(setCreateIdle())
      navigate('/user/account/purchases')
    } else if (createStatus === 'error') {
      alert(createErrors)
    }
  }, [createStatus])

  const backTo = () => {
    dispatch(setStep(2))
    navigate('/user/checkout/shipping')
  }

  return (
    <div className="w-full flex flex-col gap-7">
      {/*title*/}
      <div className="w-full flex flex-col text-light_grey">
        <p className="text-h4">Thanh to??n</p>
        <p className="text-body-md text-light_grey/50">
        T???t c??? c??c giao d???ch ?????u ???????c b???o m???t v?? m?? h??a
        </p>
      </div>

      {/*payment method radio form*/}
      <PaymentForm onSubmit={onSubmit} />

      {/*button*/}
      <div className="flex flex-col gap-3 tablet:flex-row">
        <Button Color="opaque" onClick={backTo}>
        Quay l???i v???n chuy???n
        </Button>
        <Button Color="primary" Form="payment-form">
          Thanh to??n ngay
        </Button>
      </div>

      {createStatus === 'loading' && <PagePreloader />}
    </div>
  )
}

export default CheckoutPayment
