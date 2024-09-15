<template>
  <h1
    v-for="(headline, index) in headlines"
    :key="index"
    ref="headlineRefs"
    class="absolute font-bold whitespace-nowrap text-clip select-none animate-marquee"
    :style="`
            top: ${headlinesStyleValues[index].top}%;
            left: 0;
            transform: translateX(-100%);
            font-size: ${headlinesStyleValues[index].fontSize};
            opacity: ${headlinesStyleValues[index].opacity};
            animation-name: marquee-${index};
            animation-timing-function: linear;
            animation-iteration-count: infinite;`"
  >
    {{ headline }}
  </h1>
</template>

<script lang="ts" setup>
  const { data, status, error, refresh } = useFetch(`https://gnews.io/api/v4/top-headlines?category=technology&lang=ja&country=jp&apikey=d187261d9a92e0087ee1b2e942c800e0`);
  
  let headlines: string[] = [];
  data.value.articles.forEach((article: any) => {
    headlines.push(article.title);
  });

  // const headlines = [
  //   "このマザーボード、ありえない位置にPCIeスロットが！？これはいったい……Maxsunから『Terminator B760BKB』",
  //   "Nintendo Switchの純正プロコンを異次元レベルの操作性に！使わない理由がない革新的アダプター",
  //   "iPhone 16 Proって、15 Proと比べてどれだけ速くなったの？",
  //   "秋葉原で訳あり品のiPad Pro 12.9セルラー版が25,800円セール開始",
  //   "発売から約2カ月…。Galaxy Ringがないともう生活できない",
  //   "窃盗事件で当時19歳の男性を“誤認逮捕”…逮捕された日に釈放も約3時間身柄を拘束 なぜ誤認逮捕？原因は｢先入観｣と｢証拠精査の不徹底｣",
  //   "「iPhone 16 Pro」の第一印象--試用して気に入った3つの機能",
  //   "Apple Intelligenceの日本語対応はiOS18.4〜そこまでの進化は？",
  //   "『サイバーパンク2077』最新パッチで実装の超解像技術FSR3と従来のDLSS、FSR2.1を比較！DLSS比で1.8倍程度の向上も描画品質にやや難あり",
  //   "第8世代Core i5搭載富士通製超軽量13インチノートOS無し版14,800円再入荷！【最終入荷】"
  // ];

  const headlineRefs = ref([]);

  type HeadlineStyleValues = {
    top: number;
    fontSize: string;
    opacity: string;
    animationDelay: number;
  }

  const fontSizeOpacityPairs = shuffleArray([
    { fontSize: '1.125rem', opacity: 0.2, animationDelay: 1.75 },
    { fontSize: '1.125rem', opacity: 0.2, animationDelay: 2 },
    { fontSize: '1.125rem', opacity: 0.2, animationDelay: 3 },
    { fontSize: '1.5rem', opacity: 0.4, animationDelay: 0 },
    { fontSize: '1.5rem', opacity: 0.4, animationDelay: 3.4 },
    { fontSize: '1.5rem', opacity: 0.4, animationDelay: 2.4 },
    { fontSize: '2.25rem', opacity: 0.6, animationDelay: 4 },
    { fontSize: '2.25rem', opacity: 0.6, animationDelay: 0.7 },
    { fontSize: '2.25rem', opacity: 0.6, animationDelay: 1.8 },
    { fontSize: '3rem', opacity: 1.0, animationDelay: 0 },
    { fontSize: '3rem', opacity: 1.0, animationDelay: 3.7 }
  ]);

  function generateTopValues(count: number, minDifference: number): number[] {
    const values: number[] = [];
    while (values.length < count) {
      const newValue = Math.floor(Math.random() * 98);
      if (values.every(value => Math.abs(value - newValue) >= minDifference)) {
        values.push(newValue);
      }
    }
    return values;
  }

  const topValues = generateTopValues(headlines.length, 3);

  const headlinesStyleValues: HeadlineStyleValues[] = Array.from(
    { length: headlines.length },
    (_, index) => {
      return {
        top: topValues[index],
        fontSize: fontSizeOpacityPairs[index].fontSize,
        opacity: fontSizeOpacityPairs[index].opacity,
        animationDelay: fontSizeOpacityPairs[index].animationDelay
      } as HeadlineStyleValues;
    }
  );

  onMounted(() => {
    const styleSheet = document.styleSheets[0];

    headlineRefs.value.forEach((headline: HTMLHeadingElement, index: number) => {
      const keyframes = `
        @keyframes marquee-${index} {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `;

      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

      // Calculate the duration based on element width and viewport size
      const width = headline.offsetWidth;
      const viewportWidth = window.innerWidth;
      const totalDistance = viewportWidth + width; // Total distance to travel
      const speed = 100; // Define speed in pixels per second (adjust as needed)
      const duration = totalDistance / speed; // Calculate duration based on speed

      // Set the calculated duration dynamically
      headline.style.animationDuration = `${duration}s`;
      headline.style.animationDelay = `${headlinesStyleValues[index].animationDelay}s`;
    });
  });
</script>

<style scoped>

</style>