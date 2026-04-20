"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ethers } from "ethers"

interface WalletContextType {
  address: string | null
  chainId: number | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  shortAddress: string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      const eth = (window as any).ethereum
      if (typeof window !== "undefined" && eth) {
        try {
          const provider = new ethers.BrowserProvider(eth)
          const accounts = await provider.listAccounts()

          if (accounts.length > 0) {
            const network = await provider.getNetwork()
            setAddress(accounts[0].address)
            setChainId(Number(network.chainId))
            setIsConnected(true)
          }
        } catch (err) {
          console.error("Error al comprobar la conexión:", err)
        }
      }
    }

    checkConnection()

    const eth = (window as any).ethereum
    if (typeof window !== "undefined" && eth) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setAddress(null)
          setIsConnected(false)
        } else {
          setAddress(accounts[0])
          setIsConnected(true)
        }
      }

      const handleChainChanged = (chainId: string) => {
        setChainId(Number.parseInt(chainId, 16))
        window.location.reload()
      }

      const handleDisconnect = () => {
        setAddress(null)
        setChainId(null)
        setIsConnected(false)
      }

      eth.on("accountsChanged", handleAccountsChanged)
      eth.on("chainChanged", handleChainChanged)
      eth.on("disconnect", handleDisconnect)

      return () => {
        eth.removeListener("accountsChanged", handleAccountsChanged)
        eth.removeListener("chainChanged", handleChainChanged)
        eth.removeListener("disconnect", handleDisconnect)
      }
    }
  }, [])

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      const eth = (window as any).ethereum
      if (typeof window !== "undefined" && eth) {
        const provider = new ethers.BrowserProvider(eth)
        const accounts = await provider.send("eth_requestAccounts", [])

        if (accounts.length > 0) {
          const network = await provider.getNetwork()
          setAddress(accounts[0])
          setChainId(Number(network.chainId))
          setIsConnected(true)
        } else {
          setError("No se seleccionó ninguna cuenta")
        }
      } else {
        setError("Por favor instala MetaMask u otra wallet compatible")
      }
    } catch (err: any) {
      console.error("Error al conectar wallet:", err)
      setError(err.message || "Error al conectar con la wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAddress(null)
    setChainId(null)
    setIsConnected(false)
  }

  const shortAddress = address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : null

  const value = {
    address,
    chainId,
    isConnected,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    shortAddress,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet debe ser usado dentro de un WalletProvider")
  }
  return context
}
