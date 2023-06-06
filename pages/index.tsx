import { Inter } from 'next/font/google'
import { BaseLayout, ProductList } from '@/components/ui'
import { useNetwork } from '@/components/hooks/web3/web3';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { network } = useNetwork();

  return (
    <BaseLayout>
      {network.isConnectedToNetwork ?
        <ProductList /> :
        <div className="rounded-md bg-yellow-50 p-4 mt-10">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  {network.isLoading ?
                    "Loading..." :
                    `Connect to ${network.targetNetwork}`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </BaseLayout>
  )
}
