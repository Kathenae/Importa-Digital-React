import { PropsWithChildren } from "react";
import { Link } from "@inertiajs/react";
import LogoBlack from '@img/logo.png';
import LogoSignature from '@img/assinatura white.png';

export default function Layout({ children }: PropsWithChildren) {

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white px-12 w-full flex sm:flex-col items-center justify-between sm:justify-center border-b-4 border-primary-500 pt-12 pb-6">
                <img src={LogoBlack} className="w-24 sm:w-[350px]" />

                <nav className="container flex flex-row items-center justify-evenly w-full mt-8 text-primary-500 font-bold uppercase">
                    <Link className="flex items-center space-x-1" href="">
                        <i className="i-mdi-home" />
                        <span>Home</span>
                    </Link>
                    <Link className="flex items-center space-x-1" href="">
                        <i className="i-mdi-user-circle" />
                        <span>Crear Cuenta</span>
                    </Link>
                    <Link className="flex items-center space-x-1" href="">
                        <i className="i-mdi-login" />
                        <span>Iniciar Session</span>
                    </Link>
                    <Link className="flex items-center space-x-1" href="">
                        <span>Sepa Mais</span>
                        <i className="i-mdi-caret-down" />
                    </Link>
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
        </div>
    )
}
