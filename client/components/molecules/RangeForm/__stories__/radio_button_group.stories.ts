import URadioButtonGroup from '~/components/molecules/RadioButtonGroup';
import { RadioItem } from '~/components/atoms/RadioButtonItem';

export default {
  title: 'Molecules/RadioButtonGroup',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normal = (): any => ({
  components: {
    URadioButtonGroup,
  },
  data(): { value: string; items: RadioItem[] } {
    return {
      value: '',
      items: [
        {
          value: 'florida',
          label: 'Florida',
        },
        {
          value: 'tokyo',
          label: 'Tokyo',
        },
        {
          value: 'hong_kong',
          label: 'Hong Kong',
        },
        {
          value: 'shanghai',
          label: 'Shanghai',
        },
        {
          value: 'paris',
          label: 'Paris',
        },
      ],
    };
  },
  template: `
    <div>
      <u-radio-button-group
        v-model="value"
        :radio-items="items"
      />
      <p>value: {{ value }}</p>
    </div>
  `,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const singleItem = (): any => ({
  components: {
    URadioButtonGroup,
  },
  data(): { value: string; items: RadioItem[] } {
    return {
      value: '',
      items: [
        {
          value: 'all',
          label: '全て',
        }
      ],
    };
  },
  template: `
    <div>
      <u-radio-button-group
        v-model="value"
        :radio-items="items"
      />
      <p>value: {{ value }}</p>
    </div>
  `,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const manyItems = (): any => ({
  components: {
    URadioButtonGroup,
  },
  data(): { value: string; items: RadioItem[] } {
    const items: RadioItem[] = [];
    for (let i = 0; i < 100; i++) {
      items.push({
        value: i,
        label: `label-${i}`,
      });
    }
    return {
      value: '',
      items,
    };
  },
  template: `
    <div>
      <u-radio-button-group
        v-model="value"
        :radio-items="items"
      />
      <p>value: {{ value }}</p>
    </div>
  `,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const longWords = (): any => ({
  components: {
    URadioButtonGroup,
  },
  data(): { value: string; items: RadioItem[] } {
    return {
      value: '',
      items: [
        {
          value: 'smash_bros',
          label: '大乱闘スマッシュブラザーズ SPECIAL / Super Smash Bros. Ultimate',
        },
        {
          value: 'pokemon_ss',
          label: 'ポケットモンスター ソード・シールド / Pokémon Sword and Shield',
        },
        {
          value: 'splatoon',
          label: 'スプラトゥーン2 / Splatoon 2',
        },
        {
          value: 'mario_kart ',
          label: 'マリオカート8 デラックス / Mario Kart 8 Deluxe',
        },
        {
          value: 'super_mario',
          label: 'スーパーマリオ オデッセイ / Super Mario Odyssey',
        },
        {
          value: 'pokemon_pe',
          label: `ポケットモンスター Let's Go! ピカチュウ・Let's Go! イーブイ
          / Pokémon: Let’s Go, Pikachu!・Let’s Go, Eevee!`,
        },
        {
          value: 'zelda',
          label: 'ゼルダの伝説　ブレス オブ ザ ワイルド / The Legend of Zelda: Breath of the Wild',
        },
        {
          value: 'mario_party',
          label: 'スーパー マリオパーティ / Super Mario Party',
        },
      ],
    };
  },
  template: `
    <div>
      <u-radio-button-group
        v-model="value"
        :radio-items="items"
      />
      <p>value: {{ value }}</p>
    </div>
  `,
});
