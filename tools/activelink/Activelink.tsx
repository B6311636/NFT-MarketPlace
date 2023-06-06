import Link from "next/link"
import React, { FunctionComponent, ReactElement } from "react"
import { useRouter } from "next/router"

type LinkProps = {
    key: string
    href: string
    children: any
    className: string
}

const ActiveLink: FunctionComponent<LinkProps> = ({ children, href, className }) => {
    const router = useRouter()

    const handleClick = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <Link href={href} onClick={handleClick} className={`${className} ${router.asPath === href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}` }>
            {children}
        </Link>
    )
}

export default ActiveLink;
