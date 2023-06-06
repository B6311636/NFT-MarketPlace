import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ActiveLink } from '@/tools'
import { useAccount, useNetwork } from '@/components/hooks/web3/web3';
import Walletbar from './Walletbar';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Market', href: '/', current: false },
    { name: 'Sell', href: '/product/create', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const { account } = useAccount();
    const { network } = useNetwork();

    return (
        <>
            <div className="min-h-full">
                <div className='fixed top-0 left-0 right-0'>
                    <Disclosure as="nav" className="bg-gray-600">
                        {({ open }) => (
                            <>
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <div className="flex h-16 items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-8 w-8"
                                                    src="/images/default_avatar.png"
                                                    alt="logo"
                                                />
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="ml-10 flex items-baseline space-x-4">
                                                    {navigation.map((item) => (
                                                        <ActiveLink
                                                            href={item.href}
                                                            className={'rounded-md px-3 py-2 text-sm font-medium'}
                                                            aria-current={item.current ? 'page' : undefined}
                                                            key={item.name} >
                                                            {item.name}
                                                        </ActiveLink>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-4 flex items-center md:ml-6">

                                                {/* Profile dropdown */}
                                                <div className="text-gray-300 self-center mr-2">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
                                                        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                                                            <circle cx={4} cy={4} r={3} />
                                                        </svg>
                                                        {network.isLoading ?
                                                            "Loading..." :
                                                            account.isInstalled ?
                                                                network.data :
                                                                "Install Web3 Wallet"
                                                        }
                                                    </span>
                                                </div>
                                                <Walletbar
                                                    isInstalled={account.isInstalled}
                                                    isLoading={account.isLoading}
                                                    connect={account.connect}
                                                    account={account.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="-mr-2 flex md:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">Open main menu</span>
                                                {open ? (
                                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                                ) : (
                                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div>

                                <Disclosure.Panel className="md:hidden">
                                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                        {navigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block rounded-md px-3 py-2 text-base font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-700 pb-3 pt-4">
                                        <div className="flex items-center px-5">
                                            <div className="flex-shrink-0">
                                                <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                                <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                            </div>
                                            <button
                                                type="button"
                                                className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                        <div className="mt-3 space-y-1 px-2">
                                            {userNavigation.map((item) => (
                                                <Disclosure.Button
                                                    key={item.name}
                                                    as="a"
                                                    href={item.href}
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                                >
                                                    {item.name}
                                                </Disclosure.Button>
                                            ))}
                                        </div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"></div>
                </main>
            </div>
        </>
    )
}
