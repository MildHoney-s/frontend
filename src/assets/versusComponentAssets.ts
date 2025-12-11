export interface PlayerRaw {
  name: string
  src: string // base folder, e.g. '/assets/.../Mild-R/'
  file: string // base filename, e.g. 'Mild'
}

export interface VersusRaw {
  bgImg: string
  card: string
  effect: {
    circle: string
    ring: string
    text: string
  }
  players: Record<string, PlayerRaw>
}

export interface PlayerAssets extends PlayerRaw {
  open: string
  close: string
  base: string
}

export interface VersusAssets {
  bgImg: string
  card: string
  effect: {
    circle: string
    ring: string
    text: string
  }
  players: Record<string, PlayerAssets>
}

export const versusComponentRaw: VersusRaw = {
  bgImg: '/assets/part3/BG/versus_bg/bg.png',
  card: '/assets/part3/BG/versus_bg/card.png',
  effect: {
    circle: '/assets/part3/BG/versus_bg/01.png',
    ring: '/assets/part3/BG/versus_bg/02.png',
    text: '/assets/part3/BG/versus_bg/vs.png',
  },
  players: {
    mildR: {
      name: 'Mild-R',
      src: '/assets/part3/model/Versus/Mild-R/',
      file: 'Mild',
    },
    drGamer: {
      name: 'Dr.',
      src: '/assets/part3/model/Versus/Dr_Gamer/',
      file: 'Dr_Gamer',
    },
  },
}

export function extractAssetPaths(raw: VersusRaw): VersusAssets {
  const out: VersusAssets = {
    bgImg: raw.bgImg,
    card: raw.card,
    effect: { ...raw.effect },
    players: {},
  }

  Object.keys(raw.players).forEach((key) => {
    const p = raw.players[key]
    const src = p.src.endsWith('/') ? p.src : p.src + '/'
    const file = p.file

    out.players[key] = {
      ...p,
      open: `${src}${file}_open.png`,
      close: `${src}${file}_close.png`,
      base: `${src}${file}.png`,
    }
  })

  return out
}

export const versusComponentAssets: VersusAssets =
  extractAssetPaths(versusComponentRaw)
export default versusComponentAssets
