import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Background from '../../assets/images/signinbanner.png'
import { Stepper } from '../../components/others'
import {
  ProductCheckoutList,
  ProductCheckoutListButton
} from '../../components/products'
import { selectCartItems } from '../../redux/features/carts/cartSlice'
import { selectShippingMethod } from '../../redux/features/bills/billSlice'

function Checkout() {
  const cartItems = useSelector(selectCartItems)
  const shippingMethod = useSelector(selectShippingMethod)

  const cartSubtotalPrice = +cartItems.reduce(
    (a, b) => a + Number(b.cartItem.gia.split(' ')[0]) * b.number,
    0
  )

  const cartTotalPrice = cartSubtotalPrice + (shippingMethod?.price || 0)
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return (
    <div className="w-screen h-screen relative">
      {/*helmet async*/}
      <Helmet>
        <title>Thủ tục thanh toán</title>
      </Helmet>

      {/*background and backdrop*/}
      <section className="w-full h-full fixed top-0 z-10">
        {/*background*/}
        <img
          src={Background}
          alt="background"
          className="w-full h-full object-cover"
        />

        {/*backdrop*/}
        <div className="w-full h-full bg-black/30 backdrop-blur-lg absolute top-0 left-0 z-20"></div>
      </section>

      {/*content*/}
      <section className="w-full flex relative z-30 justify-center items-start laptop:pt-8 pb-16">
        {/*check out*/}
        <section className="flex-[1.3] w-full flex justify-center laptop:pr-8 laptop:justify-end">
          <div className="flex-1 max-w-[600px] px-4">
            {/*logo*/}
            <Link to="/">
              <div className="w-full py-4 border-b border-b-border_dark/20">
                <p className="text-h2 text-light_grey font-[600]">Medeli</p>
              </div>
            </Link>

            {/*stepper*/}
            <div className="w-full py-4">
              <Stepper />
            </div>
          </div>
        </section>

        {/*product info*/}
        <section className="flex-1 w-full hidden laptop:flex pl-10 border-l border-l-light_grey/30">
          <div className="max-w-[450px] w-full">
            {/*product list*/}
            <ProductCheckoutList productList={cartItems} />

            {/*divider*/}
            <hr className="w-full border-t border-t-light_grey/40 my-4" />

            {/*price*/}
            <div className="w-full flex flex-col gap-4">
              {/*subtotal*/}
              <div className="w-full flex justify-between text-light_grey">
                <p className="text-h4">Tổng tiền</p>
                <p className="font-[500]">
                  {formatPrice(cartSubtotalPrice)} VND
                </p>
              </div>

              {/*Quantity*/}
              <div className="w-full flex justify-between text-light_grey">
                <p className="text-h6">Số loại sản phẩm</p>
                <p className="text-h6">{cartItems.length}</p>
              </div>

              {/*shipping*/}
              {shippingMethod && (
                <div className="w-full flex justify-between text-light_grey">
                  <p className="text-h6">Phí vận chuyển</p>
                  <p className="text-h6">
                    {formatPrice(shippingMethod?.price)} VND
                  </p>
                </div>
              )}

              {/*divider*/}
              <hr className="w-full border-t border-t-light_grey/30" />

              {/*total*/}
              <div className="w-full flex justify-between text-light_grey">
                <p className="text-h3 font-[600]">Tổng</p>
                <p className="text-h3 font-[600]">
                  {formatPrice(cartTotalPrice)} VND
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

export default Checkout
