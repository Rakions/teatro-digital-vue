<script setup lang="ts">
import NavbarView from '@/components/dashboard/NavbarView.vue'

import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useToast } from 'primevue/usetoast'
import { useObrasStore } from '@/stores/obrasStore'
import Tag from 'primevue/tag'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';



import Obra from '@/interfaces/Obra'

const obrasStore = useObrasStore()

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'

onMounted(() => {
  obrasStore.fetchAllObras().then(() => {
    obras.value = obrasStore.obras
  })
})

const toast = useToast()
const dt = ref()
const obras = ref<Obra[]>([])
const obraDialog = ref(false)
const deleteObraDialog = ref(false)
const deleteObrasDialog = ref(false)
const obra = ref<Obra>({} as Obra)
const selectedObras = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const submitted = ref(false)
const statuses = ref([
  { label: 'FAMILIAR', value: 1 },
  { label: 'COMEDIA', value: 2 },
  { label: 'MUSICAL', value: 3 }
])

const formatCurrency = (value: any) => {
  if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  return
}
const openNew = () => {
  obra.value = {}
  submitted.value = false
  obraDialog.value = true
}
const hideDialog = () => {
  obraDialog.value = false
  submitted.value = false
}
const saveProduct = () => {
  submitted.value = true

  if (obra.value.titulo!.trim()) {
    if (obra.value.obraID) {
      obras.value[findIndexById(obra.value.obraID)] = obra.value
      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Updated',
        life: 3000
      })
    } else {
      // obra.value.obraID = createId();
      // obra.value.code = createId();
      // obra.value.image = 'product-placeholder.svg';
      // obra.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
      // obra.value.push(product.value);
      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Created',
        life: 3000
      })
    }

    obraDialog.value = false
    obra.value = {}
  }
}
const editProduct = (obr: any) => {
  obr.value = { ...obr }
  obraDialog.value = true
}
const confirmDeleteProduct = (obr: any) => {
  obr.value = obr
  deleteObraDialog.value = true
}
const deleteProduct = () => {
  // products.value = products.value.filter(val => val.id !== product.value.id);
  // deleteProductDialog.value = false;
  // product.value = {};
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 })
}
const findIndexById = (id: number) => {
  let index = -1
  for (let i = 0; i < obras.value.length; i++) {
    if (obras.value[i].obraID === id) {
      index = i
      break
    }
  }

  return index
}

const exportCSV = () => {
  dt.value.exportCSV()
}
const confirmDeleteSelected = () => {
  deleteObrasDialog.value = true
}
const deleteSelectedProducts = () => {
  // products.value = products.value.filter(val => !selectedProducts.value.includes(val));
  // deleteProductsDialog.value = false;
  // selectedProducts.value = null;
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 })
}
const getCategoriaNombre = (status: any) => {
  switch (status) {
    case 1:
      return 'Familiar'

    case 2:
      return 'Comedia'

    case 3:
      return 'Musical'

    default:
      return null
  }
}
const getCategoriaLabel = (status: any) => {
  switch (status) {
    case 1:
      return 'success'

    case 2:
      return 'warning'

    case 3:
      return 'danger'

    default:
      return 'success'
  }
}
</script>

<template>
  <div>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedObras || !selectedObras.length"
          />
        </template>

        <template #end>
          <FileUpload
            mode="basic"
            accept="image/*"
            :maxFileSize="1000000"
            label="Import"
            chooseLabel="Import"
            class="mr-2 inline-block"
          />
          <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV()" />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="obras"
        v-model:selection="selectedObras"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 class="m-0">Manage Products</h4>
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </IconField>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="obraID" header="ID" sortable style="min-width: 12rem"></Column>
        <Column field="titulo" header="Título" sortable style="min-width: 16rem"></Column>
        <Column header="Image">
          <template #body="slotProps">
            <img
              :src="slotProps.data.imagen"
              :alt="slotProps.data.imagen"
              class="border-round"
              style="width: 64px"
            />
          </template>
        </Column>
        <Column field="descripcion" header="Descripción" sortable style="min-width: 10rem"></Column>
        <Column field="categoriaID" header="Categoria" sortable style="min-width: 12rem">
          <template #body="slotProps">
            <Tag
              :value="getCategoriaNombre(slotProps.data.categoriaID)"
              :severity="getCategoriaLabel(slotProps.data.categoriaID)"
            />
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="obraDialog"
      :style="{ width: '450px' }"
      header="Product Details"
      :modal="true"
      class="p-fluid"
    >
      <img
        v-if="obra.imagen"
        :src="`${obra.imagen}`"
        :alt="obra.imagen"
        class="block m-auto pb-3"
      />
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="obra.titulo"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !obra.titulo }"
        />
        <small class="p-error" v-if="submitted && !obra.titulo">Name is required.</small>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="obra.descripcion" required="true" rows="3" cols="20" />
      </div>

      <div class="field">
        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
        <Dropdown
          id="inventoryStatus"
          v-model="obra.categoriaID"
          :options="statuses"
          optionLabel="label"
          placeholder="Select a Status"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <Tag
                :value="slotProps.value.value"
                :severity="getCategoriaLabel(slotProps.value.label)"
              />
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <Tag :value="slotProps.value" :severity="getCategoriaLabel(slotProps.value)" />
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
        </Dropdown>
      </div>

      <!-- <div class="field">
              <label class="mb-3">Category</label>
              <div class="formgrid grid">
                  <div class="field-radiobutton col-6">
                      <RadioButton id="category1" name="category" value="Accessories" v-model="obra.category" />
                      <label for="category1">Accessories</label>
                  </div>
                  <div class="field-radiobutton col-6">
                      <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                      <label for="category2">Clothing</label>
                  </div>
                  <div class="field-radiobutton col-6">
                      <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                      <label for="category3">Electronics</label>
                  </div>
                  <div class="field-radiobutton col-6">
                      <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                      <label for="category4">Fitness</label>
                  </div>
              </div>
          </div>

          <div class="formgrid grid">
              <div class="field col">
                  <label for="price">Price</label>
                  <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
              </div>
              <div class="field col">
                  <label for="quantity">Quantity</label>
                  <InputNumber id="quantity" v-model="product.quantity" integeronly />
              </div>
          </div> -->
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
      </template>
    </Dialog>

    <!-- <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
              <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
              <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
          </template>
      </Dialog>

      <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
              <span v-if="product">Are you sure you want to delete the selected products?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
              <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
          </template>
      </Dialog> -->
  </div>
</template>
