import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import React, {useEffect, useState} from "react";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {AppBar, Box, createTheme, ThemeProvider, Toolbar, Typography} from "@mui/material";
import {green} from "@mui/material/colors";

export const App = () => {
  const wallet = useWallet()
  const {connection} = useConnection()
  const [balance, setBalanace] = useState(0)

  const theme = createTheme({
     palette: {
       primary: green,
     },
  })

  const getBalance = async () => {
    let balance = 0
    if(connection && wallet.publicKey) {
      balance = await connection.getBalance(wallet.publicKey)
    }
    setBalanace(balance/Math.pow(10,9))
  }

  useEffect(() => {
    if(wallet.publicKey && connection) {
      getBalance()
    }
  }, [wallet.publicKey, connection])

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position={"static"}>
          <Toolbar>
          <Box flexGrow={1} />
          <WalletMultiButton />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Typography variant={"body1"}>Wallet address = {wallet.publicKey?.toBase58()} </Typography>
      <Typography variant={"body2"}>balance = {balance}</Typography>
    </>

  )
}
