<script setup lang="ts">
import NavbarView from '@/components/dashboard/NavbarView.vue'

import { ref, onMounted } from 'vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'

const products = ref([
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  }
])
const columns = ref([
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' },
  { field: 'quantity', header: 'Quantity' },
  { field: 'price', header: 'Price' }
])

const onCellEditComplete = (event) => {
  //console.log(event.field, event.newValue, event.data)
  let { data, newValue, field } = event

  switch (field) {
    case 'quantity':
    case 'price':
      if (isPositiveInteger(newValue)) data[field] = newValue
      else event.preventDefault()
      break

    default:
      if (newValue.trim().length > 0) data[field] = newValue
      else event.preventDefault()
      break
  }
}
const isPositiveInteger = (val) => {
  let str = String(val)

  str = str.trim()

  if (!str) {
    return false
  }

  str = str.replace(/^0+/, '') || '0'
  var n = Math.floor(Number(str))

  return n !== Infinity && String(n) === str && n >= 0
}
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
}
</script>

<template>
  <div class="dashboard_screen">
    <NavbarView />
    <DataTable
      :value="products"
      editMode="cell"
      @cell-edit-complete="onCellEditComplete"
      :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
          bodycell: ({ state }) => ({
            class: [{ 'pt-0 pb-0': state['d_editing'] }]
          })
        }
      }"
    >
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        style="width: 25%"
      >
        <template #body="{ data, field }">
          {{ field === 'price' ? formatCurrency(data[field]) : data[field] }}
        </template>
        <template #editor="{ data, field }">
          <template v-if="field !== 'price'">
            <InputText v-model="data[field]" autofocus />
          </template>
          <template v-else>
            <InputNumber
              v-model="data[field]"
              mode="currency"
              currency="EUR"
              locale="es-ES"
              autofocus
            />
          </template>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
