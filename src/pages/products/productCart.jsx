import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ProductCartList } from '../../components/products'
import { Button } from '../../components/buttons'
import { selectCartItems } from '../../redux/features/carts/cartSlice'
import { selectCurrentStep } from '../../redux/features/stepper/stepperSlice'
import Empty from '../../components/animations/emptyanimation'
import { priceFormat } from '../../services/constant/priceFormat'
function ProductCartPage() {
  //call cart state
  const cartItems = useSelector(selectCartItems)
  const currentStep = useSelector(selectCurrentStep)

  const cartTotalPrice = cartItems
    .reduce((a, b) => a + (b.cartItem.gia.split(' ')[0]) * b.number, 0)


  return (
    <div className="w-[100%] mb-12 p-6 laptop:px-[180px] laptop:py-16">
      {/*Helmet async*/}
      <Helmet>
        <title>Cart</title>
      </Helmet>

      {/*Product Cart*/}
      {Array.isArray(cartItems) && cartItems.length !== 0 ? (
        <div>
          <div className="border-b-2 border-primary-300">
            <p className="font-satoshi text-[24px] laptop:text-[36px] font-medium">Giỏ hàng của bạn</p>
            <div className="hidden laptop:flex py-3 justify-between border-b-2 border-primary-300">
              <p className="w-[45%]">Sản phẩm</p>
              <p>Số lượng</p>
              <p>Tổng</p>
            </div>
            {/*Product Cart List*/}
            <ProductCartList cartItems={cartItems} />
          </div>
          <div className="flex flex-row-reverse my-4">
            <p className="text-[20px] text-primary dark:text-light_grey">
              Tổng tiền &emsp;{' '}
              <span className="text-[24px]">{priceFormat(cartTotalPrice)} VND</span>
            </p>
          </div>
          <div className="flex flex-row-reverse">
            <p className="text-primary text-[14px] dark:text-light_grey">
            Thuế và vận chuyển được tính khi thanh toán
            </p>
          </div>
          <Link
            to={`${
              currentStep === 1
                ? '/user/checkout/information'
                : currentStep === 2
                ? '/user/checkout/shipping'
                : '/user/checkout/payment'
            }`}
          >
            <div className="w-[100%] flex mt-5 laptop:w-[172px] laptop:float-right">
              <Button Color="primary" children="Thanh toán" />
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <Empty />
        </div>
      )}
    </div>
  )
}

export default ProductCartPage
