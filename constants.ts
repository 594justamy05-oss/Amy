
import { CopyStyle, StyleConfig } from './types';

export const COPY_STYLES: StyleConfig[] = [
  {
    id: CopyStyle.UNCLE_GUN,
    name: '金鎗大叔',
    description: '直效行銷硬漢。強調痛點與立即下單，一句話：「聽懂掌聲！」💰',
    icon: '👊',
    color: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  },
  {
    id: CopyStyle.EILEEN,
    name: '張愛玲',
    description: '華麗蒼涼的文學天后。用細膩感官描繪生命的一襲華美袍子。🌹',
    icon: '💃',
    color: 'bg-purple-100 border-purple-300 text-purple-800',
  },
  {
    id: CopyStyle.LU_XUN,
    name: '魯迅',
    description: '橫眉冷對的文壇鬥士。犀利針砭，一針見血地指出你為什麼需要它。🖊️',
    icon: '👓',
    color: 'bg-stone-100 border-stone-400 text-stone-800',
  },
  {
    id: CopyStyle.WANG,
    name: '王世堅',
    description: '政壇恰吉。誇張比喻、送禮哲學，「Over my dead body」的誓言！🎻',
    icon: '🦁',
    color: 'bg-red-100 border-red-400 text-red-800',
  },
];

export const PLACEHOLDER_IMAGES = {
  loading: 'https://picsum.photos/400/300?blur=2',
  success: 'https://picsum.photos/400/300',
};
