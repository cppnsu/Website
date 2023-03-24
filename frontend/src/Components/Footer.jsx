import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import nsuLogoLight from "../assets/nsuLogoLight.svg"

const Footer = () => {
  return (
    <div className='w-screen h-40 bg-rose-700 '>
      <div className='flex justify-center sm:justify-end'>
        <div className='flex flex-col mr-5 mt-2.5'>
          <div className='w-36 pl-4'>
            <p className='text-neutral-50 text-xl font-bold'>Contact us!</p>
          </div>
          <div className='flex justify-between w-20 pt-1 space-x-4 pl-8 flex-nowrap'>
            <button className='border-transparent  w-8 h-8' onClick={() => {
              window.location.assign('https://docs.google.com/forms/d/e/1FAIpQLSdvLUXtusTI1LlklpdwkDijEJ7WeLWt4zq3cVDluK7RSUQObQ/viewform')
            }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ color: "#FAFAFA" }} className='w-7 h-7' />
            </button>
            <button className='border-transparent w-8 h-8' onClick={() => {
              window.location.assign('https://www.instagram.com/cppnsu/')
            }}>
              <FontAwesomeIcon icon={faInstagram} style={{ color: "#FAFAFA", }} className='w-7 h-7' />
            </button>
          </div>
          <div className='w-36 pr-9'>
            <p className='text-neutral-50 text-sm'>calpolynsu@gmail.com</p>
          </div>
        </div>
      </div>
      <div className='flex justify-center pt-2'>
        <hr className='w-11/12' />
      </div>
      <div className=' sm:w-1/4 sm:pt-2.5 sm:pl-3 pl-3 w-36 pt-2 flex flex-row space-x-4 content-center justify-center'>
        <img src={nsuLogoLight} alt='nsu_logo' className='sm:w-1/4 sm:h-1/4 w-10 h-10' />
        <p className='text-neutral-50 font-extrabold sm:text-xl text-m mt-1'>CPP NSU</p>
      </div>
    </div>
  );
};

export default Footer;
