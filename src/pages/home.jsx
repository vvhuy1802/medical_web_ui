import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import banner1 from '../assets/images/banner03.png'
import banner2 from '../assets/images/banner02.png'
import banner3 from '../assets/images/banner01.png'
import homepage from '../assets/images/bannerInfo.png'
import feature2 from '../assets/images/bannerApp.png'
import { Button, LinkButton } from '../components/buttons'
import { EmailSignUp } from '../components/emails'
import { ProductItemListing } from '../components/products'
import {
  selectStatus,
  selectProducts,
  getProducts
} from '../redux/features/productsSlice'
import { selectCartStatus } from '../redux/features/carts/cartSlice'
import { BannerCarousel, InfoItemList } from '../components/others'
import { useDarkMode } from '../hooks/useDarkMode'
import { PagePreloader } from '../components/preloader'
import BannerCarouselImage from '../components/others/bannerCarouselImage'
import { Loading2 } from '../components/animations/loading2animation'
import logo from '../assets/images/logo.png'
import chatSlice from '../redux/features/chat/chatSlice'
function HomePage() {
  const { mode: darkMode } = useDarkMode()
  const [productList, setProductList] = useState([])

  const limitedValue = 4
  const dispatch = useDispatch()
  const status = useSelector(selectStatus)
  const products = useSelector(selectProducts)
  const cartStatus = useSelector(selectCartStatus)

  useEffect(() => {
    if (products.length === 0)
      dispatch(getProducts(null, 'create_date', 'desc'))
  }, [])

  useEffect(() => {
    setProductList(products.slice(0, limitedValue))
  }, [products])

  const messagesEndRef = useRef(null)
  const { dataChat } = useSelector((state) => state.chat)
  useEffect(() => {
    if (dataChat.length > 0) {
      if (dataChat[dataChat.length - 1].type === 'image') {
        const img = new Image()
        img.src = dataChat[dataChat.length - 1].message
        img.onload = () => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      }
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [dataChat])

  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState('')
  const handleOpen = () => {
    setShowChat(!showChat)
  }
  const handleSendMessage = (roll) => {
    if (message !== '') {
      const newChat = {
        id: dataChat.length + 1,
        message: message,
        roll: roll,
        type: 'text',
        timestamp: new Date().toLocaleTimeString()
      }
      dispatch(chatSlice.actions.setDataChat(newChat))
      setMessage('')
    }
  }
  const handleTakeImageFromDevice = (roll) => {
    // get the image from my pc
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.click()

    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          const newChat = {
            id: dataChat.length + 1,
            message: reader.result,
            roll: roll,
            type: 'image',
            timestamp: new Date().toLocaleTimeString()
          }
          dispatch(chatSlice.actions.setDataChat(newChat))
          console.log(reader.result)
        }
      }
    }
  }

  const [showImage, setShowImage] = useState(false)
  const [image, setImage] = useState('')
  const handleOpenImage = (image) => {
    setImage(image)
    setShowImage(!showImage)
  }

  return (
    <div className="w-full flex flex-col relative overflow-hidden">
      {/*Helmet async*/}
      <Helmet>
        <title>Medeli | Đặt thuốc có ngay</title>
      </Helmet>

      {/* banner carousel  */}
      <div className="hidden laptop:block justify-center my-8">
        <BannerCarouselImage
          previewNumber={3}
          space={-200}
          slides={[
            <img
              src={banner1}
              alt="poster"
              className="w-8/12 justify-center"
            />,
            <img
              src={banner2}
              alt="poster"
              className="w-8/12 justify-center"
            />,
            <img src={banner3} alt="poster" className="w-8/12 justify-center" />
          ]}
        />
      </div>
      {/* banner carousel  */}
      <div className="laptop:hidden flex justify-center my-8">
        <BannerCarouselImage
          space={50}
          previewNumber={1}
          slides={[
            <img
              src={banner1}
              alt="poster"
              className=" w-9/12 justify-center"
            />,
            <img
              src={banner2}
              alt="poster"
              className="w-9/12 justify-center"
            />,
            <img src={banner3} alt="poster" className="w-9/12 justify-center" />
          ]}
        />
      </div>
      {/* homepage poster */}
      <div>
        <div className="w-full flex justify-center">
          <div className="w-[calc(100%-2rem)] tablet:w-[calc(100%-4rem)] flex flex-col mb-8 relative rounded-3xl shadow-xl shadow-gray-700/50 dark:shadow-gray-500/30 overflow-hidden hover:scale-[1.01] transition-all duration-500 dark:bg-secondary">
            {/* poster content */}
            <div className="w-full px-8 mb-8 flex flex-col justify-between top-1/2 tablet:-translate-y-1/2 right-[5%] tablet:p-10 tablet:absolute tablet:w-1/2 laptop:w-2/5 tablet:h-1/2 tablet:bg-white tablet:dark:bg-secondary">
              <div className="w-full flex flex-col gap-2">
                <p className="text-h3 tablet:text-h3 text-dark_primary dark:text-light_grey">
                  Dịch vụ chuyển phát y tế chuyên dụng
                </p>
                <p className="tablet:block text-body-lg text-dark_primary dark:text-light_grey">
                  Dịch vụ giao hàng siêu tốc của chúng tôi sẵn sàng giúp bạn
                  chuyển thuốc đến tận nhà ngay lập tức.
                </p>
              </div>
              <div className="flex w-full tablet:w-1/3 mt-6">
                <Link to="/products">
                  <Button Size="medium" Color="secondary" State="default">
                    Mua ngay
                  </Button>
                </Link>
              </div>
            </div>

            {/* poster image */}
            <div className="w-full">
              <img
                src={homepage}
                alt="poster"
                className="w-1/2 max-h-[700px] object-cover"
              />
            </div>
          </div>
        </div>

        {showImage && (
          <div
            onClick={() => {
              setShowImage(!showImage)
            }}
            className="w-full h-full fixed top-0 left-0 z-50 flex justify-center items-center bg-black/50"
          >
            <div className="w-full">
              <img
                src={image}
                alt="poster"
                className="object-contain w-full h-[500px]"
              />
            </div>
          </div>
        )}

        {/* chat box */}
        <div
          onClick={() => {
            handleOpen()
          }}
          className={
            showChat
              ? 'hidden'
              : 'w-[60px] h-[60px] right-5 bottom-8 flex items-center justify-center fixed z-10 bg-pink-500 cursor-pointer rounded-full ease-out duration-500 transform hover:scale-110 hover:shadow-xl hover:shadow-gray-700/30 dark:hover:shadow-gray-500/10'
          }
        >
          <svg
            width="35"
            height="35"
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="wechat"
            fill="white"
            aria-hidden="true"
          >
            <path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 019.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 006.4-2.6 9 9 0 002.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 01-36 35.9z"></path>
          </svg>
        </div>

        <div
          className={
            showChat
              ? 'w-[350px] h-[520px] justify-center items-center bottom-8 bg-blue-100 right-6 fixed z-10 rounded-lg'
              : 'hidden'
          }
        >
          {/* header */}
          <div className="w-full h-[60px] flex items-center px-4 bg-[#0F67AD] rounded-t-lg">
            <div className="text-h4 dark:text-white w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    onClick={() => {
                      handleTakeImageFromDevice('admin')
                    }}
                    src={logo}
                    alt="feature2"
                    className="w-9 mr-2 cursor-pointer"
                  />
                  <div
                    onClick={() => {
                      handleSendMessage('admin')
                    }}
                    className="text-white text-h4 cursor-pointer"
                  >
                    Medeli
                  </div>
                </div>
                <div
                  onClick={() => {
                    handleOpen()
                  }}
                  className="cursor-pointer hover:opacity-50 w-[20px] h-[10px] items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.125 1L1.875 1"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* body */}
          <div className="w-full h-[400px] flex flex-col">
            <div className=" max-w-full flex pb-2 flex-col justify-between overflow-y-auto">
              {dataChat.map((item, index) => (
                <div
                  key={item.id}
                  className={`w-full px-4 flex ${
                    item.roll === 'user' ? 'justify-end' : 'justify-start'
                  } ${
                    dataChat[index - 1]?.roll === item.roll
                      ? 'mt-[4px]'
                      : 'mt-2'
                  }`}
                >
                  <div
                    className={`rounded-lg p-2 ${
                      item.type === 'text'
                        ? item.roll === 'user'
                          ? 'bg-blue-500'
                          : 'bg-gray-500'
                        : null
                    }`}
                  >
                    {item.type === 'text' ? (
                      <p
                        className={`text-[13px] text-white break-words ${
                          item.message.length > 40 ? 'w-[200px]' : ''
                        }`}
                      >
                        {item.message}
                      </p>
                    ) : (
                      <div>
                        <img
                          onClick={() => {
                            handleOpenImage(item.message)
                          }}
                          src={item.message}
                          alt="feature2"
                          className="object-contain w-[200px] cursor-pointer "
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* footer */}
          <div className="w-full h-[60px] flex items-center px-4 bg-[#0F67AD] rounded-b-lg">
            <div className=" flex text-h5 text-black w-full justify-center items-center">
              <div className="flex items-center w-full text-h6">
                <input
                  type="text"
                  className="w-full h-[35px] rounded-md px-2"
                  placeholder="Nhập tin nhắn, nhấn Enter để gửi..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage('user')
                    }
                  }}
                />
              </div>
              <div
                onClick={() => {
                  handleTakeImageFromDevice('user')
                }}
                className="cursor-pointer hover:opacity-50 ml-4 w-[20px] h-[20px] items-center justify-center"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm.008-12c.548 0 .992.445.992.993v9.349A5.99 5.99 0 0 0 20 13V5H4l.001 14 9.292-9.293a.999.999 0 0 1 1.32-.084l.093.085 3.546 3.55a6.003 6.003 0 0 0-3.91 7.743L2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016zM8 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
              <div
                onClick={() => {
                  handleSendMessage('user')
                }}
                className="cursor-pointer hover:opacity-50 ml-4 w-[20px] h-[20px] items-center justify-center"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 18 16"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.258942 15.7539C0.142983 15.643 0.0615673 15.5035 0.0237862 15.351C-0.0139949 15.1985 -0.00665356 15.0389 0.0449898 14.8901L1.89964 9.57778C1.9499 9.43427 2.03948 9.30625 2.15906 9.20702C2.27865 9.10778 2.42387 9.04097 2.57964 9.01352L9.62398 8.00002L2.58083 6.98537C2.42517 6.95804 2.28004 6.89133 2.16054 6.79218C2.04105 6.69304 1.95157 6.5651 1.90143 6.42168L0.0455848 1.10819C-0.00823961 0.952267 -0.0132867 0.784728 0.0310624 0.626105C0.0754115 0.467481 0.16723 0.324662 0.295267 0.21515C0.423304 0.105637 0.581998 0.0341855 0.751903 0.00955245C0.921808 -0.0150806 1.09555 0.00817347 1.25182 0.076466L17.4866 7.23306C17.6398 7.30046 17.7696 7.40842 17.8606 7.54415C17.9516 7.67988 18 7.83769 18 7.99888C18 8.16006 17.9516 8.31787 17.8606 8.4536C17.7696 8.58933 17.6398 8.69729 17.4866 8.7647L1.25182 15.9224C1.09546 15.9914 0.921378 16.0151 0.751072 15.9906C0.580767 15.9661 0.421696 15.8945 0.293509 15.7846L0.258942 15.7539Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* info item */}
        <div className="w-full px-8 py-8 tablet:my-20">
          <InfoItemList />
        </div>

        {/* product item list */}
        <div className="px-8 my-8 tablet:my-20">
          {/* title */}
          <div className="my-4 w-fit">
            <LinkButton
              path="/products"
              color={darkMode === 'light' ? 'dark' : 'light'}
            >
              <p className="text-h3 font-satoshi">Tất cả sản phẩm</p>
            </LinkButton>
          </div>

          {status === 'idle' ? (
            <ProductItemListing products={productList} />
          ) : (
            <div className="flex justify-center">
              <Loading2 />
            </div>
          )}
        </div>

        {/* feature 1*/}
        <div className="w-full px-8 mb-10 flex flex-col gap-10 tablet:flex-row">
          {/* box - 1 */}
          <div className="flex-1 flex flex-col gap-10 w-full p-8 tablet:p-12 bg-dark_primary dark:bg-secondary text-white tablet:justify-between rounded-xl overflow-hidden shadow-xl shadow-gray-700/40">
            {/* content */}
            <div className="flex flex-col w-full gap-1">
              <p className="text-h4 tablet:text-h2">
                Chúng tôi cũng có một ứng dụng dành cho thiết bị di động!
              </p>
              <p className="text-body-sm tablet:text-body-lg">
                Tải xuống ứng dụng của chúng tôi để có trải nghiệm tốt nhất,
                nhận ưu đãi tốt và lời khuyên tuyệt vời từ các dược sĩ hàng đầu
              </p>
            </div>

            {/* button */}
            <div className="w-full flex tablet:block">
              <Link to="/products">
                <Button Size="medium" Color="opaque" State="default">
                  Xem sản phẩm
                </Button>
              </Link>
            </div>
          </div>

          {/* box - 2 : image */}
          <div className="flex-1 w-full rounded-xl overflow-hidden shadow-xl shadow-gray-600/50">
            <img
              src={feature2}
              alt="poster"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* email sign up component */}
        <EmailSignUp />
      </div>
      {cartStatus === 'loading' && <PagePreloader />}
    </div>
  )
}

export default HomePage
