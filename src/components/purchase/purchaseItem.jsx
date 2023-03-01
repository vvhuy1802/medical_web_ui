import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../buttons'
import PurchaseProductItemList from './purchaseProductItemList'
import {
  cancelBill,
  reorderBill,
  selectCancelStatus,
  selectReorderStatus
} from '../../redux/features/bills/billSlice'
import { PagePreloader } from '../preloader'

function PurchaseItem({ purchaseItem }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cancelBillStatus = useSelector(selectCancelStatus)
  const reorderStatus = useSelector(selectReorderStatus)

  const handleCancel = (uid) => {
    dispatch(cancelBill(uid))
  }

  const handleReorder = (uid) => {
    dispatch(reorderBill(uid))
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="w-full py-2 px-2 laptop:px-8 bg-border_grey dark:bg-secondary rounded-lg shadow-md shadow-gray-600/50 dark:shadow-border_dark/50">
      <div className="w-full flex justify-end">
        <p className="text-h4 text-primary dark:text-light_grey">
          <strong>{purchaseItem.status}</strong>
        </p>
      </div>

      {/*products cart list*/}
      <PurchaseProductItemList products={purchaseItem.products} />
      {/*Divider*/}
      <hr className="w-full border-t border-t-primary/50 my-2 dark:border-t-light_grey/50" />

      {/*detail*/}
      <div className="w-full flex flex-col items-end gap-4">
        <p>
          <strong>Tổng tiền:</strong> {formatPrice(purchaseItem.total)} VND
        </p>
        <p>
          <strong>Vận chuyển:</strong>{' '}
          {formatPrice(purchaseItem.shipping_method.price)} VND
        </p>
        <p>
          <strong>Tổng:</strong>{' '}
          {formatPrice(purchaseItem.total + purchaseItem.shipping_method.price)}{' '}
          VND
        </p>
        <div className={`flex gap-2`}>
          <div
            className={`${
              purchaseItem.status === 'Waiting' ? 'block' : 'hidden'
            }`}
          >
            <Button
              Color="red"
              Custom={true}
              Padding="px-2 laptop:px-4"
              onClick={() => handleCancel(purchaseItem.uid)}
            >
              Hủy
            </Button>
          </div>
          <div
            className={`${
              purchaseItem.status === 'Canceled' ? 'block' : 'hidden'
            }`}
          >
            <Button
              Color="primary"
              Custom={true}
              Padding="laptop:px-8 px-2"
              onClick={() => handleReorder(purchaseItem.uid)}
            >
              Đặt hàng lại
            </Button>
          </div>
          <Button
            Color="primary"
            Custom={true}
            Padding="laptop:px-8 px-4"
            onClick={() => {
              navigate(`/user/account/purchase/${purchaseItem.uid}`)
            }}
          >
            Chi tiết
          </Button>
        </div>
      </div>

      {(cancelBillStatus === 'loading' || reorderStatus === 'loading') && (
        <PagePreloader />
      )}
    </div>
  )
}

export default PurchaseItem
