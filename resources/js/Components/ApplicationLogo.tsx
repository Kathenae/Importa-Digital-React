import { SVGAttributes } from 'react';

interface ApplicationLogoProps {
    black?: boolean
    size?: number
}

import Logo from '@img/logo.png'

export default function ApplicationLogo({ black, size }: ApplicationLogoProps) {
    return (
        <>
            <img
                className='hidden lg:block'
                src={Logo}
                width={size ?? "148"}
            />
            <img className='lg:hidden' src={Logo} width="148" />
        </>
    );
}
