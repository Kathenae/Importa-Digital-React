import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import Hero from '@img/Hero.png'
import Importacion1 from '@img/Importacion-1.jpeg'
import Importacion2 from '@img/Importacion-2.jpeg'
import Importacion3 from '@img/Importacion-3.jpeg'
import Importacion4 from '@img/Importacion-4.jpeg'
import Importacion5 from '@img/Importacion-5.jpeg'
import Importacion6 from '@img/Importacion-6.jpeg'
import { Head } from "@inertiajs/react";

export default function Home(props: PageProps) {
    const { } = props
    return (
        <Layout {...props}>
            <Head title="Home" />

            <section id="hero-section" className="text-gray-600 body-font bg-gray-900">
                <div className="container mx-auto flex pt-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font md:text-4xl text-lg md:text-3xl mb-4 font-normal text-white">
                            <span className="font-medium">TODO LO QUE NECESITAS</span>
                            <br />
                            PARA EMPERZAR EN EL MUNDO
                            DE LAS IMPORTACIONES
                            DIGITALES ENCONTRAS ACA.
                        </h1>
                        <div className="pb-8 border-primary-500 font-light text-lg text-primary-500 md:border-l-2 ml-4 md:w-[450px] pl-4 leading-relaxed">
                            <p className="">
                                ¿Qué es importación digital? Es utilizar las
                                herramientas digitales, para conseguir
                                buenos proveedores en china
                            </p>
                            <p className="mt-4">
                                Proveedores que pueden llegar a tu negocio
                                al siguiente nivel, proveedores que apuestan
                                realmente al crecimiento de tu negocio
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <a href="#video-section" className="inline-flex text-white bg-transparent border-2 border-primary-500 py-2 px-6 focus:outline-none hover:bg-primary-500 rounded-xl text-lg md:text-3xl font-bold">SEPA MÁS</a>
                        </div>
                    </div>
                    <div className="hidden xl:block xl:max-w-lg xl:w-full lg:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded" alt="hero" src={Hero} />
                    </div>
                </div>
            </section>

            <section id="pricing-section" className="relative text-black body-font bg-gradient-to-tr from-primary-500 to-secondary-900 z-0">
                <div className="absolute px-4 md:px-8 md:px-16 lg:px-32 py-8 w-full h-full grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 -z-10">
                    <div className="border border-white opacity-10"></div>
                    <div className="border border-white opacity-10"></div>
                    <div className="border border-white opacity-10"></div>
                </div>
                <div className="container px-4 md:px-8 md:px-16 lg:px-32 py-24 mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="px-4 mb-8 w-full md:w-1/2 md:w-1/3">
                            <div className="px-8 py-12 bg-white bg-opacity-75 rounded-[25px] flex flex-col h-full">
                                <h2 className="text-gray-900 title-font font-bold mb-3 text-lg md:text-3xl w-full space-x-4 flex items-center justify-center text-center uppercase">
                                    <i className="i-mdi-checkbox-marked-outline text-primary-500 text-4xl "></i>
                                    <span className="">Alibabá Sin <br /> Secretos</span>
                                </h2>
                                <h4 className="text-gray-500 text-2xl uppercase font-medium text-center">¿De Que Se Trata?</h4>
                                <div className="mt-4">
                                    <h4 className="text-lg uppercase font-bold text-primary-500 text-center">04 Clases online</h4>
                                    <p className="text-center">Es un curso donde aprenderás estrategias para contactar y negociar con provedores, además de calcular los custos finales de los productos importados</p>
                                </div>
                                <p className="text-lg md:text-4xl mt-auto font-bold text-secondary-900 text-center pt-12">350.000 GS.</p>
                            </div>
                        </div>
                        <div className="px-4 mb-8 w-full md:w-1/2 md:w-1/3">
                            <div className="px-8 py-12 bg-white bg-opacity-75 rounded-[25px] flex flex-col h-full">
                                <h2 className="text-gray-900 title-font font-bold mb-3 text-lg md:text-3xl w-full space-x-4 flex items-center justify-center text-center uppercase">
                                    <i className="i-mdi-checkbox-marked-outline text-primary-500 text-4xl "></i>
                                    <span className="">Mentoria <br /> Grupal</span>
                                </h2>
                                <h4 className="text-gray-500 text-2xl uppercase font-medium text-center">¿De Que Se Trata?</h4>
                                <p className="text-gray-800 text-center mt-2 font-medium">Es un curso donde aprenderás <b>estrategias</b> para contactar y negociar con provedores, además de calcular los custos finales de los productos importados</p>
                                <div className="mt-4">
                                    <h4 className="text-lg uppercase font-bold text-primary-500 text-center">04 Clases online</h4>
                                    <p className="text-center text-primary-500">Acompañamiento en el desarrollo e proyectos de importación. Asesoria grupal.</p>
                                </div>
                                <div className="grid grid-cols-6 text-primary-500 mt-4">
                                    <div className="col-span-1 flex flex-col items-center">
                                        <i className="i-mdi-plus text-4xl font-bold" />
                                        <span>PLUS</span>
                                    </div>
                                    <div className="col-span-5 text-xs font-bold flex items-center">
                                        Beneficios exclusivo en servicios de importacion easy box: Descuento del 5% en servicio de flete aéreo y marítimo de china.
                                    </div>
                                </div>
                                <p className="text-lg md:text-4xl mt-auto font-bold text-secondary-900 text-center pt-12">650.000 GS.</p>
                            </div>
                        </div>
                        <div className="px-4 mb-8 w-full md:w-1/2 md:w-1/3">
                            <div className="px-8 py-12 bg-white bg-opacity-75 rounded-[25px] flex flex-col h-full">
                                <h2 className="text-gray-900 title-font font-bold mb-3 text-lg md:text-3xl w-full space-x-4 flex items-center justify-center text-center uppercase">
                                    <i className="i-mdi-checkbox-marked-outline text-primary-500 text-4xl "></i>
                                    <span className="">Mentoria <br /> Presencial</span>
                                </h2>
                                <h4 className="text-gray-500 text-2xl uppercase font-medium text-center">¿De Que Se Trata?</h4>
                                <p className="text-gray-800 text-center mt-2 font-medium">Asesoria para emprendedores que desean crear un departamento interno de desarrollo de productos y comercio exterior</p>
                                <div className="mt-4">
                                    <h4 className="text-lg uppercase font-bold text-primary-500 text-center">04 horas de contenido presencial</h4>
                                    <p className="text-center text-primary-500">Asesoramiento mensual en proyectos de importación via zoom. Asesoria grupal.</p>
                                </div>
                                <div className="grid grid-cols-6 text-primary-500 mt-4">
                                    <div className="col-span-1 flex flex-col items-center">
                                        <i className="i-mdi-plus text-4xl font-bold" />
                                        <span>PLUS</span>
                                    </div>
                                    <div className="col-span-5 text-xs font-bold flex items-center">
                                        Beneficios exclusivo en servicios de importacion easy box: Descuento del 5% en servicio de flete aéreo y marítimo de china.
                                    </div>
                                </div>
                                <p className="text-lg md:text-4xl mt-auto font-bold text-secondary-900 text-center pt-12">2.500.000 GS.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="video-section" className="text-black body-font bg-secondary-950 pb-24 relative z-0">
                <div className="block container mx-auto py-24">
                    <iframe className="w-full aspect-video rounded-lg" src="https://www.youtube.com/embed/7mIuukZTfoo" title="Conheça nos!"></iframe>
                </div>

                <div className="container mx-auto text-white font-bold block">
                    <h1 className="text-lg md:text-3xl font-bold text-center mb-14">¿CÓMO FUNCIONA IMPORTACIÓN DIGITAL?</h1>
                    <div className="flex items-center justify-center flex-col md:flex-row">
                        <div className="">
                            <div className="relative hidden md:block">
                                <div className="absolute w-full h-[2px] bg-white top-1/2 transform -translate-y-1/2"></div>
                                <ul className="flex items-center justify-between">
                                    <li className="flex items-center justify-center w-3 h-3 rounded-full bg-white text-white"></li>
                                    <li className="flex items-center justify-center w-3 h-3 rounded-full bg-white text-white"></li>
                                    <li className="flex items-center justify-center w-3 h-3 rounded-full bg-white text-white"></li>
                                    <li className="flex items-center justify-center w-3 h-3 rounded-full bg-white text-white"></li>
                                    <li className="flex items-center justify-center w-3 h-3 rounded-full bg-white text-white"></li>
                                </ul>
                            </div>
                            <div className="mt-4 hidden md:block">
                                <ul className="flex -mx-4 items-center justify-between">
                                    <li>1 Paso</li>
                                    <li>2 Paso</li>
                                    <li>3 Paso</li>
                                    <li>4 Paso</li>
                                    <li>5 Paso</li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <div className="flex flex-col items-center md:flex-row -mx-[125px] justify-between">
                                    <h1 className="text-xl mb-4 md:hidden">1 Paso</h1>
                                    <div className="bg-white rounded-3xl px-4 py-8 text-black w-[250px] h-72 text-center mb-4 md:mb-0 md:mr-4">
                                        <h3 className="text-2xl font-bold">Busqueda de provedores</h3>
                                        <p className="font-normal mt-8">
                                            Te enseñamos a encontrar proveedores si aún no los tienes.
                                        </p>
                                    </div>
                                    <h1 className="text-xl mb-4 mt-8 md:hidden">2 Paso</h1>
                                    <div className="bg-white rounded-3xl px-4 py-8 text-black w-[250px] h-72 text-center mb-4 md:mb-0 md:mr-4">
                                        <h3 className="text-2xl font-bold">Negociación y cotización de productos</h3>
                                        <p className="font-normal mt-8">
                                            La cotización y negociación la haces tú directamente con el proveedor.
                                        </p>
                                    </div>
                                    <h1 className="text-xl mb-4 mt-8 md:hidden">3 Paso</h1>
                                    <div className="bg-white rounded-3xl px-4 py-8 text-black w-[250px] h-72 text-center mb-4 md:mb-0 md:mr-4">
                                        <h3 className="text-2xl font-bold">Simulación de importación</h3>
                                        <p className="font-normal mt-8">
                                            El proveedor emite la Factura Proforma con los productos que desea.
                                        </p>
                                    </div>
                                    <h1 className="text-xl mb-4 mt-8 md:hidden">4 Paso</h1>
                                    <div className="bg-white rounded-3xl px-4 py-8 text-black w-[250px] h-72 text-center mb-4 md:mb-0 md:mr-4">
                                        <h3 className="text-2xl font-bold">Pago, contrato y verificación</h3>
                                        <p className="font-normal mt-8">
                                            Asegura tu proyecto con contratos de compra y verificaciones.
                                        </p>
                                    </div>
                                    <h1 className="text-xl mb-4 mt-8 md:hidden">5 Paso</h1>
                                    <div className="bg-white rounded-3xl px-4 py-8 text-black w-[250px] h-72 text-center">
                                        <h3 className="text-2xl font-bold">Recibí y vende con lucro los productos</h3>
                                        <p className="font-normal mt-8">
                                            Rentabiliza tu importación asegurando tus ganancias.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute w-full h-44 bg-primary-600 bottom-0 -z-10"></div>
            </section>

            <section id="purchase-section" className="text-white body-font bg-primary-600 flex flex-col items-center">
                <div className="container mx-4 py-12 text-center mt-32">
                    <h1 className="text-lg md:text-3xl">COMIENZA A IMPORTAR EN NUESTRO <b>CONTENEDOR COMPARTIDO</b></h1>
                    <a className="px-8 py-2 text-lg md:text-3xl mt-4 border border-white rounded-xl inline-block hover:text-primary-400 hover:border-primary-400 font-bold" href="https://pago.pagopar.com/30a4" target="_blank">QUIERO IMPORTAR</a>
                </div>

                <div className="relative z-0 mt-28 w-full flex flex-col items-center">
                    <div className="container mx-4 relative">
                        <div className="bg-white rounded-3xl px-8 py-12">
                            <h1 className="text-primary-500 text-lg md:text-3xl text-center">SÚPER BONOS INCLUIDOS CON LA <br /><b>IMPORTA DIGITAL</b></h1>
                            <div className="px-32 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-x-8 mt-8">
                                <div className="flex justify-center items-center text-center border border-primary-500 text-black rounded-xl px-4 w-[225px] h-[150px] font-bold">
                                    <span>Aceso en grupo
                                        exclusivo de
                                        importadores
                                        digitales</span>
                                </div>
                                <div className="flex justify-center items-center text-center border border-primary-500 text-black rounded-xl px-4 w-[225px] h-[150px] font-bold">
                                    <span>
                                        Descuentos en
                                        la tarifa de
                                        contenedor
                                        compartido
                                    </span>
                                </div>
                                <div className="flex justify-center items-center text-center border border-primary-500 text-black rounded-xl px-4 w-[225px] h-[150px] font-bold">
                                    <span>
                                        Descuentos para
                                        eventos
                                        presenciales
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 bg-secondary-950 w-full h-44 -z-10"></div>
                </div>
            </section>

            <section id="examples-section" className="text-white body-font bg-secondary-950 py-[300px] text-center">
                <h1 className="text-4xl font-bold">EJEMPLOS DE IMPORTACIONES
                    <br />REALIZADAS EN NUESTROS
                    <br />CONTENEDORES COMPARTIDOS
                </h1>
                <div className="container mx-auto mt-12">
                    <div className="grid grid-cols-3 gap-12">
                        <img className="rounded-xl drop-shadow-xl h-full object-cover" src={Importacion1} alt="Exemplo de importacion 1" />
                        <img className="rounded-xl drop-shadow-xl" src={Importacion3} alt="Exemplo de importacion 2" />
                        <img className="rounded-xl drop-shadow-xl" src={Importacion5} alt="Exemplo de importacion 3" />
                        <img className="rounded-xl drop-shadow-xl" src={Importacion6} alt="Exemplo de importacion 4" />
                        <img className="rounded-xl drop-shadow-xl" src={Importacion4} alt="Exemplo de importacion 5" />
                        <img className="rounded-xl drop-shadow-xl" src={Importacion2} alt="Exemplo de importacion 6" />
                    </div>
                </div>
            </section>

            <section id="faq-section" className="text-black bg-white py-12">
                <div className="container mx-auto relative flex flex-col items-center">
                    <h1 className="absolute bg-white rounded-t-xl uppercase text-lg md:text-3xl font-bold -top-24 px-12 py-2">PREGUNTAS FRECUENTES</h1>
                    <div className="space-y-8">
                        <p>
                            <b>¿Qué es el proyecto Importación Digital?</b>
                            <br />
                            Es un recurso que creamos con un mix de servicios, Para que VOS que aún no importaste puedas ingresar al mundo de las importaciones.
                        </p>
                        <p>
                            <b>¿Cuales son los costos del contenedor compartido?</b>
                            <br />
                            El costo para clientes normales es de 1.500usd por metro cúbico, pero para los miembros de nuestra comunidad importa digital
                            solamente 1.190usd.
                        </p>
                        <p>
                            <b>¿Cuanto tiempo tendre acceso?</b>
                            <br />
                            Las suscripciones son anuales, con acceso a contenidos y servicios por 12 meses.
                        </p>
                        <p>
                            <b>¿De donde sale el contenedor compartido?</b>
                            <br />
                            Salen del puerto de Guangzhou y llegan a Ciudad del Este a nuestro centro de distribución y de aca enviamos a todo el pais.
                        </p>
                        <p>
                            <b>¿Puedo importar siendo persona física o como unipersonal?</b>
                            <br />
                            No es necesario que estes registrados, nosotros realizamos todos los trámites de importación por vos, ¡Solamente preocupate en vender
                            los productos!
                        </p>
                        <p>
                            <b>¿Cuanto tiempo me pueden almacenar las mercaderias una vez que llegan?</b>
                            <br />
                            Como máximo 30 dias, luego pasan a remate para recuperar los costos generados en la importación.
                        </p>
                        <p>
                            <b>¿El costo de flete hasta mi local, ya esta incluida en la tarifa?</b>
                            <br />
                            El flete nacional corre por cuenta del importador.
                        </p>
                        <p>
                            <b>¿Puedo importar De varios proveedores?</b>
                            <br />
                            Si estas empezando a importar no recomendamos dividir tu poder de compra en varios proveedores. Pero si actualmente ya contas con
                            proveedores podemos consolidar tus pedidos en un periodo de hasta 15 dias, luego el contenedor sale.
                        </p>
                        <p>
                            <b>¿Mi carga no tiene un metro cúbico, pago igual la tarifa de un metro cúbico?</b>
                            <br />
                            Solo se te cobra por el espacio real que ocupan tus productos, conforme la recibido de recepción en bodega de Guangzhou.
                        </p>
                        <p>
                            <b>¿Cual es La diferencia entre un LCL y el contenedor compartido?</b>
                            <br />
                            Que por nuestra tarifa única, ya te incluimos costos de almacenaje y recepción, costos de flete, gastos locales y despacho de mercancias
                            hasta Paraguay.
                        </p>
                        <p>
                            <b>¿Puedo importar replicas o productos de marca?</b>
                            <br />
                            NO trabajamos con ese tipo de productos.
                        </p>
                        <p>
                            <b>¿No tengo proveedores, me ayudan con eso?</b>
                            <br />
                            Con tu suscripción mensual, podemos conseguirte hasta 1 proveedor por mes para lo que quieras importar.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
