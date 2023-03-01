import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import doctor from '../../assets/images/doctor.png'
import signup from '../../assets/images/abovefooter.png'
import EmailField from './emailField'




function EmailSignUp() {
  return (
    <div className="w-full flex flex-col relative items-center laptop:items-start">
      {/* background image */}

      <img
        src={signup}
        alt="signup backdround"
        className="w-full laptop:max-h-[500px] h-[400px] object-cover"
      />
      <div className="animate-lightbounce absolute laptop:top-[25%] top-[50%] mobile:ml-24 laptop:-ml-24 w-full p-8 flex justify-end">
        <img src={doctor} alt="signup backdround" className=" " />
      </div>
      {/* content */}
      <div className="absolute laptop:top-1/2 top-[40%] -translate-y-1/2 w-full p-8  flex flex-col gap-4 laptop:w-2/5 laptop:items-center laptop:ml-10">
        <p className="text-white  text-h4 laptop:text-h2">
        Với dược sĩ tuyệt vời của chúng tôi, <br/> chúng tôi có thể giúp tăng cường sức khỏe của bạn
        </p>
        <p className="text-white text-body-sm laptop:text-left laptop:px-10">
          
Đăng ký nhận bản tin chăm sóc sức khỏe của chúng tôi và nhận ưu đãi độc quyền về các dòng sản phẩm mới, giảm giá, cửa hàng bật lên và hơn thế nữa
        </p>
        <ul className="text-white text-body-md laptop:w-full laptop:px-10 laptop:flex laptop:justify-between">
          <li className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faCircleCheck} />
            
Ưu đãi độc quyền
          </li>
          <li className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faCircleCheck} />
            Sự kiện miễn phí
          </li>
          <li className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faCircleCheck} />
            Giảm giá lớn
          </li>
        </ul>

        {/* Sign up field*/}
        <div className="flex laptop:w-full laptop:px-10 hidden">
          <EmailField Color="light" />
        </div>
      </div>
    </div>
  )
}

export default EmailSignUp
