
import { useEffect } from "react";
import { PageProps } from "@/types";
import FlashMessages from "@/Components/FlashMessages";
import { usePopup } from "@/Components/Popup";
import { Navbar } from "@/Components/Navbar";
import LogoAgencia from '../../images/logo-agencia-min.png';

interface LayoutProps extends PageProps {
    children: React.ReactNode
}

export default function Layout({ children, flash, popup, auth }: LayoutProps) {

    const { alert } = usePopup()

    useEffect(() => {
        if (popup && popup.type == 'alert') {
            alert(popup.message, popup.variant)
        }
    }, [popup])

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar user={auth.user}/>

            {children}

            <footer className='flex flex-col items-center justify-center py-12 h-24 bg-secondary-base text-white'>
                <div className='flex items-center'>
                    <span className='text-sm'>Designed by</span>
                    <img src={LogoAgencia} width={100} />
                </div>
                <p>Todos los derechos reservados</p>
            </footer>
            <FlashMessages messages={flash} />
        </div>
    )
}
