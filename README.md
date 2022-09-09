# pixel-space

```bash
yarn install
yarn prisma migrate dev
yarn run dev
```

https://68e894d726.d.voltageapp.io/tipjar/1

## Setting up your lightning node

You'll need a couple things to make this app functional from a lightning perspective:

1. A lightning node somewhere
2. Inbound liquidity
3. LNBits that talks to the node and is available on a stable IP address or domain

### 1. Lightning node

Check out [Voltage](https://voltage.cloud/) for cloud node hosting.

Popular self-hosting lightning node solutions include [Umbrel](https://umbrel.com/), [RaspiBlitz](https://raspiblitz.org/), and [MyNode](https://mynodebtc.com/).

### 2. Inbound liquidity

For Voltage nodes you can get a free inbound channel once your node is spun up and synced.

Check out [Magma](https://docs.amboss.space/space/magma) if you want to buy some good liquidity.

### 3. LNBits

[LNBits has a great install guide](https://github.com/lnbits/lnbits-legend/blob/main/docs/guide/installation.md), including fly.io (which is a great way to deploy pixel-space itself)

On Voltage there's a button in the dashboards section to add LNBits to your node.

## Connecting pixel-space to LNBits

It's not really a big deal.

Create a file called `.env.local` and paste the contents of `.env` into it.

Then add your LNBits info. It should look something like this:

```
DATABASE_URL="file:./dev.db"
LNBITS_ORIGIN="https://abc123.lnbits.mydomain.com"
LNBITS_INVOICE_KEY="abc123..."
```

These values should be visible on your LNbits wallet under "API info".

## Deploying pixel-space to fly.io

pixel-space persists data with a local sqlite db, and [fly.io](https://fly.io/) is one of the easiest ways to deploy an app with persistent data like this. If you're comfortable with hosting on a regular VPS or Heroku or whatever that works great.

Alternatively, it wouldn't be a huge lift to make pixel-space deployable on a "serverless" host like Vercel or Netlify, because the most important "server" logic is actually running on LNBits. You'd just need a cloud db like Firebase or Supabase for persisting the pixel data.

Anyway, here's how to fly.io:

### Create a fly.io account

[fly.io](https://fly.io/) (you can use your github account)

### Install flyctl

```
curl -L https://fly.io/install.sh | sh
```

### Generate fly.toml file

There's already a fly.toml file in this repo, but that's for our own deployment. You can copy this config and then customize it by running:

```
flyctl launch
```

Say yes to "Would you like to copy its configuration to the new app?"

Enter an app name and region, say no to postgres and don't deploy now.

Edit the new fly.toml file to include these lines:

```
[env]
  DATABASE_URL = "file:/data/pixels.db"
  PORT = "8080"

[mounts]
  destination = "/data"
  source = "pixel_data"
```

These let fly know where to find the persistent sqlite file which will be stored in a fly "volume." Which we'll create now:

```
flyctl volumes create pixel_data
```

# set your secrets

fly secrets set LNBITS_ORIGIN="https://abc123.lnbits.mydomain.com" LNBITS_INVOICE_KEY="abc123..."

flyctl deploy

```

```
