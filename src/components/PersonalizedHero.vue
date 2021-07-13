<template>
  <div>
    <Personalize :variations="variations" :component="getHeroComponent()" tracking-event-name="heroPersonalized">
      <template #loading>
        <PersonalizedHeroLoading />
      </template>
    </Personalize>
  </div>
</template>
<script>
import { Personalize } from '@uniformdev/optimize-tracker-vue';
import { contentfulOptimizeListReader } from '@uniformdev/optimize-tracker-contentful';
import PersonalizedHeroLoading from '@/components/PersonalizedHeroLoading.vue';
import Hero from './Hero';

export default {
  name: 'personalized-hero',
  components: {
    Personalize,
    PersonalizedHeroLoading,
  },
  props: {
    fields: {
      type: Object,
      default() {
        return {
          unfrmOptP13nList: {},
        };
      },
    },
    sys: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    variations() {
      return contentfulOptimizeListReader(this.fields.unfrmOptP13nList);
    },
  },
  methods: {
    getHeroComponent() {
      return Hero;
    },
  },
};
</script>
