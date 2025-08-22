<template>
  <section
    class="apartment-filters-by-rooms"
    aria-label="Выбрать количество комнат"
  >
    <div class="apartment-filters-by-rooms__buttons">
      <CheckboxButton
        v-for="room in Array.from({ length: MAX_ROOMS_COUNT }, (_, i) => i + 1)"
        :key="room"
        :checked="rooms?.includes(room)"
        @handle-check="handleToggleRoom(room)"
      >
        <p>{{ room }}к</p>
      </CheckboxButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MAX_ROOMS_COUNT } from '~/entities/apartment/model/const'
import { useDebounce } from '#shared/composables/useDebounce/useDebounce'
import CheckboxButton from '#shared/ui/CheckboxButton/CheckboxButton.vue'

const debounce = useDebounce()

type ApartmentFilterByRoomsProps = {
  rooms?: number[]
}
const props = defineProps<ApartmentFilterByRoomsProps>()

const emit = defineEmits<{ handleChangeRoomsFilter: [rooms: number[]] }>()

const rooms = ref(props.rooms ?? [])

watch(
  () => props.rooms,
  (newRooms) => {
    rooms.value = [...(newRooms ?? [])]
  },
  { deep: true },
)

const handleToggleRoom = (room: number) => {
  const index = rooms.value.indexOf(room)
  if (index > -1) {
    rooms.value.splice(index, 1)
  } else {
    rooms.value.push(room)
  }

  debounce(() => emit('handleChangeRoomsFilter', rooms.value), 1200)
}
</script>

<style scoped>
.apartment-filters-by-rooms__buttons {
  display: flex;
  gap: var(--spacing-lg);
}
</style>
