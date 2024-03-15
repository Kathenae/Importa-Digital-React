import { PropsWithChildren, useEffect } from "react";
import { Link } from "@inertiajs/react";
import LogoBlack from '@img/logo.png';
import LogoSignature from '@img/assinatura white.png';
import { PageProps } from "@/types";
import FlashMessages from "@/Components/FlashMessages";
import { usePopup } from "@/Components/Popup";

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
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white shadow-lg px-12 w-full flex flex-col sm:flex-col items-center justify-between sm:justify-center border-b-4 border-primary-500 pt-12 pb-6">
                <img src={LogoBlack} className="w-24 sm:w-[350px]" />

                <nav className="container flex flex-col md:flex-row md:space-y-0 md:justify-evenly space-y-4 items-start mt-8 text-primary-500 font-bold uppercase">
                    <Link className="flex items-center space-x-1" href="/">
                        <i className="i-mdi-home" />
                        <span>Home</span>
                    </Link>
                    {auth.user === null ?
                        <>
                            <Link className="flex items-center space-x-1" href={route('register')}>
                                <i className="i-mdi-user-circle" />
                                <span>Crear Cuenta</span>
                            </Link>
                            <Link className="flex items-center space-x-1" href={route('login')}>
                                <i className="i-mdi-login" />
                                <span>Iniciar Session</span>
                            </Link>
                            <Link className="flex items-center space-x-1" href="#video-section">
                                <span>Sepa Mais</span>
                                <i className="i-mdi-caret-down" />
                            </Link>
                        </>
                        :
                        <>
                            {auth.permissions?.includes('watch@Lesson') &&
                                <Link className="flex items-center space-x-1" href={route('courses')}>
                                    <i className="i-mdi-book-open" />
                                    <span>Cursos</span>
                                </Link>
                            }
                            {auth.permissions?.includes('view-admin-dashboard') &&
                                <Link className="flex items-center space-x-1" href={route('admin')}>
                                    <i className="i-mdi-shield" />
                                    <span>Administração</span>
                                </Link>
                            }
                            <Link method="post" className="flex items-center space-x-1" href={route('logout')}>
                                <i className="i-mdi-logout" />
                                <span>Salir</span>
                            </Link>
                        </>
                    }
                </nav>
            </header>

            {children}

            <footer className="bg-primary-600 w-full pt-12 pb-8 flex flex-col items-center justify-center text-white mt-auto">
                <span className="text-xs">Copyright &copy; Importa Digital 2022</span>
                <div className="flex items-center mt-2 mb-0">
                    <span className="font-medium">Designed By: </span>
                    <img src={LogoSignature} className="w-28"/>
                </div>
            </footer>
            <FlashMessages messages={flash}/>
        </div>
    )
}
