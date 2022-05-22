import Head from 'next/head'
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
    ]);
  }

  return (
    <div className='bg-[#011E30] flex flex-col min-h-screen'>
      <Head>
        <title>0-HELLO-WORLD</title>
        <meta name="description" content="Used by Emerald Academy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container mx-auto flex-1 p-5'>
        <div className='mb-10 flex justify-between items-center pr-10 pt-2'>
          <h1 className={styles.sooth}>HELLO-WORLD</h1>
          <div className='flex space-x-4 items-center'>
            <h1 className='text-[#38E8C6]'>Address: </h1>
            <h1 className='border px-7 text-center text-[#38E8C6] text-sm py-1 rounded-xl border-[#38E8C6] w-56'>{user.loggedIn ? user.addr : "Please connect wallet -->"}</h1>
          </div>
          <div>{!user.loggedIn ? <button className='border rounded-xl border-[#38E8C6] px-5 text-sm text-[#38E8C6] py-1' 
            onClick={fcl.authenticate}>connect</button> : <button className='border rounded-xl border-[#38E8C6]
            px-5 text-sm text-[#38E8C6] py-1' onClick={fcl.unauthenticate}>Logout</button>}
          </div>
        </div>
        <div className='flex items-center justify-center pt-28'>
          <div className='space-y-5 p-2 w-1/3'>
              <button onClick={getGreeting} className="border rounded-lg py-2 text-sm px-5 border-[#38E8C6] text-blue-900 font-bold bg-[#38E8C6]">Get Greeting</button>
              <div className='h-28 bg-[#00344B] border flex items-center justify-center text-white border-[#38E8C6] rounded-lg'>{greeting}</div>
              <div className='flex flex-col space-y-3'>
                <input type="text" placeholder='Say hello' className='px-4 py-1 focus:outline-none focus:border-[#38E8C6] focus:border-2 bg-green-100 border rounded-lg border-[#38E8C6]' onChange={e => setNewGreeting(e.target.value)} />
                <button className='rounded-lg text-center text-sm font-bold text-blue-900 py-2 bg-[#38E8C6]' onClick={changeGreeting}>Change Greeting</button>
              </div>
          </div>
        </div>
      </main>
      <footer className='container mx-auto'>
        <img src='/city.svg' alt='city'/>
      </footer>
    </div>
  )
}
