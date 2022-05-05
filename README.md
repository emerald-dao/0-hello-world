# 💎 Emerald Academy

## 🚩 Challenge 0: 🍀 Hello World Example 🤓

🎫 Deploy a simple HelloWorld contract to learn the basics of the Flow blockchain and Cadence. You'll use:
- The local Flow emulator to deploy smart contracts. 
- The local Flow dev wallet to log into test accounts.
- A template Next.js app with sample scripts and transactions to interact with your contract.

🌟 The final deliverable is an app that lets users read and change a greeting field on Flow testnet.

💬 Meet other builders working on this challenge and get help in the [Emerald City Discord](https://discord.gg/emeraldcity)!

---

# Checkpoint 0: 📦 Install 📚

Required: 
* [Git](https://git-scm.com/downloads)
* [Node](https://nodejs.org/dist/latest-v16.x/)  (🧨 Use Node v16 or a previous version as v17 may cause errors 🧨)

```sh
git clone https://github.com/emerald-dao/0-hello-world.git
```

> in a terminal window, start your 📱 frontend:

```sh
cd 0-hello-world
npm install
npm run dev
```

> in a second terminal window, start your 👷‍ local emulator:

```bash
cd 0-hello-world
flow emulator start -v
```

> in a third terminal window, 💸 start your local wallet:

```bash
cd 0-hello-world
flow dev-wallet
```

> in a fourth terminal window, 💾 deploy your contract:

```bash
cd 0-hello-world
flow project deploy
```

> You can `flow project deploy --update` to deploy a new contract any time.

📱 Open http://localhost:3000 to see the app

---

# Checkpoint 1: 👛 Wallets

> 🔥 We'll be using **the local Flow dev wallet** on localhost...

> 👛 Click the "Log In" button and notice a window appears with different accounts to select, each with their own FlowToken balance. Select the first account to log in to it.

---

# Checkpoint 2: 📘 Reading the Greeting 

> 👀 Click the `GET GREETING` button to see your greeting:

🚨🚨🚨 TODO: ADD IMAGE HERE 🚨🚨🚨

---

# Checkpoint 3: ✏️ Changing the Greeting 

> ✏️ Change the greeting!  Click the `CHANGE GREETING` button:

🚨🚨🚨 TODO: ADD IMAGE HERE 🚨🚨🚨

👀 You should see your greeting change:

🚨🚨🚨 TODO: ADD IMAGE HERE 🚨🚨🚨

🔏 You can also check out your smart contract `HelloWorld.cdc` in `flow/cadence/HelloWorld.cdc`.

💼 Take a quick look at how your contract get deployed in `flow.json`.

📝 If you want to make frontend edits, open `index.js` in `pages/index.js`.

---

# Checkpoint 4: 💾 Deploy it!

📔 Ready to deploy to a public testnet?!?

> Change the `accessNode.api`, `discovery.wallet`, and `0xDeployer` configurations in `flow/config.js` to their testnet equivalents.

🚨🚨🚨 TODO: ADD IMAGE HERE 🚨🚨🚨

🔐 Generate a **deployer address** with `flow keys generate --network=testnet`

🚨🚨🚨 TODO: ADD IMAGE HERE 🚨🚨🚨

👛 Create your **deployer account** by going to https://testnet-faucet.onflow.org/, pasting in your public key from above, and clicking `CREATE ACCOUNT`: 

🚨🚨🚨 TODO: ADD IMAGE HERE 🚨🚨🚨

⛽️ Add your testnet account to `flow.json` as by modifying the following lines of code:

```json
"accounts": {
  "emulator-account": {
    "address": "f8d6e0586b0a20c7",
    "key": "cdb3410ae829f5e2a29f71f53efbce66bde1187948d6317de6918d5003576ca7"
  },
  "testnet-account": {
    "address": "YOUR GENERATED ADDRESS",
    "key": {
      "type": "hex",
      "index": 0,
      "signatureAlgorithm": "ECDSA_P256",
      "hashAlgorithm": "SHA3_256",
      "privateKey": "YOUR PRIVATE KEY"
    }
  }
},
"deployments": {
  "emulator": {
    "emulator-account": [
      "HelloWorld"
    ]
  },
  "testnet": {
    "testnet-account": [
      "HelloWorld"
    ]
  }
}
```

🚀 Deploy your HelloWorld smart contract:

```sh
flow project deploy --network=testnet
```

---

# ⚔️ Side Quests

> 🏃 Head to your next challenge [here](https://github.com/emerald-dao/1-simple-nft).

> 💬 Meet other builders working on this challenge and get help in the [💎 Emerald City Discord](https://discord.gg/emeraldcity)!

> 👉 Problems, questions, comments on the stack? Post them to the [💎 Emerald City Discord](https://discord.gg/emeraldcity).