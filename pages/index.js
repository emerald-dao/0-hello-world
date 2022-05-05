import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import "../flow/config.js";

export default function Home() {
  const [user, setUser] = useState({ loggedIn: false });
  const [greeting, setGreeting] = useState('');
  const [newGreeting, setNewGreeting] = useState('');

  // This keeps track of the logged in 
  // user for you automatically.
  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [])

  async function getGreeting() {

    const result = await fcl.send([
      fcl.script`
      import HelloWorld from 0xDeployer

      pub fun main(): String {
        return HelloWorld.greeting
      }
      `,
      fcl.args([])
    ]).then(fcl.decode);

    setGreeting(result);
  }

  async function changeGreeting() {
    const transactionId = await fcl.send([
      fcl.transaction`
      import HelloWorld from 0xDeployer

      transaction(newGreeting: String) {
        prepare(signer: AuthAccount) {

        }

        execute {
          HelloWorld.changeGreeting(newGreeting: newGreeting)
        }
      }
      `,
      fcl.args([
        fcl.arg(newGreeting, t.String)
      ]),
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(999)
    ])
  }

  return (
    <div>
      <Head>
        <title>0-HELLO-WORLD</title>
        <meta name="description" content="Used by Emerald Academy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>User Address: {user.loggedIn ? user.addr : null}</h1>
      <button onClick={fcl.authenticate}>Log In</button>
      <button onClick={fcl.unauthenticate}>Log Out</button>
      <button onClick={getGreeting}>Get Greeting</button>
      <input type="text" onChange={e => setNewGreeting(e.target.value)} />
      <button onClick={changeGreeting}>Change Greeting</button>
      <h1>Greeting: {greeting}</h1>
    </div>
  )
}
