import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Button } from '../buttons'
import { PopupConfirm, PopupAddress } from '../popup'
import {
  selectUserAddressDefault,
  selectUserUid,
  setActiveUser
} from '../../redux/features/userSlice'
import {
  deleteAddress,
  getAddressDefault
} from '../../redux/features/address/addressSlice'
import { setAddressDefault } from '../../services/address'
import chatSlice from '../../redux/features/chat/chatSlice'
import {
  selectCheckUrgent,
  setCheckUrgent
} from '../../redux/features/bills/billSlice'

function AddressItem({ address }) {
  const [popupDelete, setPopupDelete] = useState(false)
  const [popupUpdate, setPopupUpdate] = useState(false)
  const [popupDefaultAddress, setPopupDefaultAddress] = useState(false)
  const addressDefault = `${address.Ward}, ${address.District}, ${address.Province}`
  //declare redux and state
  const dispatch = useDispatch()
  const userUid = useSelector(selectUserUid)
  const checkurgent = useSelector(selectCheckUrgent)
  const userAddressDefault = useSelector(selectUserAddressDefault)

  const navigate = useNavigate()
  //handle set address default
  const handleConfirmAddressDefault = () => {
    const setDefaul = async () => {
      await setAddressDefault(userUid, address.Id)
        .then((res) => {
          dispatch(setActiveUser({ addr_default: address.Id }))
          dispatch(getAddressDefault(address.Id))
          toast.success(res)
        })
        .catch((e) => alert(e))
    }

    setDefaul()
  }

  //handle delete address
  const handleDeleteAddress = () => {
    // handle delete address
    if (userAddressDefault === address.Id) {
      toast.error('This is address defaul, cant delete')
    } else {
      dispatch(deleteAddress(userUid, address.Id))
    }
  }

  return (
    <div className="mx-2 px-2 flex flex-col justify-start gap-3 laptop:flex-row laptop:justify-between laptop:py-5 laptop:px-0 border-2 border-primary/30 rounded-lg laptop:rounded-none laptop:border-0 laptop:border-b-2 laptop:border-border_dark/50">
      {/*info container*/}
      <div className="w-full flex flex-col gap-1">
        {/* info contact*/}
        <div className="flex justify-between items-center ">
          <div className="flex w-full gap-4">
            <p className="mt-2 font-semibold laptop:mt-0 text-white underline dark:text-light_grey">
              {address.Name}
            </p>

            <p className="mt-2 font-normal laptop:mt-0 text-white/80 dark:text-border_grey/70">
              {address.PhoneNumber}
            </p>
          </div>
          {address.Default ? (
            <div className="px-2 w-[100px] text-white bg-red-500 border border-red-500 rounded-lg">
              Mặc định
            </div>
          ) : (
            <div className="flex gap-2 w-[150px]">
              <Button
                Color="primary"
                Custom={true}
                Padding="px-2"
                onClick={
                  address.Default
                    ? () => {}
                    : () => setPopupDefaultAddress(true)
                }
              >
                
Đặt mặc định
              </Button>
            </div>
          )}
        </div>

        {/* address */}
        <div className="flex w-full flex-col gap-1">
          <p className="text-white dark:text-light_grey text-h6">
            {address.Address}
          </p>
          <p className="text-white dark:text-light_grey text-h6">
            {addressDefault}
          </p>
        </div>
        {address.Default && (
          <div className="flex flex-row justify-between items-center mt-2 ">
            <div>
              <div className=" flex justify-between items-center">
                <div className="flex items-center">
                  <div className="px-2 w-fit border rounded-lg text-white bg-red-500 border-red-500">
                    Khẩn cấp
                  </div>
                  <input
                    type="checkbox"
                    name=""
                    id="checkbox"
                    className=" w-5 h-5 ml-3 accent-red-500 rounded-full cursor-pointer"
                    onClick={() => {
                      dispatch(setCheckUrgent(!checkurgent))
                    }}
                  />
                </div>
                <div>
                  <Button
                    Color="primary"
                    Custom={true}
                    Padding="px-4"
                    onClick={() => {
                      navigate('/map')
                    }}
                  >
                    Xem bản đồ
                  </Button>
                </div>
              </div>
              <p className=" text-h6 text-gray-200 mt-1">
                Ưu tiên giao các trường hợp cấp bách, cần thiết ( Chỉ áp dụng
                với những nhu yếu phẩm, Kể từ 10:00 PM tới 5:00 AM chúng tôi chỉ
                giao trong bán kính 5km )
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-2 justify-end mt-3">
          <button
            className="px-6 border border-white/70 dark:border-light_grey/70 rounded-lg text-white dark:text-light_grey/60 hover:underline  "
            onClick={() => setPopupUpdate(true)}
          >
            Cập nhật
          </button>
          <button
            className="px-6 border border-red-500 bg-red-500 rounded-lg text-white"
            onClick={() => setPopupDelete(true)}
          >
            Xóa
          </button>
        </div>
      </div>

      {/* Popup confirm delete */}
      {popupDelete && (
        <PopupConfirm
          Title="Delete address"
          Content="Are you sure to delete this address?"
          onBack={() => setPopupDelete(false)}
          onConfirm={handleDeleteAddress}
        />
      )}

      {/* Popup update address */}
      {popupUpdate && (
        <PopupAddress
          type="update"
          address={address}
          onBack={() => setPopupUpdate(false)}
        />
      )}

      {/* Popup confirm set address default */}
      {popupDefaultAddress && (
        <PopupConfirm
          Title="Choose default address"
          Content="Are you sure to choose this address as the default?"
          onBack={() => setPopupDefaultAddress(false)}
          onConfirm={handleConfirmAddressDefault}
        />
      )}
    </div>
  )
}

export default AddressItem
