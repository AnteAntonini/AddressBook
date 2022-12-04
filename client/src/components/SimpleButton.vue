<script setup lang="ts">
import { computed, toRefs } from "vue";

export interface ButtonProps {
  backgroundColor?: string;
  textColor?: string;
}
const props = withDefaults(defineProps<ButtonProps>(), {
  backgroundColor: "",
  textColor: "",
});
const emit = defineEmits<{
  (event: "click"): void;
}>();
const { backgroundColor, textColor } = toRefs(props);

const styles = computed(() => ({
  backgroundColor: backgroundColor.value,
  color: textColor.value,
}));
</script>

<template>
  <button class="sc-btn" :style="styles" @click="emit('click')"></button>
</template>
