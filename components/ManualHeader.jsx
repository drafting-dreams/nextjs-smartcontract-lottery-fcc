import { useEffect } from "react"
import { useMoralis } from "react-moralis"

export default function Header() {
  const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
    useMoralis()

  useEffect(() => {
    if (isWeb3Enabled) return
    if (window && window.localStorage.getItem("connected")) {
      enableWeb3()
    }
  }, [isWeb3Enabled])
  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`)
      if (account === null) {
        window.localStorage.removeItem("connected")
        deactivateWeb3()
        console.log("Null account found")
      }
    })
  }, [])

  return (
    <div>
      {account ? (
        <div>
          Connected to {account.substring(0, 6)}...{account.substring(account.length - 4)}
        </div>
      ) : (
        <button
          disabled={isWeb3EnableLoading}
          onClick={async () => {
            await enableWeb3()
            if (window) {
              window.localStorage.setItem("connected", "injected")
            }
          }}
        >
          Connect
        </button>
      )}
    </div>
  )
}
